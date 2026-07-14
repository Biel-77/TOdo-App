import { useState } from 'react'

export default function ChatInput({ onSendMessage, isLoading }) {
  const [text, setText] = useState('')

  const handleSend = () => {
    if (!text.trim()) return
    onSendMessage(text)
    setText('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="chat-input-row">
      <textarea
        placeholder="Digite sua dúvida... (Enter para enviar)"
        value={text}
        onChange={e => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={isLoading}
      />
      <button className="btn-primary" onClick={handleSend} disabled={isLoading}>
        {isLoading ? '...' : 'Enviar'}
      </button>
    </div>
  )
}
