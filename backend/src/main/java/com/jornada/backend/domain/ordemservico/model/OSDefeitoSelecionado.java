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
@Table(name = "os_defeitos_selecionados")
public class OSDefeitoSelecionado extends BaseEntity {

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "checklist_id", nullable = false, foreignKey = @ForeignKey(name = "fk_os_defeito_checklist"))
    private OSChecklistTecnico checklist;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "catalogo_defeito_id", foreignKey = @ForeignKey(name = "fk_os_defeito_catalogo"))
    private CatalogoDefeitos catalogoDefeito;

    @Column(length = 120)
    private String severidade;

    @Column(columnDefinition = "TEXT")
    private String observacoes;

    public OSChecklistTecnico getChecklist() {
        return checklist;
    }

    public void setChecklist(OSChecklistTecnico checklist) {
        this.checklist = checklist;
    }

    public CatalogoDefeitos getCatalogoDefeito() {
        return catalogoDefeito;
    }

    public void setCatalogoDefeito(CatalogoDefeitos catalogoDefeito) {
        this.catalogoDefeito = catalogoDefeito;
    }

    public String getSeveridade() {
        return severidade;
    }

    public void setSeveridade(String severidade) {
        this.severidade = severidade;
    }

    public String getObservacoes() {
        return observacoes;
    }

    public void setObservacoes(String observacoes) {
        this.observacoes = observacoes;
    }
}
