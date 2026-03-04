package com.jornada.backend.domain.comunicacao.repository;

import com.jornada.backend.domain.comunicacao.model.ChatOS;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ChatOSRepository extends JpaRepository<ChatOS, Long> {
    Optional<ChatOS> findByOrdemServicoId(Long ordemServicoId);
}
