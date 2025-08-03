import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { GlobalStyles, StyledEngineProvider } from '@mui/material'

createRoot(document.getElementById('root')).render(
<StrictMode>
  <StyledEngineProvider enableCssLayer>
    <GlobalStyles styles="@layer theme, base, mui, components, utilities;" />
      <AuthProvider>
        <App />
      </AuthProvider>
  </StyledEngineProvider>
</StrictMode>,
)
