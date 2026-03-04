package com.jornada.backend.api.dto.ordemservico;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.OffsetDateTime;
import java.util.List;

public class OrdemServicoRequest {

    @NotBlank
    private String titulo;

    private String descricao;

    @NotNull
    private Long clienteId;

    @NotNull
    private Long unidadeId;

    private Long tecnicoId;

    private Long tipoServicoId;

    private String prioridade;

    private Boolean emGarantia;

    private OffsetDateTime slaLimite;

    private List<OSChamadoRequest> chamados;

    private List<OSAgendamentoRequest> agendamentos;

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Long getClienteId() {
        return clienteId;
    }

    public void setClienteId(Long clienteId) {
        this.clienteId = clienteId;
    }

    public Long getUnidadeId() {
        return unidadeId;
    }

    public void setUnidadeId(Long unidadeId) {
        this.unidadeId = unidadeId;
    }

    public Long getTecnicoId() {
        return tecnicoId;
    }

    public void setTecnicoId(Long tecnicoId) {
        this.tecnicoId = tecnicoId;
    }

    public Long getTipoServicoId() {
        return tipoServicoId;
    }

    public void setTipoServicoId(Long tipoServicoId) {
        this.tipoServicoId = tipoServicoId;
    }

    public String getPrioridade() {
        return prioridade;
    }

    public void setPrioridade(String prioridade) {
        this.prioridade = prioridade;
    }

    public Boolean getEmGarantia() {
        return emGarantia;
    }

    public void setEmGarantia(Boolean emGarantia) {
        this.emGarantia = emGarantia;
    }

    public OffsetDateTime getSlaLimite() {
        return slaLimite;
    }

    public void setSlaLimite(OffsetDateTime slaLimite) {
        this.slaLimite = slaLimite;
    }

    public List<OSChamadoRequest> getChamados() {
        return chamados;
    }

    public void setChamados(List<OSChamadoRequest> chamados) {
        this.chamados = chamados;
    }

    public List<OSAgendamentoRequest> getAgendamentos() {
        return agendamentos;
    }

    public void setAgendamentos(List<OSAgendamentoRequest> agendamentos) {
        this.agendamentos = agendamentos;
    }
}
