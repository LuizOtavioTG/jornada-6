package com.jornada.backend.domain.comunicacao.model;

import com.jornada.backend.domain.auth.model.User;
import com.jornada.backend.domain.common.model.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import java.time.OffsetDateTime;

@Entity
@Table(name = "notification_recipients")
public class NotificationRecipient extends BaseEntity {

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "notification_id", nullable = false, foreignKey = @ForeignKey(name = "fk_notification_recipient_notification"))
    private Notification notification;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", foreignKey = @ForeignKey(name = "fk_notification_recipient_user"))
    private User user;

    @Column(nullable = false)
    private boolean lido = false;

    @Column
    private OffsetDateTime lidoEm;

    public Notification getNotification() {
        return notification;
    }

    public void setNotification(Notification notification) {
        this.notification = notification;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public boolean isLido() {
        return lido;
    }

    public void setLido(boolean lido) {
        this.lido = lido;
    }

    public OffsetDateTime getLidoEm() {
        return lidoEm;
    }

    public void setLidoEm(OffsetDateTime lidoEm) {
        this.lidoEm = lidoEm;
    }
}
