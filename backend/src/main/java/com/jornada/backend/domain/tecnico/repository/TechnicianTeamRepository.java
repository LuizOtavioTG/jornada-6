package com.jornada.backend.domain.tecnico.repository;

import com.jornada.backend.domain.tecnico.model.TechnicianTeam;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TechnicianTeamRepository extends JpaRepository<TechnicianTeam, Long> {
}
