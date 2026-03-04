package com.jornada.backend.domain.ordemservico.repository;

import com.jornada.backend.domain.ordemservico.model.OSCustoHora;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OSCustoHoraRepository extends JpaRepository<OSCustoHora, Long> {
    List<OSCustoHora> findByResumoId(Long resumoId);
}
