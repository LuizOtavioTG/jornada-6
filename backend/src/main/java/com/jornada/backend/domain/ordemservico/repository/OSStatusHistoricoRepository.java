package com.jornada.backend.domain.ordemservico.repository;

import com.jornada.backend.domain.ordemservico.model.OSStatusHistorico;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OSStatusHistoricoRepository extends JpaRepository<OSStatusHistorico, Long> {
    List<OSStatusHistorico> findByOrdemServicoIdOrderByRegistradoEmAsc(Long ordemServicoId);
}
