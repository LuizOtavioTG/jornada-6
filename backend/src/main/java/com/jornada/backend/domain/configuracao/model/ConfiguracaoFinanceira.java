package com.jornada.backend.domain.configuracao.model;

import com.jornada.backend.domain.common.model.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

import java.math.BigDecimal;
import java.time.OffsetDateTime;

@Entity
@Table(name = "configuracoes_financeiras")
public class ConfiguracaoFinanceira extends BaseEntity {

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false)
    private OffsetDateTime vigenteDe;

    @Column
    private OffsetDateTime vigenteAte;

    @Column(precision = 15, scale = 2)
    private BigDecimal valorHoraTrabalhada;

    @Column(precision = 15, scale = 2)
    private BigDecimal valorHoraDeslocamento;

    @Column(precision = 15, scale = 2)
    private BigDecimal valorKmRodado;

    @Column(nullable = false)
    private Integer versao;

    @Column(nullable = false)
    private boolean ativo;

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public OffsetDateTime getVigenteDe() {
        return vigenteDe;
    }

    public void setVigenteDe(OffsetDateTime vigenteDe) {
        this.vigenteDe = vigenteDe;
    }

    public OffsetDateTime getVigenteAte() {
        return vigenteAte;
    }

    public void setVigenteAte(OffsetDateTime vigenteAte) {
        this.vigenteAte = vigenteAte;
    }

    public BigDecimal getValorHoraTrabalhada() {
        return valorHoraTrabalhada;
    }

    public void setValorHoraTrabalhada(BigDecimal valorHoraTrabalhada) {
        this.valorHoraTrabalhada = valorHoraTrabalhada;
    }

    public BigDecimal getValorHoraDeslocamento() {
        return valorHoraDeslocamento;
    }

    public void setValorHoraDeslocamento(BigDecimal valorHoraDeslocamento) {
        this.valorHoraDeslocamento = valorHoraDeslocamento;
    }

    public BigDecimal getValorKmRodado() {
        return valorKmRodado;
    }

    public void setValorKmRodado(BigDecimal valorKmRodado) {
        this.valorKmRodado = valorKmRodado;
    }

    public Integer getVersao() {
        return versao;
    }

    public void setVersao(Integer versao) {
        this.versao = versao;
    }

    public boolean isAtivo() {
        return ativo;
    }

    public void setAtivo(boolean ativo) {
        this.ativo = ativo;
    }
}
