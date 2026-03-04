package com.jornada.backend.domain.client.model;

import com.jornada.backend.domain.common.model.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "cliente_contatos")
public class ClienteContato extends BaseEntity {

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "unidade_id", nullable = false, foreignKey = @ForeignKey(name = "fk_contato_unidade"))
    private ClienteUnidade unidade;

    @Column(nullable = false)
    private String nome;

    @Column(length = 120)
    private String cargo;

    @Column(length = 120)
    private String email;

    @Column(length = 20)
    private String telefone;

    public ClienteUnidade getUnidade() {
        return unidade;
    }

    public void setUnidade(ClienteUnidade unidade) {
        this.unidade = unidade;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getCargo() {
        return cargo;
    }

    public void setCargo(String cargo) {
        this.cargo = cargo;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }
}
