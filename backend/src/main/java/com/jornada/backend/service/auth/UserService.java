package com.jornada.backend.service.auth;

import com.jornada.backend.api.dto.auth.CreateUserRequest;
import com.jornada.backend.api.dto.auth.UpdateUserRequest;
import com.jornada.backend.api.dto.auth.UserResponse;
import com.jornada.backend.domain.auth.model.Role;
import com.jornada.backend.domain.auth.model.User;
import com.jornada.backend.domain.auth.model.UserRole;
import com.jornada.backend.domain.auth.model.UserStatus;
import com.jornada.backend.domain.auth.repository.RoleRepository;
import com.jornada.backend.domain.auth.repository.UserRepository;
import com.jornada.backend.service.auth.mapper.UserMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository,
                       RoleRepository roleRepository,
                       PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional(readOnly = true)
    public List<UserResponse> listUsers() {
        return userRepository.findAll().stream()
                .map(UserMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public UserResponse getUser(Long id) {
        return userRepository.findById(id)
                .map(UserMapper::toResponse)
                .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado"));
    }

    @Transactional
    public UserResponse createUser(CreateUserRequest request, Long actingUserId) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("E-mail já cadastrado");
        }

        User user = new User();
        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setStatus(UserStatus.ACTIVE);
        user.setEnterpriseId(request.getEnterpriseId());
        user.setClienteId(request.getClienteId());

        Set<Role> roles = request.getRoleIds().stream()
                .map(roleId -> roleRepository.findById(roleId)
                        .orElseThrow(() -> new IllegalArgumentException("Papel não encontrado: " + roleId)))
                .collect(Collectors.toSet());

        OffsetDateTime grantedAt = OffsetDateTime.now();
        for (Role role : roles) {
            UserRole userRole = new UserRole();
            userRole.setUser(user);
            userRole.setRole(role);
            userRole.setGrantedAt(grantedAt);
            userRole.setGrantedByUserId(actingUserId);
            user.getUserRoles().add(userRole);
        }

        userRepository.save(user);
        return UserMapper.toResponse(user);
    }

    @Transactional
    public UserResponse updateUser(Long id, UpdateUserRequest request, Long actingUserId) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado"));

        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setEnterpriseId(request.getEnterpriseId());
        user.setClienteId(request.getClienteId());

        if (request.getRoleIds() != null && !request.getRoleIds().isEmpty()) {
            user.getUserRoles().clear();
            Set<Role> roles = request.getRoleIds().stream()
                    .map(roleId -> roleRepository.findById(roleId)
                            .orElseThrow(() -> new IllegalArgumentException("Papel não encontrado: " + roleId)))
                    .collect(Collectors.toSet());

            OffsetDateTime grantedAt = OffsetDateTime.now();
            for (Role role : roles) {
                UserRole userRole = new UserRole();
                userRole.setUser(user);
                userRole.setRole(role);
                userRole.setGrantedAt(grantedAt);
                userRole.setGrantedByUserId(actingUserId);
                user.getUserRoles().add(userRole);
            }
        }

        return UserMapper.toResponse(user);
    }

    @Transactional
    public void updatePassword(Long id, String newPassword) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado"));
        user.setPassword(passwordEncoder.encode(newPassword));
    }

    @Transactional
    public void deactivateUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado"));
        user.setStatus(UserStatus.SUSPENDED);
    }
}
