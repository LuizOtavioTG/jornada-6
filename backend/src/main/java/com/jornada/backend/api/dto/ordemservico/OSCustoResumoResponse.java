package com.jornada.backend.api.dto.ordemservico;

import java.math.BigDecimal;

public class OSCustoResumoResponse {

    private Long id;
    private BigDecimal totalEstrutura;
    private BigDecimal totalHoras;
    private BigDecimal totalMateriais;
    private BigDecimal totalDeslocamento;
    private BigDecimal totalKm;
    private BigDecimal totalGeral;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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
}
