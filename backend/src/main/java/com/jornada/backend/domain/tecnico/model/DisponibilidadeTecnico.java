package com.jornada.backend.domain.tecnico.model;

import com.jornada.backend.domain.auth.model.User;
import com.jornada.backend.domain.common.model.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import java.time.OffsetDateTime;

@Entity
@Table(name = "disponibilidades_tecnico")
public class DisponibilidadeTecnico extends BaseEntity {

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "tecnico_id", nullable = false, foreignKey = @ForeignKey(name = "fk_disponibilidade_user"))
    private User tecnico;

    @Column(nullable = false)
    private OffsetDateTime inicio;

    @Column(nullable = false)
    private OffsetDateTime fim;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 32)
    private DisponibilidadeStatus status;

    @Column(length = 255)
    private String motivo;

    public User getTecnico() {
        return tecnico;
    }

    public void setTecnico(User tecnico) {
        this.tecnico = tecnico;
    }

    public OffsetDateTime getInicio() {
        return inicio;
    }

    public void setInicio(OffsetDateTime inicio) {
        this.inicio = inicio;
    }

    public OffsetDateTime getFim() {
        return fim;
    }

    public void setFim(OffsetDateTime fim) {
        this.fim = fim;
    }

    public DisponibilidadeStatus getStatus() {
        return status;
    }

    public void setStatus(DisponibilidadeStatus status) {
        this.status = status;
    }

    public String getMotivo() {
        return motivo;
    }

    public void setMotivo(String motivo) {
        this.motivo = motivo;
    }
}
