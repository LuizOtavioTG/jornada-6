package com.jornada.backend.domain.ordemservico.model;

import com.jornada.backend.domain.common.model.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "os_custos_resumo")
public class OSCustoResumo extends BaseEntity {

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "os_id", nullable = false, foreignKey = @ForeignKey(name = "fk_os_custo_resumo_os"))
    private OrdemServico ordemServico;

    @Column(precision = 15, scale = 2)
    private BigDecimal totalEstrutura;

    @Column(precision = 15, scale = 2)
    private BigDecimal totalHoras;

    @Column(precision = 15, scale = 2)
    private BigDecimal totalMateriais;

    @Column(precision = 15, scale = 2)
    private BigDecimal totalDeslocamento;

    @Column(precision = 15, scale = 2)
    private BigDecimal totalKm;

    @Column(precision = 15, scale = 2)
    private BigDecimal totalGeral;

    @OneToMany(mappedBy = "resumo")
    private Set<OSCustoEstrutura> custosEstrutura = new HashSet<>();

    @OneToMany(mappedBy = "resumo")
    private Set<OSCustoHora> custosHora = new HashSet<>();

    @OneToMany(mappedBy = "resumo")
    private Set<OSCustoDeslocamento> custosDeslocamento = new HashSet<>();

    @OneToMany(mappedBy = "resumo")
    private Set<OSCustoKm> custosKm = new HashSet<>();

    @OneToMany(mappedBy = "resumo")
    private Set<OSMaterial> materiais = new HashSet<>();

    public OrdemServico getOrdemServico() {
        return ordemServico;
    }

    public void setOrdemServico(OrdemServico ordemServico) {
        this.ordemServico = ordemServico;
    }

    public BigDecimal getTotalEstrutura() {
        return totalEstrutura;
    }

    public void setTotalEstrutura(BigDecimal totalEstrutura) {
        this.totalEstrutura = totalEstrutura;
    }

    public BigDecimal getTotalHoras() {
        return totalHoras;
    }

    public void setTotalHoras(BigDecimal totalHoras) {
        this.totalHoras = totalHoras;
    }

    public BigDecimal getTotalMateriais() {
        return totalMateriais;
    }

    public void setTotalMateriais(BigDecimal totalMateriais) {
        this.totalMateriais = totalMateriais;
    }

    public BigDecimal getTotalDeslocamento() {
        return totalDeslocamento;
    }

    public void setTotalDeslocamento(BigDecimal totalDeslocamento) {
        this.totalDeslocamento = totalDeslocamento;
    }

    public BigDecimal getTotalKm() {
        return totalKm;
    }

    public void setTotalKm(BigDecimal totalKm) {
        this.totalKm = totalKm;
    }

    public BigDecimal getTotalGeral() {
        return totalGeral;
    }

    public void setTotalGeral(BigDecimal totalGeral) {
        this.totalGeral = totalGeral;
    }

    public Set<OSCustoEstrutura> getCustosEstrutura() {
        return custosEstrutura;
    }

    public void setCustosEstrutura(Set<OSCustoEstrutura> custosEstrutura) {
        this.custosEstrutura = custosEstrutura;
    }

    public Set<OSCustoHora> getCustosHora() {
        return custosHora;
    }

    public void setCustosHora(Set<OSCustoHora> custosHora) {
        this.custosHora = custosHora;
    }

    public Set<OSCustoDeslocamento> getCustosDeslocamento() {
        return custosDeslocamento;
    }

    public void setCustosDeslocamento(Set<OSCustoDeslocamento> custosDeslocamento) {
        this.custosDeslocamento = custosDeslocamento;
    }

    public Set<OSCustoKm> getCustosKm() {
        return custosKm;
    }

    public void setCustosKm(Set<OSCustoKm> custosKm) {
        this.custosKm = custosKm;
    }

    public Set<OSMaterial> getMateriais() {
        return materiais;
    }

    public void setMateriais(Set<OSMaterial> materiais) {
        this.materiais = materiais;
    }
}
