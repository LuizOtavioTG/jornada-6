package com.jornada.backend.domain.ordemservico.repository;

import com.jornada.backend.domain.ordemservico.model.OSCustoDeslocamento;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OSCustoDeslocamentoRepository extends JpaRepository<OSCustoDeslocamento, Long> {
    List<OSCustoDeslocamento> findByResumoId(Long resumoId);
}
