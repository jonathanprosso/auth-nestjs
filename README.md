# Projeto auth-nestjs - Autenticação e Autorização

Projeto desenvolvido com o objetivo de treinar a construção de uma API segura utilizando **NestJS**, aplicando os conceitos de **autenticação com JWT**, **autorização baseada em papéis (RBAC)**, **controle de acesso com CASL**, e integração com **Prisma** e **PostgreSQL**.


## Tecnologias utilizadas

- [NestJS](https://nestjs.com/)
- [Node.js](https://nodejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Prisma ORM](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [JWT](https://jwt.io/)
- [Bcrypt](https://github.com/kelektiv/node.bcrypt.js)
- [CASL](https://casl.js.org/)
- Docker

## Funcionalidades
- Cadastro e login de usuários com autenticação via JWT
- Criptografia de senhas com Bcrypt
- CRUD de usuários e posts
- Controle de permissões com CASL
- Integração com banco PostgreSQL via Prisma


## Endpoints

### Usuários

| Método | Rota         | Ação                      
|--------|--------------|---------------------------
| POST   | `/users`       | Criar novo usuário        
| GET    | `/users`       | Listar todos os usuários  
| GET    | `/users/{id}`  | Buscar usuário por ID     
| PATCH  | `/users/{id}`  | Atualizar usuário         
| DELETE | `/users/{id}`  | Excluir usuário           

### Posts

| Método | Rota         | Ação                      
|--------|--------------|---------------------------
| POST   | `/post`        | Criar novo post           
| GET    | `/post`        | Listar todos os posts     
| GET    | `/post/{id}`   | Buscar post por ID        
| PATCH  | `/post/{id}`   | Atualizar post            
| DELETE | `/post/{id}`   | Excluir post              

### Autenticação

| Método | Rota          | Ação                      
|--------|---------------|---------------------------
| POST   | `/auth/login`   | Autenticar usuário (login) 

## Como rodar o projeto

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/auth-nestjs.git
cd auth-nestjs

```

2. Instalar as dependências
```bash
npm install
```

3. Subir banco de dados com Docker
```bash
docker compose up -d
```

4. Configurar o .env

Crie um arquivo .env com as variáveis:
```bash
DATABASE_URL="postgresql://postgres:root@localhost:5432/mypostgres"
JWT_SECRET="chave-secreta"
```

5. Aplicar as migrações com Prisma
```bash
npx prisma migrate dev
```

6. Iniciar o projeto
```bash
npm run start:dev
```

## Notas
- O projeto é voltado para estudo e prática de autenticação/autorização com NestJS.

- Os commits e a estrutura podem refletir experimentações e testes.

- Inspirado no curso "Nest.js e API REST: Autenticação e Autorização na Prática".