package com.jornada.backend.domain.client.repository;

import com.jornada.backend.domain.client.model.ClienteUnidade;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ClienteUnidadeRepository extends JpaRepository<ClienteUnidade, Long> {
    List<ClienteUnidade> findByClienteId(Long clienteId);
}
