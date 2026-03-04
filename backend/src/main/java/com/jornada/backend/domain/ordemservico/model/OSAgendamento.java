package com.jornada.backend.domain.ordemservico.model;

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
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

import java.time.OffsetDateTime;

@Entity
@Table(name = "os_agendamentos")
public class OSAgendamento extends BaseEntity {

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "os_id", nullable = false, foreignKey = @ForeignKey(name = "fk_os_agendamento_os"))
    private OrdemServico ordemServico;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tecnico_id", foreignKey = @ForeignKey(name = "fk_os_agendamento_tecnico"))
    private User tecnico;

    @Column(nullable = false)
    private OffsetDateTime inicioPrevisto;

    @Column(nullable = false)
    private OffsetDateTime fimPrevisto;

    @Column
    private OffsetDateTime inicioReal;

    @Column
    private OffsetDateTime fimReal;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 32)
    private AgendamentoStatus status = AgendamentoStatus.SOLICITADO;

    @OneToOne(mappedBy = "agendamento", fetch = FetchType.LAZY)
    private EventoAgenda eventoAgenda;

    public OrdemServico getOrdemServico() {
        return ordemServico;
    }

    public void setOrdemServico(OrdemServico ordemServico) {
        this.ordemServico = ordemServico;
    }

    public User getTecnico() {
        return tecnico;
    }

    public void setTecnico(User tecnico) {
        this.tecnico = tecnico;
    }

    public OffsetDateTime getInicioPrevisto() {
        return inicioPrevisto;
    }

    public void setInicioPrevisto(OffsetDateTime inicioPrevisto) {
        this.inicioPrevisto = inicioPrevisto;
    }

    public OffsetDateTime getFimPrevisto() {
        return fimPrevisto;
    }

    public void setFimPrevisto(OffsetDateTime fimPrevisto) {
        this.fimPrevisto = fimPrevisto;
    }

    public OffsetDateTime getInicioReal() {
        return inicioReal;
    }

    public void setInicioReal(OffsetDateTime inicioReal) {
        this.inicioReal = inicioReal;
    }

    public OffsetDateTime getFimReal() {
        return fimReal;
    }

    public void setFimReal(OffsetDateTime fimReal) {
        this.fimReal = fimReal;
    }

    public AgendamentoStatus getStatus() {
        return status;
    }

    public void setStatus(AgendamentoStatus status) {
        this.status = status;
    }

    public EventoAgenda getEventoAgenda() {
        return eventoAgenda;
    }

    public void setEventoAgenda(EventoAgenda eventoAgenda) {
        this.eventoAgenda = eventoAgenda;
    }
}
