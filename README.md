#  AmizApp - Conecte-se e compartilhe momentos!

##  Sobre o Projeto

O AmizApp é uma rede social completa, desenvolvida com a stack MERN (MongoDB, Express.js, React e Node.js), aprimorada com a comunicação em tempo real via Socket.IO. Este projeto foi criado para consolidar e expandir minhas habilidades em desenvolvimento web, proporcionando uma experiência de usuário dinâmica e interativa.

**Funcionalidades Principais:**

* **Autenticação:**
    * Cadastro seguro com e-mail e senha.
    * Login com credenciais.
    * Recuperação de senha por e-mail com código de verificação.
    * Exclusão de conta.
* **Conexões Sociais:**
    * Busca de usuários por nome.
    * Envio e aceitação de solicitações de amizade.
    * Lista de amigos com status online.
    * Desfazer amizade.
* **Interação em Tempo Real:**
    * Chat em tempo real com amigos (Socket.IO).
    * Lista de conversas com visualização da última mensagem.
* **Personalização e Engajamento:**
    * Personalização de perfil com foto (Cloudinary).
    * Criação e visualização de posts.
    * Sistema de curtidas em posts.
    * Sistema de notificações de solicitações de amizade.
* **Status Online:**
    * Veja quais amigos estão online para iniciar uma conversa.

## ️ Tecnologias Utilizadas

**Frontend:**

* **React:** Biblioteca JavaScript para construção de interfaces de usuário interativas.
* **TypeScript:** Superset do JavaScript para tipagem estática e melhor manutenção do código.
* **RTK Query (Redux Toolkit Query):** Simplifica a busca de dados e o gerenciamento de cache.
* **Redux Toolkit:** Gerenciamento de estado global de forma eficiente.
* **Tailwind CSS:** Framework CSS utilitário para design rápido e responsivo.
* **Socket.IO Client:** Para comunicação em tempo real com o servidor.

**Backend:**

* **Node.js:** Ambiente de execução JavaScript para o servidor.
* **TypeScript:** Garante a tipagem estática no backend.
* **Mongoose:** ODM para interação com o MongoDB.
* **Express.js:** Framework web para criação de APIs RESTful.
* **Cloudinary:** Serviço de gerenciamento de mídia para imagens.
* **Socket.IO Server:** Para comunicação em tempo real com o frontend.

**Banco de Dados:**

* **MongoDB:** Banco de dados NoSQL para armazenamento de dados flexível.

##  Como Executar o Projeto

**Pré-requisitos:**

* Node.js e npm (ou yarn) instalados.
* MongoDB instalado e em execução.

**Passos:**

1.  **Clone o repositório:**

    ```bash
    git clone [https://github.com/ca-madureira/social-media-mern.git](https://github.com/ca-madureira/social-media-mern.git)
    ```

2.  **Instale as dependências:**

    ```bash
    cd social-media-mern/backend
    npm install
    cd ../frontend/social
    npm install
     cd ../../socket
    npm install
    ```

3.  **Configuração do Backend:**

    * Crie um arquivo `.env` na pasta `backend` com as seguintes variáveis:

    ```
    PORT=5000
    ORIGIN=http://localhost:3000
    DB_URI=mongodb://localhost:27017/amizapp
    JWT_SECRET=seu_jwt_secret
    ACCESS_TOKEN_SECRET=seu_access_token_secret
    REFRESH_TOKEN_SECRET=seu_refresh_token_secret
    CLOUD_NAME=seu_cloud_name
    CLOUD_API_KEY=sua_cloud_api_key
    CLOUD_SECRET_KEY=sua_cloud_secret_key
    NODE_CODE_SENDING_EMAIL_ADDRESS=seu_email
    NODE_CODE_SENDING_EMAIL_PASSWORD=sua_senha
    ```

4.  **Configuração do Frontend:**

    * Crie um arquivo `.env.local` na pasta `frontend/social` com a seguinte variável:

    ```
    VITE_REACT_APP_BACKEND_BASEURL=http://localhost:5000
    ```

5.  **Inicie os servidores:**

    ```bash
    # Backend
    cd social-media-mern/back
    npm run dev

    #Socket
    cd social-media-mern/socket
    npm run dev

    # Frontend
    cd social-media-mern/front/social
    npm run dev
    ```

## ️ Capturas de Tela

<div style="display: flex; justify-content: center; gap: 10px;">

<img src="https://github.com/user-attachments/assets/740744f7-e231-43f8-8a05-75f05017ed49" width="500" />

<img src="https://github.com/user-attachments/assets/c1e6fbbb-ac02-4946-8a59-5a8f812813e6" width="500" />

</div>

