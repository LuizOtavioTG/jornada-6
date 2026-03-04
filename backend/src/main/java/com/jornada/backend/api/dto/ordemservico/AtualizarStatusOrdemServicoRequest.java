package com.jornada.backend.api.dto.ordemservico;

import jakarta.validation.constraints.NotBlank;

public class AtualizarStatusOrdemServicoRequest {

    @NotBlank
    private String status;

    private String justificativa;

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getJustificativa() {
        return justificativa;
    }

    public void setJustificativa(String justificativa) {
        this.justificativa = justificativa;
    }
}
