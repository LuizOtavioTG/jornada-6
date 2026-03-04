package com.jornada.backend.domain.ordemservico.model;

import com.jornada.backend.domain.common.model.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

import java.time.OffsetDateTime;

@Entity
@Table(name = "os_assinaturas_digitais")
public class OSAssinaturaDigital extends BaseEntity {

    @OneToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "arquivo_id", nullable = false, foreignKey = @ForeignKey(name = "fk_os_assinatura_arquivo"))
    private OSArquivo arquivo;

    @Column(nullable = false)
    private String nomeSignatario;

    @Column(length = 120)
    private String documentoSignatario;

    @Column
    private OffsetDateTime assinadoEm;

    public OSArquivo getArquivo() {
        return arquivo;
    }

    public void setArquivo(OSArquivo arquivo) {
        this.arquivo = arquivo;
    }

    public String getNomeSignatario() {
        return nomeSignatario;
    }

    public void setNomeSignatario(String nomeSignatario) {
        this.nomeSignatario = nomeSignatario;
    }

    public String getDocumentoSignatario() {
        return documentoSignatario;
    }

    public void setDocumentoSignatario(String documentoSignatario) {
        this.documentoSignatario = documentoSignatario;
    }

    public OffsetDateTime getAssinadoEm() {
        return assinadoEm;
    }

    public void setAssinadoEm(OffsetDateTime assinadoEm) {
        this.assinadoEm = assinadoEm;
    }
}
