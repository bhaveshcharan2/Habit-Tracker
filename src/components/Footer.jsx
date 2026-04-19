import { Link } from 'react-router-dom';
import { Activity, Github, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-column">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'bold', fontSize: '1.25rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>
            <Activity color="var(--accent-color)" size={24} />
            <span>Wamio</span>
          </div>
          <p className="text-secondary" style={{ maxWidth: '300px', fontSize: '0.9rem', lineHeight: '1.6' }}>
            A premium habit tracking experience designed to help you build consistency and achieve your long-term goals with ease.
          </p>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
            <a href="#" className="btn-ghost" style={{ padding: '0.5rem' }}><Twitter size={20} /></a>
            <a href="#" className="btn-ghost" style={{ padding: '0.5rem' }}><Github size={20} /></a>
            <a href="#" className="btn-ghost" style={{ padding: '0.5rem' }}><Linkedin size={20} /></a>
          </div>
        </div>

        <div className="footer-column">
          <h4>Product</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/login">Dashboard</Link></li>
            <li><Link to="/signup">Signup</Link></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Company</h4>
          <ul>
            <li><Link to="/about">About Us</Link></li>
            <li><a href="#features">Features</a></li>
            <li><a href="#faq">FAQ</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Legal</h4>
          <ul>
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li><Link to="/terms">Terms of Use</Link></li>
            <li><a href="#">Cookies</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Wamio Labs Inc. All rights reserved.</p>
        <p>Made with &hearts; for consistency seekers.</p>
      </div>
    </footer>
  );
}
