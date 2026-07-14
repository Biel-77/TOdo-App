import { useState, useEffect } from 'react'
import FeynmanForm from '../feynman/FeynmanForm'
import FeynmanLog from '../feynman/FeynmanLog'
import '../../styles/feynman.css'

export default function FeynmanView() {
  const [entries, setEntries] = useState([])
  const [formData, setFormData] = useState({
    concept: '',
    explanation: '',
    gaps: '',
    simplify: ''
  })

  useEffect(() => {
    const saved = localStorage.getItem('todo-feynman')
    if (saved) {
      setEntries(JSON.parse(saved))
    }
  }, [])

  const handleSave = () => {
    if (!formData.concept.trim()) return
    const entry = {
      id: Date.now().toString(36),
      concept: formData.concept,
      explanation: formData.explanation,
      gaps: formData.gaps,
      simplify: formData.simplify,
      createdAt: Date.now()
    }
    const updated = [...entries, entry]
    setEntries(updated)
    localStorage.setItem('todo-feynman', JSON.stringify(updated))
    setFormData({ concept: '', explanation: '', gaps: '', simplify: '' })
  }

  const handleClear = () => {
    setFormData({ concept: '', explanation: '', gaps: '', simplify: '' })
  }

  const handleLoadEntry = (entry) => {
    setFormData({
      concept: entry.concept,
      explanation: entry.explanation,
      gaps: entry.gaps,
      simplify: entry.simplify
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <section className="view-section">
      <div className="view-header">
        <div className="eyebrow">Técnica de estudo</div>
        <h1>Método Feynman</h1>
        <p className="lede">Se você não consegue explicar de forma simples, ainda não entendeu de verdade.</p>
      </div>
      <FeynmanForm formData={formData} setFormData={setFormData} onSave={handleSave} onClear={handleClear} />
      <h2 style={{ fontFamily: "'Fraunces',serif", fontSize: '18px', fontWeight: '600', marginBottom: '14px' }}>
        Histórico
      </h2>
      <FeynmanLog entries={entries} onLoadEntry={handleLoadEntry} />
    </section>
  )
}
