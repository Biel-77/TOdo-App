import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

// Rota de health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'TO-do App Backend rodando' })
})

// Rota padrão
app.get('/', (req, res) => {
  res.json({ 
    name: 'TO-do App API',
    version: '1.0.0',
    features: ['Metas', 'Pomodoro', 'Feynman', 'Lousa Virtual'],
    health: '/api/health'
  })
})

app.listen(PORT, () => {
  console.log(`🚀 TO-do App Backend rodando em http://localhost:${PORT}`)
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`)
})
