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
@Table(name = "os_custos_hora")
public class OSCustoHora extends BaseEntity {

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "resumo_id", nullable = false, foreignKey = @ForeignKey(name = "fk_os_custo_hora_resumo"))
    private OSCustoResumo resumo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tecnico_id", foreignKey = @ForeignKey(name = "fk_os_custo_hora_tecnico"))
    private User tecnico;

    @Column(precision = 10, scale = 2)
    private BigDecimal horas;

    @Column(precision = 15, scale = 2)
    private BigDecimal valorHora;

    @Column(precision = 15, scale = 2)
    private BigDecimal valorTotal;

    public OSCustoResumo getResumo() {
        return resumo;
    }

    public void setResumo(OSCustoResumo resumo) {
        this.resumo = resumo;
    }

    public User getTecnico() {
        return tecnico;
    }

    public void setTecnico(User tecnico) {
        this.tecnico = tecnico;
    }

    public BigDecimal getHoras() {
        return horas;
    }

    public void setHoras(BigDecimal horas) {
        this.horas = horas;
    }

    public BigDecimal getValorHora() {
        return valorHora;
    }

    public void setValorHora(BigDecimal valorHora) {
        this.valorHora = valorHora;
    }

    public BigDecimal getValorTotal() {
        return valorTotal;
    }

    public void setValorTotal(BigDecimal valorTotal) {
        this.valorTotal = valorTotal;
    }
}
