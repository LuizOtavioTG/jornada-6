package com.jornada.backend.domain.client.model;

import com.jornada.backend.domain.common.model.BaseEntity;
import com.jornada.backend.domain.common.model.Endereco;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "cliente_unidades")
public class ClienteUnidade extends BaseEntity {

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "cliente_id", nullable = false, foreignKey = @ForeignKey(name = "fk_unidade_cliente"))
    private Cliente cliente;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @JoinColumn(name = "endereco_id", foreignKey = @ForeignKey(name = "fk_unidade_endereco"))
    private Endereco endereco;

    @Column(nullable = false)
    private String nome;

    @Column(length = 32)
    private String codigo;

    @Column
    private Boolean matriz;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "regiao_id", foreignKey = @ForeignKey(name = "fk_unidade_regiao"))
    private RegiaoAtendimento regiaoAtendimento;

    @OneToMany(mappedBy = "unidade", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private Set<ClienteContato> contatos = new HashSet<>();

    public Cliente getCliente() {
        return cliente;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

    public Endereco getEndereco() {
        return endereco;
    }

    public void setEndereco(Endereco endereco) {
        this.endereco = endereco;
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

    public RegiaoAtendimento getRegiaoAtendimento() {
        return regiaoAtendimento;
    }

    public void setRegiaoAtendimento(RegiaoAtendimento regiaoAtendimento) {
        this.regiaoAtendimento = regiaoAtendimento;
    }

    public Set<ClienteContato> getContatos() {
        return contatos;
    }

    public void setContatos(Set<ClienteContato> contatos) {
        this.contatos = contatos;
    }
}
