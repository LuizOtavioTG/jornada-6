package com.jornada.backend.api.dto.client;

import com.jornada.backend.api.dto.common.EnderecoResponse;

import java.util.List;

public class ClienteUnidadeResponse {

    private Long id;
    private String nome;
    private String codigo;
    private Boolean matriz;
    private RegiaoAtendimentoResponse regiaoAtendimento;
    private EnderecoResponse endereco;
    private List<ClienteContatoResponse> contatos;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public RegiaoAtendimentoResponse getRegiaoAtendimento() {
        return regiaoAtendimento;
    }

    public void setRegiaoAtendimento(RegiaoAtendimentoResponse regiaoAtendimento) {
        this.regiaoAtendimento = regiaoAtendimento;
    }

    public EnderecoResponse getEndereco() {
        return endereco;
    }

    public void setEndereco(EnderecoResponse endereco) {
        this.endereco = endereco;
    }

    public List<ClienteContatoResponse> getContatos() {
        return contatos;
    }

    public void setContatos(List<ClienteContatoResponse> contatos) {
        this.contatos = contatos;
    }
}
