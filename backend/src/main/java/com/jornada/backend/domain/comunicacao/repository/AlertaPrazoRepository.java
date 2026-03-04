package com.jornada.backend.domain.comunicacao.repository;

import com.jornada.backend.domain.comunicacao.model.AlertaPrazo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AlertaPrazoRepository extends JpaRepository<AlertaPrazo, Long> {
    List<AlertaPrazo> findByVioladoTrue();
}
