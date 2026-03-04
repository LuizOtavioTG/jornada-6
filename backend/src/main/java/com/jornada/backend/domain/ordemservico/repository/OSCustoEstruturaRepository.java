package com.jornada.backend.domain.ordemservico.repository;

import com.jornada.backend.domain.ordemservico.model.OSCustoEstrutura;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OSCustoEstruturaRepository extends JpaRepository<OSCustoEstrutura, Long> {
    List<OSCustoEstrutura> findByResumoId(Long resumoId);
}
