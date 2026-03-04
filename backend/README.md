# Jornada Backend

Serviço backend em Java + Spring Boot responsável pelas APIs de autenticação, clientes, técnicos e ordens de serviço do projeto Jornada.

## Tecnologias
- Spring Boot 3 (Web, Data JPA, Security, Validation)
- H2 Database (dev)
- JWT (autenticação stateless)
- Maven

## Executando localmente
1. Certifique-se de ter Java 17 e Maven instalados.
2. Ajuste o segredo JWT em `src/main/resources/application.yml` (`security.jwt.secret`).
3. Instale as dependências e rode o projeto:
   ```bash
   mvn spring-boot:run
   ```
4. Por padrão a aplicação aponta para Postgres (`jdbc:postgresql://localhost:5432/jornada`). Ajuste `DATABASE_URL`, `DATABASE_USERNAME`, `DATABASE_PASSWORD` se necessário. O schema é criado pelo Flyway em `db/migration`.

> Observação: no ambiente desta entrega o download das dependências externas pode exigir permissão/ajuste de rede.

## Executando com Docker
Com Docker e Docker Compose instalados:
```bash
cd backend
docker-compose up --build
```
- Sobe o Postgres (porta 5432) e o backend (porta 8080). Variáveis de conexão já apontam para o serviço `db`.

## Estrutura de módulos
- `domain` – entidades JPA e repositórios segmentados por contexto.
- `service` – regras de negócio (auth, cliente, técnico, O.S.).
- `api/dto` – contratos de entrada/saída.
- `api/controller` – endpoints REST.
- `config` – configuração de segurança JWT e auditoria JPA.

## Autenticação
Fluxo baseado em JWT:
- `POST /api/auth/login` – recebe e-mail/senha e devolve access/refresh token.
- `POST /api/auth/refresh` – renova access token a partir do refresh.

Grupos de permissões podem ser refinados via papéis (`Role`) e permissões (`Permission`) persistidos.

## Endpoints Principais
### Usuários / RBAC
- `GET /api/users` – lista usuários.
- `GET /api/users/{id}` – detalhes.
- `POST /api/users` – cria usuário (define perfis/cliente/empresa).
- `PUT /api/users/{id}` – atualiza dados e papéis.
- `POST /api/users/{id}/password` – altera senha.
- `POST /api/users/{id}/deactivate` – suspende usuário.

### Clientes
- `GET /api/clientes` / `GET /api/clientes/{id}` – consulta matriz e unidades.
- `POST /api/clientes` / `PUT /api/clientes/{id}` – cria/edita cliente.
- `POST /api/clientes/unidades` / `PUT /api/clientes/unidades/{id}` – gerencia unidades e endereços.
- `POST /api/clientes/unidades/{id}/contatos` – adiciona contato.
- `POST /api/clientes/unidades/{id}/equipamentos` – cadastra equipamento.
- `GET /api/clientes/unidades/{id}/equipamentos` – lista equipamentos da unidade.
- `GET /api/clientes/categorias|regioes|modelos-equipamento` – tabelas auxiliares.

### Técnicos e Agenda
- `GET /api/tecnicos/perfis` & `POST /api/tecnicos/perfis` – perfil técnico (especialidade, regiões, disponibilidade).
- `POST /api/tecnicos/disponibilidades` – registra bloqueios/turnos.
- `GET /api/tecnicos/{id}/disponibilidades` – agenda individual.
- `POST /api/tecnicos/equipes` / `GET /api/tecnicos/equipes` – equipes operacionais.

### Ordens de Serviço
- `GET /api/ordens-servico` / `GET /api/ordens-servico/{id}` – consulta ordens.
- `POST /api/ordens-servico` – abre nova O.S. com chamados associados.
- `PATCH /api/ordens-servico/{id}/status` – altera status (gera histórico).
- `POST /api/ordens-servico/{id}/comentarios` – adiciona comentário interno/cliente.
- `POST /api/ordens-servico/{id}/pendencias` – registra pendência.
- `POST /api/ordens-servico/{id}/agendamentos` – agenda atendimento.

## Próximos passos sugeridos
1. Implementar filtros/paginação nas listagens (clientes, O.S., notificações).
2. Persistir configurações financeiras e vincular cálculo de custos (OSCusto*).
3. Expor endpoints para notificações/comunicações (Notification, Informativo, Alertas).
4. Integrar upload real para arquivos/fotos (hoje apenas metadados).
5. Acrescentar testes de integração (MockMvc) e migrações com Flyway.
6. Ajustar autorização por papéis/permissões específicos (ex.: técnicos vs. administradores).
