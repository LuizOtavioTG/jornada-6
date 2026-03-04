-- Tabela de configurações do sistema
CREATE TABLE IF NOT EXISTS configuracoes_sistema (
  id SERIAL PRIMARY KEY,
  chave VARCHAR(100) UNIQUE NOT NULL,
  valor TEXT NOT NULL,
  tipo VARCHAR(50) NOT NULL, -- 'numero', 'texto', 'json'
  descricao TEXT,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_by INTEGER REFERENCES usuarios(id)
);

-- Inserir configurações padrão
INSERT INTO configuracoes_sistema (chave, valor, tipo, descricao) VALUES
('valor_hora_deslocamento', '50.00', 'numero', 'Valor por hora de deslocamento (R$)'),
('valor_km', '1.50', 'numero', 'Valor por quilômetro rodado (R$)'),
('valor_hora_trabalhada', '80.00', 'numero', 'Valor por hora trabalhada (R$)');

-- Tabela de defeitos específicos configuráveis
CREATE TABLE IF NOT EXISTS defeitos_especificos (
  id SERIAL PRIMARY KEY,
  categoria VARCHAR(50) NOT NULL, -- 'refrigeracao', 'iluminacao', 'estrutura'
  subcategoria VARCHAR(50), -- 'compressor', 'vazamento', etc
  codigo VARCHAR(50) UNIQUE NOT NULL,
  descricao TEXT NOT NULL,
  ativo BOOLEAN DEFAULT true,
  ordem INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by INTEGER REFERENCES usuarios(id),
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inserir defeitos padrão
INSERT INTO defeitos_especificos (categoria, subcategoria, codigo, descricao, ordem) VALUES
-- Refrigeração - Compressor
('refrigeracao', 'compressor', 'comp_queimado', 'Compressor Queimado', 1),
('refrigeracao', 'compressor', 'comp_em_massa', 'Compressor Em Massa', 2),
('refrigeracao', 'compressor', 'comp_em_curto', 'Compressor Em Curto', 3),
('refrigeracao', 'compressor', 'comp_nao_parte', 'Compressor Não Parte', 4),
('refrigeracao', 'compressor', 'comp_corrente_alta', 'Corrente Alta', 5),

-- Refrigeração - Vazamento
('refrigeracao', 'vazamento', 'vaz_nao_localizado', 'Vazamento Não Localizado', 10),
('refrigeracao', 'vazamento', 'vaz_n_ponto', 'Vazamento N° Ponto', 11),

-- Refrigeração - Outros
('refrigeracao', 'outros', 'ref_capilar_obstruido', 'Capilar Obstruído', 20),
('refrigeracao', 'outros', 'ref_micro_motor_travado', 'Micro Motor Travado', 21),
('refrigeracao', 'outros', 'ref_regulagem_parametros', 'Regulagem de Parâmetros', 22),

-- Iluminação
('iluminacao', null, 'ilum_lampada_queimada', 'Lâmpada Queimada', 30),
('iluminacao', null, 'ilum_sem_iluminacao', 'Sem Iluminação', 31),
('iluminacao', null, 'ilum_em_curto', 'Em Curto', 32),

-- Estrutura
('estrutura', null, 'est_perfil_curvo_vidro', 'Perfil Curvo Vidro', 40),
('estrutura', null, 'est_perfil_suporte_ilum', 'Perfil Suporte Iluminação', 41),
('estrutura', null, 'est_perfil_porta_etiqueta', 'Perfil Porta Etiqueta', 42);

-- Índices
CREATE INDEX idx_defeitos_categoria ON defeitos_especificos(categoria);
CREATE INDEX idx_defeitos_ativo ON defeitos_especificos(ativo);
