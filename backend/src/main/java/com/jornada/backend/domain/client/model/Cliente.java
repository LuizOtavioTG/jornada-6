package com.jornada.backend.domain.client.model;

import com.jornada.backend.domain.common.model.BaseEntity;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "clientes")
public class Cliente extends BaseEntity {

    @Column(nullable = false)
    private String razaoSocial;

    @Column(nullable = false, unique = true, length = 18)
    private String documento;

    @Column(length = 120)
    private String nomeFantasia;

    @Column(length = 20, unique = true)
    private String codigo;

    @Column(length = 120)
    private String telefone;

    @Column(length = 120)
    private String email;

    @Column(length = 120)
    private String contatoResponsavel;

    @Column(length = 255)
    private String endereco;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "categoria_id", foreignKey = @ForeignKey(name = "fk_cliente_categoria"))
    private CategoriaCliente categoria;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "regiao_id", foreignKey = @ForeignKey(name = "fk_cliente_regiao"))
    private RegiaoAtendimento regiaoAtendimento;

    @OneToMany(mappedBy = "cliente", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private Set<ClienteUnidade> unidades = new HashSet<>();

    public String getRazaoSocial() {
        return razaoSocial;
    }

    public void setRazaoSocial(String razaoSocial) {
        this.razaoSocial = razaoSocial;
    }

    public String getDocumento() {
        return documento;
    }

    public void setDocumento(String documento) {
        this.documento = documento;
    }

    public String getNomeFantasia() {
        return nomeFantasia;
    }

    public void setNomeFantasia(String nomeFantasia) {
        this.nomeFantasia = nomeFantasia;
    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
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

    public CategoriaCliente getCategoria() {
        return categoria;
    }

    public void setCategoria(CategoriaCliente categoria) {
        this.categoria = categoria;
    }

    public RegiaoAtendimento getRegiaoAtendimento() {
        return regiaoAtendimento;
    }

    public void setRegiaoAtendimento(RegiaoAtendimento regiaoAtendimento) {
        this.regiaoAtendimento = regiaoAtendimento;
    }

    public Set<ClienteUnidade> getUnidades() {
        return unidades;
    }

    public void setUnidades(Set<ClienteUnidade> unidades) {
        this.unidades = unidades;
    }
}
