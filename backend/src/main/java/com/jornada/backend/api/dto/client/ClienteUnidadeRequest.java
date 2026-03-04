package com.jornada.backend.api.dto.client;

import com.jornada.backend.api.dto.common.EnderecoRequest;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class ClienteUnidadeRequest {

    @NotNull
    private Long clienteId;

    @NotBlank
    private String nome;

    private String codigo;

    private Boolean matriz;

    private Long regiaoAtendimentoId;

    @Valid
    private EnderecoRequest endereco;

    public Long getClienteId() {
        return clienteId;
    }

    public void setClienteId(Long clienteId) {
        this.clienteId = clienteId;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public Boolean getMatriz() {
        return matriz;
    }

    public void setMatriz(Boolean matriz) {
        this.matriz = matriz;
    }

    public Long getRegiaoAtendimentoId() {
        return regiaoAtendimentoId;
    }

    public void setRegiaoAtendimentoId(Long regiaoAtendimentoId) {
        this.regiaoAtendimentoId = regiaoAtendimentoId;
    }

    public EnderecoRequest getEndereco() {
        return endereco;
    }

    public void setEndereco(EnderecoRequest endereco) {
        this.endereco = endereco;
    }
}
