package com.jornada.backend.domain.auth.repository;

import com.jornada.backend.domain.auth.model.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.OffsetDateTime;
import java.util.Optional;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
    Optional<RefreshToken> findByToken(String token);
    long deleteByExpiresAtBefore(OffsetDateTime expiresAt);
}
