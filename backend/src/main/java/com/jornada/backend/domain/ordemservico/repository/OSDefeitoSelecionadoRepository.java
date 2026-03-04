package com.jornada.backend.domain.ordemservico.repository;

import com.jornada.backend.domain.ordemservico.model.OSDefeitoSelecionado;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OSDefeitoSelecionadoRepository extends JpaRepository<OSDefeitoSelecionado, Long> {
    List<OSDefeitoSelecionado> findByChecklistId(Long checklistId);
}
