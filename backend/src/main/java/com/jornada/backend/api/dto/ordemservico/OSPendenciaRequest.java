package com.jornada.backend.api.dto.ordemservico;

import jakarta.validation.constraints.NotBlank;

import java.time.OffsetDateTime;

public class OSPendenciaRequest {

    @NotBlank
    private String titulo;

    private String descricao;

    private OffsetDateTime vencimento;

    private String status;

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public OffsetDateTime getVencimento() {
        return vencimento;
    }

    public void setVencimento(OffsetDateTime vencimento) {
        this.vencimento = vencimento;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
