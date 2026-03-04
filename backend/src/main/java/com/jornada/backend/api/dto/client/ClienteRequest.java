package com.jornada.backend.api.dto.client;

import jakarta.validation.constraints.NotBlank;

public class ClienteRequest {

    @NotBlank
    private String nome;

    @NotBlank
    private String cnpj;

    private String codigo;

    private String nomeFantasia;

    private String telefone;

    private String email;

    private String contatoResponsavel;

    private String endereco;

    private Long categoriaId;

    private Long regiaoAtendimentoId;

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getCnpj() {
        return cnpj;
    }

    public void setCnpj(String cnpj) {
        this.cnpj = cnpj;
    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public String getNomeFantasia() {
        return nomeFantasia;
    }

    public void setNomeFantasia(String nomeFantasia) {
        this.nomeFantasia = nomeFantasia;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getContatoResponsavel() {
        return contatoResponsavel;
    }

    public void setContatoResponsavel(String contatoResponsavel) {
        this.contatoResponsavel = contatoResponsavel;
    }

    public String getEndereco() {
        return endereco;
    }

    public void setEndereco(String endereco) {
        this.endereco = endereco;
    }

    public Long getCategoriaId() {
        return categoriaId;
    }

    public void setCategoriaId(Long categoriaId) {
        this.categoriaId = categoriaId;
    }

    public Long getRegiaoAtendimentoId() {
        return regiaoAtendimentoId;
    }

    public void setRegiaoAtendimentoId(Long regiaoAtendimentoId) {
        this.regiaoAtendimentoId = regiaoAtendimentoId;
    }
}
