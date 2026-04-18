import { Link } from 'react-router-dom';
import { Activity, Star, TrendingUp, BarChart2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function Landing() {
  const { theme } = useTheme();
  
  return (
    <div className="landing-page" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100vw' }}>
      
      {/* Header */}
      <header className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem', width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'bold', fontSize: '1.5rem', color: 'var(--text-primary)' }}>
          <Activity color="var(--accent-color)" size={28} />
          <span>HabitTracker</span>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Link to="/login" className="btn btn-ghost">Log In</Link>
          <Link to="/signup" className="btn btn-primary">Sign Up Free</Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '4rem 1rem' }}>
        <h1 className="h1" style={{ maxWidth: '800px', marginBottom: '1.5rem', fontSize: '3.5rem' }}>
          Build Consistency. <br/>
          <span style={{ color: 'var(--accent-color)' }}>Track Daily Progress.</span>
        </h1>
        <p className="text-lg text-secondary" style={{ maxWidth: '600px', marginBottom: '3rem' }}>
          A premium, modern habit tracker designed to help you achieve your goals with beautiful analytics and seamless cloud syncing.
        </p>
        
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link to="/signup" className="btn btn-primary" style={{ fontSize: '1.125rem', padding: '1rem 2rem' }}>
            Start Tracking Free
          </Link>
          <Link to="/login" className="btn btn-outline" style={{ fontSize: '1.125rem', padding: '1rem 2rem' }}>
            View Dashboard
          </Link>
        </div>

        {/* Features minimal view */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginTop: '5rem', width: '100%', maxWidth: '1000px', textAlign: 'left' }}>
          
          <div className="card">
            <Star color="var(--accent-color)" size={32} style={{ marginBottom: '1rem' }} />
            <h3 className="h3">Beautiful UI</h3>
            <p className="text-secondary mt-2">Dark and light mode with a premium Notch-inspired design.</p>
          </div>
          
          <div className="card">
            <TrendingUp color="var(--success-color)" size={32} style={{ marginBottom: '1rem' }} />
            <h3 className="h3">Smart Streaks</h3>
            <p className="text-secondary mt-2">Automatically calculate streaks and consistency mapping.</p>
          </div>
          
          <div className="card">
            <BarChart2 color="var(--accent-color)" size={32} style={{ marginBottom: '1rem' }} />
            <h3 className="h3">Deep Analytics</h3>
            <p className="text-secondary mt-2">Weekly charts, heatmaps, and ranking of your best habits.</p>
          </div>
          
        </div>
      </main>
      
      {/* Footer */}
      <footer style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-placeholder)', borderTop: '1px solid var(--border-color)' }}>
        <p>&copy; {new Date().getFullYear()} HabitTracker. All rights reserved.</p>
      </footer>
    </div>
  );
}
