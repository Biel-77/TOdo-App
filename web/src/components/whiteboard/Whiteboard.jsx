import { useRef, useEffect, useState } from 'react'
import DrawingTools from './DrawingTools'

export default function Whiteboard() {
  const canvasRef = useRef(null)
  const ctxRef = useRef(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [tool, setTool] = useState('pen')
  const [color, setColor] = useState('#1a8cff')
  const [size, setSize] = useState(2)
  const [textElements, setTextElements] = useState([])
  const [editingTextId, setEditingTextId] = useState(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext('2d', { alpha: false })
    ctxRef.current = context

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    context.fillStyle = '#0f0f0f'
    context.fillRect(0, 0, canvas.width, canvas.height)
    drawGridFunc(context, canvas.width, canvas.height)

    const savedDrawing = localStorage.getItem('whiteboard-drawing')
    if (savedDrawing) {
      const img = new Image()
      img.onload = () => {
        context.drawImage(img, 0, 0)
      }
      img.src = savedDrawing
    }

    const savedTexts = localStorage.getItem('whiteboard-texts')
    if (savedTexts) {
      try {
        setTextElements(JSON.parse(savedTexts))
      } catch (e) {
        console.log('Error loading texts')
      }
    }
  }, [])

  const drawGridFunc = (context, width, height) => {
    const gridSize = 20
    context.strokeStyle = '#1a1a1a'
    context.lineWidth = 0.5

    for (let i = 0; i <= width; i += gridSize) {
      context.beginPath()
      context.moveTo(i, 0)
      context.lineTo(i, height)
      context.stroke()
    }

    for (let i = 0; i <= height; i += gridSize) {
      context.beginPath()
      context.moveTo(0, i)
      context.lineTo(width, i)
      context.stroke()
    }
  }

  const drawArrowFunc = (ctx, fromX, fromY, toX, toY) => {
    const headlen = 15
    const angle = Math.atan2(toY - fromY, toX - fromX)

    ctx.beginPath()
    ctx.moveTo(fromX, fromY)
    ctx.lineTo(toX, toY)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(toX, toY)
    ctx.lineTo(toX - headlen * Math.cos(angle - Math.PI / 6), toY - headlen * Math.sin(angle - Math.PI / 6))
    ctx.lineTo(toX - headlen * Math.cos(angle + Math.PI / 6), toY - headlen * Math.sin(angle + Math.PI / 6))
    ctx.closePath()
    ctx.fill()
  }

  const startDrawing = (e) => {
    const canvas = canvasRef.current
    const ctx = ctxRef.current
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    if (tool === 'text') {
      const newTextId = Date.now().toString()
      setEditingTextId(newTextId)
      setTextElements([...textElements, { id: newTextId, x, y, text: '', color, fontSize: 16 }])
      return
    }

    setIsDrawing(true)

    if (tool === 'pen') {
      ctx.beginPath()
      ctx.moveTo(x, y)
    } else if (tool === 'eraser') {
      ctx.clearRect(x - size / 2, y - size / 2, size, size)
    } else if (tool === 'line' || tool === 'arrow') {
      ctx.startX = x
      ctx.startY = y
    } else if (tool === 'rect') {
      ctx.startX = x
      ctx.startY = y
    } else if (tool === 'circle') {
      ctx.startX = x
      ctx.startY = y
    }
  }

  const draw = (e) => {
    if (!isDrawing) return
    e.preventDefault()

    const canvas = canvasRef.current
    const ctx = ctxRef.current
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    ctx.strokeStyle = color
    ctx.fillStyle = color
    ctx.lineWidth = size
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'

    if (tool === 'pen') {
      ctx.lineTo(x, y)
      ctx.stroke()
    } else if (tool === 'eraser') {
      ctx.clearRect(x - size / 2, y - size / 2, size, size)
    }
  }

  const stopDrawing = (e) => {
    if (!isDrawing) return
    setIsDrawing(false)

    const ctx = ctxRef.current
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    if (tool === 'line') {
      ctx.strokeStyle = color
      ctx.lineWidth = size
      ctx.lineCap = 'round'
      ctx.stroke()
    } else if (tool === 'arrow') {
      ctx.strokeStyle = color
      ctx.fillStyle = color
      ctx.lineWidth = size
      drawArrowFunc(ctx, ctx.startX, ctx.startY, x, y)
    } else if (tool === 'rect') {
      const width = x - ctx.startX
      const height = y - ctx.startY
      ctx.strokeStyle = color
      ctx.lineWidth = size
      ctx.strokeRect(ctx.startX, ctx.startY, width, height)
    } else if (tool === 'circle') {
      const radius = Math.sqrt(Math.pow(x - ctx.startX, 2) + Math.pow(y - ctx.startY, 2))
      ctx.strokeStyle = color
      ctx.lineWidth = size
      ctx.beginPath()
      ctx.arc(ctx.startX, ctx.startY, radius, 0, 2 * Math.PI)
      ctx.stroke()
    }

    const canvas_data = canvas.toDataURL('image/png')
    localStorage.setItem('whiteboard-drawing', canvas_data)
  }

  const updateTextElement = (id, text) => {
    const updated = textElements.map(elem =>
      elem.id === id ? { ...elem, text } : elem
    )
    setTextElements(updated)
    localStorage.setItem('whiteboard-texts', JSON.stringify(updated))
  }

  const deleteTextElement = (id) => {
    const updated = textElements.filter(elem => elem.id !== id)
    setTextElements(updated)
    localStorage.setItem('whiteboard-texts', JSON.stringify(updated))
  }

  const clear = () => {
    const canvas = canvasRef.current
    const ctx = ctxRef.current
    ctx.fillStyle = '#0f0f0f'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    drawGridFunc(ctx, canvas.width, canvas.height)
    setTextElements([])
    localStorage.removeItem('whiteboard-drawing')
    localStorage.removeItem('whiteboard-texts')
  }

  const download = () => {
    const canvas = canvasRef.current
    const downloadCanvas = document.createElement('canvas')
    downloadCanvas.width = canvas.width
    downloadCanvas.height = canvas.height
    const downloadCtx = downloadCanvas.getContext('2d')
    
    const savedDrawing = localStorage.getItem('whiteboard-drawing')
    if (savedDrawing) {
      const img = new Image()
      img.onload = () => {
        downloadCtx.drawImage(img, 0, 0)
        
        textElements.forEach(elem => {
          downloadCtx.font = `${elem.fontSize}px 'Segoe UI', sans-serif`
          downloadCtx.fillStyle = elem.color || '#1a8cff'
          downloadCtx.fillText(elem.text, elem.x, elem.y)
        })
        
        const link = document.createElement('a')
        link.href = downloadCanvas.toDataURL('image/png')
        link.download = `lousa_${new Date().toISOString().slice(0, 10)}.png`
        link.click()
      }
      img.src = savedDrawing
    }
  }

  return (
    <div className="whiteboard-container">
      <DrawingTools
        tool={tool}
        setTool={setTool}
        color={color}
        setColor={setColor}
        size={size}
        setSize={setSize}
        onClear={clear}
        onDownload={download}
      />
      <div className="whiteboard-wrapper">
        <canvas
          ref={canvasRef}
          className="whiteboard-canvas"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
        />
        {textElements.map(elem => (
          <div
            key={elem.id}
            className="text-element"
            style={{
              left: elem.x,
              top: elem.y - 20,
              color: elem.color,
              position: 'absolute',
              zIndex: 10
            }}
          >
            {editingTextId === elem.id ? (
              <input
                autoFocus
                type="text"
                value={elem.text}
                onChange={e => updateTextElement(elem.id, e.target.value)}
                onBlur={() => setEditingTextId(null)}
                onKeyDown={e => e.key === 'Enter' && setEditingTextId(null)}
                style={{
                  fontSize: '16px',
                  background: 'rgba(15, 15, 15, 0.9)',
                  color: elem.color,
                  border: `1px solid ${elem.color}`,
                  padding: '4px 8px',
                  borderRadius: '4px',
                  minWidth: '100px'
                }}
              />
            ) : (
              <div
                onClick={() => setEditingTextId(elem.id)}
                style={{
                  fontSize: '16px',
                  cursor: 'pointer',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  background: 'rgba(15, 15, 15, 0.7)',
                  border: `1px solid ${elem.color}`
                }}
              >
                {elem.text || 'clique para editar'}
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    deleteTextElement(elem.id)
                  }}
                  style={{
                    marginLeft: '4px',
                    background: 'transparent',
                    border: 'none',
                    color: '#ff6b6b',
                    cursor: 'pointer',
                    fontSize: '12px'
                  }}
                >
                  ✕
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
