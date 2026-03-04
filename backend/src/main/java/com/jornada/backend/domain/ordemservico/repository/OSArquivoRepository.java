package com.jornada.backend.domain.ordemservico.repository;

import com.jornada.backend.domain.ordemservico.model.OSArquivo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OSArquivoRepository extends JpaRepository<OSArquivo, Long> {
    List<OSArquivo> findByOrdemServicoId(Long ordemServicoId);
}
