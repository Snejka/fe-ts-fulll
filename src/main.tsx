import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { EditModeProvider } from "./context/EditModeContext";
import './index.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <EditModeProvider>
      <App />
    </EditModeProvider>
  </StrictMode>,
)
