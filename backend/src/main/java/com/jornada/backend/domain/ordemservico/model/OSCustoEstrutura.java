package com.jornada.backend.domain.ordemservico.model;

import com.jornada.backend.domain.auth.model.User;
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
@Table(name = "os_custos_estrutura")
public class OSCustoEstrutura extends BaseEntity {

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "resumo_id", nullable = false, foreignKey = @ForeignKey(name = "fk_os_custo_estrutura_resumo"))
    private OSCustoResumo resumo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "registrado_por", foreignKey = @ForeignKey(name = "fk_os_custo_estrutura_usuario"))
    private User registradoPor;

    @Column(nullable = false)
    private String descricao;

    @Column(precision = 10, scale = 2)
    private BigDecimal quantidade;

    @Column(precision = 15, scale = 2)
    private BigDecimal valorUnitario;

    @Column(precision = 15, scale = 2)
    private BigDecimal valorTotal;

    public OSCustoResumo getResumo() {
        return resumo;
    }

    public void setResumo(OSCustoResumo resumo) {
        this.resumo = resumo;
    }

    public User getRegistradoPor() {
        return registradoPor;
    }

    public void setRegistradoPor(User registradoPor) {
        this.registradoPor = registradoPor;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public BigDecimal getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(BigDecimal quantidade) {
        this.quantidade = quantidade;
    }

    public BigDecimal getValorUnitario() {
        return valorUnitario;
    }

    public void setValorUnitario(BigDecimal valorUnitario) {
        this.valorUnitario = valorUnitario;
    }

    public BigDecimal getValorTotal() {
        return valorTotal;
    }

    public void setValorTotal(BigDecimal valorTotal) {
        this.valorTotal = valorTotal;
    }
}
