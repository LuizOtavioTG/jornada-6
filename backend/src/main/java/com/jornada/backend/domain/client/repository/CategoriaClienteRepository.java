package com.jornada.backend.domain.client.repository;

import com.jornada.backend.domain.client.model.CategoriaCliente;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CategoriaClienteRepository extends JpaRepository<CategoriaCliente, Long> {
    Optional<CategoriaCliente> findByNome(String nome);
}
