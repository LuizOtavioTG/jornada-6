package com.jornada.backend.domain.ordemservico.model;

import com.jornada.backend.domain.common.model.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "os_arquivos")
public class OSArquivo extends BaseEntity {

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "os_id", nullable = false, foreignKey = @ForeignKey(name = "fk_os_arquivo_os"))
    private OrdemServico ordemServico;

    @Column(nullable = false)
    private String nomeOriginal;

    @Column(nullable = false)
    private String caminhoStorage;

    @Column(length = 120)
    private String contentType;

    @Column
    private Long tamanhoBytes;

    public OrdemServico getOrdemServico() {
        return ordemServico;
    }

    public void setOrdemServico(OrdemServico ordemServico) {
        this.ordemServico = ordemServico;
    }

    public String getNomeOriginal() {
        return nomeOriginal;
    }

    public void setNomeOriginal(String nomeOriginal) {
        this.nomeOriginal = nomeOriginal;
    }

    public String getCaminhoStorage() {
        return caminhoStorage;
    }

    public void setCaminhoStorage(String caminhoStorage) {
        this.caminhoStorage = caminhoStorage;
    }

    public String getContentType() {
        return contentType;
    }

    public void setContentType(String contentType) {
        this.contentType = contentType;
    }

    public Long getTamanhoBytes() {
        return tamanhoBytes;
    }

    public void setTamanhoBytes(Long tamanhoBytes) {
        this.tamanhoBytes = tamanhoBytes;
    }
}
