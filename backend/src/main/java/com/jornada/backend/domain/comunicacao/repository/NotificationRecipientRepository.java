package com.jornada.backend.domain.comunicacao.repository;

import com.jornada.backend.domain.comunicacao.model.NotificationRecipient;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificationRecipientRepository extends JpaRepository<NotificationRecipient, Long> {
    List<NotificationRecipient> findByUserIdAndLidoFalse(Long userId);
}
