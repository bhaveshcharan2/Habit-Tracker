import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getHabits, getAllLogs } from '../firebase/db';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  LineChart, Line
} from 'recharts';
import { format, subDays, eachDayOfInterval } from 'date-fns';

export default function Analytics() {
  const { currentUser } = useAuth();
  const [habits, setHabits] = useState([]);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser) {
      async function fetchData() {
        setLoading(true);
        const [habitsData, logsData] = await Promise.all([
          getHabits(currentUser.uid),
          getAllLogs(currentUser.uid)
        ]);
        setHabits(habitsData);
        setLogs(logsData);
        setLoading(false);
      }
      fetchData();
    }
  }, [currentUser]);

  if (loading) {
    return (
      <>
        <header style={{ marginBottom: '2rem' }}>
          <h1 className="h1">Analytics</h1>
          <p className="text-secondary mt-2">Crunching the numbers...</p>
        </header>
      </>
    );
  }

  // --- Calculate Last 7 Days Completion Data ---
  const today = new Date();
  const last7Days = eachDayOfInterval({ start: subDays(today, 6), end: today });
  
  const weeklyData = last7Days.map(date => {
    const dateStr = format(date, 'yyyy-MM-dd');
    const dayLogs = logs.filter(l => l.date === dateStr && l.status === 'completed');
    return {
      name: format(date, 'EEE'), // Mon, Tue, etc.
      completed: dayLogs.length,
      fullDate: dateStr
    };
  });

  // --- Calculate Habit Rankings ---
  const completedLogs = logs.filter(l => l.status === 'completed');
  const habitCounts = {};
  completedLogs.forEach(l => {
    habitCounts[l.habitId] = (habitCounts[l.habitId] || 0) + 1;
  });

  const rankedHabits = habits.map(h => ({
    ...h,
    totalCompletions: habitCounts[h.id] || 0
  })).sort((a, b) => b.totalCompletions - a.totalCompletions);

  // --- Quick Stats ---
  const totalCompleted = completedLogs.length;
  const bestDay = [...weeklyData].sort((a,b) => b.completed - a.completed)[0];

  return (
    <>
      <header style={{ marginBottom: '2.5rem' }}>
        <h1 className="h1">Analytics</h1>
        <p className="text-secondary mt-2">Analyze your consistency and streaks.</p>
      </header>
      
      {/* Overview Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <div className="card" style={{ display: 'flex', flexDirection: 'column', padding: '1.5rem' }}>
          <span className="text-secondary text-sm font-medium">Total Completions</span>
          <span className="h1 text-accent" style={{ marginTop: '0.5rem' }}>{totalCompleted}</span>
        </div>
        <div className="card" style={{ display: 'flex', flexDirection: 'column', padding: '1.5rem' }}>
          <span className="text-secondary text-sm font-medium">Tracked Habits</span>
          <span className="h1" style={{ marginTop: '0.5rem' }}>{habits.length}</span>
        </div>
        <div className="card" style={{ display: 'flex', flexDirection: 'column', padding: '1.5rem' }}>
          <span className="text-secondary text-sm font-medium">Best Day (Recent)</span>
          <span className="h1 text-success" style={{ marginTop: '0.5rem' }}>{bestDay?.name || '-'}</span>
        </div>
      </div>

      {/* Charts */}
      <div className="card" style={{ marginBottom: '2rem', minHeight: '350px' }}>
        <h2 className="h2" style={{ marginBottom: '1.5rem' }}>Last 7 Days Progress</h2>
        
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={weeklyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
            <XAxis dataKey="name" tick={{ fill: 'var(--text-secondary)' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: 'var(--text-secondary)' }} axisLine={false} tickLine={false} allowDecimals={false} />
            <Tooltip 
              cursor={{ fill: 'var(--bg-surface-hover)' }}
              contentStyle={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-color)', borderRadius: '0.5rem', color: 'var(--text-primary)' }}
            />
            <Bar dataKey="completed" fill="var(--accent-color)" radius={[4, 4, 0, 0]} barSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Leaderboard */}
      <div className="card">
        <h2 className="h2" style={{ marginBottom: '1.5rem' }}>Most Consistent Habits</h2>
        {rankedHabits.length === 0 ? (
          <p className="text-secondary">Not enough data to rank habits.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {rankedHabits.slice(0, 5).map((h, i) => (
              <div key={h.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ 
                  width: '2rem', height: '2rem', borderRadius: '50%', 
                  backgroundColor: i === 0 ? '#fbbf24' : i === 1 ? '#94a3b8' : i === 2 ? '#b45309' : 'var(--bg-surface-hover)',
                  color: i <= 2 ? 'white' : 'var(--text-secondary)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold'
                }}>
                  {i + 1}
                </div>
                <div style={{ flex: 1 }}>
                  <p className="font-medium">{h.name}</p>
                </div>
                <div className="text-secondary font-medium">
                  {h.totalCompletions} days
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
