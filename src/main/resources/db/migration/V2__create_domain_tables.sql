-- Full schema aligned with JPA entities.
-- The migration drops previous artifacts (from the initial baseline) and recreates all tables
-- with the correct columns, constraints and relationships.

-- Cleanup previous objects
DROP TABLE IF EXISTS role_permission_grants CASCADE;
DROP TABLE IF EXISTS user_role_grants CASCADE;
DROP TABLE IF EXISTS technician_regions CASCADE;
DROP TABLE IF EXISTS technician_team_members CASCADE;
DROP TABLE IF EXISTS notification_recipients CASCADE;
DROP TABLE IF EXISTS mensagens_internas CASCADE;
DROP TABLE IF EXISTS informativo_leituras CASCADE;
DROP TABLE IF EXISTS informativo_destinos CASCADE;
DROP TABLE IF EXISTS chat_os CASCADE;
DROP TABLE IF EXISTS notifications CASCADE;
DROP TABLE IF EXISTS informativos CASCADE;
DROP TABLE IF EXISTS alertas_garantia CASCADE;
DROP TABLE IF EXISTS alertas_prazo CASCADE;
DROP TABLE IF EXISTS eventos_agenda CASCADE;
DROP TABLE IF EXISTS os_defeitos_selecionados CASCADE;
DROP TABLE IF EXISTS os_checklists_tecnico CASCADE;
DROP TABLE IF EXISTS os_agendamentos CASCADE;
DROP TABLE IF EXISTS os_relatorios CASCADE;
DROP TABLE IF EXISTS os_assinaturas_digitais CASCADE;
DROP TABLE IF EXISTS os_fotos CASCADE;
DROP TABLE IF EXISTS os_arquivos CASCADE;
DROP TABLE IF EXISTS os_materiais CASCADE;
DROP TABLE IF EXISTS os_custos_km CASCADE;
DROP TABLE IF EXISTS os_custos_deslocamento CASCADE;
DROP TABLE IF EXISTS os_custos_hora CASCADE;
DROP TABLE IF EXISTS os_custos_estrutura CASCADE;
DROP TABLE IF EXISTS os_custos_resumo CASCADE;
DROP TABLE IF EXISTS os_pendencias CASCADE;
DROP TABLE IF EXISTS os_comentarios CASCADE;
DROP TABLE IF EXISTS os_chamados CASCADE;
DROP TABLE IF EXISTS os_status_historico CASCADE;
DROP TABLE IF EXISTS ordens_servico CASCADE;
DROP TABLE IF EXISTS catalogo_defeitos CASCADE;
DROP TABLE IF EXISTS subcategorias_defeito CASCADE;
DROP TABLE IF EXISTS categorias_defeito CASCADE;
DROP TABLE IF EXISTS tipos_servico CASCADE;
DROP TABLE IF EXISTS equipamentos CASCADE;
DROP TABLE IF EXISTS modelos_equipamento CASCADE;
DROP TABLE IF EXISTS garantias CASCADE;
DROP TABLE IF EXISTS cliente_contatos CASCADE;
DROP TABLE IF EXISTS cliente_unidades CASCADE;
DROP TABLE IF EXISTS clientes CASCADE;
DROP TABLE IF EXISTS regioes_atendimento CASCADE;
DROP TABLE IF EXISTS categorias_cliente CASCADE;
DROP TABLE IF EXISTS disponibilidades_tecnico CASCADE;
DROP TABLE IF EXISTS technician_teams CASCADE;
DROP TABLE IF EXISTS export_jobs CASCADE;
DROP TABLE IF EXISTS export_templates CASCADE;
DROP TABLE IF EXISTS import_jobs CASCADE;
DROP TABLE IF EXISTS parametros_sistema CASCADE;
DROP TABLE IF EXISTS integracoes_externas CASCADE;
DROP TABLE IF EXISTS feature_toggles CASCADE;
DROP TABLE IF EXISTS configuracoes_financeiras CASCADE;
DROP TABLE IF EXISTS audit_logs CASCADE;
DROP TABLE IF EXISTS password_reset_tokens CASCADE;
DROP TABLE IF EXISTS session_tokens CASCADE;
DROP TABLE IF EXISTS refresh_tokens CASCADE;
DROP TABLE IF EXISTS user_roles CASCADE;
DROP TABLE IF EXISTS technician_profiles CASCADE;
DROP TABLE IF EXISTS user_profiles CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS role_permissions CASCADE;
DROP TABLE IF EXISTS roles CASCADE;
DROP TABLE IF EXISTS permissions CASCADE;
DROP TABLE IF EXISTS enderecos CASCADE;
DROP TABLE IF EXISTS geo_references CASCADE;

