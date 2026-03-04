package com.jornada.backend.domain.ordemservico.model;

import com.jornada.backend.domain.auth.model.User;
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

import java.time.OffsetDateTime;

@Entity
@Table(name = "os_status_historico")
public class OSStatusHistorico extends BaseEntity {

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "os_id", nullable = false, foreignKey = @ForeignKey(name = "fk_os_historico_os"))
    private OrdemServico ordemServico;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 32)
    private OrdemServicoStatus status;

    @Column(nullable = false)
    private OffsetDateTime registradoEm;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "alterado_por", foreignKey = @ForeignKey(name = "fk_os_historico_usuario"))
    private User alteradoPor;

    @Column(length = 255)
    private String justificativa;

    public OrdemServico getOrdemServico() {
        return ordemServico;
    }

    public void setOrdemServico(OrdemServico ordemServico) {
        this.ordemServico = ordemServico;
    }

    public OrdemServicoStatus getStatus() {
        return status;
    }

    public void setStatus(OrdemServicoStatus status) {
        this.status = status;
    }

    public OffsetDateTime getRegistradoEm() {
        return registradoEm;
    }

    public void setRegistradoEm(OffsetDateTime registradoEm) {
        this.registradoEm = registradoEm;
    }

    public User getAlteradoPor() {
        return alteradoPor;
    }

    public void setAlteradoPor(User alteradoPor) {
        this.alteradoPor = alteradoPor;
    }

    public String getJustificativa() {
        return justificativa;
    }

    public void setJustificativa(String justificativa) {
        this.justificativa = justificativa;
    }
}
