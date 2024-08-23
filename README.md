# README

## To-Do List 

### Descrição

Este é o frontend da aplicação de lista de tarefas, desenvolvido com **Next.js** e **TypeScript**. Ele fornece uma interface para os usuários interagirem com a API do backend.

### Tecnologias Utilizadas

- Next.js
- TypeScript
- Material-UI (MUI)
- Axios (para chamadas à API)
- React

### Instalação e Configuração

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/IzA888/todo_list.git)
   cd todo_list
   ```

2. **Instale as dependências do projeto:**

   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente:**

   - Crie um arquivo `.env.local` na raiz do diretório do frontend e adicione a seguinte variável:

     ```env
     NEXT_PUBLIC_API_URL=http://localhost:3000
     ```

4. **Inicie o servidor de desenvolvimento:**

   ```bash
   npm run dev
   ```

5. **Verifique a Aplicação:**

   - Abra um navegador e acesse [http://localhost:8000](http://localhost:8000) para visualizar a aplicação.

### Funcionalidades

- **Login de Usuário:**
  - Realiza login e armazena o token de autenticação e o ID do usuário no `localStorage`.

- **Lista de Tarefas:**
  - Visualiza, adiciona, atualiza e exclui tarefas.
  - Filtra a lista de tarefas com base em uma palavra-chave.

- **Perfil do Usuário:**
  - Visualiza informações do perfil do usuário e permite logout.

### Estrutura de Diretórios

- `src/`
  - `components/` - Componentes reutilizáveis da aplicação.
  - `pages/` - Páginas da aplicação Next.js.
  - `services/` - Funções para fazer chamadas à API.


---
