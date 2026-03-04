package com.jornada.backend.api.controller;

import com.jornada.backend.api.dto.client.CategoriaClienteResponse;
import com.jornada.backend.api.dto.client.ClienteContatoRequest;
import com.jornada.backend.api.dto.client.ClienteContatoResponse;
import com.jornada.backend.api.dto.client.ClienteRequest;
import com.jornada.backend.api.dto.client.ClienteResponse;
import com.jornada.backend.api.dto.client.ClienteUnidadeRequest;
import com.jornada.backend.api.dto.client.ClienteUnidadeResponse;
import com.jornada.backend.api.dto.client.EquipamentoRequest;
import com.jornada.backend.api.dto.client.EquipamentoResponse;
import com.jornada.backend.api.dto.client.ModeloEquipamentoResponse;
import com.jornada.backend.api.dto.client.RegiaoAtendimentoResponse;
import com.jornada.backend.service.client.ClienteService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/clientes")
public class ClienteController {

    private final ClienteService clienteService;

    public ClienteController(ClienteService clienteService) {
        this.clienteService = clienteService;
    }

    @GetMapping
    public ResponseEntity<List<ClienteResponse>> listarClientes() {
        return ResponseEntity.ok(clienteService.listarClientes());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ClienteResponse> buscarCliente(@PathVariable Long id) {
        return ResponseEntity.ok(clienteService.buscarCliente(id));
    }

    @PostMapping
    public ResponseEntity<ClienteResponse> criarCliente(@Valid @RequestBody ClienteRequest request) {
        return ResponseEntity.ok(clienteService.criarCliente(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ClienteResponse> atualizarCliente(@PathVariable Long id,
                                                            @Valid @RequestBody ClienteRequest request) {
        return ResponseEntity.ok(clienteService.atualizarCliente(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> removerCliente(@PathVariable Long id) {
        clienteService.removerCliente(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/unidades")
    public ResponseEntity<ClienteUnidadeResponse> criarUnidade(@Valid @RequestBody ClienteUnidadeRequest request) {
        return ResponseEntity.ok(clienteService.criarUnidade(request));
    }

    @PutMapping("/unidades/{id}")
    public ResponseEntity<ClienteUnidadeResponse> atualizarUnidade(@PathVariable("id") Long unidadeId,
                                                                   @Valid @RequestBody ClienteUnidadeRequest request) {
        return ResponseEntity.ok(clienteService.atualizarUnidade(unidadeId, request));
    }

    @GetMapping("/unidades/{id}")
    public ResponseEntity<ClienteUnidadeResponse> buscarUnidade(@PathVariable("id") Long unidadeId) {
        return ResponseEntity.ok(clienteService.buscarUnidade(unidadeId));
    }

    @GetMapping("/{id}/unidades")
    public ResponseEntity<List<ClienteUnidadeResponse>> listarUnidadesDoCliente(@PathVariable("id") Long clienteId) {
        return ResponseEntity.ok(clienteService.listarUnidadesDoCliente(clienteId));
    }

    @DeleteMapping("/unidades/{id}")
    public ResponseEntity<Void> removerUnidade(@PathVariable("id") Long unidadeId) {
        clienteService.removerUnidade(unidadeId);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/unidades/{id}/contatos")
    public ResponseEntity<ClienteContatoResponse> adicionarContato(@PathVariable("id") Long unidadeId,
                                                                   @Valid @RequestBody ClienteContatoRequest request) {
        request.setUnidadeId(unidadeId);
        return ResponseEntity.ok(clienteService.adicionarContato(request));
    }

    @GetMapping("/unidades/{id}/contatos")
    public ResponseEntity<List<ClienteContatoResponse>> listarContatos(@PathVariable("id") Long unidadeId) {
        return ResponseEntity.ok(clienteService.listarContatos(unidadeId));
    }

    @PutMapping("/contatos/{id}")
    public ResponseEntity<ClienteContatoResponse> atualizarContato(@PathVariable("id") Long contatoId,
                                                                   @Valid @RequestBody ClienteContatoRequest request) {
        return ResponseEntity.ok(clienteService.atualizarContato(contatoId, request));
    }

    @DeleteMapping("/contatos/{id}")
    public ResponseEntity<Void> removerContato(@PathVariable("id") Long contatoId) {
        clienteService.removerContato(contatoId);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/unidades/{id}/equipamentos")
    public ResponseEntity<EquipamentoResponse> cadastrarEquipamento(@PathVariable("id") Long unidadeId,
                                                                    @Valid @RequestBody EquipamentoRequest request) {
        request.setUnidadeId(unidadeId);
        return ResponseEntity.ok(clienteService.cadastrarEquipamento(request));
    }

    @GetMapping("/unidades/{id}/equipamentos")
    public ResponseEntity<List<EquipamentoResponse>> listarEquipamentos(@PathVariable("id") Long unidadeId) {
        return ResponseEntity.ok(clienteService.listarEquipamentosDaUnidade(unidadeId));
    }

    @PutMapping("/equipamentos/{id}")
    public ResponseEntity<EquipamentoResponse> atualizarEquipamento(@PathVariable("id") Long equipamentoId,
                                                                    @Valid @RequestBody EquipamentoRequest request) {
        return ResponseEntity.ok(clienteService.atualizarEquipamento(equipamentoId, request));
    }

    @DeleteMapping("/equipamentos/{id}")
    public ResponseEntity<Void> removerEquipamento(@PathVariable("id") Long equipamentoId) {
        clienteService.removerEquipamento(equipamentoId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/categorias")
    public ResponseEntity<List<CategoriaClienteResponse>> listarCategorias() {
        return ResponseEntity.ok(clienteService.listarCategorias());
    }

    @GetMapping("/regioes")
    public ResponseEntity<List<RegiaoAtendimentoResponse>> listarRegioes() {
        return ResponseEntity.ok(clienteService.listarRegioes());
    }

    @GetMapping("/modelos-equipamento")
    public ResponseEntity<List<ModeloEquipamentoResponse>> listarModelos() {
        return ResponseEntity.ok(clienteService.listarModelos());
    }
}
