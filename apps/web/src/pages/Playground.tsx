import { useState } from 'react'

export default function Playground(){
  const [q, setQ] = useState('Olá, agente!')
  const [ans, setAns] = useState('')
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Playground</h1>
      <div className="card p-4 space-y-3">
        <input className="input" value={q} onChange={e=>setQ(e.target.value)} />
        <button className="btn" onClick={()=>setAns('Resposta simulada (chamaria API/LLM).')}>Enviar</button>
        {ans && <div className="p-3 bg-gray-50 rounded-2xl">{ans}</div>}
      </div>
    </div>
  )
}
