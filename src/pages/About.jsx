import { Link } from 'react-router-dom';
import { Activity, Target, Shield, Zap } from 'lucide-react';
import Footer from '../components/Footer';

export default function About() {
  return (
    <div className="about-page" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <header className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem', width: '100%' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'bold', fontSize: '1.5rem', color: 'var(--text-primary)' }}>
          <Activity color="var(--accent-color)" size={28} />
          <span>Wamio</span>
        </Link>
        <Link to="/login" className="btn btn-ghost">Log In</Link>
      </header>

      <main style={{ flex: 1 }}>
        <section className="section" style={{ textAlign: 'center', backgroundColor: 'var(--accent-light)' }}>
          <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h1 className="h1" style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>Our Mission</h1>
            <p className="text-lg text-secondary">
              We believe that consistency is the key to mastering any skill and living a fulfilling life. 
              Wamio was built to remove the friction of habit tracking and provide you with clear, 
              actionable insights into your daily progress.
            </p>
          </div>
        </section>

        <section className="section">
          <div className="container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
              <div className="card">
                <Target color="var(--accent-color)" size={40} style={{ marginBottom: '1.5rem' }} />
                <h3 className="h2" style={{ marginBottom: '1rem' }}>Focused Design</h3>
                <p className="text-secondary">
                  Our interface is meticulously crafted to be non-distracting. We want you to spend 
                  less time tracking and more time doing.
                </p>
              </div>
              <div className="card">
                <Shield color="var(--success-color)" size={40} style={{ marginBottom: '1.5rem' }} />
                <h3 className="h2" style={{ marginBottom: '1rem' }}>Data Privacy</h3>
                <p className="text-secondary">
                  Your progress is personal. We use industry-standard encryption and Firebase security 
                  to ensure your data stays yours.
                </p>
              </div>
              <div className="card">
                <Zap color="var(--accent-color)" size={40} style={{ marginBottom: '1.5rem' }} />
                <h3 className="h2" style={{ marginBottom: '1rem' }}>Instant Sync</h3>
                <p className="text-secondary">
                  Whether you're on your laptop or mobile, your habits are always in sync and 
                  ready for your next check-in.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="section" style={{ backgroundColor: 'var(--bg-surface)' }}>
          <div className="container" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h2 className="h1" style={{ marginBottom: '1.5rem' }}>Join Thousands of Consistent Achievers</h2>
            <p className="text-lg text-secondary" style={{ marginBottom: '2.5rem' }}>
              Wamio is more than just a tool; it's a companion on your journey to becoming the best version of yourself.
            </p>
            <Link to="/signup" className="btn btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
              Get Started for Free
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
