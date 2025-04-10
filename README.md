# Frontend

- [x] screen ✅ 2025-04-07
  - [x] home ✅ 2025-04-07
    - [x] show tasks ✅ 2025-04-07
    - [x] completed task ✅ 2025-04-07
  - [x] dialog ✅ 2025-04-07
    - [x] create task ✅ 2025-04-07
    - [x] update task ✅ 2025-04-07
    - [x] delete task ✅ 2025-04-07
  - [x] responsividade
- [x] integration ✅ 2025-04-07
- [x] tests ✅ 2025-04-07
  - [x] TU ✅ 2025-04-07
  - [ ] TI
- [ ] environment

# Backend

- [x] Crud
  - [x] create ✅ 2025-04-07
  - [x] read ✅ 2025-04-07
  - [x] update ✅ 2025-04-07
  - [x] delete ✅ 2025-04-07
- [x] Tests ✅ 2025-04-10
  - [ ] TU

# Mobile

- [ ] Screen
  - [x] home ✅ 2025-04-10
  - [ ] CRUD

---

Claro! Aqui está o modelo de um **README.md** que você pode usar para documentar o seu projeto, explicando o que foi feito e como outra pessoa pode usar o projeto.

---

# Shopping List Application

Este é um projeto completo dividido em três partes principais: o **Frontend** (feito com Next.js), o **Backend** (feito com Express) e o **Mobile** (feito com React Native). O objetivo do projeto é permitir que os usuários gerenciem uma lista de compras, com a capacidade de adicionar itens, configurar a quantidade e a categoria, além de poderem visualizar, editar e excluir itens na lista.

### 🌐 Frontend - Next.js

O **Frontend** é responsável pela interface do usuário. Ele foi desenvolvido utilizando **Next.js**, um framework para React que permite renderização do lado do servidor e geração de sites estáticos. A Vercel foi utilizada para o deployment do frontend.

### ⚙️ Backend - Express

O **Backend** é construído com **Express** no Node.js e oferece a API para que o frontend consuma dados (ex: adicionar itens na lista, remover, listar itens). O backend pode ser hospedado em serviços como **Render** ou **Railway**.

### 📱 Mobile - React Native

O **Mobile** foi desenvolvido com **React Native**, permitindo que a lista de compras seja gerenciada diretamente no celular. Ele utiliza o mesmo backend para persistir dados.

---

## 🔧 Tecnologias Utilizadas

- **Frontend**: Next.js, Tailwind CSS, Vercel

- **Backend**: Node.js, Express, DynamoDB (ou outra base de dados), Render/Railway (para o deploy)

- **Mobile**: React Native, Expo, Tailwind CSS

---

## 💻 Como Rodar o Projeto Localmente

### 1. Backend - Express

1. Clone o repositório do backend:

```bash

git clone https://github.com/Matheusfbio/Souv-backend

cd Souv-backend

```

2. Instale as dependências:

```bash

npm install

```

3. dentro do projeto backend havera um **docker-compose.yml** nele possui o comando para criar o postgres dentro de um container personalizado, de forma rapida e pratica para voce não ter que baixar e instalar o postgres.

4. comando para executar o postgres no seu docker:

```
docker compose up -d
```

5. Inicie o servidor do backend:

```bash

npm run dev

```

O backend estará rodando em `http://localhost:5000` ou na URL configurada, mas tambem tem a rota `http://localhost:5000/api-docs` que te mostra o swagger para mostrar para voce a consumir api de forma correta.

6. para ter certeza que os dados foram cadastrado, recomendo instalar o dbeaver, esse software tem acesso a maioria do banco de dados mais conhecidos e gratuito.

---

### 2. Frontend - Next.js

1. Clone o repositório do frontend:

```bash

git clone https://github.com/Matheusfbio/SOUV-Frontend

cd SOUV-Frontend

```

2. Instale as dependências:

```bash

npm install

```

3. Configure variáveis de ambiente

Tive muitos problema para configurar isso, principalmente para entregra com a vercel, entao deixei o projeto de forma local mesmo.

4. Inicie o frontend:

```bash

npm run dev

```

O frontend estará acessível em `http://localhost:3000`.

---

### 3. Mobile - React Native

1. Clone o repositório do mobile:

```bash

git clone git@github.com:Matheusfbio/Souv-mobile.git

cd Souv-mobile

```

2. Instale as dependências:

```bash

npm install

```

3. Inicie o aplicativo com Expo:

```bash

expo start

```

O aplicativo estará disponível em um dispositivo móvel com o **Expo Go** (use o QR code gerado para abrir no seu celular).

obs. infelizmente o app mobile não esta integrando com o backend, mas ele cadastar os dados, mas sem persistencia de dados. Mas o web app tem resposividade semelhante ao que seria o mobile app

---

## 📋 Funcionalidades

### **Frontend**

- Interface de usuário com campos para adicionar novos itens à lista de compras.

- Visualização dos itens adicionados.

- Funcionalidade para editar e excluir itens da lista.

### **Backend**

- API RESTful para gerenciar a lista de compras:

- `POST /items`: Adicionar um item à lista.

- `GET /items`: Obter a lista de itens.

- `PUT /items/:id`: Atualizar um item existente.

- `DELETE /items/:id`: Remover um item da lista.

### **Mobile**

- A aplicação móvel espelha a interface e as funcionalidades do frontend web, permitindo que os usuários acessem sua lista de compras de qualquer lugar.

---
