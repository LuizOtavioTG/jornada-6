package com.jornada.backend.domain.ordemservico.repository;

import com.jornada.backend.domain.ordemservico.model.OSChamado;
import com.jornada.backend.domain.ordemservico.model.OSChamadoStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OSChamadoRepository extends JpaRepository<OSChamado, Long> {
    List<OSChamado> findByOrdemServicoId(Long ordemServicoId);
    List<OSChamado> findByStatus(OSChamadoStatus status);
}
