export default function Dashboard(){
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="card p-4">
          <p className="text-sm text-gray-500">Agentes</p>
          <p className="text-3xl font-semibold">11</p>
        </div>
        <div className="card p-4">
          <p className="text-sm text-gray-500">Execuções 24h</p>
          <p className="text-3xl font-semibold">142</p>
        </div>
        <div className="card p-4">
          <p className="text-sm text-gray-500">Sucesso</p>
          <p className="text-3xl font-semibold">97%</p>
        </div>
      </div>
    </div>
  )
}