-- Auth tables
CREATE TABLE permissions (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(120) UNIQUE NOT NULL,
    description VARCHAR(255),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMP,
    version BIGINT
);

CREATE TABLE roles (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(120) UNIQUE NOT NULL,
    description VARCHAR(255),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMP,
    version BIGINT
);

CREATE TABLE role_permissions (
    id BIGSERIAL PRIMARY KEY,
    role_id BIGINT NOT NULL REFERENCES roles(id),
    permission_id BIGINT NOT NULL REFERENCES permissions(id),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMP,
    version BIGINT
);

CREATE TABLE role_permission_grants (
    role_permission_id BIGINT NOT NULL REFERENCES role_permissions(id) ON DELETE CASCADE,
    grant_value VARCHAR(255) NOT NULL,
    PRIMARY KEY (role_permission_id, grant_value)
);

CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    status VARCHAR(32) NOT NULL,
    enterprise_id BIGINT,
    cliente_id BIGINT,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMP,
    version BIGINT
);

CREATE TABLE user_profiles (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL UNIQUE REFERENCES users(id),
    phone VARCHAR(20),
    document_number VARCHAR(14),
    time_zone VARCHAR(80),
    avatar_url VARCHAR(255),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMP,
    version BIGINT
);

CREATE TABLE technician_profiles (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL UNIQUE REFERENCES users(id),
    specialty VARCHAR(120),
    level VARCHAR(80),
    available BOOLEAN,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMP,
    version BIGINT
);

CREATE TABLE technician_regions (
    technician_profile_id BIGINT NOT NULL REFERENCES technician_profiles(id) ON DELETE CASCADE,
    region_code VARCHAR(255) NOT NULL,
    PRIMARY KEY (technician_profile_id, region_code)
);

CREATE TABLE user_roles (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id),
    role_id BIGINT NOT NULL REFERENCES roles(id),
    granted_at TIMESTAMPTZ,
    granted_by_user_id BIGINT,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMP,
    version BIGINT
);

CREATE TABLE user_role_grants (
    user_role_id BIGINT NOT NULL REFERENCES user_roles(id) ON DELETE CASCADE,
    grant_value VARCHAR(255) NOT NULL,
    PRIMARY KEY (user_role_id, grant_value)
);

CREATE TABLE refresh_tokens (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id),
    token VARCHAR(512) UNIQUE NOT NULL,
    expires_at TIMESTAMPTZ NOT NULL,
    revoked BOOLEAN NOT NULL DEFAULT FALSE,
    device_fingerprint VARCHAR(255),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMP,
    version BIGINT
);

CREATE TABLE session_tokens (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id),
    token VARCHAR(512) UNIQUE NOT NULL,
    type VARCHAR(32) NOT NULL,
    expires_at TIMESTAMPTZ NOT NULL,
    revoked BOOLEAN NOT NULL DEFAULT FALSE,
    user_agent VARCHAR(255),
    ip_address VARCHAR(64),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMP,
    version BIGINT
);

CREATE TABLE password_reset_tokens (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id),
    token VARCHAR(64) UNIQUE NOT NULL,
    expires_at TIMESTAMPTZ NOT NULL,
    used BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMP,
    version BIGINT
);

