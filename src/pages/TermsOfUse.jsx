import { Link } from 'react-router-dom';
import { Activity, FileText } from 'lucide-react';
import Footer from '../components/Footer';

export default function TermsOfUse() {
  return (
    <div className="legal-page" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <header className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem', width: '100%' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'bold', fontSize: '1.5rem', color: 'var(--text-primary)' }}>
          <Activity color="var(--accent-color)" size={28} />
          <span>Wamio</span>
        </Link>
        <Link to="/login" className="btn btn-ghost">Log In</Link>
      </header>

      <main style={{ flex: 1, padding: '4rem 1rem' }}>
        <div className="container-narrow">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <FileText color="var(--accent-color)" size={48} style={{ marginBottom: '1rem' }} />
            <h1 className="h1">Terms of Use</h1>
            <p className="text-secondary mt-2">Last updated: April 19, 2026</p>
          </div>

          <div className="text-secondary" style={{ lineHeight: '1.8' }}>
            <h3 className="h2 text-primary" style={{ marginBottom: '1rem', marginTop: '2.5rem' }}>1. Agreement to Terms</h3>
            <p>By accessing or using Wamio, you agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use the application.</p>

            <h3 className="h2 text-primary" style={{ marginBottom: '1rem', marginTop: '2.5rem' }}>2. Use of License</h3>
            <p>Permission is granted to use Wamio for personal, non-commercial purposes only. You must not use the application for any illegal or unauthorized purpose.</p>

            <h3 className="h2 text-primary" style={{ marginBottom: '1rem', marginTop: '2.5rem' }}>3. User Accounts</h3>
            <p>You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must notify us immediately of any unauthorized use of your account.</p>

            <h3 className="h2 text-primary" style={{ marginBottom: '1rem', marginTop: '2.5rem' }}>4. Limitation of Liability</h3>
            <p>Wamio and its creators shall not be liable for any indirect, incidental, special, or consequential damages resulting from the use or the inability to use our services.</p>

            <h3 className="h2 text-primary" style={{ marginBottom: '1rem', marginTop: '2.5rem' }}>5. Changes to Terms</h3>
            <p>We reserve the right to modify these terms at any time. We will notify users of any significant changes by posting a notice on our website.</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
