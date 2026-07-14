import { useState, useEffect } from 'react'
import SessionDots from './SessionDots'

const DURATIONS = { work: 25 * 60, short: 5 * 60, long: 15 * 60 }
const LABELS = { work: 'foco', short: 'pausa curta', long: 'pausa longa' }

export default function PomodoroTimer({ goals, selectedGoalId, onSelectGoal }) {
  const [currentMode, setCurrentMode] = useState('work')
  const [timeLeft, setTimeLeft] = useState(DURATIONS.work)
  const [isRunning, setIsRunning] = useState(false)
  const [sessionsToday, setSessionsToday] = useState(0)
  const [goalsState, setGoalsState] = useState(goals)

  useEffect(() => {
    setGoalsState(goals)
  }, [goals])

  useEffect(() => {
    const sessionData = localStorage.getItem('todo-pomodoro-sessions')
    if (sessionData) {
      const data = JSON.parse(sessionData)
      const today = new Date().toDateString()
      if (data.date === today) {
        setSessionsToday(data.count)
      }
    }

    // Listen for changes in goals
    const handleStorageChange = () => {
      const savedGoals = localStorage.getItem('todo-goals')
      if (savedGoals) {
        setGoalsState(JSON.parse(savedGoals))
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  useEffect(() => {
    if (!isRunning) return
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          if (currentMode === 'work') {
            setSessionsToday(s => s + 1)
            const today = new Date().toDateString()
            localStorage.setItem('todo-pomodoro-sessions', JSON.stringify({ count: sessionsToday + 1, date: today }))
          }
          playNotifySound()
          setIsRunning(false)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [isRunning, currentMode, sessionsToday])

  const playNotifySound = () => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)()
      const o = ctx.createOscillator()
      const g = ctx.createGain()
      o.connect(g)
      g.connect(ctx.destination)
      o.frequency.value = 660
      g.gain.value = 0.08
      o.start()
      setTimeout(() => { o.stop(); ctx.close() }, 300)
    } catch (e) {}
  }

  const changeMode = (mode) => {
    setIsRunning(false)
    setCurrentMode(mode)
    setTimeLeft(DURATIONS[mode])
  }

  const toggle = () => setIsRunning(!isRunning)
  const reset = () => { setIsRunning(false); setTimeLeft(DURATIONS[currentMode]) }
  const skip = () => { setIsRunning(false); setTimeLeft(0) }

  const m = Math.floor(timeLeft / 60).toString().padStart(2, '0')
  const s = (timeLeft % 60).toString().padStart(2, '0')
  const total = DURATIONS[currentMode]
  const frac = timeLeft / total
  const CIRC = 2 * Math.PI * 120
  const strokeDashoffset = CIRC * (1 - frac)
  const label = isRunning ? `em ${LABELS[currentMode]}` : (timeLeft === total ? 'pronto para focar' : 'pausado')

  return (
    <div className="pomo-wrap">
      <div className="pomo-modes">
        {['work', 'short', 'long'].map(mode => (
          <button
            key={mode}
            data-mode={mode}
            className={currentMode === mode ? 'active' : ''}
            onClick={() => changeMode(mode)}
          >
            {mode === 'work' ? 'Foco · 25min' : mode === 'short' ? 'Pausa curta · 5min' : 'Pausa longa · 15min'}
          </button>
        ))}
      </div>

      <div className="timer-ring">
        <svg viewBox="0 0 280 280">
          <circle className="ring-bg" cx="140" cy="140" r="120"></circle>
          <circle
            className="ring-fg"
            cx="140"
            cy="140"
            r="120"
            strokeDasharray={CIRC}
            strokeDashoffset={strokeDashoffset}
          ></circle>
        </svg>
        <div className="timer-center">
          <div className="timer-digits">{m}:{s}</div>
          <div className="timer-label">{label}</div>
        </div>
      </div>

      <div className="pomo-controls">
        <button className="btn-round" onClick={reset} title="Reiniciar">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 12a9 9 0 109-9 9.75 9.75 0 00-6.74 2.74L3 8"/>
            <path d="M3 3v5h5"/>
          </svg>
        </button>
        <button className="btn-round main" onClick={toggle} title={isRunning ? 'Pausar' : 'Iniciar'}>
          {isRunning ? (
            <svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14"/><rect x="14" y="5" width="4" height="14"/></svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
          )}
        </button>
        <button className="btn-round" onClick={skip} title="Pular">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 4l10 8-10 8V4z"/>
            <path d="M19 5v14"/>
          </svg>
        </button>
      </div>

      <div className="pomo-goal-select">
        Vinculado a:
        <select value={selectedGoalId} onChange={e => onSelectGoal(e.target.value)}>
          <option value="">nenhuma meta</option>
          {goalsState.map(g => (
            <option key={g.id} value={g.id}>{g.title}</option>
          ))}
        </select>
      </div>

      <SessionDots count={sessionsToday} />
    </div>
  )
}
