package com.jornada.backend.domain.comunicacao.model;

import com.jornada.backend.domain.auth.model.User;
import com.jornada.backend.domain.common.model.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

import java.time.OffsetDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "informativos")
public class Informativo extends BaseEntity {

    @Column(nullable = false)
    private String titulo;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String conteudo;

    @Column
    private OffsetDateTime publicoAte;

    @Column(nullable = false)
    private boolean urgente;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "criado_por", foreignKey = @ForeignKey(name = "fk_informativo_criado_por"))
    private User criadoPor;

    @OneToMany(mappedBy = "informativo")
    private Set<InformativoDestino> destinos = new HashSet<>();

    @OneToMany(mappedBy = "informativo")
    private Set<InformativoLeitura> leituras = new HashSet<>();

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getConteudo() {
        return conteudo;
    }

    public void setConteudo(String conteudo) {
        this.conteudo = conteudo;
    }

    public OffsetDateTime getPublicoAte() {
        return publicoAte;
    }

    public void setPublicoAte(OffsetDateTime publicoAte) {
        this.publicoAte = publicoAte;
    }

    public boolean isUrgente() {
        return urgente;
    }

    public void setUrgente(boolean urgente) {
        this.urgente = urgente;
    }

    public User getCriadoPor() {
        return criadoPor;
    }

    public void setCriadoPor(User criadoPor) {
        this.criadoPor = criadoPor;
    }

    public Set<InformativoDestino> getDestinos() {
        return destinos;
    }

    public void setDestinos(Set<InformativoDestino> destinos) {
        this.destinos = destinos;
    }

    public Set<InformativoLeitura> getLeituras() {
        return leituras;
    }

    public void setLeituras(Set<InformativoLeitura> leituras) {
        this.leituras = leituras;
    }
}
