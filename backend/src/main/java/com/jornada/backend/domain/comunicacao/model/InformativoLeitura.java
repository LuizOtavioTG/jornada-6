package com.jornada.backend.domain.comunicacao.model;

import com.jornada.backend.domain.auth.model.User;
import com.jornada.backend.domain.common.model.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import java.time.OffsetDateTime;

@Entity
@Table(name = "informativo_leituras")
public class InformativoLeitura extends BaseEntity {

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "informativo_id", nullable = false, foreignKey = @ForeignKey(name = "fk_informativo_leitura_informativo"))
    private Informativo informativo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", foreignKey = @ForeignKey(name = "fk_informativo_leitura_user"))
    private User user;

    @Column
    private OffsetDateTime lidoEm;

    public Informativo getInformativo() {
        return informativo;
    }

    public void setInformativo(Informativo informativo) {
        this.informativo = informativo;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public OffsetDateTime getLidoEm() {
        return lidoEm;
    }

    public void setLidoEm(OffsetDateTime lidoEm) {
        this.lidoEm = lidoEm;
    }
}
