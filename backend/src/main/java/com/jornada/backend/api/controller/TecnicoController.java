package com.jornada.backend.api.controller;

import com.jornada.backend.api.dto.tecnico.DisponibilidadeTecnicoRequest;
import com.jornada.backend.api.dto.tecnico.DisponibilidadeTecnicoResponse;
import com.jornada.backend.api.dto.tecnico.TechnicianAggregateResponse;
import com.jornada.backend.api.dto.tecnico.TechnicianProfileRequest;
import com.jornada.backend.api.dto.tecnico.TechnicianProfileResponse;
import com.jornada.backend.api.dto.tecnico.TechnicianTeamRequest;
import com.jornada.backend.api.dto.tecnico.TechnicianTeamResponse;
import com.jornada.backend.api.dto.tecnico.TechnicianUpdateRequest;
import com.jornada.backend.service.tecnico.TecnicoService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/tecnicos")
public class TecnicoController {

    private final TecnicoService tecnicoService;

    public TecnicoController(TecnicoService tecnicoService) {
        this.tecnicoService = tecnicoService;
    }

    @GetMapping("/perfis")
    public ResponseEntity<List<TechnicianProfileResponse>> listarPerfis() {
        return ResponseEntity.ok(tecnicoService.listarPerfis());
    }

    @GetMapping
    public ResponseEntity<List<TechnicianAggregateResponse>> listarTecnicos() {
        return ResponseEntity.ok(tecnicoService.listarTecnicos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<TechnicianAggregateResponse> buscarTecnico(@PathVariable("id") Long userId) {
        return ResponseEntity.ok(tecnicoService.buscarTecnico(userId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<TechnicianAggregateResponse> atualizarTecnico(@PathVariable("id") Long userId,
                                                                        @Valid @RequestBody TechnicianUpdateRequest request) {
        request.setUserId(userId);
        return ResponseEntity.ok(tecnicoService.atualizarTecnico(request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> removerPerfilTecnico(@PathVariable("id") Long userId) {
        tecnicoService.removerTecnicoPerfil(userId);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/perfis")
    public ResponseEntity<TechnicianProfileResponse> salvarPerfil(@Valid @RequestBody TechnicianProfileRequest request) {
        return ResponseEntity.ok(tecnicoService.salvarPerfil(request));
    }

    @PostMapping("/disponibilidades")
    public ResponseEntity<DisponibilidadeTecnicoResponse> registrarDisponibilidade(@Valid @RequestBody DisponibilidadeTecnicoRequest request) {
        return ResponseEntity.ok(tecnicoService.registrarDisponibilidade(request));
    }

    @GetMapping("/{id}/disponibilidades")
    public ResponseEntity<List<DisponibilidadeTecnicoResponse>> listarDisponibilidades(@PathVariable("id") Long tecnicoId) {
        return ResponseEntity.ok(tecnicoService.listarDisponibilidades(tecnicoId));
    }

    @PostMapping("/equipes")
    public ResponseEntity<TechnicianTeamResponse> salvarEquipe(@Valid @RequestBody TechnicianTeamRequest request) {
        return ResponseEntity.ok(tecnicoService.salvarEquipe(request));
    }

    @GetMapping("/equipes")
    public ResponseEntity<List<TechnicianTeamResponse>> listarEquipes() {
        return ResponseEntity.ok(tecnicoService.listarEquipes());
    }
}
