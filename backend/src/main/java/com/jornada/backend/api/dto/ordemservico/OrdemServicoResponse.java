package com.jornada.backend.api.dto.ordemservico;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.List;

public class OrdemServicoResponse {

    private Long id;
    private String numeroOs;
    private String titulo;
    private String descricao;
    private Long clienteId;
    private String clienteNome;
    private String clienteCnpj;
    private String clienteEndereco;
    private Long unidadeId;
    private String unidadeNome;
    private Long tecnicoId;
    private String tecnicoNome;
    private Long tipoServicoId;
    private String status;
    private String prioridade;
    private Boolean emGarantia;
    private OffsetDateTime dataAbertura;
    private OffsetDateTime slaLimite;
    private BigDecimal custoTotal;
    private List<OSChamadoResponse> chamados;
    private List<OSComentarioResponse> comentarios;
    private List<OSPendenciaResponse> pendencias;
    private List<OSChecklistResponse> checklists;
    private OSCustoResumoResponse custoResumo;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNumeroOs() {
        return numeroOs;
    }

    public void setNumeroOs(String numeroOs) {
        this.numeroOs = numeroOs;
    }

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

    public String getClienteNome() {
        return clienteNome;
    }

    public void setClienteNome(String clienteNome) {
        this.clienteNome = clienteNome;
    }

    public String getClienteCnpj() {
        return clienteCnpj;
    }

    public void setClienteCnpj(String clienteCnpj) {
        this.clienteCnpj = clienteCnpj;
    }

    public String getClienteEndereco() {
        return clienteEndereco;
    }

    public void setClienteEndereco(String clienteEndereco) {
        this.clienteEndereco = clienteEndereco;
    }

    public Long getUnidadeId() {
        return unidadeId;
    }

    public void setUnidadeId(Long unidadeId) {
        this.unidadeId = unidadeId;
    }

    public String getUnidadeNome() {
        return unidadeNome;
    }

    public void setUnidadeNome(String unidadeNome) {
        this.unidadeNome = unidadeNome;
    }

    public Long getTecnicoId() {
        return tecnicoId;
    }

    public String getTecnicoNome() {
        return tecnicoNome;
    }

    public void setTecnicoNome(String tecnicoNome) {
        this.tecnicoNome = tecnicoNome;
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

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
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

    public OffsetDateTime getDataAbertura() {
        return dataAbertura;
    }

    public void setDataAbertura(OffsetDateTime dataAbertura) {
        this.dataAbertura = dataAbertura;
    }

    public OffsetDateTime getSlaLimite() {
        return slaLimite;
    }

    public void setSlaLimite(OffsetDateTime slaLimite) {
        this.slaLimite = slaLimite;
    }

    public BigDecimal getCustoTotal() {
        return custoTotal;
    }

    public void setCustoTotal(BigDecimal custoTotal) {
        this.custoTotal = custoTotal;
    }

    public List<OSChamadoResponse> getChamados() {
        return chamados;
    }

    public void setChamados(List<OSChamadoResponse> chamados) {
        this.chamados = chamados;
    }

    public List<OSComentarioResponse> getComentarios() {
        return comentarios;
    }

    public void setComentarios(List<OSComentarioResponse> comentarios) {
        this.comentarios = comentarios;
    }

    public List<OSPendenciaResponse> getPendencias() {
        return pendencias;
    }

    public void setPendencias(List<OSPendenciaResponse> pendencias) {
        this.pendencias = pendencias;
    }

    public List<OSChecklistResponse> getChecklists() {
        return checklists;
    }

    public void setChecklists(List<OSChecklistResponse> checklists) {
        this.checklists = checklists;
    }

    public OSCustoResumoResponse getCustoResumo() {
        return custoResumo;
    }

    public void setCustoResumo(OSCustoResumoResponse custoResumo) {
        this.custoResumo = custoResumo;
    }
}
