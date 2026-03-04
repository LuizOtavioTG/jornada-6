package com.jornada.backend.api.controller;

import com.jornada.backend.api.dto.ordemservico.AtualizarStatusOrdemServicoRequest;
import com.jornada.backend.api.dto.ordemservico.OSAgendamentoRequest;
import com.jornada.backend.api.dto.ordemservico.OSAgendamentoResponse;
import com.jornada.backend.api.dto.ordemservico.OSChamadoRequest;
import com.jornada.backend.api.dto.ordemservico.OSChamadoResponse;
import com.jornada.backend.api.dto.ordemservico.OSChecklistRequest;
import com.jornada.backend.api.dto.ordemservico.OSChecklistResponse;
import com.jornada.backend.api.dto.ordemservico.OSCustoResumoRequest;
import com.jornada.backend.api.dto.ordemservico.OSCustoResumoResponse;
import com.jornada.backend.api.dto.ordemservico.OSComentarioRequest;
import com.jornada.backend.api.dto.ordemservico.OSComentarioResponse;
import com.jornada.backend.api.dto.ordemservico.OSPendenciaRequest;
import com.jornada.backend.api.dto.ordemservico.OSPendenciaResponse;
import com.jornada.backend.api.dto.ordemservico.OrdemServicoRequest;
import com.jornada.backend.api.dto.ordemservico.OrdemServicoResponse;
import com.jornada.backend.service.auth.UserSecurityDetails;
import com.jornada.backend.service.ordemservico.OrdemServicoService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/ordens-servico")
public class OrdemServicoController {

    private final OrdemServicoService ordemServicoService;

    public OrdemServicoController(OrdemServicoService ordemServicoService) {
        this.ordemServicoService = ordemServicoService;
    }

    @GetMapping
    public ResponseEntity<List<OrdemServicoResponse>> listarOrdens() {
        return ResponseEntity.ok(ordemServicoService.listarOrdens());
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrdemServicoResponse> buscarPorId(@PathVariable("id") Long id) {
        return ResponseEntity.ok(ordemServicoService.buscarPorId(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<OrdemServicoResponse> atualizarOrdem(@PathVariable("id") Long id,
                                                                @Valid @RequestBody OrdemServicoRequest request,
                                                                @AuthenticationPrincipal UserSecurityDetails currentUser) {
        Long userId = currentUser != null ? currentUser.getUser().getId() : null;
        return ResponseEntity.ok(ordemServicoService.atualizarOrdem(id, request, userId));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarOrdem(@PathVariable("id") Long id) {
        ordemServicoService.deletarOrdem(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping
    public ResponseEntity<OrdemServicoResponse> criarOrdem(@Valid @RequestBody OrdemServicoRequest request,
                                                           @AuthenticationPrincipal UserSecurityDetails currentUser) {
        Long userId = currentUser != null ? currentUser.getUser().getId() : null;
        return ResponseEntity.ok(ordemServicoService.criarOrdem(request, userId));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<OrdemServicoResponse> atualizarStatus(@PathVariable("id") Long id,
                                                                @Valid @RequestBody AtualizarStatusOrdemServicoRequest request,
                                                                @AuthenticationPrincipal UserSecurityDetails currentUser) {
        Long userId = currentUser != null ? currentUser.getUser().getId() : null;
        return ResponseEntity.ok(ordemServicoService.atualizarStatus(id, request, userId));
    }

    @PostMapping("/{id}/comentarios")
    public ResponseEntity<OSComentarioResponse> adicionarComentario(@PathVariable("id") Long id,
                                                                    @Valid @RequestBody OSComentarioRequest request,
                                                                    @AuthenticationPrincipal UserSecurityDetails currentUser) {
        Long userId = currentUser != null ? currentUser.getUser().getId() : null;
        return ResponseEntity.ok(ordemServicoService.adicionarComentario(id, request, userId));
    }

    @PutMapping("/chamados/{chamadoId}")
    public ResponseEntity<OSChamadoResponse> atualizarChamado(@PathVariable("chamadoId") Long chamadoId,
                                                               @Valid @RequestBody OSChamadoRequest request) {
        return ResponseEntity.ok(ordemServicoService.atualizarChamado(chamadoId, request));
    }

    @DeleteMapping("/chamados/{chamadoId}")
    public ResponseEntity<Void> removerChamado(@PathVariable("chamadoId") Long chamadoId) {
        ordemServicoService.removerChamado(chamadoId);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/pendencias")
    public ResponseEntity<OSPendenciaResponse> registrarPendencia(@PathVariable("id") Long id,
                                                                  @Valid @RequestBody OSPendenciaRequest request) {
        return ResponseEntity.ok(ordemServicoService.registrarPendencia(id, request));
    }

    @PutMapping("/pendencias/{pendenciaId}")
    public ResponseEntity<OSPendenciaResponse> atualizarPendencia(@PathVariable("pendenciaId") Long pendenciaId,
                                                                  @Valid @RequestBody OSPendenciaRequest request) {
        return ResponseEntity.ok(ordemServicoService.atualizarPendencia(pendenciaId, request));
    }

    @DeleteMapping("/pendencias/{pendenciaId}")
    public ResponseEntity<Void> removerPendencia(@PathVariable("pendenciaId") Long pendenciaId) {
        ordemServicoService.removerPendencia(pendenciaId);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/agendamentos")
    public ResponseEntity<OSAgendamentoResponse> registrarAgendamento(@PathVariable("id") Long id,
                                                                       @Valid @RequestBody OSAgendamentoRequest request) {
        return ResponseEntity.ok(ordemServicoService.registrarAgendamento(id, request));
    }

    @PutMapping("/agendamentos/{agendamentoId}")
    public ResponseEntity<OSAgendamentoResponse> atualizarAgendamento(@PathVariable("agendamentoId") Long agendamentoId,
                                                                       @Valid @RequestBody OSAgendamentoRequest request) {
        return ResponseEntity.ok(ordemServicoService.atualizarAgendamento(agendamentoId, request));
    }

    @DeleteMapping("/agendamentos/{agendamentoId}")
    public ResponseEntity<Void> removerAgendamento(@PathVariable("agendamentoId") Long agendamentoId) {
        ordemServicoService.removerAgendamento(agendamentoId);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/custos")
    public ResponseEntity<OSCustoResumoResponse> salvarCustoResumo(@PathVariable("id") Long id,
                                                                   @Valid @RequestBody OSCustoResumoRequest request) {
        return ResponseEntity.ok(ordemServicoService.salvarCustoResumo(id, request));
    }

    @DeleteMapping("/custos/{resumoId}")
    public ResponseEntity<Void> removerCustoResumo(@PathVariable("resumoId") Long resumoId) {
        ordemServicoService.removerCustoResumo(resumoId);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/checklists")
    public ResponseEntity<OSChecklistResponse> registrarChecklist(@PathVariable("id") Long id,
                                                                  @Valid @RequestBody OSChecklistRequest request) {
        return ResponseEntity.ok(ordemServicoService.registrarChecklist(id, request));
    }

    @PutMapping("/checklists/{checklistId}")
    public ResponseEntity<OSChecklistResponse> atualizarChecklist(@PathVariable("checklistId") Long checklistId,
                                                                  @Valid @RequestBody OSChecklistRequest request) {
        return ResponseEntity.ok(ordemServicoService.atualizarChecklist(checklistId, request));
    }

    @DeleteMapping("/checklists/{checklistId}")
    public ResponseEntity<Void> removerChecklist(@PathVariable("checklistId") Long checklistId) {
        ordemServicoService.removerChecklist(checklistId);
        return ResponseEntity.noContent().build();
    }
}
