package com.jornada.backend.domain.ordemservico.model;

import com.jornada.backend.domain.auth.model.User;
import com.jornada.backend.domain.client.model.Cliente;
import com.jornada.backend.domain.client.model.ClienteUnidade;
import com.jornada.backend.domain.common.model.BaseEntity;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "ordens_servico")
public class OrdemServico extends BaseEntity {

    @Column(nullable = false, unique = true, length = 36)
    private String numeroOs;

    @Column(nullable = false)
    private String titulo;

    @Column(columnDefinition = "TEXT")
    private String descricao;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "cliente_id", nullable = false, foreignKey = @ForeignKey(name = "fk_os_cliente"))
    private Cliente cliente;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "unidade_id", nullable = false, foreignKey = @ForeignKey(name = "fk_os_unidade"))
    private ClienteUnidade unidade;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tecnico_id", foreignKey = @ForeignKey(name = "fk_os_tecnico"))
    private User tecnicoResponsavel;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tipo_servico_id", foreignKey = @ForeignKey(name = "fk_os_tipo_servico"))
    private TipoServico tipoServico;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by", foreignKey = @ForeignKey(name = "fk_os_created_by"))
    private User createdBy;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 32)
    private OrdemServicoStatus status = OrdemServicoStatus.RASCUNHO;

    @Enumerated(EnumType.STRING)
    @Column(length = 16)
    private OrdemServicoPrioridade prioridade = OrdemServicoPrioridade.MEDIA;

    @Column
    private OffsetDateTime dataAbertura;

    @Column
    private OffsetDateTime dataInicio;

    @Column
    private OffsetDateTime dataConclusao;

    @Column
    private OffsetDateTime dataAprovacao;

    @Column
    private OffsetDateTime dataCancelamento;

    @Column
    private OffsetDateTime slaLimite;

    @Column
    private Boolean emGarantia;

    @Column(precision = 15, scale = 2)
    private BigDecimal custoTotal;

    @OneToMany(mappedBy = "ordemServico", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private Set<OSStatusHistorico> historicosStatus = new HashSet<>();

    @OneToMany(mappedBy = "ordemServico", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private Set<OSComentario> comentarios = new HashSet<>();

    @OneToMany(mappedBy = "ordemServico", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private Set<OSPendencia> pendencias = new HashSet<>();

    @OneToMany(mappedBy = "ordemServico", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private Set<OSChamado> chamados = new HashSet<>();

    @OneToMany(mappedBy = "ordemServico", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private Set<OSChecklistTecnico> checklists = new HashSet<>();

    @OneToMany(mappedBy = "ordemServico", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private Set<OSAgendamento> agendamentos = new HashSet<>();

    @OneToMany(mappedBy = "ordemServico", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private Set<OSCustoResumo> custos = new HashSet<>();

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

    public Cliente getCliente() {
        return cliente;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

    public ClienteUnidade getUnidade() {
        return unidade;
    }

    public void setUnidade(ClienteUnidade unidade) {
        this.unidade = unidade;
    }

    public User getTecnicoResponsavel() {
        return tecnicoResponsavel;
    }

    public void setTecnicoResponsavel(User tecnicoResponsavel) {
        this.tecnicoResponsavel = tecnicoResponsavel;
    }

    public TipoServico getTipoServico() {
        return tipoServico;
    }

    public void setTipoServico(TipoServico tipoServico) {
        this.tipoServico = tipoServico;
    }

    public User getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(User createdBy) {
        this.createdBy = createdBy;
    }

    public OrdemServicoStatus getStatus() {
        return status;
    }

    public void setStatus(OrdemServicoStatus status) {
        this.status = status;
    }

    public OrdemServicoPrioridade getPrioridade() {
        return prioridade;
    }

    public void setPrioridade(OrdemServicoPrioridade prioridade) {
        this.prioridade = prioridade;
    }

    public OffsetDateTime getDataAbertura() {
        return dataAbertura;
    }

    public void setDataAbertura(OffsetDateTime dataAbertura) {
        this.dataAbertura = dataAbertura;
    }

    public OffsetDateTime getDataInicio() {
        return dataInicio;
    }

    public void setDataInicio(OffsetDateTime dataInicio) {
        this.dataInicio = dataInicio;
    }

    public OffsetDateTime getDataConclusao() {
        return dataConclusao;
    }

    public void setDataConclusao(OffsetDateTime dataConclusao) {
        this.dataConclusao = dataConclusao;
    }

    public OffsetDateTime getDataAprovacao() {
        return dataAprovacao;
    }

    public void setDataAprovacao(OffsetDateTime dataAprovacao) {
        this.dataAprovacao = dataAprovacao;
    }

    public OffsetDateTime getDataCancelamento() {
        return dataCancelamento;
    }

    public void setDataCancelamento(OffsetDateTime dataCancelamento) {
        this.dataCancelamento = dataCancelamento;
    }

    public OffsetDateTime getSlaLimite() {
        return slaLimite;
    }

    public void setSlaLimite(OffsetDateTime slaLimite) {
        this.slaLimite = slaLimite;
    }

    public Boolean getEmGarantia() {
        return emGarantia;
    }

    public void setEmGarantia(Boolean emGarantia) {
        this.emGarantia = emGarantia;
    }

    public BigDecimal getCustoTotal() {
        return custoTotal;
    }

    public void setCustoTotal(BigDecimal custoTotal) {
        this.custoTotal = custoTotal;
    }

    public Set<OSStatusHistorico> getHistoricosStatus() {
        return historicosStatus;
    }

    public void setHistoricosStatus(Set<OSStatusHistorico> historicosStatus) {
        this.historicosStatus = historicosStatus;
    }

    public Set<OSComentario> getComentarios() {
        return comentarios;
    }

    public void setComentarios(Set<OSComentario> comentarios) {
        this.comentarios = comentarios;
    }

    public Set<OSPendencia> getPendencias() {
        return pendencias;
    }

    public void setPendencias(Set<OSPendencia> pendencias) {
        this.pendencias = pendencias;
    }

    public Set<OSChamado> getChamados() {
        return chamados;
    }

    public void setChamados(Set<OSChamado> chamados) {
        this.chamados = chamados;
    }

    public Set<OSChecklistTecnico> getChecklists() {
        return checklists;
    }

    public void setChecklists(Set<OSChecklistTecnico> checklists) {
        this.checklists = checklists;
    }

    public Set<OSAgendamento> getAgendamentos() {
        return agendamentos;
    }

    public void setAgendamentos(Set<OSAgendamento> agendamentos) {
        this.agendamentos = agendamentos;
    }

    public Set<OSCustoResumo> getCustos() {
        return custos;
    }

    public void setCustos(Set<OSCustoResumo> custos) {
        this.custos = custos;
    }
}
