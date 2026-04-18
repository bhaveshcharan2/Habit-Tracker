import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { format, subDays, eachDayOfInterval } from 'date-fns';
import { useAuth } from '../context/AuthContext';
import { getHabits, addHabit, updateHabit, deleteHabit, getLogsForDate, toggleHabitLog, getAllLogs } from '../firebase/db';
import HabitCard from '../components/HabitCard';
import HabitModal from '../components/HabitModal';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function Dashboard() {
  const { currentUser } = useAuth();
  
  const [habits, setHabits] = useState([]);
  const [logsMap, setLogsMap] = useState({}); // Mapping habitId -> status
  const [allLogs, setAllLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingHabit, setEditingHabit] = useState(null);

  const todayStr = format(new Date(), 'yyyy-MM-dd');

  useEffect(() => {
    if (currentUser) fetchData();
  }, [currentUser]);

  async function fetchData() {
    try {
      setLoading(true);
      const [habitsData, logsDataToday, allLogsData] = await Promise.all([
        getHabits(currentUser.uid),
        getLogsForDate(currentUser.uid, todayStr),
        getAllLogs(currentUser.uid)
      ]);

      setHabits(habitsData);
      setAllLogs(allLogsData);

      const map = {};
      logsDataToday.forEach(log => {
        map[log.habitId] = log.status;
      });
      setLogsMap(map);
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
    } finally {
      setLoading(false);
    }
  }

  async function handleSaveHabit(habitData) {
    if (editingHabit) {
      await updateHabit(editingHabit.id, habitData);
      setHabits(habits.map(h => h.id === editingHabit.id ? { ...h, ...habitData } : h));
    } else {
      const newDocRef = await addHabit(currentUser.uid, habitData);
      setHabits([{ id: newDocRef.id, ...habitData, createdAt: new Date().toISOString() }, ...habits]);
    }
    setEditingHabit(null);
  }

  async function handleDeleteHabit(habitId) {
    if (window.confirm("Delete this habit forever?")) {
      await deleteHabit(habitId);
      setHabits(habits.filter(h => h.id !== habitId));
    }
  }

  async function handleToggleLog(habitId, status) {
    setLogsMap(prev => ({ ...prev, [habitId]: status }));
    try {
      await toggleHabitLog(currentUser.uid, habitId, todayStr, status);
      // Re-fetch all logs so charts update (dumb but works for demo)
      getAllLogs(currentUser.uid).then(setAllLogs);
    } catch (err) {
      console.error(err);
      fetchData(); 
    }
  }

  // --- Metrics Math ---
  const totalHabits = habits.length;
  const completedToday = Object.values(logsMap).filter(s => s === 'completed').length;
  const progressPercentToday = totalHabits > 0 ? Math.round((completedToday / totalHabits) * 100) : 0;

  // Month Math
  const currentMonthPrefix = format(new Date(), 'yyyy-MM');
  const monthLogs = allLogs.filter(l => l.date.startsWith(currentMonthPrefix) && l.status === 'completed');
  const daysInMonthToDate = parseInt(format(new Date(), 'd'));
  const monthPercent = totalHabits > 0 ? Math.round((monthLogs.length / (totalHabits * daysInMonthToDate)) * 100) : 0;

  // Week Chart Math
  const last7Days = eachDayOfInterval({ start: subDays(new Date(), 6), end: new Date() });
  const weeklyData = last7Days.map(date => {
    const dStr = format(date, 'yyyy-MM-dd');
    const ct = allLogs.filter(l => l.date === dStr && l.status === 'completed').length;
    return { name: format(date, 'EEE'), dayNum: format(date, 'd'), completed: ct };
  });

  return (
    <>
      {/* Quote Banner */}
      <div style={{ backgroundColor: 'var(--accent-light)', padding: '1.5rem', borderRadius: '1rem', marginBottom: '2rem', border: '1px solid rgba(92, 53, 222, 0.3)' }}>
        <p style={{ fontStyle: 'italic', color: '#c4b5fd', fontSize: '1.1rem' }}>
          "You'll never change your life until you change something you do daily."
        </p>
        <p style={{ color: 'var(--accent-color)', fontWeight: 'bold', fontSize: '0.875rem', marginTop: '0.5rem' }}>
          — John C. Maxwell
        </p>
      </div>

      {/* 4 Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '2.5rem' }}>
        
        <div className="card" style={{ padding: '1.5rem 1rem' }}>
          <p className="text-secondary text-xs font-bold" style={{ letterSpacing: '0.05em', marginBottom: '0.5rem' }}>TODAY</p>
          <p className="h1 text-accent">{progressPercentToday}%</p>
          <p className="text-sm text-secondary mt-1">{completedToday} / {totalHabits} done</p>
        </div>
        
        <div className="card" style={{ padding: '1.5rem 1rem' }}>
          <p className="text-secondary text-xs font-bold" style={{ letterSpacing: '0.05em', marginBottom: '0.5rem' }}>BEST STREAK</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <p className="h1 text-success">0</p>
            <span style={{ fontSize: '1.5rem' }}>🔥</span>
          </div>
          <p className="text-sm text-secondary mt-1">days in a row</p>
        </div>
        
        <div className="card" style={{ padding: '1.5rem 1rem' }}>
          <p className="text-secondary text-xs font-bold" style={{ letterSpacing: '0.05em', marginBottom: '0.5rem' }}>THIS MONTH</p>
          <p className="h1" style={{ color: 'white' }}>{monthPercent}%</p>
          <p className="text-sm text-secondary mt-1">{monthLogs.length} total</p>
        </div>
        
        <div className="card" style={{ padding: '1.5rem 1rem' }}>
          <p className="text-secondary text-xs font-bold" style={{ letterSpacing: '0.05em', marginBottom: '0.5rem' }}>TOTAL HABITS</p>
          <p className="h1" style={{ color: '#fbbf24' }}>{totalHabits}</p>
          <p className="text-sm text-secondary mt-1">being tracked</p>
        </div>

      </div>

      {/* Today's Habits Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2 className="h2" style={{ color: 'white' }}>Today's Habits</h2>
        <button className="btn btn-primary" onClick={() => { setEditingHabit(null); setIsModalOpen(true); }} style={{ borderRadius: '0.75rem' }}>
          + Add Habit
        </button>
      </div>

      {/* Habit List */}
      <div style={{ marginBottom: '3rem' }}>
        {loading ? (
          <p className="text-secondary">Loading...</p>
        ) : habits.length === 0 ? (
          <p className="text-secondary">No habits yet. Add one!</p>
        ) : (
          habits.map(habit => (
            <HabitCard 
              key={habit.id}
              habit={habit}
              logStatus={logsMap[habit.id] || 'none'}
              onToggle={handleToggleLog}
              onEdit={(h) => { setEditingHabit(h); setIsModalOpen(true); }}
              onDelete={handleDeleteHabit}
            />
          ))
        )}
      </div>

      {/* This Week Chart Header */}
      <h2 className="h2" style={{ color: 'white', marginBottom: '1.5rem' }}>This Week</h2>
      <div className="card" style={{ height: '250px', padding: '1.5rem', display: 'flex', alignItems: 'flex-end' }}>
          
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={weeklyData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--accent-color)" stopOpacity={1}/>
                <stop offset="100%" stopColor="#2dd4bf" stopOpacity={0.5}/>
              </linearGradient>
            </defs>
            <Tooltip 
              cursor={{ fill: 'var(--bg-surface-hover)' }}
              contentStyle={{ backgroundColor: 'var(--bg-color)', border: 'none', color: 'white' }}
            />
            <XAxis 
              dataKey="name" 
              tickFormatter={(value, i) => `${value}\n${weeklyData[i]?.dayNum}`} 
              tick={{ fill: 'var(--text-secondary)', fontSize: '0.75rem' }} 
              axisLine={false} 
              tickLine={false} 
            />
            <Bar dataKey="completed" fill="url(#colorUv)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>

      </div>

      <HabitModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveHabit}
        initialData={editingHabit}
      />
    </>
  );
}
