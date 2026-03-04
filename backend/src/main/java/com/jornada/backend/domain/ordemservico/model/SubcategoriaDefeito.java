package com.jornada.backend.domain.ordemservico.model;

import com.jornada.backend.domain.common.model.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "subcategorias_defeito")
public class SubcategoriaDefeito extends BaseEntity {

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "categoria_id", nullable = false, foreignKey = @ForeignKey(name = "fk_subcategoria_categoria"))
    private CategoriaDefeito categoria;

    @Column(nullable = false)
    private String nome;

    @Column(length = 255)
    private String descricao;

    public CategoriaDefeito getCategoria() {
        return categoria;
    }

    public void setCategoria(CategoriaDefeito categoria) {
        this.categoria = categoria;
    }

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
}
