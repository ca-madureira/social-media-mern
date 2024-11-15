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
     PORT=sua_porta_backend (ex:5000)
     ORIGIN=sua_url_frontend
     DB_URI=sua_string_de_conexao_mongodb
     JWT_SECRET=sua_chave_secreta_para_jwt
     
     ```
   - Crie um arquivo `.env.local` na raiz do projeto **frontend** (`.env.local`) e adicione:
     ```
     REACT_APP_API_URL=http://localhost:5000
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


- **Feed de Notícias Personalizado:**  Um feed que mostra as últimas atualizações e posts de seus amigos e páginas que você segue.
- **Sistema de Notificações:**  Receba notificações de votos em seus posts e outras interações relevantes.
- **Mensagens Privadas:**  Converse com seus amigos diretamente através de mensagens privadas.
- **Criação de Grupos:**  Crie e participe de grupos com interesses em comum.
- **Sistema de Hashtags:**  Use hashtags para categorizar seus posts e torná-los mais fáceis de encontrar.
- **Criação de Eventos:**  Crie e convide amigos para eventos.
- **Sistema de Gamificação:**  Implemente um sistema de pontos, emblemas ou conquistas para aumentar o engajamento do usuário.

##  Licença

Este projeto está licenciado sob a Licença MIT. Consulte o arquivo [LICENSE](LICENSE) para obter mais detalhes.

