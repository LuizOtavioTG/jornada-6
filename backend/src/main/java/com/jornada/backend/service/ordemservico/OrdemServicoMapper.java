package com.jornada.backend.service.ordemservico;

import com.jornada.backend.api.dto.ordemservico.OSAgendamentoResponse;
import com.jornada.backend.api.dto.ordemservico.OSChecklistResponse;
import com.jornada.backend.api.dto.ordemservico.OSChamadoResponse;
import com.jornada.backend.api.dto.ordemservico.OSComentarioResponse;
import com.jornada.backend.api.dto.ordemservico.OSCustoResumoResponse;
import com.jornada.backend.api.dto.ordemservico.OSPendenciaResponse;
import com.jornada.backend.api.dto.ordemservico.OrdemServicoResponse;
import com.jornada.backend.domain.ordemservico.model.OSAgendamento;
import com.jornada.backend.domain.ordemservico.model.OSChecklistTecnico;
import com.jornada.backend.domain.ordemservico.model.OSChamado;
import com.jornada.backend.domain.ordemservico.model.OSComentario;
import com.jornada.backend.domain.ordemservico.model.OSCustoResumo;
import com.jornada.backend.domain.ordemservico.model.OSPendencia;
import com.jornada.backend.domain.ordemservico.model.OrdemServico;

import java.util.Comparator;
import java.util.stream.Collectors;

public class OrdemServicoMapper {

    private OrdemServicoMapper() {
    }

    public static OrdemServicoResponse toResponse(OrdemServico ordemServico) {
        OrdemServicoResponse response = new OrdemServicoResponse();
        response.setId(ordemServico.getId());
        response.setNumeroOs(ordemServico.getNumeroOs());
        response.setTitulo(ordemServico.getTitulo());
        response.setDescricao(ordemServico.getDescricao());
        response.setClienteId(ordemServico.getCliente() != null ? ordemServico.getCliente().getId() : null);
        response.setClienteNome(ordemServico.getCliente() != null ? ordemServico.getCliente().getRazaoSocial() : null);
        response.setClienteCnpj(ordemServico.getCliente() != null ? ordemServico.getCliente().getDocumento() : null);
        response.setClienteEndereco(ordemServico.getCliente() != null ? ordemServico.getCliente().getEndereco() : null);
        response.setUnidadeId(ordemServico.getUnidade() != null ? ordemServico.getUnidade().getId() : null);
        response.setUnidadeNome(ordemServico.getUnidade() != null ? ordemServico.getUnidade().getNome() : null);
        response.setTecnicoId(ordemServico.getTecnicoResponsavel() != null ? ordemServico.getTecnicoResponsavel().getId() : null);
        response.setTecnicoNome(ordemServico.getTecnicoResponsavel() != null ? ordemServico.getTecnicoResponsavel().getFullName() : null);
        response.setTipoServicoId(ordemServico.getTipoServico() != null ? ordemServico.getTipoServico().getId() : null);
        response.setStatus(ordemServico.getStatus().name());
        response.setPrioridade(ordemServico.getPrioridade() != null ? ordemServico.getPrioridade().name() : null);
        response.setEmGarantia(ordemServico.getEmGarantia());
        response.setDataAbertura(ordemServico.getDataAbertura());
        response.setSlaLimite(ordemServico.getSlaLimite());
        response.setCustoTotal(ordemServico.getCustoTotal());
        response.setChamados(ordemServico.getChamados().stream()
                .sorted(Comparator.comparing(OSChamado::getId))
                .map(OrdemServicoMapper::toChamadoResponse)
                .collect(Collectors.toList()));
        response.setComentarios(ordemServico.getComentarios().stream()
                .sorted(Comparator.comparing(OSComentario::getCreatedAt))
                .map(OrdemServicoMapper::toComentarioResponse)
                .collect(Collectors.toList()));
        response.setPendencias(ordemServico.getPendencias().stream()
                .sorted(Comparator.comparing(OSPendencia::getId))
                .map(OrdemServicoMapper::toPendenciaResponse)
                .collect(Collectors.toList()));
        response.setChecklists(ordemServico.getChecklists().stream()
                .sorted(Comparator.comparing(OSChecklistTecnico::getId))
                .map(OrdemServicoMapper::toChecklistResponse)
                .collect(Collectors.toList()));
        response.setCustoResumo(toCustoResumoResponse(ordemServico.getCustos().stream().findFirst().orElse(null)));
        return response;
    }

