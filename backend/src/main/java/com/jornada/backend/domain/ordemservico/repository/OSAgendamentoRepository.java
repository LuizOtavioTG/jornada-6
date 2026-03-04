package com.jornada.backend.domain.ordemservico.repository;

import com.jornada.backend.domain.ordemservico.model.OSAgendamento;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OSAgendamentoRepository extends JpaRepository<OSAgendamento, Long> {
    List<OSAgendamento> findByOrdemServicoId(Long ordemServicoId);
    List<OSAgendamento> findByTecnicoId(Long tecnicoId);
}
