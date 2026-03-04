package com.jornada.backend.domain.ordemservico.repository;

import com.jornada.backend.domain.ordemservico.model.SubcategoriaDefeito;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SubcategoriaDefeitoRepository extends JpaRepository<SubcategoriaDefeito, Long> {
    List<SubcategoriaDefeito> findByCategoriaId(Long categoriaId);
}
