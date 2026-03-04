package com.jornada.backend.domain.configuracao.model;

import com.jornada.backend.domain.common.model.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

import java.time.OffsetDateTime;

@Entity
@Table(name = "integracoes_externas")
public class IntegracaoExterna extends BaseEntity {

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false, length = 64)
    private String tipo;

    @Column(columnDefinition = "TEXT")
    private String configuracao;

    @Column(nullable = false)
    private boolean ativo;

    @Column
    private OffsetDateTime ultimaExecucao;

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public String getConfiguracao() {
        return configuracao;
    }

    public void setConfiguracao(String configuracao) {
        this.configuracao = configuracao;
    }

    public boolean isAtivo() {
        return ativo;
    }

    public void setAtivo(boolean ativo) {
        this.ativo = ativo;
    }

    public OffsetDateTime getUltimaExecucao() {
        return ultimaExecucao;
    }

    public void setUltimaExecucao(OffsetDateTime ultimaExecucao) {
        this.ultimaExecucao = ultimaExecucao;
    }
}
