package com.jornada.backend.domain.ordemservico.repository;

import com.jornada.backend.domain.ordemservico.model.OSComentario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OSComentarioRepository extends JpaRepository<OSComentario, Long> {
    List<OSComentario> findByOrdemServicoId(Long ordemServicoId);
}
