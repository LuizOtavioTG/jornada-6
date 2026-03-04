package com.jornada.backend.domain.ordemservico.model;

import com.jornada.backend.domain.auth.model.User;
import com.jornada.backend.domain.common.model.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

import java.time.OffsetDateTime;

@Entity
@Table(name = "eventos_agenda")
public class EventoAgenda extends BaseEntity {

    @OneToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "agendamento_id", nullable = false, foreignKey = @ForeignKey(name = "fk_evento_agendamento"))
    private OSAgendamento agendamento;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id", foreignKey = @ForeignKey(name = "fk_evento_usuario"))
    private User usuario;

    @Column(nullable = false)
    private OffsetDateTime inicio;

    @Column(nullable = false)
    private OffsetDateTime fim;

    @Column(nullable = false)
    private String titulo;

    @Column(length = 64)
    private String tipo;

    @Column(length = 120)
    private String localizacao;

    public OSAgendamento getAgendamento() {
        return agendamento;
    }

    public void setAgendamento(OSAgendamento agendamento) {
        this.agendamento = agendamento;
    }

    public User getUsuario() {
        return usuario;
    }

    public void setUsuario(User usuario) {
        this.usuario = usuario;
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

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public String getLocalizacao() {
        return localizacao;
    }

    public void setLocalizacao(String localizacao) {
        this.localizacao = localizacao;
    }
}
