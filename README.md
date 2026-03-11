# 🗳️ SecureVote — Sistema de Votação

Sistema de votação seguro e moderno construído com **Next.js**, **TypeScript**, **Prisma** e **PostgreSQL**. Permite registro de usuários, autenticação via JWT e votação em candidatos com contagem em tempo real.

---

## 🛠️ Tecnologias

| Tecnologia | Uso |
|---|---|
| **Next.js 16** | Framework fullstack (App Router) |
| **TypeScript** | Tipagem estática |
| **Prisma ORM** | Acesso ao banco de dados |
| **PostgreSQL** | Banco de dados relacional |
| **Tailwind CSS 4** | Estilização |
| **JWT** | Autenticação (jsonwebtoken) |
| **bcrypt** | Hash de senhas |
| **Docker Compose** | Banco de dados em container |

---

## 📁 Estrutura do Projeto

```
system-votation/
├── app/
│   ├── api/
│   │   ├── auth/login/       # POST - Login (retorna JWT)
│   │   ├── candidates/       # GET - Listar | POST - Criar
│   │   ├── candidates/[id]/  # GET | PUT | DELETE por ID
│   │   ├── users/            # GET - Listar | POST - Registrar
│   │   ├── users/[id]/       # GET | PUT | DELETE por ID
│   │   ├── vote/             # POST - Votar (autenticado)
│   │   └── votes/            # POST - Votar (autenticado)
│   ├── login/                # Página de login
│   ├── register/             # Página de registro
│   ├── vote/                 # Página de votação
│   ├── layout.tsx
│   └── page.tsx              # Home
├── components/
│   ├── ui/                   # Button, Card
│   ├── CandidateCard.tsx     # Card do candidato
│   └── VotingSection.tsx     # Grid de votação
├── controllers/              # Lógica das rotas
├── services/                 # Regras de negócio + Prisma
├── lib/
│   ├── jwt.ts                # Geração/verificação de token
│   ├── prisma.ts             # Cliente Prisma
│   └── types.ts              # Tipos TypeScript
├── prisma/
│   └── schema.prisma         # Modelos: User, Candidate, Vote
├── docker-compose.yml
└── package.json
```

---

## 🚀 Como Rodar

### Pré-requisitos

- **Node.js** 18+
- **Docker** e **Docker Compose**

### 1. Clonar o repositório

```bash
git clone https://github.com/Arthurvini17/System-votation.git
cd System-votation
```

### 2. Instalar dependências

```bash
npm install
```

### 3. Subir o banco de dados

```bash
docker compose up -d
```

### 4. Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/votation?schema=public"
JWT_SECRET="sua_chave_secreta_aqui"
JWT_EXPIRES_IN="1d"
```

### 5. Rodar as migrations do Prisma

```bash
npx prisma migrate dev
```

### 6. Iniciar o servidor

```bash
npm run dev
```

Acesse: **http://localhost:3000**

---

## 📡 Endpoints da API

### Autenticação

| Método | Rota | Descrição |
|---|---|---|
| `POST` | `/api/auth/login` | Login — retorna JWT |

**Body:**
```json
{ "email": "user@email.com", "password": "123456" }
```

### Usuários

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/api/users` | Listar todos |
| `POST` | `/api/users` | Criar usuário |
| `GET` | `/api/users/:id` | Buscar por ID |
| `PUT` | `/api/users/:id` | Atualizar |
| `DELETE` | `/api/users/:id` | Deletar |

**Body (POST/PUT):**
```json
{ "name": "João", "email": "joao@email.com", "password": "123456" }
```

### Candidatos

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/api/candidates` | Listar todos (com contagem de votos) |
| `POST` | `/api/candidates` | Criar candidato |
| `GET` | `/api/candidates/:id` | Buscar por ID |
| `PUT` | `/api/candidates/:id` | Atualizar |
| `DELETE` | `/api/candidates/:id` | Deletar |

**Body (POST/PUT):**
```json
{ "name": "Candidato 1", "description": "Descrição do candidato" }
```

### Votação

| Método | Rota | Descrição |
|---|---|---|
| `POST` | `/api/vote` | Registrar voto (requer JWT) |

**Headers:**
```
Authorization: Bearer <token>
```

**Body:**
```json
{ "candidateId": 1 }
```

> ⚠️ Cada usuário pode votar apenas **uma vez**.

---

## 🗄️ Modelos do Banco (Prisma)

```prisma
model User {
  id       Int    @id @default(autoincrement())
  name     String
  email    String @unique
  password String
  votes    Vote[]
}

model Candidate {
  id            Int    @id @default(autoincrement())
  name          String
  description   String
  votesReceived Vote[]
}

model Vote {
  id          Int       @id @default(autoincrement())
  userId      Int
  candidateId Int
  user        User      @relation(fields: [userId], references: [id])
  candidate   Candidate @relation(fields: [candidateId], references: [id])
  @@unique([userId])
}
```

---

## 🔐 Fluxo de Autenticação

1. Usuário se registra em `/register` → `POST /api/users`
2. Faz login em `/login` → `POST /api/auth/login` → recebe **JWT**
3. Token é salvo no `localStorage`
4. Ao votar, o token é enviado no header `Authorization: Bearer <token>`
5. O backend valida o token e registra o voto vinculado ao `userId`

---

## 📄 Licença

Este projeto está sob a licença MIT.
