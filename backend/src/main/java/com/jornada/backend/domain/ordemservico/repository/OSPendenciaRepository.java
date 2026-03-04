package com.jornada.backend.domain.ordemservico.repository;

import com.jornada.backend.domain.ordemservico.model.OSPendencia;
import com.jornada.backend.domain.ordemservico.model.OSPendenciaStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OSPendenciaRepository extends JpaRepository<OSPendencia, Long> {
    List<OSPendencia> findByOrdemServicoId(Long ordemServicoId);
    List<OSPendencia> findByStatus(OSPendenciaStatus status);
}
