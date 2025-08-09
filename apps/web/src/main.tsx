import React from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './styles.css'
import Dashboard from './pages/Dashboard'
import Agents from './pages/Agents'
import CreateAgent from './pages/CreateAgent'
import KnowledgeBase from './pages/KnowledgeBase'
import Playground from './pages/Playground'
import Workflows from './pages/Workflows'
import AppLayout from './layouts/AppLayout'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'agents', element: <Agents /> },
      { path: 'create', element: <CreateAgent /> },
      { path: 'knowledge', element: <KnowledgeBase /> },
      { path: 'playground', element: <Playground /> },
      { path: 'workflows', element: <Workflows /> },
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
