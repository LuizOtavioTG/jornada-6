-- Enhanced database schema with detailed OS structure based on FAST requirements

-- Enhanced clientes table with complete address fields and auto-generated code
ALTER TABLE clientes ADD COLUMN IF NOT EXISTS codigo VARCHAR(20) UNIQUE;
ALTER TABLE clientes ADD COLUMN IF NOT EXISTS logradouro VARCHAR(255);
ALTER TABLE clientes ADD COLUMN IF NOT EXISTS numero VARCHAR(20);
ALTER TABLE clientes ADD COLUMN IF NOT EXISTS bairro VARCHAR(100);
ALTER TABLE clientes ADD COLUMN IF NOT EXISTS cidade VARCHAR(100);
ALTER TABLE clientes ADD COLUMN IF NOT EXISTS uf VARCHAR(2);
ALTER TABLE clientes ADD COLUMN IF NOT EXISTS cep VARCHAR(10);

-- Create sequence for client codes
CREATE SEQUENCE IF NOT EXISTS cliente_codigo_seq START 1000;

-- Function to generate client code automatically
CREATE OR REPLACE FUNCTION generate_cliente_codigo()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.codigo IS NULL THEN
    NEW.codigo := 'CLI-' || LPAD(nextval('cliente_codigo_seq')::text, 6, '0');
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-generate client code
DROP TRIGGER IF EXISTS trigger_generate_cliente_codigo ON clientes;
CREATE TRIGGER trigger_generate_cliente_codigo
  BEFORE INSERT ON clientes
  FOR EACH ROW
  EXECUTE FUNCTION generate_cliente_codigo();

-- Enhanced tecnicos table with company information
ALTER TABLE tecnicos ADD COLUMN IF NOT EXISTS empresa VARCHAR(255);
ALTER TABLE tecnicos ADD COLUMN IF NOT EXISTS contato VARCHAR(255);
ALTER TABLE tecnicos ADD COLUMN IF NOT EXISTS cidade VARCHAR(100);
ALTER TABLE tecnicos ADD COLUMN IF NOT EXISTS uf VARCHAR(2);

-- Enhanced ordens_servico table with guarantee and data_fat fields
ALTER TABLE ordens_servico ADD COLUMN IF NOT EXISTS data_fat DATE;
ALTER TABLE ordens_servico ADD COLUMN IF NOT EXISTS garantia VARCHAR(50) CHECK (garantia IN ('dentro_garantia', 'fora_garantia'));

