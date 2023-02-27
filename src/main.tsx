import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import './main.scss'
import './i18n'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Suspense fallback={'loading'}>
    <App />
    </Suspense>
  </React.StrictMode>
)
