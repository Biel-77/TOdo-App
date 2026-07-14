function escapeHtml(s) {
  const div = document.createElement('div')
  div.innerText = s
  return div.innerHTML
}

export default function SubtaskList({ subtasks, onToggle }) {
  return (
    <div className="subtasks">
      {subtasks.map(s => (
        <div key={s.id} className={`subtask-row ${s.done ? 'done' : ''}`}>
          <input
            type="checkbox"
            checked={s.done}
            onChange={() => onToggle(s.id)}
          />
          <span>{escapeHtml(s.text)}</span>
        </div>
      ))}
    </div>
  )
}
