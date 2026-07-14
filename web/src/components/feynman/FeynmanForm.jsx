const steps = [
  { num: 1, title: 'Escolha o conceito', hint: 'O que você quer aprender ou revisar agora?', key: 'concept' },
  { num: 2, title: 'Explique como se fosse para uma criança', hint: 'Use palavras simples, sem jargões. Se travar, é aí que está a lacuna.', key: 'explanation' },
  { num: 3, title: 'Identifique as lacunas', hint: 'Onde você travou, generalizou demais ou usou um termo que não sabe explicar?', key: 'gaps' },
  { num: 4, title: 'Simplifique com uma analogia', hint: 'Volte às fontes para preencher as lacunas e crie uma analogia do dia a dia.', key: 'simplify' }
]

export default function FeynmanForm({ formData, setFormData, onSave, onClear }) {
  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value })
  }

  return (
    <>
      <div className="feynman-steps">
        {steps.map(step => (
          <div key={step.num} className="fstep card">
            <div className="fstep-head">
              <span className="fstep-num">{step.num}</span>
              <span className="fstep-title">{step.title}</span>
            </div>
            <p className="fstep-hint">{step.hint}</p>
            <textarea
              style={{ minHeight: step.num === 1 ? '40px' : '70px' }}
              placeholder={step.num === 1 ? 'Ex: Lei de Ohm' : `Escreva ${step.title.toLowerCase()}...`}
              value={formData[step.key]}
              onChange={e => handleChange(step.key, e.target.value)}
            />
          </div>
        ))}
      </div>
      <div className="feynman-actions">
        <button className="btn-ghost" onClick={onClear}>Limpar</button>
        <button className="btn-primary" onClick={onSave}>Salvar no histórico</button>
      </div>
    </>
  )
}
