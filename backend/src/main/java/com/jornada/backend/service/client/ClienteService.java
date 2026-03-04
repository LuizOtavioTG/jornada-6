package com.jornada.backend.service.client;

import com.jornada.backend.api.dto.client.CategoriaClienteResponse;
import com.jornada.backend.api.dto.client.ClienteContatoRequest;
import com.jornada.backend.api.dto.client.ClienteContatoResponse;
import com.jornada.backend.api.dto.client.ClienteRequest;
import com.jornada.backend.api.dto.client.ClienteResponse;
import com.jornada.backend.api.dto.client.ClienteUnidadeRequest;
import com.jornada.backend.api.dto.client.ClienteUnidadeResponse;
import com.jornada.backend.api.dto.client.EquipamentoRequest;
import com.jornada.backend.api.dto.client.EquipamentoResponse;
import com.jornada.backend.api.dto.client.GarantiaRequest;
import com.jornada.backend.api.dto.client.ModeloEquipamentoResponse;
import com.jornada.backend.api.dto.client.RegiaoAtendimentoResponse;
import com.jornada.backend.api.dto.common.EnderecoRequest;
import com.jornada.backend.domain.client.model.CategoriaCliente;
import com.jornada.backend.domain.client.model.Cliente;
import com.jornada.backend.domain.client.model.ClienteContato;
import com.jornada.backend.domain.client.model.ClienteUnidade;
import com.jornada.backend.domain.client.model.Equipamento;
import com.jornada.backend.domain.client.model.EquipamentoStatus;
import com.jornada.backend.domain.client.model.Garantia;
import com.jornada.backend.domain.client.model.ModeloEquipamento;
import com.jornada.backend.domain.client.model.RegiaoAtendimento;
import com.jornada.backend.domain.client.repository.CategoriaClienteRepository;
import com.jornada.backend.domain.client.repository.ClienteContatoRepository;
import com.jornada.backend.domain.client.repository.ClienteRepository;
import com.jornada.backend.domain.client.repository.ClienteUnidadeRepository;
import com.jornada.backend.domain.client.repository.EquipamentoRepository;
import com.jornada.backend.domain.client.repository.GarantiaRepository;
import com.jornada.backend.domain.client.repository.ModeloEquipamentoRepository;
import com.jornada.backend.domain.client.repository.RegiaoAtendimentoRepository;
import com.jornada.backend.domain.common.model.Endereco;
import com.jornada.backend.domain.common.model.GeoReference;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ClienteService {

    private final ClienteRepository clienteRepository;
    private final ClienteUnidadeRepository clienteUnidadeRepository;
    private final ClienteContatoRepository clienteContatoRepository;
    private final CategoriaClienteRepository categoriaClienteRepository;
    private final RegiaoAtendimentoRepository regiaoAtendimentoRepository;
    private final EquipamentoRepository equipamentoRepository;
    private final ModeloEquipamentoRepository modeloEquipamentoRepository;
    private final GarantiaRepository garantiaRepository;

    public ClienteService(ClienteRepository clienteRepository,
                          ClienteUnidadeRepository clienteUnidadeRepository,
                          ClienteContatoRepository clienteContatoRepository,
                          CategoriaClienteRepository categoriaClienteRepository,
                          RegiaoAtendimentoRepository regiaoAtendimentoRepository,
                          EquipamentoRepository equipamentoRepository,
                          ModeloEquipamentoRepository modeloEquipamentoRepository,
                          GarantiaRepository garantiaRepository) {
        this.clienteRepository = clienteRepository;
        this.clienteUnidadeRepository = clienteUnidadeRepository;
        this.clienteContatoRepository = clienteContatoRepository;
        this.categoriaClienteRepository = categoriaClienteRepository;
        this.regiaoAtendimentoRepository = regiaoAtendimentoRepository;
        this.equipamentoRepository = equipamentoRepository;
        this.modeloEquipamentoRepository = modeloEquipamentoRepository;
        this.garantiaRepository = garantiaRepository;
    }

    @Transactional(readOnly = true)
    public List<ClienteResponse> listarClientes() {
        return clienteRepository.findAll().stream()
                .map(ClientMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public ClienteResponse buscarCliente(Long id) {
        Cliente cliente = clienteRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Cliente não encontrado"));
        return ClientMapper.toResponse(cliente);
    }

    @Transactional
    public ClienteResponse criarCliente(ClienteRequest request) {
        if (clienteRepository.findByDocumento(request.getCnpj()).isPresent()) {
            throw new IllegalArgumentException("Documento já cadastrado");
        }

        Cliente cliente = new Cliente();
        cliente.setRazaoSocial(request.getNome());
        cliente.setDocumento(request.getCnpj());
        cliente.setNomeFantasia(request.getNomeFantasia());
        cliente.setTelefone(request.getTelefone());
        cliente.setEmail(request.getEmail());
        cliente.setContatoResponsavel(request.getContatoResponsavel());
        cliente.setEndereco(request.getEndereco());
        cliente.setCodigo(definirCodigo(request.getCodigo()));
        cliente.setCategoria(buscarCategoria(request.getCategoriaId()));
        cliente.setRegiaoAtendimento(buscarRegiao(request.getRegiaoAtendimentoId()));

        clienteRepository.save(cliente);
        return ClientMapper.toResponse(cliente);
    }

    @Transactional
    public ClienteResponse atualizarCliente(Long id, ClienteRequest request) {
        Cliente cliente = clienteRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Cliente não encontrado"));
        cliente.setRazaoSocial(request.getNome());
        cliente.setDocumento(request.getCnpj());
        cliente.setNomeFantasia(request.getNomeFantasia());
        cliente.setTelefone(request.getTelefone());
        cliente.setEmail(request.getEmail());
        cliente.setContatoResponsavel(request.getContatoResponsavel());
        cliente.setEndereco(request.getEndereco());
        if (cliente.getCodigo() == null) {
            cliente.setCodigo(definirCodigo(request.getCodigo()));
        }
        cliente.setCategoria(buscarCategoria(request.getCategoriaId()));
        cliente.setRegiaoAtendimento(buscarRegiao(request.getRegiaoAtendimentoId()));
        return ClientMapper.toResponse(cliente);
    }

    @Transactional
    public void removerCliente(Long id) {
        Cliente cliente = clienteRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Cliente não encontrado"));
        clienteRepository.delete(cliente);
    }

    @Transactional
    public ClienteUnidadeResponse criarUnidade(ClienteUnidadeRequest request) {
        Cliente cliente = clienteRepository.findById(request.getClienteId())
                .orElseThrow(() -> new IllegalArgumentException("Cliente não encontrado"));

        ClienteUnidade unidade = new ClienteUnidade();
        unidade.setCliente(cliente);
        unidade.setNome(request.getNome());
        unidade.setCodigo(request.getCodigo());
        unidade.setMatriz(request.getMatriz());
        unidade.setRegiaoAtendimento(buscarRegiao(request.getRegiaoAtendimentoId()));
        unidade.setEndereco(construirEndereco(request.getEndereco()));

        cliente.getUnidades().add(unidade);

        clienteRepository.save(cliente);
        return ClientMapper.toUnidadeResponse(unidade);
    }

    @Transactional
    public ClienteUnidadeResponse atualizarUnidade(Long unidadeId, ClienteUnidadeRequest request) {
        ClienteUnidade unidade = clienteUnidadeRepository.findById(unidadeId)
                .orElseThrow(() -> new IllegalArgumentException("Unidade não encontrada"));

        unidade.setNome(request.getNome());
        unidade.setCodigo(request.getCodigo());
        unidade.setMatriz(request.getMatriz());
        unidade.setRegiaoAtendimento(buscarRegiao(request.getRegiaoAtendimentoId()));
        atualizarEndereco(unidade, request.getEndereco());

        return ClientMapper.toUnidadeResponse(unidade);
    }

    @Transactional(readOnly = true)
    public ClienteUnidadeResponse buscarUnidade(Long unidadeId) {
        ClienteUnidade unidade = clienteUnidadeRepository.findById(unidadeId)
                .orElseThrow(() -> new IllegalArgumentException("Unidade não encontrada"));
        return ClientMapper.toUnidadeResponse(unidade);
    }

    @Transactional(readOnly = true)
    public List<ClienteUnidadeResponse> listarUnidadesDoCliente(Long clienteId) {
        Cliente cliente = clienteRepository.findById(clienteId)
                .orElseThrow(() -> new IllegalArgumentException("Cliente não encontrado"));
        return cliente.getUnidades().stream()
                .map(ClientMapper::toUnidadeResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public void removerUnidade(Long unidadeId) {
        ClienteUnidade unidade = clienteUnidadeRepository.findById(unidadeId)
                .orElseThrow(() -> new IllegalArgumentException("Unidade não encontrada"));
        clienteUnidadeRepository.delete(unidade);
    }

    @Transactional
    public ClienteContatoResponse adicionarContato(ClienteContatoRequest request) {
        ClienteUnidade unidade = clienteUnidadeRepository.findById(request.getUnidadeId())
                .orElseThrow(() -> new IllegalArgumentException("Unidade não encontrada"));

        ClienteContato contato = new ClienteContato();
        contato.setUnidade(unidade);
        contato.setNome(request.getNome());
        contato.setCargo(request.getCargo());
        contato.setEmail(request.getEmail());
        contato.setTelefone(request.getTelefone());

        unidade.getContatos().add(contato);
        clienteUnidadeRepository.save(unidade);

        return ClientMapper.toContatoResponse(contato);
    }

    @Transactional(readOnly = true)
    public List<ClienteContatoResponse> listarContatos(Long unidadeId) {
        ClienteUnidade unidade = clienteUnidadeRepository.findById(unidadeId)
                .orElseThrow(() -> new IllegalArgumentException("Unidade não encontrada"));
        return unidade.getContatos().stream()
                .map(ClientMapper::toContatoResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public ClienteContatoResponse atualizarContato(Long contatoId, ClienteContatoRequest request) {
        ClienteContato contato = clienteContatoRepository.findById(contatoId)
                .orElseThrow(() -> new IllegalArgumentException("Contato não encontrado"));
        if (request.getUnidadeId() != null && !contato.getUnidade().getId().equals(request.getUnidadeId())) {
            ClienteUnidade unidade = clienteUnidadeRepository.findById(request.getUnidadeId())
                    .orElseThrow(() -> new IllegalArgumentException("Unidade não encontrada"));
            contato.setUnidade(unidade);
        }
        contato.setNome(request.getNome());
        contato.setCargo(request.getCargo());
        contato.setEmail(request.getEmail());
        contato.setTelefone(request.getTelefone());
        return ClientMapper.toContatoResponse(contato);
    }

    @Transactional
    public void removerContato(Long contatoId) {
        ClienteContato contato = clienteContatoRepository.findById(contatoId)
                .orElseThrow(() -> new IllegalArgumentException("Contato não encontrado"));
        clienteContatoRepository.delete(contato);
    }

    @Transactional
    public EquipamentoResponse cadastrarEquipamento(EquipamentoRequest request) {
        ClienteUnidade unidade = clienteUnidadeRepository.findById(request.getUnidadeId())
                .orElseThrow(() -> new IllegalArgumentException("Unidade não encontrada"));

        Equipamento equipamento = new Equipamento();
        equipamento.setUnidade(unidade);
        equipamento.setModelo(buscarModelo(request.getModeloId()));
        equipamento.setNumeroSerie(request.getNumeroSerie());
        equipamento.setDataInstalacao(request.getDataInstalacao());
        equipamento.setStatus(request.getStatus() != null ? EquipamentoStatus.valueOf(request.getStatus()) : EquipamentoStatus.ATIVO);
        equipamento.setObservacoes(request.getObservacoes());

        Garantia garantia = construirGarantia(request.getGarantia());
        if (garantia != null) {
            garantiaRepository.save(garantia);
            equipamento.setGarantia(garantia);
        }

        unidade.getCliente().getUnidades().stream()
                .filter(u -> u.getId().equals(unidade.getId()))
                .findFirst();

        equipamentoRepository.save(equipamento);
        return ClientMapper.toEquipamentoResponse(equipamento);
    }

    @Transactional
    public EquipamentoResponse atualizarEquipamento(Long equipamentoId, EquipamentoRequest request) {
        Equipamento equipamento = equipamentoRepository.findById(equipamentoId)
                .orElseThrow(() -> new IllegalArgumentException("Equipamento não encontrado"));
        if (request.getUnidadeId() != null && !request.getUnidadeId().equals(equipamento.getUnidade().getId())) {
            ClienteUnidade unidade = clienteUnidadeRepository.findById(request.getUnidadeId())
                    .orElseThrow(() -> new IllegalArgumentException("Unidade não encontrada"));
            equipamento.setUnidade(unidade);
        }
        equipamento.setModelo(buscarModelo(request.getModeloId()));
        equipamento.setNumeroSerie(request.getNumeroSerie());
        equipamento.setDataInstalacao(request.getDataInstalacao());
        equipamento.setStatus(request.getStatus() != null ? EquipamentoStatus.valueOf(request.getStatus()) : EquipamentoStatus.ATIVO);
        equipamento.setObservacoes(request.getObservacoes());

        Garantia garantia = equipamento.getGarantia();
        if (request.getGarantia() == null) {
            equipamento.setGarantia(null);
        } else {
            if (garantia == null) {
                garantia = new Garantia();
            }
            garantia.setDataInicio(request.getGarantia().getDataInicio());
            garantia.setDataFim(request.getGarantia().getDataFim());
            garantia.setProrrogada(request.getGarantia().getProrrogada());
            garantia.setObservacoes(request.getGarantia().getObservacoes());
            garantiaRepository.save(garantia);
            equipamento.setGarantia(garantia);
        }

        return ClientMapper.toEquipamentoResponse(equipamento);
    }

    @Transactional
    public void removerEquipamento(Long equipamentoId) {
        Equipamento equipamento = equipamentoRepository.findById(equipamentoId)
                .orElseThrow(() -> new IllegalArgumentException("Equipamento não encontrado"));
        equipamentoRepository.delete(equipamento);
    }

    @Transactional(readOnly = true)
    public List<EquipamentoResponse> listarEquipamentosDaUnidade(Long unidadeId) {
        return equipamentoRepository.findByUnidadeId(unidadeId).stream()
                .map(ClientMapper::toEquipamentoResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<CategoriaClienteResponse> listarCategorias() {
        return categoriaClienteRepository.findAll().stream()
                .map(ClientMapper::toCategoriaResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<RegiaoAtendimentoResponse> listarRegioes() {
        return regiaoAtendimentoRepository.findAll().stream()
                .map(ClientMapper::toRegiaoResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<ModeloEquipamentoResponse> listarModelos() {
        return modeloEquipamentoRepository.findAll().stream()
                .map(modelo -> {
                    ModeloEquipamentoResponse response = new ModeloEquipamentoResponse();
                    response.setId(modelo.getId());
                    response.setNome(modelo.getNome());
                    response.setFabricante(modelo.getFabricante());
                    response.setDescricao(modelo.getDescricao());
                    return response;
                })
                .collect(Collectors.toList());
    }

    private CategoriaCliente buscarCategoria(Long categoriaId) {
        if (categoriaId == null) {
            return null;
        }
        return categoriaClienteRepository.findById(categoriaId)
                .orElseThrow(() -> new IllegalArgumentException("Categoria não encontrada"));
    }

    private RegiaoAtendimento buscarRegiao(Long regiaoId) {
        if (regiaoId == null) {
            return null;
        }
        return regiaoAtendimentoRepository.findById(regiaoId)
                .orElseThrow(() -> new IllegalArgumentException("Região de atendimento não encontrada"));
    }

    private ModeloEquipamento buscarModelo(Long modeloId) {
        if (modeloId == null) {
            return null;
        }
        return modeloEquipamentoRepository.findById(modeloId)
                .orElseThrow(() -> new IllegalArgumentException("Modelo de equipamento não encontrado"));
    }

    private Endereco construirEndereco(EnderecoRequest request) {
        if (request == null) {
            return null;
        }
        Endereco endereco = new Endereco();
        endereco.setCep(request.getCep());
        endereco.setCidade(request.getCidade());
        endereco.setUf(request.getUf());
        endereco.setLogradouro(request.getLogradouro());
        endereco.setNumero(request.getNumero());
        endereco.setComplemento(request.getComplemento());
        endereco.setBairro(request.getBairro());
        endereco.setReferencia(request.getReferencia());
        endereco.setPais(request.getPais());
        if (request.getLatitude() != null || request.getLongitude() != null) {
            GeoReference geo = new GeoReference();
            geo.setLatitude(request.getLatitude());
            geo.setLongitude(request.getLongitude());
            endereco.setGeoReference(geo);
        }
        return endereco;
    }

    private void atualizarEndereco(ClienteUnidade unidade, EnderecoRequest request) {
        if (request == null) {
            unidade.setEndereco(null);
            return;
        }
        Endereco endereco = unidade.getEndereco();
        if (endereco == null) {
            endereco = construirEndereco(request);
            unidade.setEndereco(endereco);
            return;
        }
        endereco.setCep(request.getCep());
        endereco.setCidade(request.getCidade());
        endereco.setUf(request.getUf());
        endereco.setLogradouro(request.getLogradouro());
        endereco.setNumero(request.getNumero());
        endereco.setComplemento(request.getComplemento());
        endereco.setBairro(request.getBairro());
        endereco.setReferencia(request.getReferencia());
        endereco.setPais(request.getPais());
        if (request.getLatitude() != null || request.getLongitude() != null) {
            GeoReference geo = endereco.getGeoReference();
            if (geo == null) {
                geo = new GeoReference();
            }
            geo.setLatitude(request.getLatitude());
            geo.setLongitude(request.getLongitude());
            endereco.setGeoReference(geo);
        }
    }

    private Garantia construirGarantia(GarantiaRequest request) {
        if (request == null) {
            return null;
        }
        Garantia garantia = new Garantia();
        garantia.setDataInicio(request.getDataInicio());
        garantia.setDataFim(request.getDataFim());
        garantia.setProrrogada(request.getProrrogada());
        garantia.setObservacoes(request.getObservacoes());
        return garantia;
    }

    private String definirCodigo(String codigo) {
        if (codigo != null && !codigo.isBlank()) {
            return codigo;
        }
        return "CLI-" + UUID.randomUUID().toString().substring(0, 6).toUpperCase();
    }
}
