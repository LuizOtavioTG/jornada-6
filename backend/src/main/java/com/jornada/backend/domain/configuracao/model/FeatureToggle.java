package com.jornada.backend.domain.configuracao.model;

import com.jornada.backend.domain.common.model.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "feature_toggles")
public class FeatureToggle extends BaseEntity {

    @Column(nullable = false, unique = true)
    private String chave;

    @Column(length = 255)
    private String descricao;

    @Column(nullable = false)
    private boolean ativo;

    @Column(length = 64)
    private String segmento;

    public String getChave() {
        return chave;
    }

    public void setChave(String chave) {
        this.chave = chave;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public boolean isAtivo() {
        return ativo;
    }

    public void setAtivo(boolean ativo) {
        this.ativo = ativo;
    }

    public String getSegmento() {
        return segmento;
    }

    public void setSegmento(String segmento) {
        this.segmento = segmento;
    }
}
