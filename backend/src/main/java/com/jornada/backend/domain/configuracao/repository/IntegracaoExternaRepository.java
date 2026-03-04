package com.jornada.backend.domain.configuracao.repository;

import com.jornada.backend.domain.configuracao.model.IntegracaoExterna;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface IntegracaoExternaRepository extends JpaRepository<IntegracaoExterna, Long> {
    Optional<IntegracaoExterna> findByNome(String nome);
}
