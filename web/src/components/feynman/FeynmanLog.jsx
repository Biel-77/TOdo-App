function escapeHtml(s) {
  const div = document.createElement('div')
  div.innerText = s
  return div.innerHTML
}

export default function FeynmanLog({ entries, onLoadEntry }) {
  if (entries.length === 0) {
    return <div className="feynman-empty">Seus registros salvos aparecerão aqui.</div>
  }

  return (
    <div className="feynman-log">
      {[...entries].reverse().map(entry => (
        <div
          key={entry.id}
          className="card flog-item"
          onClick={() => onLoadEntry(entry)}
        >
          <div className="flog-concept">{escapeHtml(entry.concept || 'Sem título')}</div>
          <div className="flog-date">
            {new Date(entry.createdAt).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })}
          </div>
        </div>
      ))}
    </div>
  )
}
