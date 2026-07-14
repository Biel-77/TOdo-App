export default function DrawingTools({ tool, setTool, color, setColor, size, setSize, onClear, onDownload }) {
  const tools = [
    { 
      id: 'pen', 
      label: 'Caneta', 
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
    },
    { 
      id: 'eraser', 
      label: 'Borracha', 
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><path d="M21 21l-4.35-4.35"></path></svg>
    },
    { 
      id: 'line', 
      label: 'Linha', 
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="19" x2="19" y2="5"></line></svg>
    },
    { 
      id: 'arrow', 
      label: 'Seta', 
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
    },
    { 
      id: 'rect', 
      label: 'Retângulo', 
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18"></rect></svg>
    },
    { 
      id: 'circle', 
      label: 'Círculo', 
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9"></circle></svg>
    },
    { 
      id: 'text', 
      label: 'Texto', 
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="6" y1="2" x2="6" y2="22"></line><line x1="2" y1="6" x2="10" y2="6"></line><path d="M6 14h4M6 22h10"></path></svg>
    }
  ]

  return (
    <div className="drawing-toolbar">
      <div className="toolbar-section">
        <label className="toolbar-label">Ferramenta:</label>
        <div className="tool-buttons">
          {tools.map(t => (
            <button
              key={t.id}
              className={`tool-btn ${tool === t.id ? 'active' : ''}`}
              onClick={() => setTool(t.id)}
              title={t.label}
            >
              {t.icon}
            </button>
          ))}
        </div>
      </div>

      {tool !== 'text' && (
        <>
          <div className="toolbar-section">
            <label className="toolbar-label">Cor:</label>
            <div className="color-picker-wrapper">
              <input
                type="color"
                value={color}
                onChange={e => setColor(e.target.value)}
                className="color-picker"
              />
              <span className="color-value">{color}</span>
            </div>
          </div>

          <div className="toolbar-section">
            <label className="toolbar-label">Tamanho:</label>
            <input
              type="range"
              min="1"
              max="30"
              value={size}
              onChange={e => setSize(parseInt(e.target.value))}
              className="size-slider"
            />
            <span className="size-value">{size}px</span>
          </div>
        </>
      )}

      <div className="toolbar-section">
        <button className="btn-toolbar clear" onClick={onClear} title="Limpar lousa">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 4 21 4"></polyline><path d="M19 4v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4m3 0V2h8v2M10 9v6M14 9v6"></path></svg>
          Limpar
        </button>
        <button className="btn-toolbar download" onClick={onDownload} title="Baixar desenho">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
          Baixar
        </button>
      </div>
    </div>
  )
}
