-- Seed de usuário/role para testes locais.
-- Credenciais: email tester@example.com / senha password

DO $$
DECLARE
    v_role_id BIGINT;
    v_user_id BIGINT;
BEGIN
    -- Garante role ADMIN
    INSERT INTO roles (name, description, created_at, updated_at)
    VALUES ('ADMIN', 'Perfil administrador de teste', NOW(), NOW())
    ON CONFLICT (name) DO NOTHING;

    SELECT id INTO v_role_id FROM roles WHERE name = 'ADMIN';

    -- Garante usuário de teste
    INSERT INTO users (email, password, full_name, status, created_at, updated_at)
    VALUES (
        'tester@example.com',
        '$2a$10$E9NZuTmUe1koXSPa6e7/jO/iw38eHLVYRIlnJrped1IovnHgwlHG2', -- senha: password
        'Tester Seed',
        'ACTIVE',
        NOW(),
        NOW()
    )
    ON CONFLICT (email) DO NOTHING;

    SELECT id INTO v_user_id FROM users WHERE email = 'tester@example.com';

    -- Vincula role ao usuário se ainda não existir
    IF NOT EXISTS (SELECT 1 FROM user_roles WHERE user_id = v_user_id AND role_id = v_role_id) THEN
        INSERT INTO user_roles (user_id, role_id, granted_at, created_at, updated_at)
        VALUES (v_user_id, v_role_id, NOW(), NOW(), NOW());
    END IF;
END $$;
