package com.jornada.backend.domain.comunicacao.repository;

import com.jornada.backend.domain.comunicacao.model.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
}
