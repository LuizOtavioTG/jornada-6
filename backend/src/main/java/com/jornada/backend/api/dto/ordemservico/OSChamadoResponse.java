package com.jornada.backend.api.dto.ordemservico;

public class OSChamadoResponse {

    private Long id;
    private Long equipamentoId;
    private String equipamentoNumeroSerie;
    private String descricaoOriginal;
    private String status;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getEquipamentoId() {
        return equipamentoId;
    }

    public void setEquipamentoId(Long equipamentoId) {
        this.equipamentoId = equipamentoId;
    }

    public String getEquipamentoNumeroSerie() {
        return equipamentoNumeroSerie;
    }

    public void setEquipamentoNumeroSerie(String equipamentoNumeroSerie) {
        this.equipamentoNumeroSerie = equipamentoNumeroSerie;
    }

    public String getDescricaoOriginal() {
        return descricaoOriginal;
    }

    public void setDescricaoOriginal(String descricaoOriginal) {
        this.descricaoOriginal = descricaoOriginal;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
