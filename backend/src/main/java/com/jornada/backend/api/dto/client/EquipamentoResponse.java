package com.jornada.backend.api.dto.client;

import java.time.LocalDate;

public class EquipamentoResponse {

    private Long id;
    private String numeroSerie;
    private LocalDate dataInstalacao;
    private String status;
    private String observacoes;
    private ModeloEquipamentoResponse modelo;
    private GarantiaResponse garantia;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public ModeloEquipamentoResponse getModelo() {
        return modelo;
    }

    public void setModelo(ModeloEquipamentoResponse modelo) {
        this.modelo = modelo;
    }

    public GarantiaResponse getGarantia() {
        return garantia;
    }

    public void setGarantia(GarantiaResponse garantia) {
        this.garantia = garantia;
    }
}
