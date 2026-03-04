package com.jornada.backend.api.dto.client;

import java.util.List;

public class ClienteResponse {

    private Long id;
    private String nome;
    private String cnpj;
    private String codigo;
    private String nomeFantasia;
    private String telefone;
    private String email;
    private String contatoResponsavel;
    private String endereco;
    private CategoriaClienteResponse categoria;
    private RegiaoAtendimentoResponse regiaoAtendimento;
    private List<ClienteUnidadeResponse> unidades;

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

    public CategoriaClienteResponse getCategoria() {
        return categoria;
    }

    public void setCategoria(CategoriaClienteResponse categoria) {
        this.categoria = categoria;
    }

    public RegiaoAtendimentoResponse getRegiaoAtendimento() {
        return regiaoAtendimento;
    }

    public void setRegiaoAtendimento(RegiaoAtendimentoResponse regiaoAtendimento) {
        this.regiaoAtendimento = regiaoAtendimento;
    }

    public List<ClienteUnidadeResponse> getUnidades() {
        return unidades;
    }

    public void setUnidades(List<ClienteUnidadeResponse> unidades) {
        this.unidades = unidades;
    }
}
