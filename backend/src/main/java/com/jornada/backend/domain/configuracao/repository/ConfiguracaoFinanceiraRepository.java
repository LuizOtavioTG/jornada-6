package com.jornada.backend.domain.configuracao.repository;

import com.jornada.backend.domain.configuracao.model.ConfiguracaoFinanceira;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.OffsetDateTime;
import java.util.List;

public interface ConfiguracaoFinanceiraRepository extends JpaRepository<ConfiguracaoFinanceira, Long> {
    List<ConfiguracaoFinanceira> findByAtivoTrue();
    List<ConfiguracaoFinanceira> findByVigenteDeBeforeAndVigenteAteAfter(OffsetDateTime vigenteDe, OffsetDateTime vigenteAte);
}
