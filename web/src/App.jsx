import { useState, useEffect } from 'react'
import Sidebar from './components/Sidebar'
import MetasView from './components/views/MetasView'
import PomodoroView from './components/views/PomodoroView'
import FeynmanView from './components/views/FeynmanView'
import WhiteboardView from './components/views/WhiteboardView'
import './styles/app.css'

export default function App() {
  const [currentView, setCurrentView] = useState('metas')

  return (
    <div className="app">
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />
      <main>
        <div className={`view ${currentView === 'metas' ? 'active' : ''}`}>
          <MetasView />
        </div>
        <div className={`view ${currentView === 'pomodoro' ? 'active' : ''}`}>
          <PomodoroView />
        </div>
        <div className={`view ${currentView === 'feynman' ? 'active' : ''}`}>
          <FeynmanView />
        </div>
        <div className={`view ${currentView === 'whiteboard' ? 'active' : ''}`}>
          <WhiteboardView />
        </div>
      </main>
    </div>
  )
}
