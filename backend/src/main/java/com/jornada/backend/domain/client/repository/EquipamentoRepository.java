package com.jornada.backend.domain.client.repository;

import com.jornada.backend.domain.client.model.Equipamento;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface EquipamentoRepository extends JpaRepository<Equipamento, Long> {
    Optional<Equipamento> findByNumeroSerie(String numeroSerie);
    List<Equipamento> findByUnidadeId(Long unidadeId);
}