CREATE TABLE audit_logs (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id),
    action VARCHAR(120) NOT NULL,
    entity_name VARCHAR(120),
    entity_id BIGINT,
    details TEXT,
    ip_address VARCHAR(64),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMP,
    version BIGINT
);

-- Common
CREATE TABLE enderecos (
    id BIGSERIAL PRIMARY KEY,
    cep VARCHAR(60) NOT NULL,
    cidade VARCHAR(120) NOT NULL,
    uf VARCHAR(10) NOT NULL,
    logradouro VARCHAR(255) NOT NULL,
    numero VARCHAR(120),
    complemento VARCHAR(255),
    bairro VARCHAR(120),
    referencia VARCHAR(255),
    pais VARCHAR(120),
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMP,
    version BIGINT
);

-- Configuracao
CREATE TABLE configuracoes_financeiras (
    id BIGSERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    vigente_de TIMESTAMPTZ NOT NULL,
    vigente_ate TIMESTAMPTZ,
    valor_hora_trabalhada NUMERIC(15, 2),
    valor_hora_deslocamento NUMERIC(15, 2),
    valor_km_rodado NUMERIC(15, 2),
    versao INTEGER NOT NULL,
    ativo BOOLEAN NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMP,
    version BIGINT
);

CREATE TABLE feature_toggles (
    id BIGSERIAL PRIMARY KEY,
    chave VARCHAR(255) UNIQUE NOT NULL,
    descricao VARCHAR(255),
    ativo BOOLEAN NOT NULL,
    segmento VARCHAR(64),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMP,
    version BIGINT
);

CREATE TABLE integracoes_externas (
    id BIGSERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    tipo VARCHAR(64) NOT NULL,
    configuracao TEXT,
    ativo BOOLEAN NOT NULL,
    ultima_execucao TIMESTAMPTZ,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMP,
    version BIGINT
);

CREATE TABLE parametros_sistema (
    id BIGSERIAL PRIMARY KEY,
    chave VARCHAR(255) UNIQUE NOT NULL,
    valor VARCHAR(255) NOT NULL,
    descricao VARCHAR(255),
    escopo VARCHAR(64),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMP,
    version BIGINT
);

CREATE TABLE import_jobs (
    id BIGSERIAL PRIMARY KEY,
    recurso VARCHAR(255) NOT NULL,
    status VARCHAR(32) NOT NULL,
    iniciado_em TIMESTAMPTZ,
    finalizado_em TIMESTAMPTZ,
    detalhes TEXT,
    disparado_por BIGINT REFERENCES users(id),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMP,
    version BIGINT
);

CREATE TABLE export_templates (
    id BIGSERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    descricao VARCHAR(255),
    formato VARCHAR(16) NOT NULL,
    configuracao TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMP,
    version BIGINT
);

CREATE TABLE export_jobs (
    id BIGSERIAL PRIMARY KEY,
    template_id BIGINT REFERENCES export_templates(id),
    solicitado_por BIGINT REFERENCES users(id),
    status VARCHAR(32) NOT NULL,
    filtros TEXT,
    caminho_arquivo VARCHAR(255),
    incluir_fotos BOOLEAN NOT NULL DEFAULT FALSE,
    incluir_assinaturas BOOLEAN NOT NULL DEFAULT FALSE,
    iniciado_em TIMESTAMPTZ,
    finalizado_em TIMESTAMPTZ,
    expira_em TIMESTAMPTZ,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMP,
    version BIGINT
);

-- Tecnico
CREATE TABLE disponibilidades_tecnico (
    id BIGSERIAL PRIMARY KEY,
    tecnico_id BIGINT NOT NULL REFERENCES users(id),
    inicio TIMESTAMPTZ NOT NULL,
    fim TIMESTAMPTZ NOT NULL,
    status VARCHAR(32) NOT NULL,
    motivo VARCHAR(255),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMP,
    version BIGINT
);

