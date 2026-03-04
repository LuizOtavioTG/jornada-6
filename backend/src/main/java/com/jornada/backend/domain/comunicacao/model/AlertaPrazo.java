package com.jornada.backend.domain.comunicacao.model;

import com.jornada.backend.domain.common.model.BaseEntity;
import com.jornada.backend.domain.ordemservico.model.OrdemServico;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import java.time.OffsetDateTime;

@Entity
@Table(name = "alertas_prazo")
public class AlertaPrazo extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "os_id", foreignKey = @ForeignKey(name = "fk_alerta_prazo_os"))
    private OrdemServico ordemServico;

    @Column(nullable = false)
    private OffsetDateTime prazoLimite;

    @Column(nullable = false)
    private boolean violado;

    @Column
    private OffsetDateTime resolvidoEm;

    @Column(length = 255)
    private String observacoes;

    public OrdemServico getOrdemServico() {
        return ordemServico;
    }

    public void setOrdemServico(OrdemServico ordemServico) {
        this.ordemServico = ordemServico;
    }

    public OffsetDateTime getPrazoLimite() {
        return prazoLimite;
    }

    public void setPrazoLimite(OffsetDateTime prazoLimite) {
        this.prazoLimite = prazoLimite;
    }

    public boolean isViolado() {
        return violado;
    }

    public void setViolado(boolean violado) {
        this.violado = violado;
    }

    public OffsetDateTime getResolvidoEm() {
        return resolvidoEm;
    }

    public void setResolvidoEm(OffsetDateTime resolvidoEm) {
        this.resolvidoEm = resolvidoEm;
    }

    public String getObservacoes() {
        return observacoes;
    }

    public void setObservacoes(String observacoes) {
        this.observacoes = observacoes;
    }
}
