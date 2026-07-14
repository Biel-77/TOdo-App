import GoalCard from './GoalCard'

export default function GoalList({ goals, onDeleteGoal, onUpdateSubtasks }) {
  if (goals.length === 0) {
    return <div className="goal-empty">Nenhuma meta ainda. Adicione a primeira acima.</div>
  }

  return (
    <div className="goal-list">
      {goals.map(goal => (
        <GoalCard
          key={goal.id}
          goal={goal}
          onDelete={() => onDeleteGoal(goal.id)}
          onUpdateSubtasks={(subtasks) => onUpdateSubtasks(goal.id, subtasks)}
        />
      ))}
    </div>
  )
}
