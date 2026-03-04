package com.jornada.backend.domain.ordemservico.model;

import com.jornada.backend.domain.common.model.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "os_fotos")
public class OSFoto extends BaseEntity {

    @OneToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "arquivo_id", nullable = false, foreignKey = @ForeignKey(name = "fk_os_foto_arquivo"))
    private OSArquivo arquivo;

    @Column(length = 255)
    private String descricao;

    public OSArquivo getArquivo() {
        return arquivo;
    }

    public void setArquivo(OSArquivo arquivo) {
        this.arquivo = arquivo;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }
}
