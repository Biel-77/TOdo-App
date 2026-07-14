#!/bin/bash
# QUICK START - Execute este arquivo para setup automático

echo "🚀 TO-DO APP - SETUP AUTOMÁTICO"
echo "================================"

echo "📦 Instalando dependências..."
npm install

echo "📦 Instalando dependências do frontend..."
cd web && npm install && cd ..

echo "📦 Instalando dependências do backend..."
cd api && npm install && cd ..

echo ""
echo "✅ Setup completo!"
echo ""
echo "⚠️  PRÓXIMO PASSO:"
echo "   1. Edite o arquivo .env na raiz do projeto"
echo "   2. Adicione sua ANTHROPIC_API_KEY"
echo ""
echo "🚀 Para iniciar o desenvolvimento:"
echo "   npm run dev"
echo ""
echo "Link para obter API Key: https://console.anthropic.com"
