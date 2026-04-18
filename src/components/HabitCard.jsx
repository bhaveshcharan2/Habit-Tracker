import { Check, Flame, X } from 'lucide-react';
import { useState } from 'react';

export default function HabitCard({ habit, logStatus, onToggle, onEdit, onDelete }) {
  // status: 'completed' | 'missed' | 'none'
  const isCompleted = logStatus === 'completed';

  return (
    <div className="card" style={{ 
      padding: '1rem 1.5rem', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between',
      backgroundColor: 'var(--bg-surface)',
      border: 'none',
      borderRadius: '0.75rem',
      marginBottom: '0.5rem',
      boxShadow: 'none'
    }}>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: habit.color || 'var(--accent-color)' }}></div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <h3 className="h3" style={{ fontSize: '1rem', color: isCompleted ? 'var(--text-secondary)' : 'white' }}>
              {habit.name}
            </h3>
            <span style={{ fontSize: '0.7rem', padding: '0.1rem 0.5rem', backgroundColor: 'var(--accent-light)', color: 'var(--accent-color)', borderRadius: '1rem', fontWeight: 600 }}>
              {habit.category}
            </span>
          </div>
          <p className="text-xs text-secondary mt-1">{habit.frequency === 'daily' ? '30 min' : 'Weekly'}</p>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        
        {/* Streak Indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#f97316' }}>
           <Flame size={18} fill="#f97316" color="#f97316" />
           <span style={{ fontWeight: 'bold', fontSize: '0.875rem' }}>1</span>
        </div>

        {/* Complete Button */}
        <button 
          onClick={() => onToggle(habit.id, isCompleted ? 'none' : 'completed')}
          style={{
            width: '2.5rem', height: '2.5rem', borderRadius: '0.5rem',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backgroundColor: 'transparent',
            color: isCompleted ? 'var(--success-color)' : 'var(--text-secondary)',
            border: `1.5px solid ${isCompleted ? 'var(--success-color)' : 'var(--text-placeholder)'}`
          }}
          title={isCompleted ? 'Remove completed mark' : 'Mark as completed'}
        >
          <Check size={18} />
        </button>

        {/* Edit / Delete Icons */}
        <div style={{ display: 'flex', gap: '0.5rem' }}>
           <button onClick={() => onEdit(habit)} style={{ color: 'var(--text-secondary)' }}>
             <span style={{ fontWeight: 'bold' }}>···</span>
           </button>
           <button onClick={() => onDelete(habit.id)} style={{ color: 'var(--text-secondary)' }}>
             <X size={16} />
           </button>
        </div>

      </div>
    </div>
  );
}
