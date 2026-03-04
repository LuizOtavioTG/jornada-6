package com.jornada.backend.domain.comunicacao.model;

import com.jornada.backend.domain.auth.model.User;
import com.jornada.backend.domain.common.model.BaseEntity;
import com.jornada.backend.domain.ordemservico.model.OrdemServico;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

import java.time.OffsetDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "notifications")
public class Notification extends BaseEntity {

    @Column(nullable = false)
    private String titulo;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String mensagem;

    @Column(length = 120)
    private String acao;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ordem_servico_id", foreignKey = @ForeignKey(name = "fk_notification_os"))
    private OrdemServico ordemServico;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "emitido_por", foreignKey = @ForeignKey(name = "fk_notification_user"))
    private User emitidoPor;

    @Column
    private OffsetDateTime expiraEm;

    @Column
    private boolean urgente;

    @OneToMany(mappedBy = "notification")
    private Set<NotificationRecipient> destinatarios = new HashSet<>();

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getMensagem() {
        return mensagem;
    }

    public void setMensagem(String mensagem) {
        this.mensagem = mensagem;
    }

    public String getAcao() {
        return acao;
    }

    public void setAcao(String acao) {
        this.acao = acao;
    }

    public OrdemServico getOrdemServico() {
        return ordemServico;
    }

    public void setOrdemServico(OrdemServico ordemServico) {
        this.ordemServico = ordemServico;
    }

    public User getEmitidoPor() {
        return emitidoPor;
    }

    public void setEmitidoPor(User emitidoPor) {
        this.emitidoPor = emitidoPor;
    }

    public OffsetDateTime getExpiraEm() {
        return expiraEm;
    }

    public void setExpiraEm(OffsetDateTime expiraEm) {
        this.expiraEm = expiraEm;
    }

    public boolean isUrgente() {
        return urgente;
    }

    public void setUrgente(boolean urgente) {
        this.urgente = urgente;
    }

    public Set<NotificationRecipient> getDestinatarios() {
        return destinatarios;
    }

    public void setDestinatarios(Set<NotificationRecipient> destinatarios) {
        this.destinatarios = destinatarios;
    }
}
