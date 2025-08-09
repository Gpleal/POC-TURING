export default function Agents(){
  const list = [
    'Agendamento','Lembretes','Cobrança','Notas Fiscais','Classificador de E-mails','Resposta Automática','Triagem de Currículos','Controle de Estoque','Envio de Documentos','Relatórios Financeiros','Conferência de Pagamentos'
  ]
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Agentes</h1>
      <div className="grid md:grid-cols-3 gap-4">
        {list.map((name)=> (
          <div key={name} className="card p-4">
            <p className="font-medium">{name}</p>
            <p className="text-sm text-gray-500">Pré-configurado (demo)</p>
          </div>
        ))}
      </div>
    </div>
  )
}
