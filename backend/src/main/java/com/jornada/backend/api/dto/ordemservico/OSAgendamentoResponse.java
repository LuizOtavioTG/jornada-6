package com.jornada.backend.api.dto.ordemservico;

import java.time.OffsetDateTime;

public class OSAgendamentoResponse {

    private Long id;
    private Long tecnicoId;
    private String tecnicoNome;
    private OffsetDateTime inicioPrevisto;
    private OffsetDateTime fimPrevisto;
    private OffsetDateTime inicioReal;
    private OffsetDateTime fimReal;
    private String status;

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

    public String getTecnicoNome() {
        return tecnicoNome;
    }

    public void setTecnicoNome(String tecnicoNome) {
        this.tecnicoNome = tecnicoNome;
    }

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

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
