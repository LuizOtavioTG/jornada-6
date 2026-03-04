package com.jornada.backend.api.dto.client;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public class EquipamentoRequest {

    @NotNull
    private Long unidadeId;

    private Long modeloId;

    private String numeroSerie;

    private LocalDate dataInstalacao;

    private String status;

    private String observacoes;

    @Valid
    private GarantiaRequest garantia;

    public Long getUnidadeId() {
        return unidadeId;
    }

    public void setUnidadeId(Long unidadeId) {
        this.unidadeId = unidadeId;
    }

    public Long getModeloId() {
        return modeloId;
    }

    public void setModeloId(Long modeloId) {
        this.modeloId = modeloId;
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

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getObservacoes() {
        return observacoes;
    }

    public void setObservacoes(String observacoes) {
        this.observacoes = observacoes;
    }

    public GarantiaRequest getGarantia() {
        return garantia;
    }

    public void setGarantia(GarantiaRequest garantia) {
        this.garantia = garantia;
    }
}
