import { useState } from 'react'
import { Outlet, NavLink } from 'react-router-dom'
import { Boxes, Database, Home, MessageSquare, Play, PanelsTopLeft, ChevronLeft } from 'lucide-react'

export default function AppLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const [dept, setDept] = useState('Creative Platform')
  return (
    <div className={`min-h-screen grid ${collapsed ? 'grid-cols-[80px_1fr]' : 'grid-cols-[260px_1fr]'} transition-size duration-300`}>
      <aside className="p-4 border-r border-gray-200 bg-white overflow-hidden">
        <div className={`flex items-center ${collapsed ? 'justify-center' : 'justify-between'} mb-4`}>
          {!collapsed && (
            <span className="font-semibold text-gray-700 tracking-wide">Chat All‑In</span>
          )}
          <button className="sidebar-toggle" aria-label="Toggle sidebar" onClick={()=>setCollapsed(!collapsed)}>
            <ChevronLeft className={`w-5 h-5 transition-transform ${collapsed ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {!collapsed && (
          <div className="mb-4">
            <label className="text-xs text-gray-400 block mb-1">Departamento</label>
            <select value={dept} onChange={e=>setDept(e.target.value)} className="input">
              <option>Creative Platform</option>
              <option>Sales</option>
              <option>Support</option>
              <option>Finance</option>
            </select>
          </div>
        )}

        <nav className="flex flex-col gap-1">
          <NavLink to="/" className={({isActive})=>`sidebar-item ${isActive? 'bg-black text-white':'text-gray-600'}`}>{!collapsed && <span className="mr-2 inline-block"><Home className="inline w-4 h-4"/></span>}{collapsed ? <Home className="w-5 h-5 mx-auto"/> : 'Dashboard'}</NavLink>
          <NavLink to="/agents" className={({isActive})=>`sidebar-item ${isActive? 'bg-black text-white':'text-gray-600'}`}>{!collapsed && <span className="mr-2 inline-block"><Boxes className="inline w-4 h-4"/></span>}{collapsed ? <Boxes className="w-5 h-5 mx-auto"/> : 'Agentes'}</NavLink>
          <NavLink to="/create" className={({isActive})=>`sidebar-item ${isActive? 'bg-black text-white':'text-gray-600'}`}>{!collapsed && <span className="mr-2 inline-block"><MessageSquare className="inline w-4 h-4"/></span>}{collapsed ? <MessageSquare className="w-5 h-5 mx-auto"/> : 'Criar via Chat'}</NavLink>
          <NavLink to="/workflows" className={({isActive})=>`sidebar-item ${isActive? 'bg-black text-white':'text-gray-600'}`}>{!collapsed && <span className="mr-2 inline-block"><PanelsTopLeft className="inline w-4 h-4"/></span>}{collapsed ? <PanelsTopLeft className="w-5 h-5 mx-auto"/> : 'Workflows'}</NavLink>
          <NavLink to="/knowledge" className={({isActive})=>`sidebar-item ${isActive? 'bg-black text-white':'text-gray-600'}`}>{!collapsed && <span className="mr-2 inline-block"><Database className="inline w-4 h-4"/></span>}{collapsed ? <Database className="w-5 h-5 mx-auto"/> : 'Knowledge Base'}</NavLink>
          <NavLink to="/playground" className={({isActive})=>`sidebar-item ${isActive? 'bg-black text-white':'text-gray-600'}`}>{!collapsed && <span className="mr-2 inline-block"><Play className="inline w-4 h-4"/></span>}{collapsed ? <Play className="w-5 h-5 mx-auto"/> : 'Playground'}</NavLink>
        </nav>
      </aside>
      <main className="p-8 space-y-6">
        <Outlet />
      </main>
    </div>
  )
}
