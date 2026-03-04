package com.jornada.backend.domain.auth.repository;

import com.jornada.backend.domain.auth.model.SessionToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.OffsetDateTime;
import java.util.Optional;

public interface SessionTokenRepository extends JpaRepository<SessionToken, Long> {
    Optional<SessionToken> findByToken(String token);
    long deleteByExpiresAtBefore(OffsetDateTime expiresAt);
}
