package com.jornada.backend.domain.auth.repository;

import com.jornada.backend.domain.auth.model.PasswordResetToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.OffsetDateTime;
import java.util.Optional;

public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Long> {
    Optional<PasswordResetToken> findByToken(String token);
    long deleteByExpiresAtBefore(OffsetDateTime expiresAt);
}
