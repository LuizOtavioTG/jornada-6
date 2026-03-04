package com.jornada.backend.domain.comunicacao.repository;

import com.jornada.backend.domain.comunicacao.model.Informativo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InformativoRepository extends JpaRepository<Informativo, Long> {
}