CREATE TABLE technician_teams (
    id BIGSERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    descricao VARCHAR(255),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMP,
    version BIGINT
);

CREATE TABLE technician_team_members (
    team_id BIGINT NOT NULL REFERENCES technician_teams(id) ON DELETE CASCADE,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    PRIMARY KEY (team_id, user_id)
);

-- Client
CREATE TABLE categorias_cliente (
    id BIGSERIAL PRIMARY KEY,
    nome VARCHAR(255) UNIQUE NOT NULL,
    descricao VARCHAR(255),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMP,
    version BIGINT
);

CREATE TABLE regioes_atendimento (
    id BIGSERIAL PRIMARY KEY,
    codigo VARCHAR(50) UNIQUE NOT NULL,
    nome VARCHAR(255) NOT NULL,
    descricao VARCHAR(255),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMP,
    version BIGINT
);

CREATE TABLE clientes (
    id BIGSERIAL PRIMARY KEY,
    razao_social VARCHAR(255) NOT NULL,
    documento VARCHAR(18) UNIQUE NOT NULL,
    nome_fantasia VARCHAR(120),
    codigo VARCHAR(20) UNIQUE,
    telefone VARCHAR(120),
    email VARCHAR(120),
    contato_responsavel VARCHAR(120),
    endereco VARCHAR(255),
    categoria_id BIGINT REFERENCES categorias_cliente(id),
    regiao_id BIGINT REFERENCES regioes_atendimento(id),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMP,
    version BIGINT
);

CREATE TABLE cliente_unidades (
    id BIGSERIAL PRIMARY KEY,
    cliente_id BIGINT NOT NULL REFERENCES clientes(id),
    endereco_id BIGINT REFERENCES enderecos(id),
    nome VARCHAR(255) NOT NULL,
    codigo VARCHAR(32),
    matriz BOOLEAN,
    regiao_id BIGINT REFERENCES regioes_atendimento(id),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMP,
    version BIGINT
);

CREATE TABLE cliente_contatos (
    id BIGSERIAL PRIMARY KEY,
    unidade_id BIGINT NOT NULL REFERENCES cliente_unidades(id),
    nome VARCHAR(255) NOT NULL,
    cargo VARCHAR(120),
    email VARCHAR(120),
    telefone VARCHAR(20),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMP,
    version BIGINT
);

CREATE TABLE garantias (
    id BIGSERIAL PRIMARY KEY,
    data_inicio DATE NOT NULL,
    data_fim DATE NOT NULL,
    prorrogada BOOLEAN,
    observacoes VARCHAR(255),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMP,
    version BIGINT
);

CREATE TABLE modelos_equipamento (
    id BIGSERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    fabricante VARCHAR(120),
    descricao VARCHAR(255),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMP,
    version BIGINT
);

CREATE TABLE equipamentos (
    id BIGSERIAL PRIMARY KEY,
    unidade_id BIGINT NOT NULL REFERENCES cliente_unidades(id),
    modelo_id BIGINT REFERENCES modelos_equipamento(id),
    garantia_id BIGINT REFERENCES garantias(id),
    numero_serie VARCHAR(64),
    data_instalacao DATE,
    status VARCHAR(32) NOT NULL,
    observacoes VARCHAR(255),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMP,
    version BIGINT
);

-- Ordem de Servico
CREATE TABLE tipos_servico (
    id BIGSERIAL PRIMARY KEY,
    nome VARCHAR(255) UNIQUE NOT NULL,
    descricao VARCHAR(255),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMP,
    version BIGINT
);

CREATE TABLE categorias_defeito (
    id BIGSERIAL PRIMARY KEY,
    nome VARCHAR(255) UNIQUE NOT NULL,
    descricao VARCHAR(255),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMP,
    version BIGINT
);

