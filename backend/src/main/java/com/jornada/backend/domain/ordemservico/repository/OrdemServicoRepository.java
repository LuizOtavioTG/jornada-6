package com.jornada.backend.domain.ordemservico.repository;

import com.jornada.backend.domain.ordemservico.model.OrdemServico;
import com.jornada.backend.domain.ordemservico.model.OrdemServicoStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface OrdemServicoRepository extends JpaRepository<OrdemServico, Long> {
    Optional<OrdemServico> findByNumeroOs(String numeroOs);
    List<OrdemServico> findByClienteId(Long clienteId);
    List<OrdemServico> findByStatus(OrdemServicoStatus status);
}
