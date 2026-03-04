package com.jornada.backend.domain.ordemservico.model;

import com.jornada.backend.domain.common.model.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import java.math.BigDecimal;

@Entity
@Table(name = "os_custos_deslocamento")
public class OSCustoDeslocamento extends BaseEntity {

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "resumo_id", nullable = false, foreignKey = @ForeignKey(name = "fk_os_custo_deslocamento_resumo"))
    private OSCustoResumo resumo;

    @Column(precision = 10, scale = 2)
    private BigDecimal tempoDeslocamentoHoras;

    @Column(precision = 15, scale = 2)
    private BigDecimal valorHoraDeslocamento;

    @Column(precision = 15, scale = 2)
    private BigDecimal valorTotal;

    @Column(length = 255)
    private String observacoes;

    public OSCustoResumo getResumo() {
        return resumo;
    }

    public void setResumo(OSCustoResumo resumo) {
        this.resumo = resumo;
    }

    public BigDecimal getTempoDeslocamentoHoras() {
        return tempoDeslocamentoHoras;
    }

    public void setTempoDeslocamentoHoras(BigDecimal tempoDeslocamentoHoras) {
        this.tempoDeslocamentoHoras = tempoDeslocamentoHoras;
    }

    public BigDecimal getValorHoraDeslocamento() {
        return valorHoraDeslocamento;
    }

    public void setValorHoraDeslocamento(BigDecimal valorHoraDeslocamento) {
        this.valorHoraDeslocamento = valorHoraDeslocamento;
    }

    public BigDecimal getValorTotal() {
        return valorTotal;
    }

    public void setValorTotal(BigDecimal valorTotal) {
        this.valorTotal = valorTotal;
    }

    public String getObservacoes() {
        return observacoes;
    }

    public void setObservacoes(String observacoes) {
        this.observacoes = observacoes;
    }
}
