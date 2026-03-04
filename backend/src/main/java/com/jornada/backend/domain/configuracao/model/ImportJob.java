package com.jornada.backend.domain.configuracao.model;

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
@Table(name = "import_jobs")
public class ImportJob extends BaseEntity {

    @Column(nullable = false)
    private String recurso;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 32)
    private JobStatus status = JobStatus.PENDENTE;

    @Column
    private OffsetDateTime iniciadoEm;

    @Column
    private OffsetDateTime finalizadoEm;

    @Column(columnDefinition = "TEXT")
    private String detalhes;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "disparado_por", foreignKey = @ForeignKey(name = "fk_import_job_usuario"))
    private User disparadoPor;

    public String getRecurso() {
        return recurso;
    }

    public void setRecurso(String recurso) {
        this.recurso = recurso;
    }

    public JobStatus getStatus() {
        return status;
    }

    public void setStatus(JobStatus status) {
        this.status = status;
    }

    public OffsetDateTime getIniciadoEm() {
        return iniciadoEm;
    }

    public void setIniciadoEm(OffsetDateTime iniciadoEm) {
        this.iniciadoEm = iniciadoEm;
    }

    public OffsetDateTime getFinalizadoEm() {
        return finalizadoEm;
    }

    public void setFinalizadoEm(OffsetDateTime finalizadoEm) {
        this.finalizadoEm = finalizadoEm;
    }

    public String getDetalhes() {
        return detalhes;
    }

    public void setDetalhes(String detalhes) {
        this.detalhes = detalhes;
    }

    public User getDisparadoPor() {
        return disparadoPor;
    }

    public void setDisparadoPor(User disparadoPor) {
        this.disparadoPor = disparadoPor;
    }
}
