-- Create notifications table
CREATE TABLE IF NOT EXISTS notificacoes (
    id SERIAL PRIMARY KEY,
    tipo VARCHAR(20) NOT NULL CHECK (tipo IN ('info', 'success', 'warning', 'error')),
    titulo VARCHAR(255) NOT NULL,
    mensagem TEXT NOT NULL,
    lida BOOLEAN DEFAULT FALSE,
    os_id VARCHAR(50),
    usuario_id VARCHAR(50),
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_leitura TIMESTAMP,
    
    FOREIGN KEY (os_id) REFERENCES ordens_servico(numero_os) ON DELETE CASCADE
);

-- Create index for better performance
CREATE INDEX idx_notificacoes_usuario_lida ON notificacoes(usuario_id, lida);
CREATE INDEX idx_notificacoes_data_criacao ON notificacoes(data_criacao DESC);

WITH sample_notificacoes AS (
    SELECT * FROM (VALUES
        ('info', 'Nova OS Atribuída', 'OS-2024-004 foi atribuída para você - Supermercado Vila Nova', 'OS-2024-004', 'user1'),
        ('success', 'OS Aprovada', 'OS-2024-001 foi aprovada pelo cliente com assinatura digital', 'OS-2024-001', 'user1'),
        ('warning', 'OS Atrasada', 'OS-2024-002 está com prazo vencido há 2 dias', 'OS-2024-002', 'user1')
    ) AS s(tipo, titulo, mensagem, os_id, usuario_id)
)
INSERT INTO notificacoes (tipo, titulo, mensagem, os_id, usuario_id)
SELECT s.tipo, s.titulo, s.mensagem, s.os_id, s.usuario_id
FROM sample_notificacoes s
WHERE EXISTS (
    SELECT 1
    FROM ordens_servico os
    WHERE os.numero_os = s.os_id
);
