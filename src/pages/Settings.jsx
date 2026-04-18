import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { getAllLogs } from '../firebase/db';

export default function Settings() {
  const { theme, toggleTheme } = useTheme();
  const { currentUser } = useAuth();
  
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
    </>
  );
}
