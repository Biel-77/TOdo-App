import { useState, useEffect } from 'react'
import PomodoroTimer from '../pomodoro/PomodoroTimer'
import '../../styles/pomodoro.css'

const DURATIONS = { work: 25 * 60, short: 5 * 60, long: 15 * 60 }
const LABELS = { work: 'foco', short: 'pausa curta', long: 'pausa longa' }

export default function PomodoroView() {
  const [selectedGoalId, setSelectedGoalId] = useState('')

  // Goals são passadas como prop ao PomodoroTimer e carregadas lá
  const [goals, setGoals] = useState([])

  useEffect(() => {
    // Carrega goals inicial
    const savedGoals = localStorage.getItem('todo-goals')
    if (savedGoals) {
      setGoals(JSON.parse(savedGoals))
    }

    // Listener para atualizações de goals
    const updateGoals = () => {
      const savedGoals = localStorage.getItem('todo-goals')
      if (savedGoals) {
        setGoals(JSON.parse(savedGoals))
      }
    }

    // Customizar para ouvir mudanças do localStorage
    const originalSetItem = localStorage.setItem
    localStorage.setItem = function(key, value) {
      originalSetItem.call(this, key, value)
      if (key === 'todo-goals') {
        updateGoals()
      }
    }

    return () => {
      localStorage.setItem = originalSetItem
    }
  }, [])

  return (
    <section className="view-section">
      <div className="view-header">
        <div className="eyebrow">Cronômetro</div>
        <h1>Sessão de foco</h1>
        <p className="lede">25 minutos de trabalho profundo, depois uma pausa curta. Repita.</p>
      </div>
      <PomodoroTimer goals={goals} selectedGoalId={selectedGoalId} onSelectGoal={setSelectedGoalId} />
    </section>
  )
}
