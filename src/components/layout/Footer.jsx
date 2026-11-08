import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Mail, Phone, MapPin, Linkedin, Twitter, Youtube, Github } from "lucide-react";
import "./Footer.css";
import { Users, Briefcase, Globe } from "lucide-react";
import {
  getVisitorCount,
  getActiveUsers,
  subscribeVisitorCount,
  subscribeActiveUsers,
} from "@/utils/visitorTracker";

const FOOTER_NAV_LINKS = [
  { label: "Home", to: "/home", isMatch: (p) => p === "/" || p === "/home" || p === "/landing" },
  { label: "Pricing Plans", to: "/pricing", isMatch: (p) => p.startsWith("/pricing") },
  { label: "Solutions", to: "/solutions", isMatch: (p) => p.startsWith("/solutions") },
  { label: "Academy", to: "/academy", isMatch: (p) => p.startsWith("/academy") },
  { label: "Contact", to: "/contact", isMatch: (p) => p.startsWith("/contact") },
];

const Footer = ({ theme }) => {
  const location = useLocation();
  const currentPath = location?.pathname || "";
  const [isDark, setIsDark] = useState(() => theme === "dark" || document.documentElement.classList.contains("dark"));
  const [visitorCount, setVisitorCount] = useState(() => getVisitorCount());
  const [activeUsers, setActiveUsers] = useState(() => getActiveUsers());

  useEffect(() => {
    const unsubCount = subscribeVisitorCount((updatedCount) => {
      setVisitorCount(updatedCount);
    });
    const unsubActive = subscribeActiveUsers((updatedActive) => {
      setActiveUsers(updatedActive);
    });
    return () => {
      unsubCount();
      unsubActive();
    };
  }, []);

  useEffect(() => {
    if (theme) {
      setIsDark(theme === "dark");
    } else {
      const observer = new MutationObserver(() => {
        setIsDark(document.documentElement.classList.contains("dark"));
      });
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
      return () => observer.disconnect();
    }
  }, [theme]);

  return (
    <footer className="site-footer" data-testid="main-footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* 1. Brand Section */}
          <div className="footer-brand-col">
            <Link to="/home" className="footer-logo-link" data-testid="footer-logo">
              {/* Dynamic Theme Logo */}
              <img
                src={isDark ? "/images/gklogo-dark.png" : "/images/gklogo.png"}
                alt="GK Nexergy - Custom Software Development & AI Solutions"
                className={`footer-logo-img ${isDark ? "dark-only" : "light-only"}`}
              />
            </Link>
          <div className="footer-tagline-wrapper">
            <div className="footer-tagline-item">
              <span className="tagline-icon">
                <Users className="h-4 w-4" />
              </span>
              <span>Empowering People.</span>
            </div>
            <div className="footer-tagline-item">
              <span className="tagline-icon">
                <Briefcase className="h-4 w-4" />
              </span>
              <span>Enabling Businesses.</span>
            </div>
            <div className="footer-tagline-item">
              <span className="tagline-icon">
                <Globe className="h-4 w-4" />
              </span>
              <span>Transforming Communities.</span>
            </div>
          </div>
        </div>

        {/* 2. Contact Section */}
        <div className="footer-contact-col">
          <h3 className="footer-col-heading">Contact Us</h3>
          <div className="footer-contact-list">
            <a
              href="mailto:contact@gknexergy.com"
              className="footer-contact-card"
              data-testid="footer-email"
            >
              <div className="footer-contact-icon-box">
                <Mail className="h-4.5 w-4.5" />
              </div>
              <div className="footer-contact-info">
                <span className="footer-contact-label">Email Inquiry</span>
                <span className="footer-contact-value">contact@gknexergy.com</span>
              </div>
            </a>

            <a
              href="tel:+919704585960"
              className="footer-contact-card"
              data-testid="footer-phone"
            >
              <div className="footer-contact-icon-box">
                <Phone className="h-4.5 w-4.5" />
              </div>
              <div className="footer-contact-info">
                <span className="footer-contact-label">Phone & WhatsApp</span>
                <span className="footer-contact-value">+91 97045 85960</span>
              </div>
            </a>
          </div>
        </div>

        {/* 3. Social Links Section */}
        <div className="footer-social-col">
          <h3 className="footer-col-heading">Connect With Us</h3>
          <p className="footer-social-subtext">
            Stay tuned with our latest updates, academy announcements, and engineering breakthroughs.
          </p>

          <div className="footer-social-icons">
            {[
              { Icon: Linkedin, href: "https://www.linkedin.com/company/gk-nexergy", label: "LinkedIn", brandClass: "social-linkedin" },
              { Icon: Twitter, href: "https://twitter.com/gknexergy", label: "X (Twitter)", brandClass: "social-twitter" },
              { Icon: Youtube, href: "https://youtube.com/@gknexergy", label: "YouTube", brandClass: "social-youtube" },
              { Icon: Github, href: "https://github.com/gknexergy", label: "GitHub", brandClass: "social-github" },
            ].map(({ Icon, href, label, brandClass }, i) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                title={label}
                data-testid={`footer-social-${i}`}
                className={`footer-social-btn ${brandClass}`}
              >
                <Icon className="h-4.5 w-4.5" />
              </a>
            ))}
          </div>

          <div className="footer-launch-pill">
            <span className="footer-pulse-beacon">
              <span className="footer-pulse-ring" />
              <span className="footer-pulse-core" />
            </span>
            <span>Social media channels launching soon</span>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom-bar flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left: Copyright */}
        <p className="footer-copyright order-2 md:order-1 text-center md:text-left">
          © {new Date().getFullYear()} GK Nexergy. All rights reserved.
        </p>

        {/* Center: Live Real-Time Active Users & Visitor Count */}
        <div
          className="order-1 md:order-2 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md transition-all duration-300 shadow-sm"
          style={{
            background: isDark
              ? "rgba(15, 23, 42, 0.75)"
              : "rgba(241, 245, 249, 0.95)",
            border: isDark
              ? "1px solid rgba(56, 189, 248, 0.25)"
              : "1px solid rgba(203, 213, 225, 0.8)",
          }}
          title={`${activeUsers} active user${activeUsers === 1 ? "" : "s"} online now • ${visitorCount.toLocaleString("en-US")} total visits`}
        >
          {/* Pulsing Live Traffic Status Beacon */}
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>

          {/* Active Users */}
          <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
            <Users className="h-3.5 w-3.5 text-brand dark:text-sky-400 shrink-0" />
            
            <strong data-testid="footer-active-users" className="tabular-nums font-bold">
              {activeUsers}
            </strong>
            <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
              Active 
            </span>
          </span>

         
        </div>

        {/* Right: Navigation Links */}
        <div className="order-3 flex flex-wrap items-center justify-center md:justify-end gap-4 text-xs font-semibold">
          {FOOTER_NAV_LINKS.map((link) => {
            const isActive = link.isMatch(currentPath);
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`transition-colors duration-200 ${
                  isActive
                    ? "text-brand dark:text-sky-400 font-bold"
                    : "text-slate-500 hover:text-brand dark:text-slate-400 dark:hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  </footer>
  );
};

export default Footer;
