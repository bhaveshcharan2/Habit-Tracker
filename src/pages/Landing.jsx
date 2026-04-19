import { Link } from 'react-router-dom';
import { Activity, Star, TrendingUp, BarChart2, CheckCircle, Zap, Shield, HelpCircle } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import Footer from '../components/Footer';

export default function Landing() {
  const { theme } = useTheme();
  
  return (
    <div className="landing-page" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100vw' }}>
      
      {/* Header */}
      <header className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem', width: '100%', position: 'sticky', top: 0, backgroundColor: 'var(--bg-color)', zIndex: 100, borderBottom: '1px solid var(--border-color)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'bold', fontSize: '1.5rem', color: 'var(--text-primary)' }}>
          <Activity color="var(--accent-color)" size={28} />
          <span>Wamio</span>
        </div>
        <nav style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '1.5rem' }} className="hide-mobile">
            <a href="#features" className="text-secondary font-medium hover:text-primary">Features</a>
            <a href="#how-it-works" className="text-secondary font-medium hover:text-primary">How it Works</a>
            <a href="#faq" className="text-secondary font-medium hover:text-primary">FAQ</a>
          </div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Link to="/login" className="btn btn-ghost">Log In</Link>
            <Link to="/signup" className="btn btn-primary">Sign Up Free</Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main style={{ flex: 1 }}>
        <section className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '6rem 1rem' }}>
          <div style={{ backgroundColor: 'var(--accent-light)', color: 'var(--accent-color)', padding: '0.5rem 1.25rem', borderRadius: '2rem', fontSize: '0.875rem', fontWeight: '600', marginBottom: '2rem' }}>
            New: Track habits with Heatmaps 2.0 ✨
          </div>
          <h1 className="h1" style={{ maxWidth: '900px', marginBottom: '1.5rem', fontSize: '4.5rem', lineHeight: '1.1' }}>
            Master Consistency. <br/>
            <span style={{ color: 'var(--accent-color)' }}>Own Your Journey.</span>
          </h1>
          <p className="text-lg text-secondary" style={{ maxWidth: '650px', marginBottom: '3rem', fontSize: '1.25rem' }}>
            Wamio is the premium habit tracker for high achievers. Beautifully designed, deeply analytical, and seamlessly synced.
          </p>
          
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link to="/signup" className="btn btn-primary" style={{ fontSize: '1.125rem', padding: '1.25rem 2.5rem' }}>
              Get Started for Free
            </Link>
            <Link to="/login" className="btn btn-outline" style={{ fontSize: '1.125rem', padding: '1.25rem 2.5rem' }}>
              View Demo Dashboard
            </Link>
          </div>

          <div style={{ marginTop: '4rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ display: 'flex', marginLeft: '0' }}>
              {[1,2,3,4].map(i => (
                <div key={i} style={{ width: '40px', height: '40px', borderRadius: '50%', border: '3px solid var(--bg-color)', backgroundColor: 'var(--border-color)', marginLeft: i > 1 ? '-12px' : '0', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                   <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i+10}`} alt="user" />
                </div>
              ))}
            </div>
            <p className="text-sm text-secondary">Joined by <strong>2,000+</strong> users this month</p>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="section" style={{ backgroundColor: 'var(--bg-surface)' }}>
          <div className="container">
            <div className="section-title">
              <h2 className="h2">Everything you need to succeed</h2>
              <p className="text-secondary">Designed with precision for your daily habits.</p>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem', maxWidth: '1200px', margin: '0 auto' }}>
              <div className="card">
                <div style={{ width: '56px', height: '56px', borderRadius: '1rem', backgroundColor: 'var(--accent-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                  <Zap color="var(--accent-color)" size={28} />
                </div>
                <h3 className="h2" style={{ marginBottom: '1rem' }}>Ultra-fast Logging</h3>
                <p className="text-secondary">One-tap logging designed for speed. Check off your habits in seconds, not minutes.</p>
              </div>
              
              <div className="card">
                <div style={{ width: '56px', height: '56px', borderRadius: '1rem', backgroundColor: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                  <TrendingUp color="var(--success-color)" size={28} />
                </div>
                <h3 className="h2" style={{ marginBottom: '1rem' }}>Insightful Analytics</h3>
                <p className="text-secondary">Visualize your progress with heatmaps, streak counters, and weekly completion charts.</p>
              </div>
              
              <div className="card">
                <div style={{ width: '56px', height: '56px', borderRadius: '1rem', backgroundColor: 'var(--accent-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                  <Shield color="var(--accent-color)" size={28} />
                </div>
                <h3 className="h2" style={{ marginBottom: '1rem' }}>Privacy First</h3>
                <p className="text-secondary">Your data is encrypted and secure. We never sell your personal information to third parties.</p>
              </div>
            </div>
          </div>
        </section>

        {/* How it Works */}
        <section id="how-it-works" className="section">
          <div className="container">
             <div className="section-title">
              <h2 className="h2">Three steps to a better you</h2>
              <p className="text-secondary">The simplest way to transform your lifestyle.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '4rem', maxWidth: '1000px', margin: '0 auto' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--border-color)', marginBottom: '1rem' }}>01</div>
                <h4 className="h3" style={{ marginBottom: '0.5rem' }}>Define Your Goals</h4>
                <p className="text-secondary">Choose the habits you want to build or break. Set frequencies that work for you.</p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--border-color)', marginBottom: '1rem' }}>02</div>
                <h4 className="h3" style={{ marginBottom: '0.5rem' }}>Stay Consistent</h4>
                <p className="text-secondary">Log your progress daily. Get gentle reminders to keep your streaks alive.</p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--border-color)', marginBottom: '1rem' }}>03</div>
                <h4 className="h3" style={{ marginBottom: '0.5rem' }}>Analyze & Evolve</h4>
                <p className="text-secondary">Review your data weekly. Adjust your goals and celebrate your wins.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="section" style={{ backgroundColor: 'var(--bg-surface)' }}>
          <div className="container-narrow">
            <div className="section-title">
              <h2 className="h2">Frequently Asked Questions</h2>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {[
                { q: "Is Wamio free to use?", a: "Yes! We offer a generous free tier that includes all essential tracking features." },
                { q: "Does it work on mobile?", a: "Absolutely. Wamio is a progressive web app that works perfectly on all devices." },
                { q: "Can I export my data?", a: "Security and data ownership are key. You can export your habit history at any time." }
              ].map((item, i) => (
                <div key={i} className="card" style={{ padding: '1.5rem' }}>
                  <details style={{ width: '100%' }}>
                    <summary style={{ listStyle: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontWeight: '600' }}>
                      {item.q}
                      <HelpCircle size={20} color="var(--accent-color)" />
                    </summary>
                    <p className="text-secondary mt-4" style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                      {item.a}
                    </p>
                  </details>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="section" style={{ textAlign: 'center' }}>
          <div className="container-narrow">
             <h2 className="h1" style={{ marginBottom: '1.5rem' }}>Ready to start your streak?</h2>
             <p className="text-lg text-secondary" style={{ marginBottom: '2.5rem' }}>Join the community and start building the life you've always wanted today.</p>
             <Link to="/signup" className="btn btn-primary" style={{ padding: '1.25rem 3rem', fontSize: '1.25rem' }}>
               Create Your Free Account
             </Link>
          </div>
        </section>
      </main>
      
      <Footer />

      <style dangerouslySetInnerHTML={{ __html: `
        html { scroll-behavior: smooth; }
        .hide-mobile { display: flex; }
        @media (max-width: 640px) {
          .hide-mobile { display: none; }
          .h1 { font-size: 3rem !important; }
        }
        summary::-webkit-details-marker { display: none; }
      `}} />
    </div>
  );
}
