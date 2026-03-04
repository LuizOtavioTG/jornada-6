package com.jornada.backend.api.dto.ordemservico;

import jakarta.validation.constraints.NotNull;

import java.time.OffsetDateTime;

public class OSAgendamentoRequest {

    @NotNull
    private OffsetDateTime inicioPrevisto;

    @NotNull
    private OffsetDateTime fimPrevisto;

    private Long tecnicoId;
    private String status;

    private OffsetDateTime inicioReal;
    private OffsetDateTime fimReal;

    public OffsetDateTime getInicioPrevisto() {
        return inicioPrevisto;
    }

    public void setInicioPrevisto(OffsetDateTime inicioPrevisto) {
        this.inicioPrevisto = inicioPrevisto;
    }

    public OffsetDateTime getFimPrevisto() {
        return fimPrevisto;
    }

    public void setFimPrevisto(OffsetDateTime fimPrevisto) {
        this.fimPrevisto = fimPrevisto;
    }

    public Long getTecnicoId() {
        return tecnicoId;
    }

    public void setTecnicoId(Long tecnicoId) {
        this.tecnicoId = tecnicoId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public OffsetDateTime getInicioReal() {
        return inicioReal;
    }

    public void setInicioReal(OffsetDateTime inicioReal) {
        this.inicioReal = inicioReal;
    }

    public OffsetDateTime getFimReal() {
        return fimReal;
    }

    public void setFimReal(OffsetDateTime fimReal) {
        this.fimReal = fimReal;
    }
}