    public static OSChamadoResponse toChamadoResponse(OSChamado chamado) {
        OSChamadoResponse response = new OSChamadoResponse();
        response.setId(chamado.getId());
        response.setEquipamentoId(chamado.getEquipamento() != null ? chamado.getEquipamento().getId() : null);
        response.setDescricaoOriginal(chamado.getDescricaoOriginal());
        response.setEquipamentoNumeroSerie(chamado.getEquipamento() != null ? chamado.getEquipamento().getNumeroSerie() : null);
        response.setStatus(chamado.getStatus().name());
        return response;
    }

    public static OSComentarioResponse toComentarioResponse(OSComentario comentario) {
        OSComentarioResponse response = new OSComentarioResponse();
        response.setId(comentario.getId());
        response.setAutorId(comentario.getAutor() != null ? comentario.getAutor().getId() : null);
        response.setConteudo(comentario.getConteudo());
        response.setInterno(comentario.isInterno());
        response.setCriadoEm(comentario.getCreatedAt());
        return response;
    }

    public static OSPendenciaResponse toPendenciaResponse(OSPendencia pendencia) {
        OSPendenciaResponse response = new OSPendenciaResponse();
        response.setId(pendencia.getId());
        response.setTitulo(pendencia.getTitulo());
        response.setDescricao(pendencia.getDescricao());
        response.setStatus(pendencia.getStatus().name());
        response.setVencimento(pendencia.getVencimento());
        response.setResolvidoEm(pendencia.getResolvidoEm());
        return response;
    }

    public static OSAgendamentoResponse toAgendamentoResponse(OSAgendamento agendamento) {
        OSAgendamentoResponse response = new OSAgendamentoResponse();
        response.setId(agendamento.getId());
        response.setTecnicoId(agendamento.getTecnico() != null ? agendamento.getTecnico().getId() : null);
        response.setTecnicoNome(agendamento.getTecnico() != null ? agendamento.getTecnico().getFullName() : null);
        response.setInicioPrevisto(agendamento.getInicioPrevisto());
        response.setFimPrevisto(agendamento.getFimPrevisto());
        response.setInicioReal(agendamento.getInicioReal());
        response.setFimReal(agendamento.getFimReal());
        response.setStatus(agendamento.getStatus().name());
        return response;
    }

    public static OSChecklistResponse toChecklistResponse(OSChecklistTecnico checklist) {
        OSChecklistResponse response = new OSChecklistResponse();
        response.setId(checklist.getId());
        response.setTitulo(checklist.getTitulo());
        response.setObservacoes(checklist.getObservacoes());
        response.setAprovado(checklist.isAprovado());
        return response;
    }

    public static OSCustoResumoResponse toCustoResumoResponse(OSCustoResumo resumo) {
        if (resumo == null) {
            return null;
        }
        OSCustoResumoResponse response = new OSCustoResumoResponse();
        response.setId(resumo.getId());
        response.setTotalEstrutura(resumo.getTotalEstrutura());
        response.setTotalHoras(resumo.getTotalHoras());
        response.setTotalMateriais(resumo.getTotalMateriais());
        response.setTotalDeslocamento(resumo.getTotalDeslocamento());
        response.setTotalKm(resumo.getTotalKm());
        response.setTotalGeral(resumo.getTotalGeral());
        return response;
    }
}
