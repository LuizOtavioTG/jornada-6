package com.jornada.backend.api.dto.ordemservico;

public class OSChamadoRequest {

    private Long equipamentoId;
    private String descricaoOriginal;
    private String observacoesTecnico;
    private String status;

    public Long getEquipamentoId() {
        return equipamentoId;
    }

    public void setEquipamentoId(Long equipamentoId) {
        this.equipamentoId = equipamentoId;
    }

    public String getDescricaoOriginal() {
        return descricaoOriginal;
    }

    public void setDescricaoOriginal(String descricaoOriginal) {
        this.descricaoOriginal = descricaoOriginal;
    }

    public String getObservacoesTecnico() {
        return observacoesTecnico;
    }

    public void setObservacoesTecnico(String observacoesTecnico) {
        this.observacoesTecnico = observacoesTecnico;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
