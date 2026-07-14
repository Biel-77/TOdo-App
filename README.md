# TO-DO App — Foco, Metas e Estudo

Uma aplicação web moderna de produtividade e estudo, construída com **React**, **Node.js**.

## 🚀 Funcionalidades

- **📋 Metas**: Crie metas com subtarefas e acompanhe o progresso em tempo real
- **⏱️ Pomodoro**: Timer de 25 minutos para sessões de foco + pausas
- **🧠 Método Feynman**: Aprenda a explicar conceitos de forma simples e clara
- **🤖 Chat IA**: Tire dúvidas com uma IA tutor em tempo real(Em breve...)
- **💾 Armazenamento Local**: Seus dados são salvos automaticamente no navegador

## 📁 Estrutura do Projeto

```
TOdo App/
├── web/                    # Frontend React
│   ├── src/
│   │   ├── components/    # Componentes React
│   │   │   ├── views/
│   │   │   ├── goals/
│   │   │   ├── pomodoro/
│   │   │   ├── feynman/
│   │   │   ├── chat/
│   │   │   └── Sidebar.jsx
│   │   ├── styles/        # CSS modular
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── api/                    # Backend Node.js
│   ├── index.js           # Servidor Express
│   └── package.json
├── vercel.json            # Configuração Vercel
├── .env.example           # Variáveis de ambiente
└── README.md
```
