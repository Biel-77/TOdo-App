import { useState, useEffect } from 'react'
import Whiteboard from '../whiteboard/Whiteboard'
import '../../styles/whiteboard.css'

export default function WhiteboardView() {
  return (
    <section className="view-section">
      <div className="view-header">
        <div className="eyebrow">Espaço Criativo</div>
        <h1>Lousa Virtual</h1>
        <p className="lede">Desenhe, escreva e organize suas ideias livremente.</p>
      </div>
      <Whiteboard />
    </section>
  )
}
