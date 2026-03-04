-- Add signature fields to ordens_servico table
ALTER TABLE ordens_servico 
ADD COLUMN IF NOT EXISTS signature_data TEXT,
ADD COLUMN IF NOT EXISTS signature_client_name VARCHAR(255),
ADD COLUMN IF NOT EXISTS signature_client_document VARCHAR(50),
ADD COLUMN IF NOT EXISTS signature_observations TEXT,
ADD COLUMN IF NOT EXISTS signature_timestamp TIMESTAMP,
ADD COLUMN IF NOT EXISTS data_aprovacao TIMESTAMP;

-- Update existing completed orders to have approval date
UPDATE ordens_servico 
SET data_aprovacao = data_conclusao 
WHERE status = 'aprovada' AND data_conclusao IS NOT NULL;
