package com.jornada.backend.domain.ordemservico.repository;

import com.jornada.backend.domain.ordemservico.model.OSCustoKm;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OSCustoKmRepository extends JpaRepository<OSCustoKm, Long> {
    List<OSCustoKm> findByResumoId(Long resumoId);
}
