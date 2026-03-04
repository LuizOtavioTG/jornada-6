package com.jornada.backend.domain.comunicacao.repository;

import com.jornada.backend.domain.comunicacao.model.MensagemInterna;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MensagemInternaRepository extends JpaRepository<MensagemInterna, Long> {
    List<MensagemInterna> findByChatId(Long chatId);
}
