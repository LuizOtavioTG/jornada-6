package com.jornada.backend.domain.ordemservico.model;

import com.jornada.backend.domain.common.model.BaseEntity;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "os_checklists_tecnico")
public class OSChecklistTecnico extends BaseEntity {

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "os_id", nullable = false, foreignKey = @ForeignKey(name = "fk_os_checklist_os"))
    private OrdemServico ordemServico;

    @Column(nullable = false)
    private String titulo;

    @Column(columnDefinition = "TEXT")
    private String observacoes;

    @Column(nullable = false)
    private boolean aprovado;

    @OneToMany(mappedBy = "checklist", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private Set<OSDefeitoSelecionado> defeitosSelecionados = new HashSet<>();

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

    public String getObservacoes() {
        return observacoes;
    }

    public void setObservacoes(String observacoes) {
        this.observacoes = observacoes;
    }

    public boolean isAprovado() {
        return aprovado;
    }

    public void setAprovado(boolean aprovado) {
        this.aprovado = aprovado;
    }

    public Set<OSDefeitoSelecionado> getDefeitosSelecionados() {
        return defeitosSelecionados;
    }

    public void setDefeitosSelecionados(Set<OSDefeitoSelecionado> defeitosSelecionados) {
        this.defeitosSelecionados = defeitosSelecionados;
    }
}
