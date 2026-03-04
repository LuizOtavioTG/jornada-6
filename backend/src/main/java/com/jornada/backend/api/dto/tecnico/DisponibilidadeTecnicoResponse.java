package com.jornada.backend.api.dto.tecnico;

import java.time.OffsetDateTime;

public class DisponibilidadeTecnicoResponse {

    private Long id;
    private Long tecnicoId;
    private OffsetDateTime inicio;
    private OffsetDateTime fim;
    private String status;
    private String motivo;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getTecnicoId() {
        return tecnicoId;
    }

    public void setTecnicoId(Long tecnicoId) {
        this.tecnicoId = tecnicoId;
    }

    public OffsetDateTime getInicio() {
        return inicio;
    }

    public void setInicio(OffsetDateTime inicio) {
        this.inicio = inicio;
    }

    public OffsetDateTime getFim() {
        return fim;
    }

    public void setFim(OffsetDateTime fim) {
        this.fim = fim;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getMotivo() {
        return motivo;
    }

    public void setMotivo(String motivo) {
        this.motivo = motivo;
    }
}
