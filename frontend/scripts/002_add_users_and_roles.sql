-- Adding users table and role-based access control
-- Tabela de usuários com sistema de roles
CREATE TABLE IF NOT EXISTS usuarios (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  senha_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL CHECK (role IN ('admin', 'funcionario', 'tecnico', 'cliente')),
  ativo BOOLEAN DEFAULT true,
  empresa_id INTEGER REFERENCES clientes(id), -- Para clientes/empresas
  telefone VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP NULL -- Soft delete para admins
);

-- Tabela de sessões para controle de login
CREATE TABLE IF NOT EXISTS sessoes (
  id SERIAL PRIMARY KEY,
  usuario_id INTEGER REFERENCES usuarios(id),
  token VARCHAR(255) UNIQUE NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de log de ações para auditoria (apenas admin pode ver)
CREATE TABLE IF NOT EXISTS log_acoes (
  id SERIAL PRIMARY KEY,
  usuario_id INTEGER REFERENCES usuarios(id),
  acao VARCHAR(100) NOT NULL, -- 'create', 'update', 'delete', 'view'
  tabela VARCHAR(50) NOT NULL, -- 'ordens_servico', 'clientes', 'usuarios'
  registro_id INTEGER,
  dados_anteriores JSONB, -- Para updates e deletes
  dados_novos JSONB, -- Para creates e updates
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inserir usuário admin padrão
INSERT INTO usuarios (nome, email, senha_hash, role) VALUES 
('Administrador', 'admin@fast.com', '$2b$10$example_hash', 'admin'),
('João Silva', 'joao@fast.com', '$2b$10$example_hash', 'funcionario'),
('Maria Santos', 'maria@tecnico.com', '$2b$10$example_hash', 'tecnico');

-- Atualizar tabela de ordens_servico para incluir campos de auditoria
ALTER TABLE ordens_servico ADD COLUMN IF NOT EXISTS created_by INTEGER REFERENCES usuarios(id);
ALTER TABLE ordens_servico ADD COLUMN IF NOT EXISTS updated_by INTEGER REFERENCES usuarios(id);
ALTER TABLE ordens_servico ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMP NULL;
ALTER TABLE ordens_servico ADD COLUMN IF NOT EXISTS deleted_by INTEGER REFERENCES usuarios(id);

-- Atualizar outras tabelas para auditoria
ALTER TABLE clientes ADD COLUMN IF NOT EXISTS created_by INTEGER REFERENCES usuarios(id);
ALTER TABLE clientes ADD COLUMN IF NOT EXISTS updated_by INTEGER REFERENCES usuarios(id);
ALTER TABLE clientes ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMP NULL;

ALTER TABLE tecnicos ADD COLUMN IF NOT EXISTS created_by INTEGER REFERENCES usuarios(id);
ALTER TABLE tecnicos ADD COLUMN IF NOT EXISTS updated_by INTEGER REFERENCES usuarios(id);
ALTER TABLE tecnicos ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMP NULL;
