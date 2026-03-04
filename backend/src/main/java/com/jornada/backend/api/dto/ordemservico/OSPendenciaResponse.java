package com.jornada.backend.api.dto.ordemservico;

import java.time.OffsetDateTime;

public class OSPendenciaResponse {

    private Long id;
    private String titulo;
    private String descricao;
    private String status;
    private OffsetDateTime vencimento;
    private OffsetDateTime resolvidoEm;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

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

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public OffsetDateTime getVencimento() {
        return vencimento;
    }

    public void setVencimento(OffsetDateTime vencimento) {
        this.vencimento = vencimento;
    }

    public OffsetDateTime getResolvidoEm() {
        return resolvidoEm;
    }

    public void setResolvidoEm(OffsetDateTime resolvidoEm) {
        this.resolvidoEm = resolvidoEm;
    }
}
