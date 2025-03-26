# Satisfaction API

API de gerenciamento de satisfação de clientes, permitindo avaliações de serviços e empresas.

## Configuração

1. Clone o repositório
2. Instale as dependências:
```bash
npm install
```
3. Configure as variáveis de ambiente no arquivo `.env`:
```env
DATABASE_HOST=postgres
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=satisfaction
JWT_SECRET=seu_jwt_secret
```
4. Inicie o projeto:
```bash
docker-compose up
```

## Rotas da API

### Autenticação (`/auth`)

#### POST /auth/register
Registra um novo usuário.
```json
{
  "username": "string",
  "password": "string",
  "email": "string",
  "name": "string"
}
```

#### POST /auth/login
Realiza login e retorna token JWT.
```json
{
  "username": "string",
  "password": "string"
}
```

### Usuários (`/users`)

#### GET /users
Lista todos os usuários.
* Requer: JWT Token

#### GET /users/:id
Busca usuário por ID.
* Requer: JWT Token

#### GET /users/username/:username
Busca usuário por username.
* Requer: JWT Token

#### DELETE /users/:id
Remove um usuário.
* Requer: JWT Token

### Tipos de Serviço (`/service-types`)

#### POST /service-types
Cria novo tipo de serviço.
* Requer: JWT Token
```json
{
  "name": "string",
  "description": "string"
}
```

#### GET /service-types
Lista todos os tipos de serviço.
* Requer: JWT Token

#### GET /service-types/:id
Busca tipo de serviço por ID.
* Requer: JWT Token

#### PATCH /service-types/:id
Atualiza tipo de serviço.
* Requer: JWT Token
```json
{
  "name": "string",
  "description": "string"
}
```

#### DELETE /service-types/:id
Remove tipo de serviço.
* Requer: JWT Token

### Empresas (`/companies`)

#### POST /companies
Cria nova empresa.
* Requer: JWT Token
```json
{
  "name": "string",
  "description": "string"
}
```

#### POST /companies/:id/services
Adiciona serviço a uma empresa.
* Requer: JWT Token
```json
{
  "serviceTypeId": "string"
}
```

#### GET /companies
Lista todas as empresas.
* Requer: JWT Token

#### GET /companies/:id
Busca empresa por ID.
* Requer: JWT Token

#### GET /companies/:id/services
Lista serviços de uma empresa.
* Requer: JWT Token

#### DELETE /companies/:id
Remove uma empresa.
* Requer: JWT Token

### Votos (`/votes`)

#### POST /votes
Cria novo voto.
* Requer: JWT Token
```json
{
  "id_empresa": "string",
  "id_tipo_servico": "string"
}
```
* Retorna:
```json
{
  "id_voto": "string",
  "id_empresa": "string",
  "id_tipo_servico": "string",
  "momento_voto": "2024-03-26T00:00:00.000Z"
}
```

#### GET /votes
Lista todos os votos.
* Requer: JWT Token
* Retorna array de votos com a estrutura:
```json
{
  "id_voto": "string",
  "id_empresa": "string",
  "id_tipo_servico": "string",
  "momento_voto": "2024-03-26T00:00:00.000Z",
  "serviceType": {
    "id_service": "string",
    "name": "string",
    "description": "string"
  }
}
```

#### GET /votes/:id
Busca voto por ID.
* Requer: JWT Token
* Retorna o voto com a mesma estrutura do GET /votes

#### GET /votes/empresa/:id_empresa
Lista votos por empresa.
* Requer: JWT Token
* Retorna array de votos com a mesma estrutura do GET /votes

#### GET /votes/servico/:id_tipo_servico
Lista votos por tipo de serviço.
* Requer: JWT Token
* Retorna array de votos com a mesma estrutura do GET /votes

#### DELETE /votes/:id
Remove um voto.
* Requer: JWT Token

### Questionários (`/questionnaires`)

#### POST /questionnaires
Cria novo questionário.
* Requer: JWT Token
```json
{
  "title": "string",
  "description": "string",
  "companyId": "string"
}
```

#### POST /questionnaires/:id/questions
Adiciona pergunta ao questionário.
* Requer: JWT Token
```json
{
  "text": "string",
  "type": "string"
}
```

#### GET /questionnaires
Lista todos os questionários.
* Requer: JWT Token

#### GET /questionnaires/:id
Busca questionário por ID.
* Requer: JWT Token

#### GET /questionnaires/company/:companyId
Lista questionários por empresa.
* Requer: JWT Token

#### DELETE /questionnaires/:id
Remove um questionário.
* Requer: JWT Token

### Perguntas (`/questions`)

#### POST /questions
Cria nova pergunta.
* Requer: JWT Token
```json
{
  "text": "string",
  "type": "string",
  "questionnaireId": "string"
}
```

#### POST /questions/:id/responses
Adiciona resposta a uma pergunta.
* Requer: JWT Token
```json
{
  "text": "string",
  "value": "number"
}
```

#### GET /questions
Lista todas as perguntas.
* Requer: JWT Token

#### GET /questions/:id
Busca pergunta por ID.
* Requer: JWT Token

#### GET /questions/:id/responses
Lista respostas de uma pergunta.
* Requer: JWT Token

#### DELETE /questions/:id
Remove uma pergunta.
* Requer: JWT Token

## Banco de Dados

O projeto utiliza PostgreSQL como banco de dados. As tabelas são criadas automaticamente através do TypeORM quando a aplicação é iniciada em modo de desenvolvimento.

## Segurança

Todas as rotas (exceto login e registro) requerem autenticação via JWT Token.
O token deve ser enviado no header Authorization:
```
Authorization: Bearer <seu_token>
```

## Desenvolvimento

Para desenvolvimento, o projeto inclui:
- TypeScript para tipagem estática
- ESLint para linting
- Prettier para formatação de código
- Jest para testes
- Swagger para documentação da API

Para executar em modo desenvolvimento:
```bash
npm run start:dev
```

Para executar testes:
```bash
npm run test
```

Para gerar documentação Swagger:
```bash
npm run docs
```