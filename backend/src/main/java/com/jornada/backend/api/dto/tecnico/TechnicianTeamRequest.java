package com.jornada.backend.api.dto.tecnico;

import jakarta.validation.constraints.NotBlank;

import java.util.Set;

public class TechnicianTeamRequest {

    @NotBlank
    private String nome;

    private String descricao;

    private Set<Long> membrosIds;

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Set<Long> getMembrosIds() {
        return membrosIds;
    }

    public void setMembrosIds(Set<Long> membrosIds) {
        this.membrosIds = membrosIds;
    }
}
