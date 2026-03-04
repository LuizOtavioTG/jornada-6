package com.jornada.backend.api.dto.client;

import java.time.LocalDate;

public class GarantiaResponse {

    private Long id;
    private LocalDate dataInicio;
    private LocalDate dataFim;
    private Boolean prorrogada;
    private String observacoes;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDataInicio() {
        return dataInicio;
    }

    public void setDataInicio(LocalDate dataInicio) {
        this.dataInicio = dataInicio;
    }

    public LocalDate getDataFim() {
        return dataFim;
    }

    public void setDataFim(LocalDate dataFim) {
        this.dataFim = dataFim;
    }

    public Boolean getProrrogada() {
        return prorrogada;
    }

    public void setProrrogada(Boolean prorrogada) {
        this.prorrogada = prorrogada;
    }

    public String getObservacoes() {
        return observacoes;
    }

    public void setObservacoes(String observacoes) {
        this.observacoes = observacoes;
    }
}
