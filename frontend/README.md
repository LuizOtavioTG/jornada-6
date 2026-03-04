# Sistema de Gerenciamento de OS - FAST Refrigeração

Sistema completo para gerenciamento de Ordens de Serviço com controle de usuários, custos detalhados e assinatura digital.

## 🚀 Executando com Docker

### Pré-requisitos
- Docker
- Docker Compose

### Inicialização Rápida

1. **Clone o repositório e navegue até a pasta:**
\`\`\`bash
cd os-management-system
\`\`\`

2. **Inicie todos os serviços:**
\`\`\`bash
npm run docker:up
\`\`\`

3. **Acesse a aplicação:**
- **Sistema Principal:** http://localhost:3000
- **Adminer (DB Admin):** http://localhost:8080

### Comandos Docker Disponíveis

\`\`\`bash
# Construir as imagens
npm run docker:build

# Iniciar todos os serviços
npm run docker:up

# Parar todos os serviços
npm run docker:down

# Ver logs em tempo real
npm run docker:logs

# Reiniciar serviços
npm run docker:restart

# Limpar tudo (cuidado: remove volumes!)
npm run docker:clean
\`\`\`

### Usuários de Teste

O sistema vem com usuários pré-configurados:

| Usuário | Senha | Role |
|---------|-------|------|
| admin@fast.com | admin123 | Administrador |
| funcionario@fast.com | func123 | Funcionário FAST |
| tecnico@fast.com | tec123 | Técnico |
| cliente@empresa.com | cli123 | Cliente |

### Serviços Incluídos

- **App (Next.js):** Porta 3000
- **PostgreSQL:** Porta 5432
- **Redis:** Porta 6379
- **Adminer:** Porta 8080

### Estrutura de Dados

O banco de dados é inicializado automaticamente com:
- Tabelas de usuários e roles
- Estrutura completa de OS
- Dados de exemplo
- Triggers para códigos automáticos

### Desenvolvimento

Para desenvolvimento local sem Docker:

\`\`\`bash
npm install
npm run dev
\`\`\`

### Backup e Restauração

\`\`\`bash
# Backup do banco
docker exec os_management_db pg_dump -U postgres os_management > backup.sql

# Restaurar backup
docker exec -i os_management_db psql -U postgres os_management < backup.sql
\`\`\`

## 📱 Aplicativo Android via Capacitor

> Pré-requisitos: Node + pnpm, Android Studio (SDK 34+), JDK 17 e Docker rodando a aplicação web.

1. **Instale as dependências e suba o backend no Docker**
   \`\`\`bash
   pnpm install
   pnpm docker:up
   \`\`\`
2. **Informe o endereço que o WebView deve abrir**
   - Emulador Android Studio: `http://10.0.2.2:3000` (mapa padrão para o host).
   - Dispositivo físico: use o IP da sua máquina na mesma rede, por ex. `http://192.168.0.5:3000`.
   - Exporte a variável antes dos comandos do Capacitor:
     \`\`\`bash
     export CAP_SERVER_URL=http://10.0.2.2:3000
     \`\`\`
3. **Sincronize o build web com o projeto nativo**
   \`\`\`bash
   pnpm android:sync
   \`\`\`
4. **Abrir no Android Studio (opcional)**
   \`\`\`bash
   pnpm android:open
   \`\`\`
5. **Executar direto no emulador/dispositivo**
   \`\`\`bash
   CAP_SERVER_URL=http://10.0.2.2:3000 pnpm android:run --target emulator-5554
   \`\`\`
   Use `--target <ID>` para escolher o dispositivo listado via `adb devices`.

### Workflow no Android Studio

1. Rode `pnpm android:sync` sempre que alterar o frontend.
2. Abra com `pnpm android:open` e aguarde o Gradle sincronizar.
3. Inicie o emulador (ou conecte um device) e clique em **Run > Run 'app'**.
4. Para gerar um APK/AAB assinado use **Build > Generate Signed Bundle/APK**.

> Dica: mantenha os containers Docker acessíveis na rede. Em produção, prefira hospedar o Next.js com HTTPS e exportar `CAP_SERVER_URL=https://seu-dominio` antes de `pnpm android:sync`/`pnpm android:run`.
