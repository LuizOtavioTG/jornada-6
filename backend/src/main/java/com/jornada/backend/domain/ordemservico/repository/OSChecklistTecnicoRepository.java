package com.jornada.backend.domain.ordemservico.repository;

import com.jornada.backend.domain.ordemservico.model.OSChecklistTecnico;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OSChecklistTecnicoRepository extends JpaRepository<OSChecklistTecnico, Long> {
    List<OSChecklistTecnico> findByOrdemServicoId(Long ordemServicoId);
}
