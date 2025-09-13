import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { initGA } from './utils/analytics.ts'
import { initGTM } from './utils/gtm.ts'
import { initPerformanceMonitoring } from './utils/performance.ts'

// Initialize Google Analytics
initGA();

// Initialize Google Tag Manager
initGTM();

// Initialize Performance Monitoring
initPerformanceMonitoring();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
