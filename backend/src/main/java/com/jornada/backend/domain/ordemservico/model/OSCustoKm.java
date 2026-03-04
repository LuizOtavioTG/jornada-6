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
@Table(name = "os_custos_km")
public class OSCustoKm extends BaseEntity {

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "resumo_id", nullable = false, foreignKey = @ForeignKey(name = "fk_os_custo_km_resumo"))
    private OSCustoResumo resumo;

    @Column(precision = 10, scale = 2)
    private BigDecimal distanciaKm;

    @Column(precision = 15, scale = 2)
    private BigDecimal valorKm;

    @Column(precision = 15, scale = 2)
    private BigDecimal valorTotal;

    public OSCustoResumo getResumo() {
        return resumo;
    }

    public void setResumo(OSCustoResumo resumo) {
        this.resumo = resumo;
    }

    public BigDecimal getDistanciaKm() {
        return distanciaKm;
    }

    public void setDistanciaKm(BigDecimal distanciaKm) {
        this.distanciaKm = distanciaKm;
    }

    public BigDecimal getValorKm() {
        return valorKm;
    }

    public void setValorKm(BigDecimal valorKm) {
        this.valorKm = valorKm;
    }

    public BigDecimal getValorTotal() {
        return valorTotal;
    }

    public void setValorTotal(BigDecimal valorTotal) {
        this.valorTotal = valorTotal;
    }
}
