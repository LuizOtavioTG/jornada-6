-- Create notifications/informativos system for technicians
CREATE TABLE IF NOT EXISTS informativos (
  id SERIAL PRIMARY KEY,
  titulo VARCHAR(255) NOT NULL,
  conteudo TEXT NOT NULL,
  tipo VARCHAR(50) NOT NULL CHECK (tipo IN ('geral', 'os_especifica', 'prazo_garantia', 'previsao_pagamento', 'orientacao_tecnica')),
  prioridade VARCHAR(20) DEFAULT 'normal' CHECK (prioridade IN ('baixa', 'normal', 'alta', 'urgente')),
  
  -- Vinculação opcional a OS específica
  os_id INTEGER REFERENCES ordens_servico(id),
  
  -- Destinatários (null = todos os técnicos)
  tecnico_id INTEGER REFERENCES tecnicos(id), -- null = para todos
  
  -- Auditoria
  criado_por INTEGER REFERENCES usuarios(id) NOT NULL,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  -- Controle de leitura
  lido BOOLEAN DEFAULT false,
  lido_em TIMESTAMP NULL,
  
  -- Soft delete
  ativo BOOLEAN DEFAULT true,
  arquivado_em TIMESTAMP NULL
);

-- Tabela para rastrear quais técnicos leram quais informativos
CREATE TABLE IF NOT EXISTS informativos_leitura (
  id SERIAL PRIMARY KEY,
  informativo_id INTEGER REFERENCES informativos(id) ON DELETE CASCADE,
  tecnico_id INTEGER REFERENCES tecnicos(id) ON DELETE CASCADE,
  lido_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(informativo_id, tecnico_id)
);

-- Índices para performance
CREATE INDEX idx_informativos_tecnico ON informativos(tecnico_id);
CREATE INDEX idx_informativos_os ON informativos(os_id);
CREATE INDEX idx_informativos_tipo ON informativos(tipo);
CREATE INDEX idx_informativos_ativo ON informativos(ativo);
CREATE INDEX idx_informativos_leitura_tecnico ON informativos_leitura(tecnico_id);

-- Inserir alguns informativos de exemplo
INSERT INTO informativos (titulo, conteudo, tipo, prioridade, criado_por) VALUES
('Prazo de Garantia - Atenção', 'Lembrete: Todas as OS em garantia devem ser concluídas em até 48 horas após abertura. Favor priorizar esses chamados.', 'prazo_garantia', 'alta', 1),
('Previsão de Pagamento - Janeiro', 'Os pagamentos referentes aos serviços de janeiro serão processados até dia 15 de fevereiro. Certifique-se de que todas as OS estejam devidamente finalizadas e assinadas.', 'previsao_pagamento', 'normal', 1),
('Nova Orientação Técnica', 'Ao realizar manutenção em compressores, sempre verificar o estado do óleo e registrar na OS. Anexar fotos antes e depois do serviço.', 'orientacao_tecnica', 'alta', 1);