CREATE TABLE subcategorias_defeito (
    id BIGSERIAL PRIMARY KEY,
    categoria_id BIGINT NOT NULL REFERENCES categorias_defeito(id),
    nome VARCHAR(255) NOT NULL,
    descricao VARCHAR(255),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMP,
    version BIGINT
);

CREATE TABLE catalogo_defeitos (
    id BIGSERIAL PRIMARY KEY,
    subcategoria_id BIGINT REFERENCES subcategorias_defeito(id),
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT,
    codigo VARCHAR(64),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMP,
    version BIGINT
);

CREATE TABLE ordens_servico (
    id BIGSERIAL PRIMARY KEY,
    numero_os VARCHAR(36) UNIQUE NOT NULL,
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT,
    cliente_id BIGINT NOT NULL REFERENCES clientes(id),
    unidade_id BIGINT NOT NULL REFERENCES cliente_unidades(id),
    tecnico_id BIGINT REFERENCES users(id),
    tipo_servico_id BIGINT REFERENCES tipos_servico(id),
    created_by BIGINT REFERENCES users(id),
    status VARCHAR(32) NOT NULL,
    prioridade VARCHAR(16),
    data_abertura TIMESTAMPTZ,
    data_inicio TIMESTAMPTZ,
    data_conclusao TIMESTAMPTZ,
    data_aprovacao TIMESTAMPTZ,
    data_cancelamento TIMESTAMPTZ,
    sla_limite TIMESTAMPTZ,
    em_garantia BOOLEAN,
    custo_total NUMERIC(15, 2),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMP,
    version BIGINT
);

CREATE TABLE os_status_historico (
    id BIGSERIAL PRIMARY KEY,
    os_id BIGINT NOT NULL REFERENCES ordens_servico(id),
    status VARCHAR(32) NOT NULL,
    registrado_em TIMESTAMPTZ NOT NULL,
    alterado_por BIGINT REFERENCES users(id),
    justificativa VARCHAR(255),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMP,
    version BIGINT
);

CREATE TABLE os_chamados (
    id BIGSERIAL PRIMARY KEY,
    os_id BIGINT NOT NULL REFERENCES ordens_servico(id),
    equipamento_id BIGINT REFERENCES equipamentos(id),
    descricao_original TEXT NOT NULL,
    observacoes_tecnico TEXT,
    status VARCHAR(32) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMP,
    version BIGINT
);

CREATE TABLE os_comentarios (
    id BIGSERIAL PRIMARY KEY,
    os_id BIGINT NOT NULL REFERENCES ordens_servico(id),
    autor_id BIGINT REFERENCES users(id),
    conteudo TEXT NOT NULL,
    interno BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMP,
    version BIGINT
);

CREATE TABLE os_pendencias (
    id BIGSERIAL PRIMARY KEY,
    os_id BIGINT NOT NULL REFERENCES ordens_servico(id),
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT,
    status VARCHAR(32) NOT NULL,
    vencimento TIMESTAMPTZ,
    resolvido_em TIMESTAMPTZ,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMP,
    version BIGINT
);

CREATE TABLE os_arquivos (
    id BIGSERIAL PRIMARY KEY,
    os_id BIGINT NOT NULL REFERENCES ordens_servico(id),
    nome_original VARCHAR(255) NOT NULL,
    caminho_storage VARCHAR(500) NOT NULL,
    content_type VARCHAR(120),
    tamanho_bytes BIGINT,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMP,
    version BIGINT
);

CREATE TABLE os_fotos (
    id BIGSERIAL PRIMARY KEY,
    arquivo_id BIGINT NOT NULL UNIQUE REFERENCES os_arquivos(id) ON DELETE CASCADE,
    descricao VARCHAR(255),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMP,
    version BIGINT
);

CREATE TABLE os_assinaturas_digitais (
    id BIGSERIAL PRIMARY KEY,
    arquivo_id BIGINT NOT NULL UNIQUE REFERENCES os_arquivos(id) ON DELETE CASCADE,
    nome_signatario VARCHAR(255) NOT NULL,
    documento_signatario VARCHAR(120),
    assinado_em TIMESTAMPTZ,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMP,
    version BIGINT
);

