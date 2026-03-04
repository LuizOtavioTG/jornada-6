package com.jornada.backend.domain.ordemservico.repository;

import com.jornada.backend.domain.ordemservico.model.TipoServico;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TipoServicoRepository extends JpaRepository<TipoServico, Long> {
    Optional<TipoServico> findByNome(String nome);
}
