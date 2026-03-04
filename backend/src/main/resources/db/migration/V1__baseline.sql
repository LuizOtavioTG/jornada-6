-- Baseline migration for PostgreSQL schema creation.
-- Common
CREATE TABLE IF NOT EXISTS geo_references (
    id BIGSERIAL PRIMARY KEY,
    latitude NUMERIC(10,6),
    longitude NUMERIC(10,6)
);

CREATE TABLE IF NOT EXISTS enderecos (
    id BIGSERIAL PRIMARY KEY,
    cep VARCHAR(20),
    cidade VARCHAR(120),
    uf VARCHAR(5),
    logradouro VARCHAR(255),
    numero VARCHAR(50),
    complemento VARCHAR(255),
    bairro VARCHAR(120),
    referencia VARCHAR(255),
    pais VARCHAR(60),
    geo_reference_id BIGINT REFERENCES geo_references(id)
);

-- Auth
CREATE TABLE IF NOT EXISTS permissions (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(120) UNIQUE NOT NULL,
    description VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS roles (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(120) UNIQUE NOT NULL,
    description VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS role_permissions (
    id BIGSERIAL PRIMARY KEY,
    role_id BIGINT NOT NULL REFERENCES roles(id),
    permission_id BIGINT NOT NULL REFERENCES permissions(id)
);

CREATE TABLE IF NOT EXISTS users (
    id BIGSERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    status VARCHAR(32) NOT NULL,
    enterprise_id BIGINT,
    cliente_id BIGINT,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP DEFAULT NOW() NOT NULL,
    deleted_at TIMESTAMP,
    version BIGINT
);

CREATE TABLE IF NOT EXISTS user_profiles (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id),
    phone VARCHAR(30),
    avatar_url VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS technician_profiles (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL UNIQUE REFERENCES users(id),
    specialty VARCHAR(120),
    level VARCHAR(80),
    available BOOLEAN,
    -- regions served stored as simple text array
    regions_served TEXT[]
);

CREATE TABLE IF NOT EXISTS user_roles (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id),
    role_id BIGINT NOT NULL REFERENCES roles(id),
    granted_at TIMESTAMP,
    granted_by_user_id BIGINT
);

CREATE TABLE IF NOT EXISTS user_role_grants (
    user_role_id BIGINT REFERENCES user_roles(id),
    grant_value VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS refresh_tokens (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id),
    token VARCHAR(255) NOT NULL,
    revoked BOOLEAN DEFAULT FALSE,
    expires_at TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS session_tokens (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id),
    token VARCHAR(255) NOT NULL,
    user_agent VARCHAR(255),
    ip_address VARCHAR(100),
    expires_at TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS password_reset_tokens (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id),
    token VARCHAR(255) NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    used BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS audit_logs (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id),
    action VARCHAR(120) NOT NULL,
    entity_name VARCHAR(255),
    entity_id BIGINT,
    details TEXT,
    ip_address VARCHAR(64),
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP DEFAULT NOW() NOT NULL,
    deleted_at TIMESTAMP,
    version BIGINT
);

-- Client
CREATE TABLE IF NOT EXISTS categorias_cliente (
    id BIGSERIAL PRIMARY KEY,
    nome VARCHAR(255) UNIQUE NOT NULL,
    descricao VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS regioes_atendimento (
    id BIGSERIAL PRIMARY KEY,
    codigo VARCHAR(50) UNIQUE NOT NULL,
    nome VARCHAR(255) NOT NULL,
    descricao VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS clientes (
    id BIGSERIAL PRIMARY KEY,
    razao_social VARCHAR(255) NOT NULL,
    documento VARCHAR(20) UNIQUE NOT NULL,
    nome_fantasia VARCHAR(255),
    codigo VARCHAR(20) UNIQUE,
    telefone VARCHAR(120),
    email VARCHAR(120),
    contato_responsavel VARCHAR(120),
    endereco VARCHAR(255),
    categoria_id BIGINT REFERENCES categorias_cliente(id),
    regiao_id BIGINT REFERENCES regioes_atendimento(id),
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP DEFAULT NOW() NOT NULL,
    deleted_at TIMESTAMP,
    version BIGINT
);

CREATE TABLE IF NOT EXISTS cliente_unidades (
    id BIGSERIAL PRIMARY KEY,
    cliente_id BIGINT NOT NULL REFERENCES clientes(id),
    endereco_id BIGINT REFERENCES enderecos(id),
    nome VARCHAR(255) NOT NULL,
    codigo VARCHAR(32),
    matriz BOOLEAN,
    regiao_id BIGINT REFERENCES regioes_atendimento(id),
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP DEFAULT NOW() NOT NULL,
    deleted_at TIMESTAMP,
    version BIGINT
);

CREATE TABLE IF NOT EXISTS cliente_contatos (
    id BIGSERIAL PRIMARY KEY,
    unidade_id BIGINT NOT NULL REFERENCES cliente_unidades(id),
    nome VARCHAR(255) NOT NULL,
    cargo VARCHAR(120),
    email VARCHAR(120),
    telefone VARCHAR(20),
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP DEFAULT NOW() NOT NULL,
    deleted_at TIMESTAMP,
    version BIGINT
);

CREATE TABLE IF NOT EXISTS garantias (
    id BIGSERIAL PRIMARY KEY,
    data_inicio DATE NOT NULL,
    data_fim DATE NOT NULL,
    prorrogada BOOLEAN,
    observacoes VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP DEFAULT NOW() NOT NULL,
    deleted_at TIMESTAMP,
    version BIGINT
);

CREATE TABLE IF NOT EXISTS modelos_equipamento (
    id BIGSERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    fabricante VARCHAR(120),
    descricao VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS equipamentos (
    id BIGSERIAL PRIMARY KEY,
    unidade_id BIGINT NOT NULL REFERENCES cliente_unidades(id),
    modelo_id BIGINT REFERENCES modelos_equipamento(id),
    garantia_id BIGINT REFERENCES garantias(id),
    numero_serie VARCHAR(64),
    data_instalacao DATE,
    status VARCHAR(32) NOT NULL,
    observacoes VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP DEFAULT NOW() NOT NULL,
    deleted_at TIMESTAMP,
    version BIGINT
);

-- Technician
CREATE TABLE IF NOT EXISTS disponibilidades_tecnico (
    id BIGSERIAL PRIMARY KEY,
    tecnico_id BIGINT NOT NULL REFERENCES users(id),
    inicio TIMESTAMP NOT NULL,
    fim TIMESTAMP NOT NULL,
    status VARCHAR(32) NOT NULL,
    motivo VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP DEFAULT NOW() NOT NULL,
    deleted_at TIMESTAMP,
    version BIGINT
);

CREATE TABLE IF NOT EXISTS technician_teams (
    id BIGSERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    descricao VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP DEFAULT NOW() NOT NULL,
    deleted_at TIMESTAMP,
    version BIGINT
);

CREATE TABLE IF NOT EXISTS technician_team_members (
    team_id BIGINT REFERENCES technician_teams(id),
    user_id BIGINT REFERENCES users(id)
);

-- Ordem de Serviço
CREATE TABLE IF NOT EXISTS tipos_servico (
    id BIGSERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    descricao VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS categorias_defeito (
    id BIGSERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP DEFAULT NOW() NOT NULL,
    deleted_at TIMESTAMP,
    version BIGINT
);

CREATE TABLE IF NOT EXISTS subcategorias_defeito (
    id BIGSERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    categoria_id BIGINT REFERENCES categorias_defeito(id),
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP DEFAULT NOW() NOT NULL,
    deleted_at TIMESTAMP,
    version BIGINT
);

CREATE TABLE IF NOT EXISTS catalogo_defeitos (
    id BIGSERIAL PRIMARY KEY,
    codigo VARCHAR(120),
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT,
    subcategoria_id BIGINT REFERENCES subcategorias_defeito(id),
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP DEFAULT NOW() NOT NULL,
    deleted_at TIMESTAMP,
    version BIGINT
);

CREATE TABLE IF NOT EXISTS ordens_servico (
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
    data_abertura TIMESTAMP,
    data_inicio TIMESTAMP,
    data_conclusao TIMESTAMP,
    data_aprovacao TIMESTAMP,
    data_cancelamento TIMESTAMP,
    sla_limite TIMESTAMP,
    em_garantia BOOLEAN,
    custo_total NUMERIC(15,2),
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP DEFAULT NOW() NOT NULL,
    deleted_at TIMESTAMP,
    version BIGINT
);

CREATE TABLE IF NOT EXISTS os_status_historico (
    id BIGSERIAL PRIMARY KEY,
    os_id BIGINT NOT NULL REFERENCES ordens_servico(id),
    status VARCHAR(32) NOT NULL,
    registrado_em TIMESTAMP,
    alterado_por BIGINT REFERENCES users(id),
    justificativa TEXT,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS os_chamados (
    id BIGSERIAL PRIMARY KEY,
    os_id BIGINT NOT NULL REFERENCES ordens_servico(id),
    equipamento_id BIGINT REFERENCES equipamentos(id),
    descricao_original TEXT NOT NULL,
    observacoes_tecnico TEXT,
    status VARCHAR(32) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS os_comentarios (
    id BIGSERIAL PRIMARY KEY,
    os_id BIGINT NOT NULL REFERENCES ordens_servico(id),
    autor_id BIGINT REFERENCES users(id),
    conteudo TEXT,
    interno BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS os_pendencias (
    id BIGSERIAL PRIMARY KEY,
    os_id BIGINT NOT NULL REFERENCES ordens_servico(id),
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT,
    status VARCHAR(32) NOT NULL,
    vencimento TIMESTAMP,
    resolvido_em TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS os_arquivos (
    id BIGSERIAL PRIMARY KEY,
    os_id BIGINT NOT NULL REFERENCES ordens_servico(id),
    nome_arquivo VARCHAR(255),
    url VARCHAR(500),
    tipo VARCHAR(120),
    criado_por BIGINT REFERENCES users(id),
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP DEFAULT NOW() NOT NULL,
    deleted_at TIMESTAMP,
    version BIGINT
);

CREATE TABLE IF NOT EXISTS os_fotos (
    id BIGSERIAL PRIMARY KEY,
    os_id BIGINT NOT NULL REFERENCES ordens_servico(id),
    url VARCHAR(500),
    descricao VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP DEFAULT NOW() NOT NULL,
    deleted_at TIMESTAMP,
    version BIGINT
);

CREATE TABLE IF NOT EXISTS os_assinaturas_digitais (
    id BIGSERIAL PRIMARY KEY,
    os_id BIGINT NOT NULL REFERENCES ordens_servico(id),
    nome VARCHAR(255),
    documento VARCHAR(50),
    imagem TEXT,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP DEFAULT NOW() NOT NULL,
    deleted_at TIMESTAMP,
    version BIGINT
);

CREATE TABLE IF NOT EXISTS os_relatorios (
    id BIGSERIAL PRIMARY KEY,
    os_id BIGINT NOT NULL REFERENCES ordens_servico(id),
    url VARCHAR(500),
    gerado_em TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP DEFAULT NOW() NOT NULL,
    deleted_at TIMESTAMP,
    version BIGINT
);

CREATE TABLE IF NOT EXISTS os_agendamentos (
    id BIGSERIAL PRIMARY KEY,
    os_id BIGINT NOT NULL REFERENCES ordens_servico(id),
    tecnico_id BIGINT REFERENCES users(id),
    inicio_previsto TIMESTAMP,
    fim_previsto TIMESTAMP,
    inicio_real TIMESTAMP,
    fim_real TIMESTAMP,
    status VARCHAR(32) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS os_checklists_tecnico (
    id BIGSERIAL PRIMARY KEY,
    os_id BIGINT NOT NULL REFERENCES ordens_servico(id),
    titulo VARCHAR(255) NOT NULL,
    observacoes TEXT,
    aprovado BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS os_defeitos_selecionados (
    id BIGSERIAL PRIMARY KEY,
    checklist_id BIGINT NOT NULL REFERENCES os_checklists_tecnico(id),
    codigo VARCHAR(120),
    descricao TEXT
);

CREATE TABLE IF NOT EXISTS os_custos_resumo (
    id BIGSERIAL PRIMARY KEY,
    os_id BIGINT NOT NULL REFERENCES ordens_servico(id),
    total_estrutura NUMERIC(15,2),
    total_horas NUMERIC(15,2),
    total_materiais NUMERIC(15,2),
    total_deslocamento NUMERIC(15,2),
    total_km NUMERIC(15,2),
    total_geral NUMERIC(15,2),
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS os_custos_estrutura (
    id BIGSERIAL PRIMARY KEY,
    resumo_id BIGINT REFERENCES os_custos_resumo(id),
    nome VARCHAR(255),
    valor NUMERIC(15,2)
);

CREATE TABLE IF NOT EXISTS os_custos_hora (
    id BIGSERIAL PRIMARY KEY,
    resumo_id BIGINT REFERENCES os_custos_resumo(id),
    horas NUMERIC(10,2),
    valor NUMERIC(15,2)
);

CREATE TABLE IF NOT EXISTS os_custos_deslocamento (
    id BIGSERIAL PRIMARY KEY,
    resumo_id BIGINT REFERENCES os_custos_resumo(id),
    origem VARCHAR(255),
    destino VARCHAR(255),
    valor NUMERIC(15,2)
);

CREATE TABLE IF NOT EXISTS os_custos_km (
    id BIGSERIAL PRIMARY KEY,
    resumo_id BIGINT REFERENCES os_custos_resumo(id),
    km NUMERIC(10,2),
    valor NUMERIC(15,2)
);

CREATE TABLE IF NOT EXISTS os_materiais (
    id BIGSERIAL PRIMARY KEY,
    resumo_id BIGINT REFERENCES os_custos_resumo(id),
    nome VARCHAR(255),
    quantidade NUMERIC(10,2),
    valor NUMERIC(15,2)
);

CREATE TABLE IF NOT EXISTS alertas_garantia (
    id BIGSERIAL PRIMARY KEY,
    os_id BIGINT REFERENCES ordens_servico(id),
    equipamento_id BIGINT REFERENCES equipamentos(id),
    gerado_em TIMESTAMP NOT NULL,
    tratado BOOLEAN NOT NULL,
    observacoes VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP DEFAULT NOW() NOT NULL,
    deleted_at TIMESTAMP,
    version BIGINT
);

CREATE TABLE IF NOT EXISTS alertas_prazo (
    id BIGSERIAL PRIMARY KEY,
    os_id BIGINT REFERENCES ordens_servico(id),
    prazo_limite TIMESTAMP NOT NULL,
    violado BOOLEAN NOT NULL,
    resolvido_em TIMESTAMP,
    observacoes VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP DEFAULT NOW() NOT NULL,
    deleted_at TIMESTAMP,
    version BIGINT
);
