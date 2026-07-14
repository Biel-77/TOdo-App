import { useState, useEffect } from 'react'
import ChatLog from '../chat/ChatLog'
import ChatInput from '../chat/ChatInput'
import '../../styles/chat.css'

export default function ChatView() {
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const sendMessage = async (text) => {
    if (!text.trim()) return

    const userMsg = { id: Date.now(), role: 'user', content: text }
    setMessages(prev => [...prev, userMsg])
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text })
      })

      if (response.ok) {
        const data = await response.json()
        const aiMsg = { id: Date.now() + 1, role: 'ai', content: data.reply }
        setMessages(prev => [...prev, aiMsg])
      } else {
        const aiMsg = { id: Date.now() + 1, role: 'ai', content: 'Houve um erro ao conectar com a IA. Tente novamente.' }
        setMessages(prev => [...prev, aiMsg])
      }
    } catch (error) {
      const aiMsg = { id: Date.now() + 1, role: 'ai', content: 'Houve um erro ao conectar com a IA. Tente novamente.' }
      setMessages(prev => [...prev, aiMsg])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="view-section">
      <div className="view-header">
        <div className="eyebrow">Tire dúvidas</div>
        <h1>Chat com IA</h1>
        <p className="lede">Pergunte sobre qualquer conceito que você está estudando, sem sair do fluxo.</p>
      </div>
      <div className="chat-wrap">
        <ChatLog messages={messages} isEmpty={messages.length === 0} />
        <ChatInput onSendMessage={sendMessage} isLoading={isLoading} />
      </div>
    </section>
  )
}
