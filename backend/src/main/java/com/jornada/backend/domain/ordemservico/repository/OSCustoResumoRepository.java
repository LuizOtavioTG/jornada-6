package com.jornada.backend.domain.ordemservico.repository;

import com.jornada.backend.domain.ordemservico.model.OSCustoResumo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OSCustoResumoRepository extends JpaRepository<OSCustoResumo, Long> {
    Optional<OSCustoResumo> findByOrdemServicoId(Long ordemServicoId);
}
