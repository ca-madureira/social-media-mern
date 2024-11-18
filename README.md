## 💻 AmizApp - Conecte-se e compartilhe momentos!

##  Sobre o Projeto

O AmizApp é uma rede social totalmente funcional que criei para aprimorar minhas habilidades em desenvolvimento web com a stack MERN (MongoDB, Express.js, React e Node.js). Através deste projeto, pude construir uma aplicação web dinâmica e interativa do zero, aprofundando meus conhecimentos em cada etapa do processo.

**Funcionalidades da Versão 1.0:**

* **Cadastre-se** informando seu e-mail e criando uma senha segura.
* **Acesse sua conta** com suas credenciais.
* **Recupere sua senha** facilmente por e-mail,recebendo um código e alterando sua senha caso a esqueça.
* **Encontre amigos** utilizando a barra de pesquisa.
* **Envie convites de amizade** para se conectar com outros usuários.
* **Personalize seu perfil**  com uma foto.
* **Exclua sua conta**, se desejar.

**Interaja na plataforma:**

* **Lista de Amigos:**  Visualize facilmente sua lista de amigos e gerencie suas conexões.
* **Sistema de Notificações:**  Receba notificações sobre novas solicitações de amizade.
* **Crie posts** para compartilhar seus pensamentos e momentos.
* **Vote em posts** que você gostou.
* **Deslogue-se** com segurança ao final da navegação.



##  Tecnologias Utilizadas

**Frontend:**

- **React:**  Uma biblioteca JavaScript poderosa e flexível para construir interfaces de usuário interativas.
- **TypeScript:**  Adiciona tipagem estática ao JavaScript, tornando o código mais robusto e fácil de manter.
- **RTK Query (Redux Toolkit Query):**  Simplifica a comunicação com a API, gerenciando requisições assíncronas, caching e estados.
- **Redux Toolkit:**  Uma maneira moderna e eficiente de escrever código Redux, simplificando o gerenciamento de estado.
- **Tailwind CSS:**  Um framework CSS utilitário que permite criar designs personalizados rapidamente.

**Backend:**

- **Node.js:**  Um ambiente de execução JavaScript assíncrono e orientado a eventos, ideal para construir aplicações web escaláveis.
- **TypeScript:**  Traz tipagem estática para o backend, melhorando a qualidade do código.
- **Mongoose:**  Um ODM (Object Data Modeling) que facilita a interação com o banco de dados MongoDB.
- **Express.js:**  Um framework web rápido e minimalista para Node.js, ideal para construir APIs RESTful.
- **Cloudinary:** Um serviço de gerenciamento de mídia usado para armazenar e entregar imagens de forma otimizada e segura, ideal para personalização de perfis.

**Banco de Dados:**

- **MongoDB:**  Um banco de dados NoSQL orientado a documentos, conhecido por sua flexibilidade e escalabilidade.

## Como Executar o Projeto

**Pré-requisitos:**

- **Node.js** e **npm** (ou **yarn**) instalados em sua máquina.
- **MongoDB** instalado e em execução na sua máquina local ou em um servidor remoto.

**Passos para Execução:**

1. **Clone o Repositório:**
   ```bash
   git clone https://github.com/ca-madureira/social-media-mern.git
   ```

2. **Instale as Dependências:**
   ```bash
   cd back
   npm install
   cd front && cd social
   npm install
   ```

3. **Configurações:**
   - Crie um arquivo `.env` na raiz do projeto **backend** (`.env`)  e adicione as seguintes variáveis de ambiente, ajustando os valores conforme necessário:
     ```
     PORT= (ex:5000)
     ORIGIN=
     DB_URI=
     JWT_SECRET=
     ACCESS_TOKEN_SECRET=
     REFRESH_TOKEN_SECRET=
     CLOUD_NAME=
     CLOUD_API_KEY=
     CLOUD_SECRET_KEY=
     NODE_CODE_SENDING_EMAIL_ADDRESS=
     NODE_CODE_SENDING_EMAIL_PASSWORD=
     
     ```
   - Crie um arquivo `.env.local` na raiz do projeto **frontend** (`.env.local`) e adicione:
     ```
     VITE_REACT_APP_BACKEND_BASEURL=http://localhost:5000
     ```

4. **Inicializar a Aplicação:**
   - Inicie o backend:
     ```bash
     cd backend
     npm run dev (ou npm start)
     ```
   - Inicie o frontend:
     ```bash
     cd frontend
     npm run start
     ```

##  🚀 Próximos Passos / Roadmap

**Funcionalidades Futuras e Melhorias Planejadas:**


- **Comentários em Posts:** Adicione e visualize comentários nos posts para facilitar o engajamento e discussões.
- **Notificações Avançadas:** Receba notificações detalhadas sobre quem votou e quem comentou em seus posts.
- **Sistema de Chat:** Interaja em tempo real com amigos e membros da comunidade através de um sistema de chat completo.
- **Criação de Grupos:**  Crie e participe de grupos com interesses em comum.
- **Lojinha Virtual:** Permite que os usuários criem uma loja dentro da plataforma para vender produtos ou serviços.




<div style="display: flex; justify-content: center; gap: 10px;">

<img src="https://github.com/user-attachments/assets/740744f7-e231-43f8-8a05-75f05017ed49" width="500" />

<img src="https://github.com/user-attachments/assets/c1e6fbbb-ac02-4946-8a59-5a8f812813e6" width="500" />

</div>




