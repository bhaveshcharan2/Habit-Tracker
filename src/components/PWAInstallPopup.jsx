import React from 'react';
import { usePWA } from '../context/PWAContext';
import { Download, X } from 'lucide-react';

export default function PWAInstallPopup() {
  const { showPopup, installApp, closePopup } = usePWA();

  if (!showPopup) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '1.5rem',
      right: '1.5rem',
      left: '1.5rem',
      maxWidth: '450px',
      margin: '0 auto',
      backgroundColor: 'var(--bg-surface)',
      border: '1px solid var(--border-color)',
      borderRadius: '1rem',
      padding: '1.25rem',
      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
      zIndex: 10000,
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      animation: 'slideUp 0.3s ease-out'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <div style={{ 
            width: '48px', 
            height: '48px', 
            borderRadius: '0.75rem', 
            backgroundColor: 'var(--accent-light)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <img src="/icon-512.png" alt="Wamio" style={{ width: '32px', height: '32px' }} />
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: '600', color: 'var(--text-primary)' }}>Install Wamio App</h3>
            <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Get the best experience on your home screen.</p>
          </div>
        </div>
        <button 
          onClick={closePopup}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', padding: '4px' }}
        >
          <X size={20} />
        </button>
      </div>

      <div style={{ display: 'flex', gap: '0.75rem' }}>
        <button 
          onClick={installApp}
          className="btn btn-primary"
          style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontSize: '0.875rem' }}
        >
          <Download size={18} />
          Install App
        </button>
        <button 
          onClick={closePopup}
          className="btn btn-ghost"
          style={{ flex: 0.5, fontSize: '0.875rem' }}
        >
          Not now
        </button>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}} />
    </div>
  );
}
