import { useState, useEffect } from 'react'
import GoalForm from '../goals/GoalForm'
import GoalList from '../goals/GoalList'
import '../../styles/metas.css'

export default function MetasView() {
  const [goals, setGoals] = useState([])

  useEffect(() => {
    const savedGoals = localStorage.getItem('todo-goals')
    if (savedGoals) {
      setGoals(JSON.parse(savedGoals))
    }
  }, [])

  const addGoal = (title, deadline, duration) => {
    const newGoal = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
      title,
      deadline: deadline || null,
      duration: duration ? parseFloat(duration) : null,
      subtasks: []
    }
    const updated = [...goals, newGoal]
    setGoals(updated)
    localStorage.setItem('todo-goals', JSON.stringify(updated))
  }

  const deleteGoal = (id) => {
    const updated = goals.filter(g => g.id !== id)
    setGoals(updated)
    localStorage.setItem('todo-goals', JSON.stringify(updated))
  }

  const updateSubtasks = (goalId, subtasks) => {
    const updated = goals.map(g => g.id === goalId ? { ...g, subtasks } : g)
    setGoals(updated)
    localStorage.setItem('todo-goals', JSON.stringify(updated))
  }

  return (
    <section className="view-section">
      <div className="view-header">
        <div className="eyebrow">Painel</div>
        <h1>Suas metas</h1>
        <p className="lede">Divida o que você quer alcançar em passos pequenos e concretos.</p>
      </div>
      <GoalForm onAddGoal={addGoal} />
      <GoalList goals={goals} onDeleteGoal={deleteGoal} onUpdateSubtasks={updateSubtasks} />
    </section>
  )
}
