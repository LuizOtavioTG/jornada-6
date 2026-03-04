package com.jornada.backend.domain.ordemservico.repository;

import com.jornada.backend.domain.ordemservico.model.CategoriaDefeito;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CategoriaDefeitoRepository extends JpaRepository<CategoriaDefeito, Long> {
    Optional<CategoriaDefeito> findByNome(String nome);
}
