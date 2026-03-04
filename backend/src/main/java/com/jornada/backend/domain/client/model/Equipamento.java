package com.jornada.backend.domain.client.model;

import com.jornada.backend.domain.common.model.BaseEntity;
import jakarta.persistence.CascadeType;
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

import java.time.LocalDate;

@Entity
@Table(name = "equipamentos")
public class Equipamento extends BaseEntity {

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "unidade_id", nullable = false, foreignKey = @ForeignKey(name = "fk_equipamento_unidade"))
    private ClienteUnidade unidade;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "modelo_id", foreignKey = @ForeignKey(name = "fk_equipamento_modelo"))
    private ModeloEquipamento modelo;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @JoinColumn(name = "garantia_id", foreignKey = @ForeignKey(name = "fk_equipamento_garantia"))
    private Garantia garantia;

    @Column(length = 64)
    private String numeroSerie;

    @Column
    private LocalDate dataInstalacao;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 32)
    private EquipamentoStatus status = EquipamentoStatus.ATIVO;

    @Column(length = 255)
    private String observacoes;

    public ClienteUnidade getUnidade() {
        return unidade;
    }

    public void setUnidade(ClienteUnidade unidade) {
        this.unidade = unidade;
    }

    public ModeloEquipamento getModelo() {
        return modelo;
    }

    public void setModelo(ModeloEquipamento modelo) {
        this.modelo = modelo;
    }

    public Garantia getGarantia() {
        return garantia;
    }

    public void setGarantia(Garantia garantia) {
        this.garantia = garantia;
    }

    public String getNumeroSerie() {
        return numeroSerie;
    }

    public void setNumeroSerie(String numeroSerie) {
        this.numeroSerie = numeroSerie;
    }

    public LocalDate getDataInstalacao() {
        return dataInstalacao;
    }

    public void setDataInstalacao(LocalDate dataInstalacao) {
        this.dataInstalacao = dataInstalacao;
    }

    public EquipamentoStatus getStatus() {
        return status;
    }

    public void setStatus(EquipamentoStatus status) {
        this.status = status;
    }

    public String getObservacoes() {
        return observacoes;
    }

    public void setObservacoes(String observacoes) {
        this.observacoes = observacoes;
    }
}
