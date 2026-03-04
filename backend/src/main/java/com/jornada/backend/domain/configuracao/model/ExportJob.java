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
@Table(name = "export_jobs")
public class ExportJob extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "template_id", foreignKey = @ForeignKey(name = "fk_export_job_template"))
    private ExportTemplate template;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "solicitado_por", foreignKey = @ForeignKey(name = "fk_export_job_usuario"))
    private User solicitadoPor;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 32)
    private JobStatus status = JobStatus.PENDENTE;

    @Column(columnDefinition = "TEXT")
    private String filtros;

    @Column(length = 255)
    private String caminhoArquivo;

    @Column
    private boolean incluirFotos;

    @Column
    private boolean incluirAssinaturas;

    @Column
    private OffsetDateTime iniciadoEm;

    @Column
    private OffsetDateTime finalizadoEm;

    @Column
    private OffsetDateTime expiraEm;

    public ExportTemplate getTemplate() {
        return template;
    }

    public void setTemplate(ExportTemplate template) {
        this.template = template;
    }

    public User getSolicitadoPor() {
        return solicitadoPor;
    }

    public void setSolicitadoPor(User solicitadoPor) {
        this.solicitadoPor = solicitadoPor;
    }

    public JobStatus getStatus() {
        return status;
    }

    public void setStatus(JobStatus status) {
        this.status = status;
    }

    public String getFiltros() {
        return filtros;
    }

    public void setFiltros(String filtros) {
        this.filtros = filtros;
    }

    public String getCaminhoArquivo() {
        return caminhoArquivo;
    }

    public void setCaminhoArquivo(String caminhoArquivo) {
        this.caminhoArquivo = caminhoArquivo;
    }

    public boolean isIncluirFotos() {
        return incluirFotos;
    }

    public void setIncluirFotos(boolean incluirFotos) {
        this.incluirFotos = incluirFotos;
    }

    public boolean isIncluirAssinaturas() {
        return incluirAssinaturas;
    }

    public void setIncluirAssinaturas(boolean incluirAssinaturas) {
        this.incluirAssinaturas = incluirAssinaturas;
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

    public OffsetDateTime getExpiraEm() {
        return expiraEm;
    }

    public void setExpiraEm(OffsetDateTime expiraEm) {
        this.expiraEm = expiraEm;
    }
}
