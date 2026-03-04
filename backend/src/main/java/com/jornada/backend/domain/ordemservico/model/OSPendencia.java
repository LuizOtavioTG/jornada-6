package com.jornada.backend.domain.ordemservico.model;

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
@Table(name = "os_pendencias")
public class OSPendencia extends BaseEntity {

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "os_id", nullable = false, foreignKey = @ForeignKey(name = "fk_os_pendencia_os"))
    private OrdemServico ordemServico;

    @Column(nullable = false)
    private String titulo;

    @Column(columnDefinition = "TEXT")
    private String descricao;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 32)
    private OSPendenciaStatus status = OSPendenciaStatus.ABERTA;

    @Column
    private OffsetDateTime vencimento;

    @Column
    private OffsetDateTime resolvidoEm;

    public OrdemServico getOrdemServico() {
        return ordemServico;
    }

    public void setOrdemServico(OrdemServico ordemServico) {
        this.ordemServico = ordemServico;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public OSPendenciaStatus getStatus() {
        return status;
    }

    public void setStatus(OSPendenciaStatus status) {
        this.status = status;
    }

    public OffsetDateTime getVencimento() {
        return vencimento;
    }

    public void setVencimento(OffsetDateTime vencimento) {
        this.vencimento = vencimento;
    }

    public OffsetDateTime getResolvidoEm() {
        return resolvidoEm;
    }

    public void setResolvidoEm(OffsetDateTime resolvidoEm) {
        this.resolvidoEm = resolvidoEm;
    }
}
