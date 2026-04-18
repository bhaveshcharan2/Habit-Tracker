import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const CATEGORIES = ['Health', 'Productivity', 'Mindfulness', 'Fitness', 'Learning', 'Other'];
const COLORS = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#8b5cf6', '#ec4899'];

export default function HabitModal({ isOpen, onClose, onSave, initialData = null }) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [color, setColor] = useState(COLORS[4]); // default blue
  const [frequency, setFrequency] = useState('daily');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || '');
      setCategory(initialData.category || CATEGORIES[0]);
      setColor(initialData.color || COLORS[4]);
      setFrequency(initialData.frequency || 'daily');
    } else {
      setName('');
      setCategory(CATEGORIES[0]);
      setColor(COLORS[4]);
      setFrequency('daily');
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) return;

    setLoading(true);
    try {
      await onSave({ name, category, color, frequency });
      onClose();
    } catch (err) {
      console.error(err);
      alert('Failed to save habit');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100
    }}>
      <div className="card" style={{ width: '100%', maxWidth: '500px', margin: '1rem', position: 'relative' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: '1rem', right: '1rem', color: 'var(--text-secondary)' }}>
          <X size={24} />
        </button>
        
        <h2 className="h2" style={{ marginBottom: '1.5rem' }}>
          {initialData ? 'Edit Habit' : 'Create New Habit'}
        </h2>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label className="text-sm font-medium text-primary" style={{ display: 'block', marginBottom: '0.5rem' }}>Habit Name</label>
            <input 
              type="text" className="input" placeholder="e.g., Read 10 Pages"
              value={name} onChange={(e) => setName(e.target.value)} required autoFocus
            />
          </div>

          <div>
            <label className="text-sm font-medium text-primary" style={{ display: 'block', marginBottom: '0.5rem' }}>Category</label>
            <select className="select" value={category} onChange={(e) => setCategory(e.target.value)}>
              {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-primary" style={{ display: 'block', marginBottom: '0.5rem' }}>Frequency</label>
            <select className="select" value={frequency} onChange={(e) => setFrequency(e.target.value)}>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-primary" style={{ display: 'block', marginBottom: '0.5rem' }}>Color</label>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {COLORS.map(c => (
                <button 
                  key={c} type="button" 
                  onClick={() => setColor(c)}
                  style={{ 
                    width: '2rem', height: '2rem', borderRadius: '50%', backgroundColor: c,
                    border: color === c ? '3px solid var(--text-primary)' : '2px solid transparent',
                    boxShadow: color === c ? '0 0 0 2px var(--bg-surface) inset' : 'none'
                  }}
                  title={c}
                />
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button type="button" onClick={onClose} className="btn btn-outline" style={{ flex: 1 }}>Cancel</button>
            <button type="submit" disabled={loading} className="btn btn-primary" style={{ flex: 1 }}>
              {loading ? 'Saving...' : 'Save Habit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
