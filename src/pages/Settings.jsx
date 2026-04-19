import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { getAllLogs } from '../firebase/db';
import { usePWA } from '../context/PWAContext';
import { useNotification } from '../context/NotificationContext';
import { Download, Bell, BellOff, CheckCircle, Info, Share } from 'lucide-react';



export default function Settings() {
  const { theme, toggleTheme } = useTheme();
  const { currentUser, logout } = useAuth();
  const { isInstallable, isInstalled, installApp } = usePWA();
  const { permission, requestPermission } = useNotification();


  
  const [isEditingName, setIsEditingName] = useState(false);
  const [newName, setNewName] = useState(currentUser?.name || '');
  const [loading, setLoading] = useState(false);

  async function handleUpdateName(e) {
    e.preventDefault();
    if (!newName.trim() || newName === currentUser.name) {
      setIsEditingName(false);
      return;
    }
    
    setLoading(true);
    try {
      const userRef = doc(db, 'users', currentUser.uid);
      await updateDoc(userRef, { name: newName });
      // reload window to get the new context (or update context if exposed)
      window.location.reload(); 
    } catch (err) {
      console.error(err);
      alert('Failed to update name');
      setLoading(false);
    }
  }

  async function handleExportCSV() {
    try {
      setLoading(true);
      const logs = await getAllLogs(currentUser.uid);
      if (logs.length === 0) {
        alert("No data to export.");
        return;
      }
      
      const csvContent = [
        ["Date", "Habit ID", "Status", "Updated At"].join(","),
        ...logs.map(log => [
          log.date, 
          log.habitId, 
          log.status, 
          log.updatedAt
        ].join(","))
      ].join("\n");

      // Trigger download
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", `habittracker_data_${new Date().getTime()}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

    } catch (err) {
      console.error(err);
      alert('Failed to export data');
    } finally {
      setLoading(false);
    }
  }

  async function handleEnableNotifications() {
    setLoading(true);
    const status = await requestPermission();
    if (status === 'denied') {
      alert('Notification permission was denied. Please enable notifications in your browser settings.');
    }
    setLoading(false);
  }

  return (
    <>
      <header style={{ marginBottom: '2rem' }}>
        <h1 className="h1">Settings</h1>
        <p className="text-secondary mt-2">Manage your account and preferences.</p>
      </header>

      <div className="card" style={{ marginBottom: '2rem' }}>
        <h2 className="h3" style={{ marginBottom: '1.5rem' }}>Profile</h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label className="text-sm font-medium text-secondary" style={{ display: 'block', marginBottom: '0.5rem' }}>Full Name</label>
            {isEditingName ? (
              <form onSubmit={handleUpdateName} style={{ display: 'flex', gap: '0.5rem' }}>
                <input 
                  autoFocus
                  type="text" 
                  className="input" 
                  value={newName} 
                  onChange={e => setNewName(e.target.value)} 
                />
                <button type="submit" className="btn btn-primary" disabled={loading}>Save</button>
                <button type="button" onClick={() => setIsEditingName(false)} className="btn btn-ghost">Cancel</button>
              </form>
            ) : (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <p className="text-primary font-medium text-lg">{currentUser?.name || 'Not set'}</p>
                <button onClick={() => setIsEditingName(true)} className="btn btn-outline">Change</button>
              </div>
            )}
          </div>
          
          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
            <label className="text-sm font-medium text-secondary" style={{ display: 'block', marginBottom: '0.25rem' }}>Email</label>
            <p className="text-primary font-medium">{currentUser?.email}</p>
            <p className="text-xs text-secondary mt-1">Email cannot be changed.</p>
          </div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: '2rem' }}>
        <h2 className="h3" style={{ marginBottom: '1.5rem' }}>Preferences</h2>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)' }}>
          <div>
            <span className="font-medium">Dark Mode Appearance</span>
            <p className="text-sm text-secondary">Toggle app theme colors.</p>
          </div>
          <button onClick={toggleTheme} className="btn btn-outline">
            {theme === 'light' ? 'Switch to Dark' : 'Switch to Light'}
          </button>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '1rem' }}>
          <div>
            <span className="font-medium">Export Data</span>
            <p className="text-sm text-secondary">Download your habit logs as CSV.</p>
          </div>
          <button onClick={handleExportCSV} className="btn btn-outline" disabled={loading}>
            Export CSV
          </button>
        </div>
      </div>

      <div className="card" style={{ marginBottom: '2rem' }}>
        <h2 className="h3" style={{ marginBottom: '1.5rem' }}>Notifications</h2>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <span className="font-medium">Push Notifications</span>
            <p className="text-sm text-secondary">Get reminders and updates even when the app is closed.</p>
          </div>
          <button 
            onClick={handleEnableNotifications} 
            className={`btn ${permission === 'granted' ? 'btn-ghost' : 'btn-primary'}`}
            disabled={loading || permission === 'granted'}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
            {permission === 'granted' ? (
              <><Bell size={18} /> Enabled</>
            ) : (
              <><BellOff size={18} /> Enable Notifications</>
            )}
          </button>
        </div>
      </div>

      <div className="card" style={{ marginBottom: '2rem' }}>
        <h2 className="h3" style={{ marginBottom: '1.5rem' }}>App Installation</h2>
        
        {isInstalled ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--success-color)', backgroundColor: 'rgba(16, 185, 129, 0.1)', padding: '1rem', borderRadius: '0.75rem' }}>
            <CheckCircle size={24} />
            <div>
              <p className="font-medium">Wamio is installed</p>
              <p className="text-sm">You are currently using the standalone application.</p>
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <span className="font-medium">Web Version</span>
                <p className="text-sm text-secondary">Install Wamio on your home screen for the full experience.</p>
              </div>
              
              {isInstallable ? (
                <button onClick={installApp} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Download size={18} />
                  Install App
                </button>
              ) : (
                <div style={{ backgroundColor: 'var(--accent-light)', color: 'var(--accent-color)', padding: '0.5rem 1rem', borderRadius: '2rem', fontSize: '0.875rem', fontWeight: '600' }}>
                  Browser Only
                </div>
              )}
            </div>

            {!isInstallable && (
              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.25rem' }}>
                <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem' }}>
                  <Info size={18} className="text-accent" />
                  <p className="text-sm font-medium">How to install on iOS / Safari</p>
                </div>
                <ol style={{ paddingLeft: '1.25rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <li className="text-sm text-secondary">Tap the <Share size={16} style={{ verticalAlign: 'middle', margin: '0 2px' }} /> <strong>Share</strong> button in Safari.</li>
                  <li className="text-sm text-secondary">Scroll down and tap <strong>Add to Home Screen</strong>.</li>
                  <li className="text-sm text-secondary">Tap <strong>Add</strong> in the top right corner.</li>
                </ol>
              </div>
            )}
          </div>
        )}
      </div>


      <div className="card" style={{ marginBottom: '2rem', border: '1px solid var(--danger-bg)' }}>
        <h2 className="h3" style={{ marginBottom: '1.5rem', color: 'var(--danger-color)' }}>Account Actions</h2>
        <p className="text-sm text-secondary mb-4">You can log back in securely at any time.</p>
        <button onClick={logout} className="btn" style={{ backgroundColor: 'var(--danger-bg)', color: 'var(--danger-color)', width: '100%', maxWidth: 'max-content' }}>
          Log Out of Wamio
        </button>
      </div>

    </>
  );
}
