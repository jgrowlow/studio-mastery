import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import App from './App.jsx'

// Inject Google Fonts
const link = document.createElement('link')
link.href = 'https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Bebas+Neue&family=DM+Sans:wght@300;400;500&display=swap'
link.rel = 'stylesheet'
document.head.appendChild(link)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)