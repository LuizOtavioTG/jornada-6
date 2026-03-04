package com.jornada.backend.domain.configuracao.repository;

import com.jornada.backend.domain.configuracao.model.ParametroSistema;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ParametroSistemaRepository extends JpaRepository<ParametroSistema, Long> {
    Optional<ParametroSistema> findByChave(String chave);
}
