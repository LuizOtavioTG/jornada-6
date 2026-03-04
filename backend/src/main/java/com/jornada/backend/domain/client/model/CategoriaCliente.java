package com.jornada.backend.domain.client.model;

import com.jornada.backend.domain.common.model.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "categorias_cliente")
public class CategoriaCliente extends BaseEntity {

    @Column(nullable = false, unique = true)
    private String nome;

    @Column(length = 255)
    private String descricao;

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
