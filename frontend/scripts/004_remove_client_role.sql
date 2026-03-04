-- Remove client role from system
-- Update usuarios table to remove cliente role
ALTER TABLE usuarios DROP CONSTRAINT IF EXISTS usuarios_role_check;
ALTER TABLE usuarios ADD CONSTRAINT usuarios_role_check CHECK (role IN ('admin', 'funcionario', 'tecnico'));

-- Delete any existing client users
DELETE FROM usuarios WHERE role = 'cliente';

-- Remove empresa_id from usuarios as it's no longer needed
ALTER TABLE usuarios DROP COLUMN IF EXISTS empresa_id;
