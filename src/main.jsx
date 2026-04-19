import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ThemeProvider } from './context/ThemeContext'
import { AuthProvider } from './context/AuthContext'
import { PWAProvider } from './context/PWAContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PWAProvider>
      <ThemeProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ThemeProvider>
    </PWAProvider>
  </React.StrictMode>,
)


// Register Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(reg => console.log('SW registered!', reg))
      .catch(err => console.log('SW registration failed!', err));
  });
}

