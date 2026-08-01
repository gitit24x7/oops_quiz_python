/**
 * src/main.jsx
 * 
 * DESCRIPTION:
 * Application entry point for Python Quest MVP.
 * 
 * CONTENTS:
 * - Bootstraps the React DOM and mounts the <App /> component.
 * - Imports the global css required for Tailwind.
 * 
 * CONNECTIONS:
 * - Mounts to `index.html` <div id="root">
 * - Renders `src/App.jsx`.
 */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
