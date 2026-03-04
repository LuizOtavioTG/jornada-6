package com.jornada.backend.domain.comunicacao.model;

import com.jornada.backend.domain.common.model.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "informativo_destinos")
public class InformativoDestino extends BaseEntity {

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "informativo_id", nullable = false, foreignKey = @ForeignKey(name = "fk_informativo_destino_informativo"))
    private Informativo informativo;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 32)
    private InformativoDestinoTipo tipo;

    @Column(length = 120)
    private String referencia;

    public Informativo getInformativo() {
        return informativo;
    }

    public void setInformativo(Informativo informativo) {
        this.informativo = informativo;
    }

    public InformativoDestinoTipo getTipo() {
        return tipo;
    }

    public void setTipo(InformativoDestinoTipo tipo) {
        this.tipo = tipo;
    }

    public String getReferencia() {
        return referencia;
    }

    public void setReferencia(String referencia) {
        this.referencia = referencia;
    }
}
