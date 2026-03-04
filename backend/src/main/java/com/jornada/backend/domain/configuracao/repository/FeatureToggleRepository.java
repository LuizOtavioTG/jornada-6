package com.jornada.backend.domain.configuracao.repository;

import com.jornada.backend.domain.configuracao.model.FeatureToggle;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FeatureToggleRepository extends JpaRepository<FeatureToggle, Long> {
    Optional<FeatureToggle> findByChave(String chave);
}
