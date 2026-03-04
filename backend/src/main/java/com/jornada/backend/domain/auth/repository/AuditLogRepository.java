package com.jornada.backend.domain.auth.repository;

import com.jornada.backend.domain.auth.model.AuditLog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuditLogRepository extends JpaRepository<AuditLog, Long> {
}
