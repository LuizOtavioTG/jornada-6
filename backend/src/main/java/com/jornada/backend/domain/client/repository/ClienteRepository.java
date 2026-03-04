package com.jornada.backend.domain.client.repository;

import com.jornada.backend.domain.client.model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {
    Optional<Cliente> findByDocumento(String documento);
    boolean existsByDocumento(String documento);
}
