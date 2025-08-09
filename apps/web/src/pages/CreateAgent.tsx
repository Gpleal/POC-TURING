import { useState } from 'react'

interface Message { role: 'user'|'assistant'; content: string }

export default function CreateAgent(){
  const [messages, setMessages] = useState<Message[]>([
    { role:'assistant', content: 'Olá! Vamos criar seu agente. Qual tipo de agente você quer criar?' }
  ])
  const [input, setInput] = useState('')

  function send(){
    if(!input.trim()) return
    const next = [...messages, { role:'user', content: input }]
    // resposta simulada
    next.push({ role:'assistant', content: 'Entendido. Qual é o objetivo do agente? Quais dados ele acessará e quais ações deve executar?' })
    setMessages(next)
    setInput('')
  }

  return (
    <div className="grid grid-cols-[1fr_380px] gap-6">
      <div className="card p-4 h-[70vh] flex flex-col">
        <div className="flex-1 overflow-auto space-y-3">
          {messages.map((m,i)=> (
            <div key={i} className={`p-3 rounded-2xl ${m.role==='assistant'? 'bg-gray-50':'bg-black text-white ml-auto'}`}>{m.content}</div>
          ))}
        </div>
        <div className="mt-4 flex gap-2">
          <input className="input" value={input} onChange={e=>setInput(e.target.value)} placeholder="Digite sua mensagem" />
          <button className="btn" onClick={send}>Enviar</button>
        </div>
      </div>
      <aside className="card p-4 space-y-3">
        <p className="font-medium">Resumo do Agente</p>
        <ul className="text-sm text-gray-600 list-disc pl-5">
          <li>Tipo: configurado via chat</li>
          <li>Objetivo: definido pelo usuário</li>
          <li>Dados: RAG dinâmico</li>
          <li>Ações: APIs MCP</li>
        </ul>
      </aside>
    </div>
  )
}