CREATE TABLE os_relatorios (
    id BIGSERIAL PRIMARY KEY,
    arquivo_id BIGINT NOT NULL UNIQUE REFERENCES os_arquivos(id) ON DELETE CASCADE,
    tipo_relatorio VARCHAR(255),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMP,
    version BIGINT
);

CREATE TABLE os_agendamentos (
    id BIGSERIAL PRIMARY KEY,
    os_id BIGINT NOT NULL REFERENCES ordens_servico(id),
    tecnico_id BIGINT REFERENCES users(id),
    inicio_previsto TIMESTAMPTZ NOT NULL,
    fim_previsto TIMESTAMPTZ NOT NULL,
    inicio_real TIMESTAMPTZ,
    fim_real TIMESTAMPTZ,
    status VARCHAR(32) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMP,
    version BIGINT
);

CREATE TABLE eventos_agenda (
    id BIGSERIAL PRIMARY KEY,
    agendamento_id BIGINT NOT NULL UNIQUE REFERENCES os_agendamentos(id) ON DELETE CASCADE,
    usuario_id BIGINT REFERENCES users(id),
    inicio TIMESTAMPTZ NOT NULL,
    fim TIMESTAMPTZ NOT NULL,
    titulo VARCHAR(255) NOT NULL,
    tipo VARCHAR(64),
    localizacao VARCHAR(120),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMP,
    version BIGINT
);

CREATE TABLE os_checklists_tecnico (
    id BIGSERIAL PRIMARY KEY,
    os_id BIGINT NOT NULL REFERENCES ordens_servico(id),
    titulo VARCHAR(255) NOT NULL,
    observacoes TEXT,
    aprovado BOOLEAN NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMP,
    version BIGINT
);

CREATE TABLE os_defeitos_selecionados (
    id BIGSERIAL PRIMARY KEY,
    checklist_id BIGINT NOT NULL REFERENCES os_checklists_tecnico(id),
    catalogo_defeito_id BIGINT REFERENCES catalogo_defeitos(id),
    severidade VARCHAR(120),
    observacoes TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMP,
    version BIGINT
);

CREATE TABLE os_custos_resumo (
    id BIGSERIAL PRIMARY KEY,
    os_id BIGINT NOT NULL REFERENCES ordens_servico(id),
    total_estrutura NUMERIC(15, 2),
    total_horas NUMERIC(15, 2),
    total_materiais NUMERIC(15, 2),
    total_deslocamento NUMERIC(15, 2),
    total_km NUMERIC(15, 2),
    total_geral NUMERIC(15, 2),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMP,
    version BIGINT
);

CREATE TABLE os_custos_estrutura (
    id BIGSERIAL PRIMARY KEY,
    resumo_id BIGINT NOT NULL REFERENCES os_custos_resumo(id),
    registrado_por BIGINT REFERENCES users(id),
    descricao VARCHAR(255) NOT NULL,
    quantidade NUMERIC(10, 2),
    valor_unitario NUMERIC(15, 2),
    valor_total NUMERIC(15, 2),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMP,
    version BIGINT
);

CREATE TABLE os_custos_hora (
    id BIGSERIAL PRIMARY KEY,
    resumo_id BIGINT NOT NULL REFERENCES os_custos_resumo(id),
    tecnico_id BIGINT REFERENCES users(id),
    horas NUMERIC(10, 2),
    valor_hora NUMERIC(15, 2),
    valor_total NUMERIC(15, 2),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMP,
    version BIGINT
);

CREATE TABLE os_custos_deslocamento (
    id BIGSERIAL PRIMARY KEY,
    resumo_id BIGINT NOT NULL REFERENCES os_custos_resumo(id),
    tempo_deslocamento_horas NUMERIC(10, 2),
    valor_hora_deslocamento NUMERIC(15, 2),
    valor_total NUMERIC(15, 2),
    observacoes VARCHAR(255),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMP,
    version BIGINT
);

