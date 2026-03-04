-- Creating complete database schema for OS management system

-- Clientes table
CREATE TABLE IF NOT EXISTS clientes (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  cnpj VARCHAR(18) UNIQUE,
  endereco TEXT,
  telefone VARCHAR(20),
  email VARCHAR(255),
  contato_responsavel VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Técnicos table
CREATE TABLE IF NOT EXISTS tecnicos (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  telefone VARCHAR(20),
  especialidade VARCHAR(100),
  ativo BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tipos de solicitação
CREATE TABLE IF NOT EXISTS tipos_solicitacao (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  descricao TEXT,
  ativo BOOLEAN DEFAULT true
);

-- Produtos/Equipamentos
CREATE TABLE IF NOT EXISTS produtos (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  categoria VARCHAR(100),
  modelo VARCHAR(100),
  fabricante VARCHAR(100),
  preco_unitario DECIMAL(10,2),
  ativo BOOLEAN DEFAULT true
);

-- Ordens de Serviço
CREATE TABLE IF NOT EXISTS ordens_servico (
  id SERIAL PRIMARY KEY,
  numero_os VARCHAR(20) UNIQUE NOT NULL,
  cliente_id INTEGER REFERENCES clientes(id),
  tecnico_id INTEGER REFERENCES tecnicos(id),
  tipo_solicitacao_id INTEGER REFERENCES tipos_solicitacao(id),
  status VARCHAR(20) DEFAULT 'aberta' CHECK (status IN ('aberta', 'em_andamento', 'concluida', 'aprovada', 'fechada', 'cancelada')),
  descricao TEXT,
  observacoes TEXT,
  data_abertura TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  data_inicio TIMESTAMP,
  data_conclusao TIMESTAMP,
  data_aprovacao TIMESTAMP,
  motivo_cancelamento TEXT,
  valor_total DECIMAL(10,2) DEFAULT 0,
  assinatura_cliente TEXT,
  assinatura_tecnico TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Produtos utilizados na OS
CREATE TABLE IF NOT EXISTS os_produtos (
  id SERIAL PRIMARY KEY,
  os_id INTEGER REFERENCES ordens_servico(id) ON DELETE CASCADE,
  produto_id INTEGER REFERENCES produtos(id),
  quantidade INTEGER NOT NULL DEFAULT 1,
  preco_unitario DECIMAL(10,2),
  subtotal DECIMAL(10,2)
);

-- Fotos/Anexos da OS
CREATE TABLE IF NOT EXISTS os_anexos (
  id SERIAL PRIMARY KEY,
  os_id INTEGER REFERENCES ordens_servico(id) ON DELETE CASCADE,
  tipo VARCHAR(20) DEFAULT 'foto' CHECK (tipo IN ('foto', 'documento', 'relatorio')),
  nome_arquivo VARCHAR(255),
  url_arquivo TEXT,
  descricao TEXT,
  momento VARCHAR(20) CHECK (momento IN ('antes', 'durante', 'depois')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Histórico de status da OS
CREATE TABLE IF NOT EXISTS os_historico (
  id SERIAL PRIMARY KEY,
  os_id INTEGER REFERENCES ordens_servico(id) ON DELETE CASCADE,
  status_anterior VARCHAR(20),
  status_novo VARCHAR(20),
  observacao TEXT,
  usuario_id INTEGER, -- pode referenciar técnico ou admin
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inserir dados iniciais
INSERT INTO tipos_solicitacao (nome, descricao) VALUES 
('Instalação', 'Instalação de novos equipamentos'),
('Manutenção Preventiva', 'Manutenção programada dos equipamentos'),
('Manutenção Corretiva', 'Reparo de equipamentos com defeito'),
('Visita Técnica', 'Avaliação técnica e diagnóstico'),
('Troca de Peças', 'Substituição de componentes'),
('Limpeza', 'Limpeza e higienização dos equipamentos');

INSERT INTO produtos (nome, categoria, modelo, fabricante, preco_unitario) VALUES 
('Gôndola Refrigerada 2m', 'Gôndola', 'GR-2000', 'FrigoTech', 2500.00),
('Gôndola Refrigerada 3m', 'Gôndola', 'GR-3000', 'FrigoTech', 3200.00),
('Rack Refrigerado', 'Rack', 'RR-1500', 'CoolMax', 1800.00),
('Compressor 1HP', 'Componente', 'CP-1HP', 'ThermoKing', 450.00),
('Evaporador', 'Componente', 'EV-200', 'ColdAir', 280.00),
('Termostato Digital', 'Componente', 'TD-PRO', 'TempControl', 120.00);
