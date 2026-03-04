package com.jornada.backend.service.ordemservico;

import com.jornada.backend.api.dto.ordemservico.AtualizarStatusOrdemServicoRequest;
import com.jornada.backend.api.dto.ordemservico.OSAgendamentoRequest;
import com.jornada.backend.api.dto.ordemservico.OSAgendamentoResponse;
import com.jornada.backend.api.dto.ordemservico.OSChecklistRequest;
import com.jornada.backend.api.dto.ordemservico.OSChecklistResponse;
import com.jornada.backend.api.dto.ordemservico.OSCustoResumoRequest;
import com.jornada.backend.api.dto.ordemservico.OSCustoResumoResponse;
import com.jornada.backend.api.dto.ordemservico.OSChamadoRequest;
import com.jornada.backend.api.dto.ordemservico.OSChamadoResponse;
import com.jornada.backend.api.dto.ordemservico.OSComentarioRequest;
import com.jornada.backend.api.dto.ordemservico.OSComentarioResponse;
import com.jornada.backend.api.dto.ordemservico.OSPendenciaRequest;
import com.jornada.backend.api.dto.ordemservico.OSPendenciaResponse;
import com.jornada.backend.api.dto.ordemservico.OrdemServicoRequest;
import com.jornada.backend.api.dto.ordemservico.OrdemServicoResponse;
import com.jornada.backend.domain.auth.model.User;
import com.jornada.backend.domain.auth.repository.UserRepository;
import com.jornada.backend.domain.client.model.Cliente;
import com.jornada.backend.domain.client.model.ClienteUnidade;
import com.jornada.backend.domain.client.model.Equipamento;
import com.jornada.backend.domain.client.repository.ClienteRepository;
import com.jornada.backend.domain.client.repository.ClienteUnidadeRepository;
import com.jornada.backend.domain.client.repository.EquipamentoRepository;
import com.jornada.backend.domain.ordemservico.model.AgendamentoStatus;
import com.jornada.backend.domain.ordemservico.model.OSAgendamento;
import com.jornada.backend.domain.ordemservico.model.OSChecklistTecnico;
import com.jornada.backend.domain.ordemservico.model.OSChamado;
import com.jornada.backend.domain.ordemservico.model.OSChamadoStatus;
import com.jornada.backend.domain.ordemservico.model.OSComentario;
import com.jornada.backend.domain.ordemservico.model.OSCustoResumo;
import com.jornada.backend.domain.ordemservico.model.OSPendencia;
import com.jornada.backend.domain.ordemservico.model.OSPendenciaStatus;
import com.jornada.backend.domain.ordemservico.model.OSStatusHistorico;
import com.jornada.backend.domain.ordemservico.model.OrdemServico;
import com.jornada.backend.domain.ordemservico.model.OrdemServicoPrioridade;
import com.jornada.backend.domain.ordemservico.model.OrdemServicoStatus;
import com.jornada.backend.domain.ordemservico.model.TipoServico;
import com.jornada.backend.domain.ordemservico.repository.OSAgendamentoRepository;
import com.jornada.backend.domain.ordemservico.repository.OSChecklistTecnicoRepository;
import com.jornada.backend.domain.ordemservico.repository.OSChamadoRepository;
import com.jornada.backend.domain.ordemservico.repository.OSComentarioRepository;
import com.jornada.backend.domain.ordemservico.repository.OSCustoResumoRepository;
import com.jornada.backend.domain.ordemservico.repository.OSPendenciaRepository;
import com.jornada.backend.domain.ordemservico.repository.OSStatusHistoricoRepository;
import com.jornada.backend.domain.ordemservico.repository.OrdemServicoRepository;
import com.jornada.backend.domain.ordemservico.repository.TipoServicoRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class OrdemServicoService {

    private final OrdemServicoRepository ordemServicoRepository;
    private final ClienteRepository clienteRepository;
    private final ClienteUnidadeRepository clienteUnidadeRepository;
    private final UserRepository userRepository;
    private final TipoServicoRepository tipoServicoRepository;
    private final EquipamentoRepository equipamentoRepository;
    private final OSChamadoRepository osChamadoRepository;
    private final OSComentarioRepository osComentarioRepository;
    private final OSPendenciaRepository osPendenciaRepository;
    private final OSStatusHistoricoRepository osStatusHistoricoRepository;
    private final OSAgendamentoRepository osAgendamentoRepository;
    private final OSCustoResumoRepository osCustoResumoRepository;
    private final OSChecklistTecnicoRepository osChecklistTecnicoRepository;

    public OrdemServicoService(OrdemServicoRepository ordemServicoRepository,
                               ClienteRepository clienteRepository,
                               ClienteUnidadeRepository clienteUnidadeRepository,
                               UserRepository userRepository,
                               TipoServicoRepository tipoServicoRepository,
                               EquipamentoRepository equipamentoRepository,
                               OSChamadoRepository osChamadoRepository,
                               OSComentarioRepository osComentarioRepository,
                               OSPendenciaRepository osPendenciaRepository,
                               OSStatusHistoricoRepository osStatusHistoricoRepository,
                               OSAgendamentoRepository osAgendamentoRepository,
                               OSCustoResumoRepository osCustoResumoRepository,
                               OSChecklistTecnicoRepository osChecklistTecnicoRepository) {
        this.ordemServicoRepository = ordemServicoRepository;
        this.clienteRepository = clienteRepository;
        this.clienteUnidadeRepository = clienteUnidadeRepository;
        this.userRepository = userRepository;
        this.tipoServicoRepository = tipoServicoRepository;
        this.equipamentoRepository = equipamentoRepository;
        this.osChamadoRepository = osChamadoRepository;
        this.osComentarioRepository = osComentarioRepository;
        this.osPendenciaRepository = osPendenciaRepository;
        this.osStatusHistoricoRepository = osStatusHistoricoRepository;
        this.osAgendamentoRepository = osAgendamentoRepository;
        this.osCustoResumoRepository = osCustoResumoRepository;
        this.osChecklistTecnicoRepository = osChecklistTecnicoRepository;
    }

    @Transactional(readOnly = true)
    public List<OrdemServicoResponse> listarOrdens() {
        return ordemServicoRepository.findAll().stream()
                .map(OrdemServicoMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public OrdemServicoResponse buscarPorId(Long id) {
        OrdemServico ordemServico = ordemServicoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Ordem de serviço não encontrada"));
        return OrdemServicoMapper.toResponse(ordemServico);
    }

    @Transactional
    public OrdemServicoResponse criarOrdem(OrdemServicoRequest request, Long usuarioId) {
        Cliente cliente = clienteRepository.findById(request.getClienteId())
                .orElseThrow(() -> new IllegalArgumentException("Cliente não encontrado"));
        ClienteUnidade unidade = clienteUnidadeRepository.findById(request.getUnidadeId())
                .orElseThrow(() -> new IllegalArgumentException("Unidade não encontrada"));
        User tecnico = request.getTecnicoId() != null ? buscarUsuario(request.getTecnicoId()) : null;
        User criadoPor = usuarioId != null ? buscarUsuario(usuarioId) : null;
        TipoServico tipoServico = request.getTipoServicoId() != null ? tipoServicoRepository.findById(request.getTipoServicoId())
                .orElseThrow(() -> new IllegalArgumentException("Tipo de serviço não encontrado")) : null;

        OrdemServico ordemServico = new OrdemServico();
        ordemServico.setNumeroOs(gerarNumeroOs());
        ordemServico.setTitulo(request.getTitulo());
        ordemServico.setDescricao(request.getDescricao());
        ordemServico.setCliente(cliente);
        ordemServico.setUnidade(unidade);
        ordemServico.setTecnicoResponsavel(tecnico);
        ordemServico.setTipoServico(tipoServico);
        ordemServico.setCreatedBy(criadoPor);
        ordemServico.setStatus(OrdemServicoStatus.ABERTA);
        ordemServico.setPrioridade(request.getPrioridade() != null ? OrdemServicoPrioridade.valueOf(request.getPrioridade()) : OrdemServicoPrioridade.MEDIA);
        ordemServico.setEmGarantia(request.getEmGarantia());
        ordemServico.setDataAbertura(OffsetDateTime.now());
        ordemServico.setSlaLimite(request.getSlaLimite());

        if (request.getChamados() != null) {
            for (OSChamadoRequest chamadoRequest : request.getChamados()) {
                OSChamado chamado = new OSChamado();
                chamado.setOrdemServico(ordemServico);
                Equipamento equip = chamadoRequest.getEquipamentoId() != null ? equipamentoRepository.findById(chamadoRequest.getEquipamentoId())
                        .orElseThrow(() -> new IllegalArgumentException("Equipamento não encontrado")) : null;
                chamado.setEquipamento(equip);
                chamado.setDescricaoOriginal(chamadoRequest.getDescricaoOriginal());
                chamado.setObservacoesTecnico(chamadoRequest.getObservacoesTecnico());
                chamado.setStatus(chamadoRequest.getStatus() != null ? OSChamadoStatus.valueOf(chamadoRequest.getStatus()) : OSChamadoStatus.ABERTO);
                ordemServico.getChamados().add(chamado);
            }
        }

        OSStatusHistorico historico = new OSStatusHistorico();
        historico.setOrdemServico(ordemServico);
        historico.setStatus(OrdemServicoStatus.ABERTA);
        historico.setRegistradoEm(OffsetDateTime.now());
        historico.setAlteradoPor(criadoPor);
        ordemServico.getHistoricosStatus().add(historico);

        ordemServicoRepository.save(ordemServico);
        return OrdemServicoMapper.toResponse(ordemServico);
    }

    @Transactional
    public OrdemServicoResponse atualizarStatus(Long ordemServicoId, AtualizarStatusOrdemServicoRequest request, Long usuarioId) {
        OrdemServico ordemServico = ordemServicoRepository.findById(ordemServicoId)
                .orElseThrow(() -> new IllegalArgumentException("Ordem de serviço não encontrada"));
        OrdemServicoStatus novoStatus = mapearStatus(request.getStatus());
        ordemServico.setStatus(novoStatus);

        if (novoStatus == OrdemServicoStatus.CONCLUIDA) {
            ordemServico.setDataConclusao(OffsetDateTime.now());
        }
        if (novoStatus == OrdemServicoStatus.CANCELADA) {
            ordemServico.setDataCancelamento(OffsetDateTime.now());
        }

        User usuario = usuarioId != null ? buscarUsuario(usuarioId) : null;

        OSStatusHistorico historico = new OSStatusHistorico();
        historico.setOrdemServico(ordemServico);
        historico.setStatus(novoStatus);
        historico.setRegistradoEm(OffsetDateTime.now());
        historico.setAlteradoPor(usuario);
        historico.setJustificativa(request.getJustificativa());
        ordemServico.getHistoricosStatus().add(historico);

        return OrdemServicoMapper.toResponse(ordemServico);
    }

    @Transactional
    public OSComentarioResponse adicionarComentario(Long ordemServicoId, OSComentarioRequest request, Long usuarioId) {
        OrdemServico ordemServico = ordemServicoRepository.findById(ordemServicoId)
                .orElseThrow(() -> new IllegalArgumentException("Ordem de serviço não encontrada"));
        User usuario = usuarioId != null ? buscarUsuario(usuarioId) : null;

        OSComentario comentario = new OSComentario();
        comentario.setOrdemServico(ordemServico);
        comentario.setAutor(usuario);
        comentario.setConteudo(request.getConteudo());
        comentario.setInterno(request.isInterno());

        ordemServico.getComentarios().add(comentario);
        osComentarioRepository.save(comentario);
        return OrdemServicoMapper.toComentarioResponse(comentario);
    }

    @Transactional
    public OrdemServicoResponse atualizarOrdem(Long id, OrdemServicoRequest request, Long usuarioId) {
        OrdemServico ordemServico = ordemServicoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Ordem de serviço não encontrada"));
        Cliente cliente = clienteRepository.findById(request.getClienteId())
                .orElseThrow(() -> new IllegalArgumentException("Cliente não encontrado"));
        ClienteUnidade unidade = clienteUnidadeRepository.findById(request.getUnidadeId())
                .orElseThrow(() -> new IllegalArgumentException("Unidade não encontrada"));
        User tecnico = request.getTecnicoId() != null ? buscarUsuario(request.getTecnicoId()) : null;
        TipoServico tipoServico = request.getTipoServicoId() != null ? tipoServicoRepository.findById(request.getTipoServicoId())
                .orElseThrow(() -> new IllegalArgumentException("Tipo de serviço não encontrado")) : null;

        ordemServico.setTitulo(request.getTitulo());
        ordemServico.setDescricao(request.getDescricao());
        ordemServico.setCliente(cliente);
        ordemServico.setUnidade(unidade);
        ordemServico.setTecnicoResponsavel(tecnico);
        ordemServico.setTipoServico(tipoServico);
        ordemServico.setPrioridade(request.getPrioridade() != null ? OrdemServicoPrioridade.valueOf(request.getPrioridade()) : OrdemServicoPrioridade.MEDIA);
        ordemServico.setEmGarantia(request.getEmGarantia());
        ordemServico.setSlaLimite(request.getSlaLimite());

        if (request.getAgendamentos() != null) {
            ordemServico.getAgendamentos().clear();
            request.getAgendamentos().forEach(ag -> {
                OSAgendamento novo = new OSAgendamento();
                novo.setOrdemServico(ordemServico);
                novo.setTecnico(ag.getTecnicoId() != null ? buscarUsuario(ag.getTecnicoId()) : null);
                novo.setInicioPrevisto(ag.getInicioPrevisto());
                novo.setFimPrevisto(ag.getFimPrevisto());
                novo.setInicioReal(ag.getInicioReal());
                novo.setFimReal(ag.getFimReal());
                novo.setStatus(mapearStatusAgendamento(ag.getStatus()));
                ordemServico.getAgendamentos().add(novo);
            });
        }

        if (request.getChamados() != null) {
            ordemServico.getChamados().clear();
            request.getChamados().forEach(chamadoRequest -> {
                OSChamado chamado = new OSChamado();
                chamado.setOrdemServico(ordemServico);
                Equipamento equip = chamadoRequest.getEquipamentoId() != null ? equipamentoRepository.findById(chamadoRequest.getEquipamentoId())
                        .orElseThrow(() -> new IllegalArgumentException("Equipamento não encontrado")) : null;
                chamado.setEquipamento(equip);
                chamado.setDescricaoOriginal(chamadoRequest.getDescricaoOriginal());
                chamado.setObservacoesTecnico(chamadoRequest.getObservacoesTecnico());
                chamado.setStatus(chamadoRequest.getStatus() != null ? OSChamadoStatus.valueOf(chamadoRequest.getStatus()) : OSChamadoStatus.ABERTO);
                ordemServico.getChamados().add(chamado);
            });
        }

        return OrdemServicoMapper.toResponse(ordemServico);
    }

    @Transactional
    public void deletarOrdem(Long id) {
        OrdemServico ordemServico = ordemServicoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Ordem de serviço não encontrada"));
        ordemServicoRepository.delete(ordemServico);
    }

    @Transactional
    public OSPendenciaResponse registrarPendencia(Long ordemServicoId, OSPendenciaRequest request) {
        OrdemServico ordemServico = ordemServicoRepository.findById(ordemServicoId)
                .orElseThrow(() -> new IllegalArgumentException("Ordem de serviço não encontrada"));

        OSPendencia pendencia = new OSPendencia();
        pendencia.setOrdemServico(ordemServico);
        pendencia.setTitulo(request.getTitulo());
        pendencia.setDescricao(request.getDescricao());
        pendencia.setStatus(request.getStatus() != null ? OSPendenciaStatus.valueOf(request.getStatus()) : OSPendenciaStatus.ABERTA);
        pendencia.setVencimento(request.getVencimento());

        ordemServico.getPendencias().add(pendencia);
        osPendenciaRepository.save(pendencia);
        return OrdemServicoMapper.toPendenciaResponse(pendencia);
    }

    @Transactional
    public OSChamadoResponse atualizarChamado(Long chamadoId, OSChamadoRequest request) {
        OSChamado chamado = osChamadoRepository.findById(chamadoId)
                .orElseThrow(() -> new IllegalArgumentException("Chamado não encontrado"));
        Equipamento equip = request.getEquipamentoId() != null ? equipamentoRepository.findById(request.getEquipamentoId())
                .orElseThrow(() -> new IllegalArgumentException("Equipamento não encontrado")) : null;
        chamado.setEquipamento(equip);
        chamado.setDescricaoOriginal(request.getDescricaoOriginal());
        chamado.setObservacoesTecnico(request.getObservacoesTecnico());
        if (request.getStatus() != null) {
            chamado.setStatus(OSChamadoStatus.valueOf(request.getStatus()));
        }
        return OrdemServicoMapper.toChamadoResponse(chamado);
    }

    @Transactional
    public void removerChamado(Long chamadoId) {
        OSChamado chamado = osChamadoRepository.findById(chamadoId)
                .orElseThrow(() -> new IllegalArgumentException("Chamado não encontrado"));
        osChamadoRepository.delete(chamado);
    }

    @Transactional
    public OSAgendamentoResponse registrarAgendamento(Long ordemServicoId, OSAgendamentoRequest request) {
        OrdemServico ordemServico = ordemServicoRepository.findById(ordemServicoId)
                .orElseThrow(() -> new IllegalArgumentException("Ordem de serviço não encontrada"));
        User tecnico = request.getTecnicoId() != null ? buscarUsuario(request.getTecnicoId()) : null;

        OSAgendamento agendamento = new OSAgendamento();
        agendamento.setOrdemServico(ordemServico);
        agendamento.setTecnico(tecnico);
        agendamento.setInicioPrevisto(request.getInicioPrevisto());
        agendamento.setFimPrevisto(request.getFimPrevisto());
        agendamento.setStatus(mapearStatusAgendamento(request.getStatus()));
        agendamento.setInicioReal(request.getInicioReal());
        agendamento.setFimReal(request.getFimReal());

        ordemServico.getAgendamentos().add(agendamento);
        osAgendamentoRepository.save(agendamento);
        return OrdemServicoMapper.toAgendamentoResponse(agendamento);
    }

    @Transactional
    public OSPendenciaResponse atualizarPendencia(Long pendenciaId, OSPendenciaRequest request) {
        OSPendencia pendencia = osPendenciaRepository.findById(pendenciaId)
                .orElseThrow(() -> new IllegalArgumentException("Pendência não encontrada"));
        pendencia.setTitulo(request.getTitulo());
        pendencia.setDescricao(request.getDescricao());
        if (request.getStatus() != null) {
            pendencia.setStatus(OSPendenciaStatus.valueOf(request.getStatus()));
        }
        pendencia.setVencimento(request.getVencimento());
        return OrdemServicoMapper.toPendenciaResponse(pendencia);
    }

    @Transactional
    public void removerPendencia(Long pendenciaId) {
        OSPendencia pendencia = osPendenciaRepository.findById(pendenciaId)
                .orElseThrow(() -> new IllegalArgumentException("Pendência não encontrada"));
        osPendenciaRepository.delete(pendencia);
    }

    @Transactional
    public OSAgendamentoResponse atualizarAgendamento(Long agendamentoId, OSAgendamentoRequest request) {
        OSAgendamento agendamento = osAgendamentoRepository.findById(agendamentoId)
                .orElseThrow(() -> new IllegalArgumentException("Agendamento não encontrado"));
        agendamento.setTecnico(request.getTecnicoId() != null ? buscarUsuario(request.getTecnicoId()) : null);
        agendamento.setInicioPrevisto(request.getInicioPrevisto());
        agendamento.setFimPrevisto(request.getFimPrevisto());
        agendamento.setInicioReal(request.getInicioReal());
        agendamento.setFimReal(request.getFimReal());
        agendamento.setStatus(mapearStatusAgendamento(request.getStatus()));
        return OrdemServicoMapper.toAgendamentoResponse(agendamento);
    }

    @Transactional
    public void removerAgendamento(Long agendamentoId) {
        OSAgendamento agendamento = osAgendamentoRepository.findById(agendamentoId)
                .orElseThrow(() -> new IllegalArgumentException("Agendamento não encontrado"));
        osAgendamentoRepository.delete(agendamento);
    }

    @Transactional
    public OSCustoResumoResponse salvarCustoResumo(Long ordemId, OSCustoResumoRequest request) {
        OrdemServico ordemServico = ordemServicoRepository.findById(ordemId)
                .orElseThrow(() -> new IllegalArgumentException("Ordem de serviço não encontrada"));
        OSCustoResumo resumo = osCustoResumoRepository.findByOrdemServicoId(ordemId)
                .orElseGet(() -> {
                    OSCustoResumo novo = new OSCustoResumo();
                    novo.setOrdemServico(ordemServico);
                    return novo;
                });
        aplicarResumo(resumo, request);
        osCustoResumoRepository.save(resumo);
        return OrdemServicoMapper.toCustoResumoResponse(resumo);
    }

    @Transactional
    public void removerCustoResumo(Long resumoId) {
        OSCustoResumo resumo = osCustoResumoRepository.findById(resumoId)
                .orElseThrow(() -> new IllegalArgumentException("Resumo de custo não encontrado"));
        osCustoResumoRepository.delete(resumo);
    }

    @Transactional
    public OSChecklistResponse registrarChecklist(Long ordemServicoId, OSChecklistRequest request) {
        OrdemServico ordemServico = ordemServicoRepository.findById(ordemServicoId)
                .orElseThrow(() -> new IllegalArgumentException("Ordem de serviço não encontrada"));
        OSChecklistTecnico checklist = new OSChecklistTecnico();
        checklist.setOrdemServico(ordemServico);
        checklist.setTitulo(request.getTitulo());
        checklist.setObservacoes(request.getObservacoes());
        checklist.setAprovado(request.getAprovado() != null ? request.getAprovado() : false);
        osChecklistTecnicoRepository.save(checklist);
        return OrdemServicoMapper.toChecklistResponse(checklist);
    }

    @Transactional
    public OSChecklistResponse atualizarChecklist(Long checklistId, OSChecklistRequest request) {
        OSChecklistTecnico checklist = osChecklistTecnicoRepository.findById(checklistId)
                .orElseThrow(() -> new IllegalArgumentException("Checklist não encontrado"));
        checklist.setTitulo(request.getTitulo());
        checklist.setObservacoes(request.getObservacoes());
        if (request.getAprovado() != null) {
            checklist.setAprovado(request.getAprovado());
        }
        return OrdemServicoMapper.toChecklistResponse(checklist);
    }

    @Transactional
    public void removerChecklist(Long checklistId) {
        OSChecklistTecnico checklist = osChecklistTecnicoRepository.findById(checklistId)
                .orElseThrow(() -> new IllegalArgumentException("Checklist não encontrado"));
        osChecklistTecnicoRepository.delete(checklist);
    }

    private String gerarNumeroOs() {
        return "OS-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
    }

    private User buscarUsuario(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado"));
    }

    private OrdemServicoStatus mapearStatus(String statusRaw) {
        if (statusRaw == null) {
            return OrdemServicoStatus.ABERTA;
        }
        try {
            return OrdemServicoStatus.valueOf(statusRaw.toUpperCase());
        } catch (IllegalArgumentException ex) {
            if ("EM_ANDAMENTO".equalsIgnoreCase(statusRaw)) {
                return OrdemServicoStatus.EM_EXECUCAO;
            }
            if ("PENDENTE_SYNC".equalsIgnoreCase(statusRaw)) {
                return OrdemServicoStatus.RASCUNHO;
            }
            return OrdemServicoStatus.ABERTA;
        }
    }

    private AgendamentoStatus mapearStatusAgendamento(String statusRaw) {
        if (statusRaw == null) {
            return AgendamentoStatus.SOLICITADO;
        }
        try {
            return AgendamentoStatus.valueOf(statusRaw);
        } catch (IllegalArgumentException ex) {
            return AgendamentoStatus.SOLICITADO;
        }
    }

    private void aplicarResumo(OSCustoResumo resumo, OSCustoResumoRequest request) {
        resumo.setTotalEstrutura(request.getTotalEstrutura());
        resumo.setTotalHoras(request.getTotalHoras());
        resumo.setTotalMateriais(request.getTotalMateriais());
        resumo.setTotalDeslocamento(request.getTotalDeslocamento());
        resumo.setTotalKm(request.getTotalKm());
        resumo.setTotalGeral(request.getTotalGeral());
    }
}
