import { useEffect, useRef } from 'react'

export default function ChatLog({ messages, isEmpty }) {
  const logRef = useRef(null)

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight
    }
  }, [messages])

  return (
    <div className="chat-log" ref={logRef}>
      {isEmpty ? (
        <div className="chat-empty">
          <span className="mark">?</span>
          Faça uma pergunta sobre o que você está estudando ou travado numa tarefa.
          <div className="chat-suggestions">
            <button className="chip">explique simples</button>
            <button className="chip">dê exemplos</button>
            <button className="chip">erros comuns</button>
          </div>
        </div>
      ) : (
        messages.map(msg => (
          <div key={msg.id} className={`msg ${msg.role}`}>
            {msg.content}
          </div>
        ))
      )}
    </div>
  )
}
