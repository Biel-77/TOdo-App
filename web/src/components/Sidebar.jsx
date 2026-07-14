import { useState, useEffect } from 'react'
import '../styles/sidebar.css'

const navItems = [
  { view: 'metas', label: 'Metas', icon: 'check' },
  { view: 'pomodoro', label: 'Pomodoro', icon: 'clock' },
  { view: 'feynman', label: 'Feynman', icon: 'book' },
  { view: 'whiteboard', label: 'Lousa', icon: 'palette' }
]

export default function Sidebar({ currentView, onViewChange }) {
  const [sessionsToday, setSessionsToday] = useState(0)

  useEffect(() => {
    const sessionData = localStorage.getItem('todo-pomodoro-sessions')
    if (sessionData) {
      const data = JSON.parse(sessionData)
      const today = new Date().toDateString()
      if (data.date === today) {
        setSessionsToday(data.count)
      }
    }
  }, [])

  return (
    <aside className="sidebar">
      <div className="brand">
        <span className="mark">TO-do</span>
        <span className="sub">foco</span>
      </div>
      <nav>
        {navItems.map(item => (
          <button
            key={item.view}
            className={`nav-btn ${currentView === item.view ? 'active' : ''}`}
            onClick={() => onViewChange(item.view)}
            title={item.label}
          >
            <IconComponent icon={item.icon} />
            {item.label}
          </button>
        ))}
      </nav>
      <div className="sidebar-footer">
        <div className="streak-pill">
          <span className="num">{sessionsToday}</span>
          <span className="lbl">sessões de foco hoje</span>
        </div>
        Seus dados ficam salvos neste app entre conversas.
      </div>
    </aside>
  )
}

function IconComponent({ icon }) {
  const icons = {
    check: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>,
    clock: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="13" r="8"/><path d="M12 9v4l3 2"/><path d="M9 2h6M12 2v3"/></svg>,
    book: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>,
    palette: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3-8c.83 0 1.5-.67 1.5-1.5S15.83 9 15 9s-1.5.67-1.5 1.5.67 1.5 1.5 1.5zm-6 0c.83 0 1.5-.67 1.5-1.5S9.83 9 9 9 7.5 9.67 7.5 10.5 8.17 12 9 12z"/></svg>
  }
  return icons[icon] || null
}
