package com.jornada.backend.domain.client.model;

import com.jornada.backend.domain.common.model.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "modelos_equipamento")
public class ModeloEquipamento extends BaseEntity {

    @Column(nullable = false)
    private String nome;

    @Column(length = 120)
    private String fabricante;

    @Column(length = 255)
    private String descricao;

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getFabricante() {
        return fabricante;
    }

    public void setFabricante(String fabricante) {
        this.fabricante = fabricante;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }
}
