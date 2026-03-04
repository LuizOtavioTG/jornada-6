package com.jornada.backend.service.client;

import com.jornada.backend.api.dto.client.CategoriaClienteResponse;
import com.jornada.backend.api.dto.client.ClienteContatoResponse;
import com.jornada.backend.api.dto.client.ClienteResponse;
import com.jornada.backend.api.dto.client.ClienteUnidadeResponse;
import com.jornada.backend.api.dto.client.EquipamentoResponse;
import com.jornada.backend.api.dto.client.GarantiaResponse;
import com.jornada.backend.api.dto.client.ModeloEquipamentoResponse;
import com.jornada.backend.api.dto.client.RegiaoAtendimentoResponse;
import com.jornada.backend.api.dto.common.EnderecoResponse;
import com.jornada.backend.domain.client.model.CategoriaCliente;
import com.jornada.backend.domain.client.model.Cliente;
import com.jornada.backend.domain.client.model.ClienteContato;
import com.jornada.backend.domain.client.model.ClienteUnidade;
import com.jornada.backend.domain.client.model.Equipamento;
import com.jornada.backend.domain.client.model.Garantia;
import com.jornada.backend.domain.client.model.ModeloEquipamento;
import com.jornada.backend.domain.client.model.RegiaoAtendimento;
import com.jornada.backend.domain.common.model.Endereco;
import com.jornada.backend.domain.common.model.GeoReference;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

public class ClientMapper {

    private ClientMapper() {
    }

    public static ClienteResponse toResponse(Cliente cliente) {
        ClienteResponse response = new ClienteResponse();
        response.setId(cliente.getId());
        response.setNome(cliente.getRazaoSocial());
        response.setCnpj(cliente.getDocumento());
        response.setCodigo(cliente.getCodigo());
        response.setNomeFantasia(cliente.getNomeFantasia());
        response.setTelefone(cliente.getTelefone());
        response.setEmail(cliente.getEmail());
        response.setContatoResponsavel(cliente.getContatoResponsavel());
        response.setEndereco(cliente.getEndereco());
        response.setCategoria(toCategoriaResponse(cliente.getCategoria()));
        response.setRegiaoAtendimento(toRegiaoResponse(cliente.getRegiaoAtendimento()));
        response.setUnidades(cliente.getUnidades().stream()
                .sorted(Comparator.comparing(ClienteUnidade::getNome))
                .map(ClientMapper::toUnidadeResponse)
                .collect(Collectors.toList()));
        return response;
    }

    public static ClienteUnidadeResponse toUnidadeResponse(ClienteUnidade unidade) {
        ClienteUnidadeResponse response = new ClienteUnidadeResponse();
        response.setId(unidade.getId());
        response.setNome(unidade.getNome());
        response.setCodigo(unidade.getCodigo());
        response.setMatriz(unidade.getMatriz());
        response.setRegiaoAtendimento(toRegiaoResponse(unidade.getRegiaoAtendimento()));
        response.setEndereco(toEnderecoResponse(unidade.getEndereco()));
        response.setContatos(unidade.getContatos().stream()
                .sorted(Comparator.comparing(ClienteContato::getNome))
                .map(ClientMapper::toContatoResponse)
                .collect(Collectors.toList()));
        return response;
    }

    public static ClienteContatoResponse toContatoResponse(ClienteContato contato) {
        ClienteContatoResponse response = new ClienteContatoResponse();
        response.setId(contato.getId());
        response.setNome(contato.getNome());
        response.setCargo(contato.getCargo());
        response.setEmail(contato.getEmail());
        response.setTelefone(contato.getTelefone());
        return response;
    }

    public static EnderecoResponse toEnderecoResponse(Endereco endereco) {
        if (endereco == null) {
            return null;
        }
        EnderecoResponse response = new EnderecoResponse();
        response.setId(endereco.getId());
        response.setCep(endereco.getCep());
        response.setCidade(endereco.getCidade());
        response.setUf(endereco.getUf());
        response.setLogradouro(endereco.getLogradouro());
        response.setNumero(endereco.getNumero());
        response.setComplemento(endereco.getComplemento());
        response.setBairro(endereco.getBairro());
        response.setReferencia(endereco.getReferencia());
        response.setPais(endereco.getPais());
        Optional.ofNullable(endereco.getGeoReference())
                .map(GeoReference::getLatitude)
                .ifPresent(response::setLatitude);
        Optional.ofNullable(endereco.getGeoReference())
                .map(GeoReference::getLongitude)
                .ifPresent(response::setLongitude);
        return response;
    }

    public static CategoriaClienteResponse toCategoriaResponse(CategoriaCliente categoria) {
        if (categoria == null) {
            return null;
        }
        CategoriaClienteResponse response = new CategoriaClienteResponse();
        response.setId(categoria.getId());
        response.setNome(categoria.getNome());
        response.setDescricao(categoria.getDescricao());
        return response;
    }

    public static RegiaoAtendimentoResponse toRegiaoResponse(RegiaoAtendimento regiao) {
        if (regiao == null) {
            return null;
        }
        RegiaoAtendimentoResponse response = new RegiaoAtendimentoResponse();
        response.setId(regiao.getId());
        response.setCodigo(regiao.getCodigo());
        response.setNome(regiao.getNome());
        response.setDescricao(regiao.getDescricao());
        return response;
    }

    public static EquipamentoResponse toEquipamentoResponse(Equipamento equipamento) {
        EquipamentoResponse response = new EquipamentoResponse();
        response.setId(equipamento.getId());
        response.setNumeroSerie(equipamento.getNumeroSerie());
        response.setDataInstalacao(equipamento.getDataInstalacao());
        response.setStatus(equipamento.getStatus().name());
        response.setObservacoes(equipamento.getObservacoes());
        response.setModelo(toModeloResponse(equipamento.getModelo()));
        response.setGarantia(toGarantiaResponse(equipamento.getGarantia()));
        return response;
    }

    private static ModeloEquipamentoResponse toModeloResponse(ModeloEquipamento modelo) {
        if (modelo == null) {
            return null;
        }
        ModeloEquipamentoResponse response = new ModeloEquipamentoResponse();
        response.setId(modelo.getId());
        response.setNome(modelo.getNome());
        response.setFabricante(modelo.getFabricante());
        response.setDescricao(modelo.getDescricao());
        return response;
    }

    private static GarantiaResponse toGarantiaResponse(Garantia garantia) {
        if (garantia == null) {
            return null;
        }
        GarantiaResponse response = new GarantiaResponse();
        response.setId(garantia.getId());
        response.setDataInicio(garantia.getDataInicio());
        response.setDataFim(garantia.getDataFim());
        response.setProrrogada(garantia.getProrrogada());
        response.setObservacoes(garantia.getObservacoes());
        return response;
    }

    public static List<EquipamentoResponse> toEquipamentoList(List<Equipamento> equipamentos) {
        return equipamentos.stream()
                .sorted(Comparator.comparing(Equipamento::getNumeroSerie, Comparator.nullsLast(String::compareTo)))
                .map(ClientMapper::toEquipamentoResponse)
                .collect(Collectors.toList());
    }
}
