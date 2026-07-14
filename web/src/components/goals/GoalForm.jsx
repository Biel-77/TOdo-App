import { useState } from 'react'

export default function GoalForm({ onAddGoal }) {
  const [title, setTitle] = useState('')
  const [deadline, setDeadline] = useState('')
  const [duration, setDuration] = useState('')

  const handleSubmit = () => {
    if (!title.trim()) return
    onAddGoal(title, deadline, duration)
    setTitle('')
    setDeadline('')
    setDuration('')
  }

  return (
    <div className="goal-form">
      <input
        type="text"
        placeholder="Ex: Terminar o curso de estatística"
        value={title}
        onChange={e => setTitle(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && handleSubmit()}
      />
      <input
        type="date"
        value={deadline}
        onChange={e => setDeadline(e.target.value)}
      />
      <input
        type="number"
        min="0.5"
        step="0.5"
        placeholder="Horas"
        value={duration}
        onChange={e => setDuration(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && handleSubmit()}
        style={{ width: '100px' }}
      />
      <button className="btn-primary" onClick={handleSubmit}>
        Adicionar
      </button>
    </div>
  )
}
