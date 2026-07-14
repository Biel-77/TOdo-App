export default function SessionDots({ count }) {
  const total = Math.max(4, count)
  const dots = []
  for (let i = 0; i < total; i++) {
    dots.push(i < count)
  }

  return (
    <div className="session-dots">
      {dots.map((filled, i) => (
        <span key={i} className={filled ? 'filled' : ''}></span>
      ))}
    </div>
  )
}
