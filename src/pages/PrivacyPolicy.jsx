import { Link } from 'react-router-dom';
import { Activity, ShieldCheck } from 'lucide-react';
import Footer from '../components/Footer';

export default function PrivacyPolicy() {
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
            <ShieldCheck color="var(--success-color)" size={48} style={{ marginBottom: '1rem' }} />
            <h1 className="h1">Privacy Policy</h1>
            <p className="text-secondary mt-2">Last updated: April 19, 2026</p>
          </div>

          <div className="text-secondary" style={{ lineHeight: '1.8' }}>
            <h3 className="h2 text-primary" style={{ marginBottom: '1rem', marginTop: '2.5rem' }}>1. Introduction</h3>
            <p>Welcome to Wamio. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website.</p>

            <h3 className="h2 text-primary" style={{ marginBottom: '1rem', marginTop: '2.5rem' }}>2. Data We Collect</h3>
            <p>We collect information that you provide directly to us when you create an account, such as your name and email address. We also store the habit data you input into the application to provide our services.</p>

            <h3 className="h2 text-primary" style={{ marginBottom: '1rem', marginTop: '2.5rem' }}>3. How We Use Your Data</h3>
            <p>We use your data to provide and improve our habit tracking services, communicate with you about your account, and ensure a personalized experience. We do not sell your data to third parties.</p>

            <h3 className="h2 text-primary" style={{ marginBottom: '1rem', marginTop: '2.5rem' }}>4. Data Security</h3>
            <p>We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way. We use Firebase for secure authentication and data storage.</p>

            <h3 className="h2 text-primary" style={{ marginBottom: '1rem', marginTop: '2.5rem' }}>5. Your Rights</h3>
            <p>You have the right to access, correct, or delete your personal data at any time. You can manage most of your data directly through the user settings in the application.</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
