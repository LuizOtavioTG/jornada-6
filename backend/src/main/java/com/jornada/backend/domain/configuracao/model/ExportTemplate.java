package com.jornada.backend.domain.configuracao.model;

import com.jornada.backend.domain.common.model.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;

@Entity
@Table(name = "export_templates")
public class ExportTemplate extends BaseEntity {

    @Column(nullable = false)
    private String nome;

    @Column(length = 255)
    private String descricao;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 16)
    private ExportFormato formato;

    @Column(columnDefinition = "TEXT")
    private String configuracao;

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

    public ExportFormato getFormato() {
        return formato;
    }

    public void setFormato(ExportFormato formato) {
        this.formato = formato;
    }

    public String getConfiguracao() {
        return configuracao;
    }

    public void setConfiguracao(String configuracao) {
        this.configuracao = configuracao;
    }
}
