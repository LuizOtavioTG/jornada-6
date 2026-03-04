package com.jornada.backend.domain.ordemservico.repository;

import com.jornada.backend.domain.ordemservico.model.OSMaterial;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OSMaterialRepository extends JpaRepository<OSMaterial, Long> {
    List<OSMaterial> findByResumoId(Long resumoId);
}