CREATE TABLE os_custos_km (
    id BIGSERIAL PRIMARY KEY,
    resumo_id BIGINT NOT NULL REFERENCES os_custos_resumo(id),
    distancia_km NUMERIC(10, 2),
    valor_km NUMERIC(15, 2),
    valor_total NUMERIC(15, 2),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMP,
    version BIGINT
);

CREATE TABLE os_materiais (
    id BIGSERIAL PRIMARY KEY,
    resumo_id BIGINT NOT NULL REFERENCES os_custos_resumo(id),
    descricao VARCHAR(255) NOT NULL,
    quantidade NUMERIC(10, 2),
    valor_unitario NUMERIC(15, 2),
    valor_total NUMERIC(15, 2),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMP,
    version BIGINT
);

CREATE TABLE alertas_garantia (
    id BIGSERIAL PRIMARY KEY,
    os_id BIGINT REFERENCES ordens_servico(id),
    equipamento_id BIGINT REFERENCES equipamentos(id),
    gerado_em TIMESTAMPTZ NOT NULL,
    tratado BOOLEAN NOT NULL,
    observacoes VARCHAR(255),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMP,
    version BIGINT
);

CREATE TABLE alertas_prazo (
    id BIGSERIAL PRIMARY KEY,
    os_id BIGINT REFERENCES ordens_servico(id),
    prazo_limite TIMESTAMPTZ NOT NULL,
    violado BOOLEAN NOT NULL,
    resolvido_em TIMESTAMPTZ,
    observacoes VARCHAR(255),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMP,
    version BIGINT
);

-- Comunicacao
CREATE TABLE notifications (
    id BIGSERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    mensagem TEXT NOT NULL,
    acao VARCHAR(120),
    ordem_servico_id BIGINT REFERENCES ordens_servico(id),
    emitido_por BIGINT REFERENCES users(id),
    expira_em TIMESTAMPTZ,
    urgente BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMP,
    version BIGINT
);

CREATE TABLE notification_recipients (
    id BIGSERIAL PRIMARY KEY,
    notification_id BIGINT NOT NULL REFERENCES notifications(id),
    user_id BIGINT REFERENCES users(id),
    lido BOOLEAN NOT NULL DEFAULT FALSE,
    lido_em TIMESTAMPTZ,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMP,
    version BIGINT
);

CREATE TABLE chat_os (
    id BIGSERIAL PRIMARY KEY,
    os_id BIGINT NOT NULL UNIQUE REFERENCES ordens_servico(id),
    assunto VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMP,
    version BIGINT
);

CREATE TABLE mensagens_internas (
    id BIGSERIAL PRIMARY KEY,
    chat_id BIGINT NOT NULL REFERENCES chat_os(id),
    autor_id BIGINT REFERENCES users(id),
    conteudo TEXT NOT NULL,
    enviado_em TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMP,
    version BIGINT
);

CREATE TABLE informativos (
    id BIGSERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    conteudo TEXT NOT NULL,
    publico_ate TIMESTAMPTZ,
    urgente BOOLEAN NOT NULL,
    criado_por BIGINT REFERENCES users(id),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMP,
    version BIGINT
);

CREATE TABLE informativo_destinos (
    id BIGSERIAL PRIMARY KEY,
    informativo_id BIGINT NOT NULL REFERENCES informativos(id),
    tipo VARCHAR(32) NOT NULL,
    referencia VARCHAR(120),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMP,
    version BIGINT
);

CREATE TABLE informativo_leituras (
    id BIGSERIAL PRIMARY KEY,
    informativo_id BIGINT NOT NULL REFERENCES informativos(id),
    user_id BIGINT REFERENCES users(id),
    lido_em TIMESTAMPTZ,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMP,
    version BIGINT
);
