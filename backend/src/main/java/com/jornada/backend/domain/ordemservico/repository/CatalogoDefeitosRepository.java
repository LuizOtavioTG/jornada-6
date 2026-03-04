package com.jornada.backend.domain.ordemservico.repository;

import com.jornada.backend.domain.ordemservico.model.CatalogoDefeitos;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CatalogoDefeitosRepository extends JpaRepository<CatalogoDefeitos, Long> {
    Optional<CatalogoDefeitos> findByCodigo(String codigo);
}
