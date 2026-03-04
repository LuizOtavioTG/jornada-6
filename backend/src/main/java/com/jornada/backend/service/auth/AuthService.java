package com.jornada.backend.service.auth;

import com.jornada.backend.api.dto.auth.LoginRequest;
import com.jornada.backend.api.dto.auth.LoginResponse;
import com.jornada.backend.api.dto.auth.RefreshTokenRequest;
import com.jornada.backend.service.auth.mapper.UserMapper;
import com.jornada.backend.config.security.JwtProperties;
import com.jornada.backend.domain.auth.model.RefreshToken;
import com.jornada.backend.domain.auth.model.SessionToken;
import com.jornada.backend.domain.auth.model.User;
import com.jornada.backend.domain.auth.repository.RefreshTokenRepository;
import com.jornada.backend.domain.auth.repository.SessionTokenRepository;
import com.jornada.backend.domain.auth.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.OffsetDateTime;

@Service
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final SessionTokenRepository sessionTokenRepository;
    private final JwtTokenService jwtTokenService;
    private final JwtProperties jwtProperties;

    public AuthService(AuthenticationManager authenticationManager,
                       UserRepository userRepository,
                       RefreshTokenRepository refreshTokenRepository,
                       SessionTokenRepository sessionTokenRepository,
                       JwtTokenService jwtTokenService,
                       JwtProperties jwtProperties) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.refreshTokenRepository = refreshTokenRepository;
        this.sessionTokenRepository = sessionTokenRepository;
        this.jwtTokenService = jwtTokenService;
        this.jwtProperties = jwtProperties;
    }

    @Transactional
    public LoginResponse login(LoginRequest request, String userAgent, String ipAddress) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado"));

        String accessToken = jwtTokenService.generateAccessToken((UserDetails) authentication.getPrincipal());
        String refreshToken = jwtTokenService.generateRefreshToken(user.getEmail());

        RefreshToken refreshTokenEntity = new RefreshToken();
        refreshTokenEntity.setUser(user);
        refreshTokenEntity.setToken(refreshToken);
        refreshTokenEntity.setExpiresAt(OffsetDateTime.now().plusSeconds(jwtProperties.getRefreshExpiration()));
        refreshTokenRepository.save(refreshTokenEntity);

        SessionToken sessionToken = new SessionToken();
        sessionToken.setUser(user);
        sessionToken.setToken(accessToken);
        sessionToken.setExpiresAt(OffsetDateTime.now().plusSeconds(jwtProperties.getExpiration()));
        sessionToken.setUserAgent(userAgent);
        sessionToken.setIpAddress(ipAddress);
        sessionTokenRepository.save(sessionToken);

        return new LoginResponse(accessToken, refreshToken, jwtProperties.getExpiration(), jwtProperties.getRefreshExpiration(), UserMapper.toResponse(user));
    }

    @Transactional
    public LoginResponse refresh(RefreshTokenRequest request) {
        RefreshToken refreshToken = refreshTokenRepository.findByToken(request.getRefreshToken())
                .orElseThrow(() -> new UsernameNotFoundException("Refresh token inválido"));

        if (refreshToken.isRevoked() || refreshToken.getExpiresAt().isBefore(OffsetDateTime.now())) {
            throw new UsernameNotFoundException("Refresh token expirado ou revogado");
        }

        User user = refreshToken.getUser();
        UserDetails userDetails = userRepository.findByEmail(user.getEmail())
                .map(u -> (UserDetails) new UserSecurityDetails(u))
                .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado"));

        String accessToken = jwtTokenService.generateAccessToken(userDetails);

        SessionToken sessionToken = new SessionToken();
        sessionToken.setUser(user);
        sessionToken.setToken(accessToken);
        sessionToken.setExpiresAt(OffsetDateTime.now().plusSeconds(jwtProperties.getExpiration()));
        sessionTokenRepository.save(sessionToken);

        return new LoginResponse(accessToken, request.getRefreshToken(), jwtProperties.getExpiration(), jwtProperties.getRefreshExpiration(), UserMapper.toResponse(user));
    }
}
