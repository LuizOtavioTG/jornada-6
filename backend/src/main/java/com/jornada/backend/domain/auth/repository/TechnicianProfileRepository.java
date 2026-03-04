package com.jornada.backend.domain.auth.repository;

import com.jornada.backend.domain.auth.model.TechnicianProfile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TechnicianProfileRepository extends JpaRepository<TechnicianProfile, Long> {
    Optional<TechnicianProfile> findByUserId(Long userId);
}
