package com.jornada.backend.domain.tecnico.repository;

import com.jornada.backend.domain.tecnico.model.DisponibilidadeStatus;
import com.jornada.backend.domain.tecnico.model.DisponibilidadeTecnico;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.OffsetDateTime;
import java.util.List;

public interface DisponibilidadeTecnicoRepository extends JpaRepository<DisponibilidadeTecnico, Long> {
    List<DisponibilidadeTecnico> findByTecnicoId(Long tecnicoId);
    List<DisponibilidadeTecnico> findByStatus(DisponibilidadeStatus status);
    List<DisponibilidadeTecnico> findByInicioBeforeAndFimAfter(OffsetDateTime inicio, OffsetDateTime fim);
}
