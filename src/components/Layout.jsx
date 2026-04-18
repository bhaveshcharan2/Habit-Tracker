import { Link, useLocation } from 'react-router-dom';
import { Activity, LayoutDashboard, Calendar as CalendarIcon, BarChart2, Settings, LogOut, Moon, Sun } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import '../styles/layout.css';

export default function Layout({ children }) {
  const { logout, currentUser } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Calendar', path: '/calendar', icon: CalendarIcon },
    { name: 'Analytics', path: '/analytics', icon: BarChart2 },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <div className="app-layout">
      {/* Sidebar for Desktop */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <Link to="/dashboard" className="logo">
            <span style={{ color: 'white' }}>Habit</span>
            <span style={{ color: 'var(--accent-color)' }}>Forge</span>
          </Link>
        </div>
        
        <div className="sidebar-section">
          <span className="sidebar-subtitle">NAVIGATION</span>
          <nav className="sidebar-nav">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname.startsWith(item.path);
              return (
                <Link 
                  key={item.path} 
                  to={item.path} 
                  className={`nav-item ${isActive ? 'active' : ''}`}
                >
                  <Icon size={18} />
                  <span className="nav-text">{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="sidebar-section" style={{ flex: 1 }}>
          <span className="sidebar-subtitle">CATEGORIES</span>
          <nav className="sidebar-nav category-list">
            <div className="category-item">
              <span className="cat-dot" style={{ backgroundColor: '#3b82f6' }}></span>
              <span className="nav-text">Health</span>
            </div>
            <div className="category-item">
              <span className="cat-dot" style={{ backgroundColor: '#22c55e' }}></span>
              <span className="nav-text">Mindfulness</span>
            </div>
          </nav>
        </div>

        <div className="sidebar-footer">
          <div className="sidebar-actions">
            <button onClick={toggleTheme} className="action-btn" title="Toggle Theme">
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>
            <button onClick={logout} className="action-btn" title="Log Out">
              <LogOut size={18} />
            </button>
          </div>
          
          <div className="progress-section">
            <span className="sidebar-subtitle" style={{ paddingLeft: 0 }}>TODAY'S PROGRESS</span>
            <div className="progress-percent">0%</div>
            <div className="progress-bar-bg">
              <div className="progress-bar-fill" style={{ width: '0%' }}></div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="main-content-area">
        <div className="top-navbar">
           <div className="month-nav">
             <button className="nav-arrow">&lt;</button>
             <span className="nav-month font-bold">{new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}</span>
             <button className="nav-arrow">&gt;</button>
           </div>
           
           <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
             <button onClick={toggleTheme} className="nav-theme-toggle">
               {theme === 'light' ? <Moon size={18} color="var(--accent-color)" /> : <Sun size={18} color="var(--accent-color)" />}
             </button>
             <div className="top-avatar">{currentUser?.name?.charAt(0) || 'U'}</div>
           </div>
        </div>
      
        <div className="main-container">
          {children}
        </div>
      </main>

      {/* Bottom Navigation for Mobile */}
      <nav className="bottom-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname.startsWith(item.path);
          return (
            <Link 
              key={item.path} 
              to={item.path} 
              className={`bottom-nav-item ${isActive ? 'active' : ''}`}
            >
              <Icon size={20} />
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
