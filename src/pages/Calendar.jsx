import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getAllLogs, getHabits } from '../firebase/db';
import { 
  format, startOfMonth, endOfMonth, eachDayOfInterval, 
  isSameMonth, isToday, subMonths, addMonths 
} from 'date-fns';
import { Flame } from 'lucide-react';

export default function Calendar() {
  const { currentUser } = useAuth();
  
  const [currentDate, setCurrentDate] = useState(new Date());
  const [allLogs, setAllLogs] = useState([]);
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser) {
      async function fetchData() {
        setLoading(true);
        const [logsData, habitsData] = await Promise.all([
          getAllLogs(currentUser.uid),
          getHabits(currentUser.uid)
        ]);
        setAllLogs(logsData);
        setHabits(habitsData);
        setLoading(false);
      }
      fetchData();
    }
  }, [currentUser]);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Group logs by date to calculate daily intensity
  const logsByDate = {};
  allLogs.forEach(log => {
    if (log.status === 'completed') {
      logsByDate[log.date] = (logsByDate[log.date] || 0) + 1;
    }
  });

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  return (
    <>
      <header style={{ marginBottom: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="h1">Calendar Map</h1>
          <p className="text-secondary mt-2">Visualize your consistency across the month.</p>
        </div>
        
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <button onClick={prevMonth} className="btn btn-outline" style={{ padding: '0.5rem 1rem' }}>&lt;</button>
          <span className="font-bold" style={{ width: '120px', textAlign: 'center' }}>
            {format(currentDate, 'MMMM yyyy')}
          </span>
          <button onClick={nextMonth} className="btn btn-outline" style={{ padding: '0.5rem 1rem' }}>&gt;</button>
        </div>
      </header>

      <div className="card" style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.5rem', textAlign: 'center', marginBottom: '1rem' }}>
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
            <div key={d} className="text-secondary font-bold text-sm">{d}</div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.5rem' }}>
          {/* Add empty slots for days before start of month map */}
          {Array.from({ length: monthStart.getDay() }).map((_, i) => (
            <div key={`empty-${i}`} style={{ height: '80px', borderRadius: '0.5rem', backgroundColor: 'transparent' }} />
          ))}

          {daysInMonth.map(day => {
            const dateStr = format(day, 'yyyy-MM-dd');
            const completedCount = logsByDate[dateStr] || 0;
            const totalHabits = habits.length;

            let bgColor = 'var(--bg-color)'; // Default empty day
            if (completedCount > 0) {
              // Create heatmap logic
              const intensity = totalHabits > 0 ? completedCount / totalHabits : 0;
              if (intensity > 0.7) bgColor = 'var(--accent-color)';
              else if (intensity > 0.3) bgColor = '#6366f1';
              else bgColor = 'var(--accent-light)';
            }

            const todayActive = isToday(day);

            return (
              <div key={dateStr} style={{ 
                height: '80px', 
                borderRadius: '0.5rem', 
                backgroundColor: bgColor,
                border: todayActive ? '2px solid white' : '1px solid var(--border-color)',
                padding: '0.5rem',
                position: 'relative'
              }}>
                <span style={{ 
                  color: completedCount > 0 && bgColor !== 'var(--accent-light)' ? 'white' : 'var(--text-secondary)', 
                  fontWeight: todayActive ? 'bold' : 'normal' 
                }}>
                  {format(day, 'd')}
                </span>
                
                {completedCount > 0 && (
                  <div style={{ position: 'absolute', bottom: '0.5rem', right: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.1rem', color: completedCount === totalHabits && totalHabits > 0 ? '#f97316' : 'white' }}>
                    <Flame size={12} />
                    <span style={{ fontSize: '0.65rem', fontWeight: 'bold' }}>{completedCount}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
