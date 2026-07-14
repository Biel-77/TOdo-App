@echo off
REM QUICK START - Execute este arquivo para setup automático (Windows)

echo.
echo 🚀 TO-DO APP - SETUP AUTOMATICO
echo ================================
echo.

echo 📦 Instalando dependências...
call npm install

echo.
echo 📦 Instalando dependências do frontend...
cd web
call npm install
cd ..

echo.
echo 📦 Instalando dependências do backend...
cd api
call npm install
cd ..

echo.
echo ✅ Setup completo!
echo.
echo ⚠️  PRÓXIMO PASSO:
echo    1. Edite o arquivo .env na raiz do projeto
echo    2. Adicione sua ANTHROPIC_API_KEY
echo.
echo 🚀 Para iniciar o desenvolvimento:
echo    npm run dev
echo.
echo Link para obter API Key: https://console.anthropic.com
echo.
pause
