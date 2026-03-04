package com.jornada.backend.domain.client.repository;

import com.jornada.backend.domain.client.model.ModeloEquipamento;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ModeloEquipamentoRepository extends JpaRepository<ModeloEquipamento, Long> {
    Optional<ModeloEquipamento> findByNome(String nome);
}
