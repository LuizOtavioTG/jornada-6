package com.jornada.backend.domain.client.repository;

import com.jornada.backend.domain.client.model.ClienteContato;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ClienteContatoRepository extends JpaRepository<ClienteContato, Long> {
    List<ClienteContato> findByUnidadeId(Long unidadeId);
}
