package com.jornada.backend.domain.comunicacao.repository;

import com.jornada.backend.domain.comunicacao.model.AlertaGarantia;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AlertaGarantiaRepository extends JpaRepository<AlertaGarantia, Long> {
    List<AlertaGarantia> findByTratadoFalse();
}
