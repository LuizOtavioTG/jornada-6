package com.jornada.backend.domain.client.repository;

import com.jornada.backend.domain.client.model.RegiaoAtendimento;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RegiaoAtendimentoRepository extends JpaRepository<RegiaoAtendimento, Long> {
    Optional<RegiaoAtendimento> findByCodigo(String codigo);
}
