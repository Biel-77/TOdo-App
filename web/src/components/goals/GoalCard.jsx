import { useState } from 'react'
import SubtaskList from './SubtaskList'

function escapeHtml(s) {
  const div = document.createElement('div')
  div.innerText = s
  return div.innerHTML
}

function formatDate(d) {
  const dt = new Date(d + 'T00:00:00')
  return dt.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })
}

export default function GoalCard({ goal, onDelete, onUpdateSubtasks }) {
  const [newSubtask, setNewSubtask] = useState('')
  const total = goal.subtasks.length
  const done = goal.subtasks.filter(s => s.done).length
  const pct = total ? Math.round(done / total * 100) : 0
  const overdue = goal.deadline && new Date(goal.deadline) < new Date(new Date().toDateString())
  const durationText = goal.duration ? `${goal.duration}h de foco` : null

  const addSubtask = () => {
    if (!newSubtask.trim()) return
    const updated = [...goal.subtasks, {
      id: Date.now().toString(36),
      text: newSubtask,
      done: false
    }]
    onUpdateSubtasks(updated)
    setNewSubtask('')
  }

  const toggleSubtask = (id) => {
    const updated = goal.subtasks.map(s => 
      s.id === id ? { ...s, done: !s.done } : s
    )
    onUpdateSubtasks(updated)
  }

  return (
    <div className="card goal-card">
      <div className="goal-top">
        <div>
          <div className="goal-title">{escapeHtml(goal.title)}</div>
          {(goal.deadline || goal.duration) && (
            <div className={`goal-deadline ${overdue ? 'overdue' : ''}`}>
              {overdue ? 'atrasado · ' : ''}
              {goal.deadline && formatDate(goal.deadline)}
              {goal.deadline && goal.duration && ' · '}
              {durationText}
            </div>
          )}
        </div>
        <button className="icon-btn" onClick={onDelete} title="Excluir meta">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0l-1 14a2 2 0 01-2 2H7a2 2 0 01-2-2L4 6"/>
          </svg>
        </button>
      </div>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${pct}%` }}></div>
      </div>
      <div style={{ fontSize: '11.5px', color: 'var(--text-faint)', marginBottom: '6px' }}>
        {done}/{total} passos concluídos
      </div>
      <SubtaskList subtasks={goal.subtasks} onToggle={toggleSubtask} />
      <div className="subtask-add">
        <input
          type="text"
          placeholder="Novo passo..."
          value={newSubtask}
          onChange={e => setNewSubtask(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addSubtask()}
        />
        <button className="btn-ghost" style={{ background: 'var(--surface-2)' }} onClick={addSubtask}>
          + passo
        </button>
      </div>
    </div>
  )
}
