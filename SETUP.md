## 🚀 Como Iniciar

### Pré-requisitos

- Node.js 16+
- npm ou yarn

### Desenvolvimento Local

1. **Instale as dependências**

   ```bash
   npm install
   cd web && npm install
   cd ../api && npm install
   cd ..
   ```

2. **Configure as variáveis de ambiente**

   ```bash
   cp .env.example .env
   # Edite .env e adicione sua ANTHROPIC_API_KEY
   ```

3. **Inicie em modo desenvolvimento**
   ```bash
   npm run dev
   ```

   - Frontend: http://localhost:5173
   - Backend: http://localhost:3001

### Build para Produção

```bash
npm run build
```

## 🌐 Deploy na Vercel

### Passos para Deploy

1. **Configure no Vercel Dashboard**
   - Conecte seu repositório GitHub
   - Selecione a raiz do projeto

2. **Defina as Variáveis de Ambiente**
   - `ANTHROPIC_API_KEY`: sua chave da API Anthropic

3. **Deploy Automático**
   - Toda vez que fazer push para `main`, o Vercel fará o deploy automaticamente

### Obter API Key da Anthropic

1. Visite https://console.anthropic.com
2. Crie uma conta ou faça login
3. Gere uma nova API key
4. Adicione como variável de ambiente no Vercel

## 🔧 Tecnologias

- **Frontend**: React 18, Vite, CSS Modular
- **Backend**: Node.js, Express, CORS
- **API IA**: Anthropic Claude
- **Armazenamento**: LocalStorage
- **Deploy**: Vercel

## 📊 Features Detalhadas

### Metas

- Crie metas com prazos
- Divida em subtarefas
- Acompanhe progresso com barras visuais
- Alertas de tarefas atrasadas

### Pomodoro

- Timer de foco (25 min) e pausas (5/15 min)
- Contagem de sessões realizadas
- Som de notificação ao finalizar
- Vincular sessão a uma meta

### Método Feynman

- 4 passos estruturados de aprendizagem
- Histórico de conceitos estudados
- Carregar entradas anteriores

### Chat IA

- Pergunte qualquer coisa sobre seus estudos
- Respostas personalizadas e didáticas
- Sugestões pré-prontas

## 📝 Licença

MIT

## 👤 Autor

Desenvolvido para produtividade e foco nos estudos.
