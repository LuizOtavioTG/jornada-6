package com.jornada.backend.api.dto.ordemservico;

import jakarta.validation.constraints.NotBlank;

public class OSChecklistRequest {

    @NotBlank
    private String titulo;

    private String observacoes;

    private Boolean aprovado;

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getObservacoes() {
        return observacoes;
    }

    public void setObservacoes(String observacoes) {
        this.observacoes = observacoes;
    }

    public Boolean getAprovado() {
        return aprovado;
    }

    public void setAprovado(Boolean aprovado) {
        this.aprovado = aprovado;
    }
}
