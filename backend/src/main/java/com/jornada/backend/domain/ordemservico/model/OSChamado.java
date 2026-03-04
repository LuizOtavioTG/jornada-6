package com.jornada.backend.domain.ordemservico.model;

import com.jornada.backend.domain.client.model.Equipamento;
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

@Entity
@Table(name = "os_chamados")
public class OSChamado extends BaseEntity {

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "os_id", nullable = false, foreignKey = @ForeignKey(name = "fk_os_chamado_os"))
    private OrdemServico ordemServico;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "equipamento_id", foreignKey = @ForeignKey(name = "fk_os_chamado_equipamento"))
    private Equipamento equipamento;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String descricaoOriginal;

    @Column(columnDefinition = "TEXT")
    private String observacoesTecnico;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 32)
    private OSChamadoStatus status = OSChamadoStatus.ABERTO;

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

    public String getDescricaoOriginal() {
        return descricaoOriginal;
    }

    public void setDescricaoOriginal(String descricaoOriginal) {
        this.descricaoOriginal = descricaoOriginal;
    }

    public String getObservacoesTecnico() {
        return observacoesTecnico;
    }

    public void setObservacoesTecnico(String observacoesTecnico) {
        this.observacoesTecnico = observacoesTecnico;
    }

    public OSChamadoStatus getStatus() {
        return status;
    }

    public void setStatus(OSChamadoStatus status) {
        this.status = status;
    }
}
