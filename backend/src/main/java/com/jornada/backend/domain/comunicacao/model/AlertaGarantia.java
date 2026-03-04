package com.jornada.backend.domain.comunicacao.model;

import com.jornada.backend.domain.client.model.Equipamento;
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
@Table(name = "alertas_garantia")
public class AlertaGarantia extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "os_id", foreignKey = @ForeignKey(name = "fk_alerta_garantia_os"))
    private OrdemServico ordemServico;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "equipamento_id", foreignKey = @ForeignKey(name = "fk_alerta_garantia_equipamento"))
    private Equipamento equipamento;

    @Column(nullable = false)
    private OffsetDateTime geradoEm;

    @Column(nullable = false)
    private boolean tratado;

    @Column(length = 255)
    private String observacoes;

    public OrdemServico getOrdemServico() {
        return ordemServico;
    }

    public void setOrdemServico(OrdemServico ordemServico) {
        this.ordemServico = ordemServico;
    }

    public Equipamento getEquipamento() {
        return equipamento;
    }

    public void setEquipamento(Equipamento equipamento) {
        this.equipamento = equipamento;
    }

    public OffsetDateTime getGeradoEm() {
        return geradoEm;
    }

    public void setGeradoEm(OffsetDateTime geradoEm) {
        this.geradoEm = geradoEm;
    }

    public boolean isTratado() {
        return tratado;
    }

    public void setTratado(boolean tratado) {
        this.tratado = tratado;
    }

    public String getObservacoes() {
        return observacoes;
    }

    public void setObservacoes(String observacoes) {
        this.observacoes = observacoes;
    }
}