-- New table for multiple chamado descriptions per OS
CREATE TABLE IF NOT EXISTS os_chamados (
  id SERIAL PRIMARY KEY,
  os_id INTEGER REFERENCES ordens_servico(id) ON DELETE CASCADE,
  numero_serie VARCHAR(100),
  defeito VARCHAR(50) CHECK (defeito IN ('refrigeracao', 'iluminacao', 'estrutura', 'outros')),
  observacoes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- New table for detailed defect descriptions (technical)
CREATE TABLE IF NOT EXISTS os_defeitos_tecnicos (
  id SERIAL PRIMARY KEY,
  os_id INTEGER REFERENCES ordens_servico(id) ON DELETE CASCADE,
  numero_serie VARCHAR(100),
  categoria VARCHAR(50) CHECK (categoria IN ('refrigeracao', 'iluminacao', 'estrutura', 'outros')),
  
  -- Refrigeração - Compressor
  comp_queimado BOOLEAN DEFAULT false,
  comp_em_massa BOOLEAN DEFAULT false,
  comp_em_curto BOOLEAN DEFAULT false,
  comp_corrente_alta BOOLEAN DEFAULT false,
  comp_nao_parte BOOLEAN DEFAULT false,
  comp_sem_compressao BOOLEAN DEFAULT false,
  comp_trava_comando BOOLEAN DEFAULT false,
  comp_trava_rolamento BOOLEAN DEFAULT false,
  comp_desarmando BOOLEAN DEFAULT false,
  
  -- Refrigeração - Vazamento
  vaz_nao_localizado BOOLEAN DEFAULT false,
  vaz_numero_ponto VARCHAR(50),
  
  -- Refrigeração - Outros
  ref_capilar_obstruido BOOLEAN DEFAULT false,
  ref_micro_motor_travado BOOLEAN DEFAULT false,
  ref_motor_vent_cond BOOLEAN DEFAULT false,
  ref_motor_vent_evap BOOLEAN DEFAULT false,
  ref_regulagem_parametros BOOLEAN DEFAULT false,
  
  -- Iluminação
  ilum_lampada_queimada BOOLEAN DEFAULT false,
  ilum_sem_iluminacao BOOLEAN DEFAULT false,
  ilum_em_curto BOOLEAN DEFAULT false,
  
  -- Estrutura
  est_perfil_curvo_vidro BOOLEAN DEFAULT false,
  est_perfil_suporte_ilum BOOLEAN DEFAULT false,
  est_perfil_moldura BOOLEAN DEFAULT false,
  est_perfil_porta_etiqueta BOOLEAN DEFAULT false,
  est_suporte_porta BOOLEAN DEFAULT false,
  est_porta BOOLEAN DEFAULT false,
  est_puxador BOOLEAN DEFAULT false,
  est_conjunto_canal BOOLEAN DEFAULT false,
  est_perfil_frontal BOOLEAN DEFAULT false,
  est_perfil_canto BOOLEAN DEFAULT false,
  est_parafuso_frontal BOOLEAN DEFAULT false,
  est_parafuso_lateral BOOLEAN DEFAULT false,
  
  -- Outros
  outros_observacoes TEXT,
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- New table for detailed cost calculations (A, B, C, D)
CREATE TABLE IF NOT EXISTS os_custos (
  id SERIAL PRIMARY KEY,
  os_id INTEGER REFERENCES ordens_servico(id) ON DELETE CASCADE,
  
  -- A - Custos Deslocamento
  desl_hr_saida_empresa TIME,
  desl_hr_chegada_cliente TIME,
  desl_hr_saida_cliente TIME,
  desl_hr_chegada_empresa TIME,
  desl_total_horas DECIMAL(4,2),
  desl_total_valor DECIMAL(10,2),
  
  -- B - Custos Hora Trabalhada
  trab_hr_inicio TIME,
  trab_hr_termino TIME,
  trab_total_horas DECIMAL(4,2),
  trab_total_valor DECIMAL(10,2),
  
  -- C - Custos KM
  km_quantidade DECIMAL(8,2),
  km_valor_por_km DECIMAL(6,2),
  km_total_valor DECIMAL(10,2),
  
  -- D - Despesas com Materiais (será detalhado em tabela separada)
  materiais_total_valor DECIMAL(10,2),
  
  -- Valor Total (A+B+C+D)
  valor_total DECIMAL(10,2),
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- New table for materials used (part of cost D)
CREATE TABLE IF NOT EXISTS os_materiais (
  id SERIAL PRIMARY KEY,
  os_custo_id INTEGER REFERENCES os_custos(id) ON DELETE CASCADE,
  material VARCHAR(255) NOT NULL,
  quantidade DECIMAL(8,2) NOT NULL,
  valor_unitario DECIMAL(10,2),
  valor_total DECIMAL(10,2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Function to calculate total costs automatically
CREATE OR REPLACE FUNCTION calculate_os_total_cost()
RETURNS TRIGGER AS $$
BEGIN
  NEW.valor_total := COALESCE(NEW.desl_total_valor, 0) + 
                     COALESCE(NEW.trab_total_valor, 0) + 
                     COALESCE(NEW.km_total_valor, 0) + 
                     COALESCE(NEW.materiais_total_valor, 0);
  
  -- Update the main OS table with the total cost
  UPDATE ordens_servico 
  SET valor_total = NEW.valor_total 
  WHERE id = NEW.os_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-calculate total costs
DROP TRIGGER IF EXISTS trigger_calculate_total_cost ON os_custos;
CREATE TRIGGER trigger_calculate_total_cost
  BEFORE INSERT OR UPDATE ON os_custos
  FOR EACH ROW
  EXECUTE FUNCTION calculate_os_total_cost();

-- Function to calculate materials total
CREATE OR REPLACE FUNCTION calculate_materials_total()
RETURNS TRIGGER AS $$
DECLARE
  custo_id INTEGER;
  total_materiais DECIMAL(10,2);
BEGIN
  -- Get the cost record ID
  IF TG_OP = 'DELETE' then
    custo_id := OLD.os_custo_id;
  ELSE
    custo_id := NEW.os_custo_id;
  END IF;
  
  -- Calculate total materials cost
  SELECT COALESCE(SUM(valor_total), 0) INTO total_materiais
  FROM os_materiais 
  WHERE os_custo_id = custo_id;
  
  -- Update the cost record
  UPDATE os_custos 
  SET materiais_total_valor = total_materiais
  WHERE id = custo_id;
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-calculate materials total
DROP TRIGGER IF EXISTS trigger_calculate_materials_total ON os_materiais;
CREATE TRIGGER trigger_calculate_materials_total
  AFTER INSERT OR UPDATE OR DELETE ON os_materiais
  FOR EACH ROW
  EXECUTE FUNCTION calculate_materials_total();

-- Update existing clients with codes
UPDATE clientes SET codigo = 'CLI-' || LPAD((1000 + id)::text, 6, '0') WHERE codigo IS NULL;

-- Insert sample enhanced data
INSERT INTO clientes (nome, cnpj, logradouro, numero, bairro, cidade, uf, cep, telefone, email, contato_responsavel) VALUES 
('Supermercado Central Ltda', '12.345.678/0001-90', 'Rua das Flores', '123', 'Centro', 'São Paulo', 'SP', '01234-567', '(11) 99999-1234', 'contato@supercentral.com', 'José Silva'),
('Mercado do Bairro ME', '98.765.432/0001-10', 'Av. Principal', '456', 'Vila Nova', 'São Paulo', 'SP', '02345-678', '(11) 88888-5678', 'admin@mercadobairro.com', 'Maria Santos'),
('Hipermercado Norte S.A.', '11.222.333/0001-44', 'Rod. Norte, Km 15', 'S/N', 'Distrito Industrial', 'São Paulo', 'SP', '03456-789', '(11) 77777-9012', 'ti@hipernorte.com', 'Carlos Oliveira');

INSERT INTO tecnicos (nome, email, telefone, especialidade, empresa, contato, cidade, uf) VALUES 
('João Silva', 'joao.silva@fast.com', '(11) 91234-5678', 'Refrigeração', 'FAST Refrigeração', 'João Silva', 'São Paulo', 'SP'),
('Maria Santos', 'maria.santos@fast.com', '(11) 92345-6789', 'Elétrica', 'FAST Refrigeração', 'Maria Santos', 'São Paulo', 'SP'),
('Pedro Costa', 'pedro.costa@fast.com', '(11) 93456-7890', 'Mecânica', 'FAST Refrigeração', 'Pedro Costa', 'São Paulo', 'SP');
