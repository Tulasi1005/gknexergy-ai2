import fs from 'fs';

const p = 'src/components/layout/Footer.css';
let content = fs.readFileSync(p, 'utf8');

const startMarker = '.footer-col-heading {';
const endMarker = '.footer-bottom-bar {';

const startIndex = content.indexOf(startMarker);
const endIndex = content.indexOf(endMarker);

if (startIndex === -1 || endIndex === -1) {
    console.error('Markers not found', { startIndex, endIndex });
    process.exit(1);
}

const replacement = `.footer-col-heading {
  font-family: 'Space Grotesk', 'Plus Jakarta Sans', sans-serif;
  font-size: 0.8125rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--footer-title);
  margin: 0 0 20px 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 7px;
}

.footer-col-heading::after {
  content: '';
  display: block;
  width: 32px;
  height: 2.5px;
  background: linear-gradient(90deg, var(--footer-accent) 0%, rgba(37, 99, 235, 0.25) 100%);
  border-radius: 4px;
}

.dark .footer-col-heading::after {
  background: linear-gradient(90deg, #38bdf8 0%, rgba(56, 189, 248, 0.2) 100%);
}

.footer-contact-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
}

.footer-contact-card {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px 16px;
  border-radius: 14px;
  background: var(--footer-card);
  border: 1px solid var(--footer-border);
  text-decoration: none;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
}

.footer-contact-card:hover {
  transform: translateY(-2px);
  border-color: var(--footer-accent);
  box-shadow: 0 8px 20px -4px var(--footer-accent-glow);
}

.footer-contact-icon-box {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background: rgba(37, 99, 235, 0.08);
  border: 1px solid rgba(37, 99, 235, 0.16);
  color: var(--footer-accent);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.25s ease;
}

.footer-contact-card:hover .footer-contact-icon-box {
  background: var(--footer-accent);
  color: #ffffff;
  transform: scale(1.04);
  box-shadow: 0 4px 12px var(--footer-accent-glow);
}

.dark .footer-contact-icon-box {
  background: rgba(56, 189, 248, 0.1);
  border-color: rgba(56, 189, 248, 0.22);
  color: #38bdf8;
}

.dark .footer-contact-card:hover .footer-contact-icon-box {
  background: #38bdf8;
  color: #060d1a;
}

.footer-contact-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.footer-contact-label {
  font-size: 10.5px;
  font-weight: 700;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: var(--footer-muted);
  line-height: 1.2;
}

.footer-contact-value {
  font-size: 14px;
  font-weight: 650;
  color: var(--footer-title);
  line-height: 1.35;
  letter-spacing: -0.01em;
  transition: color 0.2s ease;
}

.footer-contact-card:hover .footer-contact-value {
  color: var(--footer-accent);
}

/* ── Column 3: Social & Community ──────────────────────────────────── */
.footer-social-col {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
}

.footer-social-subtext {
  font-size: 13.5px;
  color: var(--footer-text);
  line-height: 1.6;
  margin: 0 0 16px 0;
  max-width: 320px;
}

.footer-social-icons {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 18px;
}

.footer-social-btn {
  width: 42px;
  height: 42px;
  border-radius: 12px;
  background: var(--footer-card);
  border: 1px solid var(--footer-border);
  color: var(--footer-text);
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
}

/* Brand hover colors */
.footer-social-btn.social-linkedin:hover {
  background: #0A66C2;
  border-color: #0A66C2;
  color: #ffffff;
  transform: translateY(-3px);
  box-shadow: 0 6px 18px rgba(10, 102, 194, 0.35);
}

.footer-social-btn.social-twitter:hover {
  background: #0f172a;
  border-color: #0f172a;
  color: #ffffff;
  transform: translateY(-3px);
  box-shadow: 0 6px 18px rgba(15, 23, 42, 0.3);
}

.dark .footer-social-btn.social-twitter:hover {
  background: #ffffff;
  border-color: #ffffff;
  color: #0f172a;
  box-shadow: 0 6px 18px rgba(255, 255, 255, 0.25);
}

.footer-social-btn.social-youtube:hover {
  background: #FF0000;
  border-color: #FF0000;
  color: #ffffff;
  transform: translateY(-3px);
  box-shadow: 0 6px 18px rgba(255, 0, 0, 0.35);
}

.footer-social-btn.social-github:hover {
  background: #24292F;
  border-color: #24292F;
  color: #ffffff;
  transform: translateY(-3px);
  box-shadow: 0 6px 18px rgba(36, 41, 47, 0.35);
}

.dark .footer-social-btn.social-github:hover {
  background: #334155;
  border-color: #475569;
  color: #ffffff;
}

.footer-launch-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  font-weight: 650;
  color: #047857;
  background: rgba(16, 185, 129, 0.08);
  border: 1px solid rgba(16, 185, 129, 0.24);
  padding: 6px 14px;
  border-radius: 9999px;
  box-shadow: 0 1px 2px rgba(16, 185, 129, 0.05);
}

.dark .footer-launch-pill {
  color: #34d399;
  background: rgba(16, 185, 129, 0.12);
  border-color: rgba(52, 211, 153, 0.25);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

.footer-pulse-beacon {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 10px;
  height: 10px;
}

.footer-pulse-ring {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: #10b981;
  opacity: 0.75;
  animation: footerPulse 2s cubic-bezier(0, 0, 0.2, 1) infinite;
}

.footer-pulse-core {
  position: relative;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #10b981;
}

@keyframes footerPulse {
  0% {
    transform: scale(0.95);
    opacity: 0.8;
  }
  70% {
    transform: scale(2.2);
    opacity: 0;
  }
  100% {
    transform: scale(2.4);
    opacity: 0;
  }
}

`;

const newContent = content.slice(0, startIndex) + replacement + content.slice(endIndex);
fs.writeFileSync(p, newContent, 'utf8');
console.log('Successfully updated Footer.css!');
