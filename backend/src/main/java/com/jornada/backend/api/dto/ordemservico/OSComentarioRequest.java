package com.jornada.backend.api.dto.ordemservico;

import jakarta.validation.constraints.NotBlank;

public class OSComentarioRequest {

    @NotBlank
    private String conteudo;

    private boolean interno = true;

    public String getConteudo() {
        return conteudo;
    }

    public void setConteudo(String conteudo) {
        this.conteudo = conteudo;
    }

    public boolean isInterno() {
        return interno;
    }

    public void setInterno(boolean interno) {
        this.interno = interno;
    }
}
