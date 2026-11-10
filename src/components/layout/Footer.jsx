import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Mail, Phone, MapPin, Linkedin, Twitter, Youtube, Github, Users, Briefcase, Globe } from "lucide-react";
import "./Footer.css";
import { motion, AnimatePresence } from "framer-motion";
import {
  getVisitorCount,
  getActiveUsers,
  getVisitorStats,
  subscribeVisitorCount,
  subscribeActiveUsers,
  subscribeVisitorStats,
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
  const [stats, setStats] = useState(() => getVisitorStats());
  const [isStatsHovered, setIsStatsHovered] = useState(false);

  useEffect(() => {
    const unsubCount = subscribeVisitorCount((updatedCount) => {
      setVisitorCount(updatedCount);
    });
    const unsubActive = subscribeActiveUsers((updatedActive) => {
      setActiveUsers(updatedActive);
    });
    const unsubStats = subscribeVisitorStats((updatedStats) => {
      setStats(updatedStats);
    });
    return () => {
      unsubCount();
      unsubActive();
      unsubStats();
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
            className="relative order-1 md:order-2 group cursor-pointer"
            onMouseEnter={() => setIsStatsHovered(true)}
            onMouseLeave={() => setIsStatsHovered(false)}
            onClick={() => window.open("/api/counter.php", "_blank")}
            title="Click to open Live Analytics Dashboard"
          >
            <div
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md transition-all duration-300 shadow-sm hover:scale-[1.02] active:scale-[0.98]"
              style={{
                background: isDark
                  ? "rgba(15, 23, 42, 0.85)"
                  : "rgba(241, 245, 249, 0.95)",
                border: isDark
                  ? "1px solid rgba(56, 189, 248, 0.28)"
                  : "1px solid rgba(203, 213, 225, 0.9)",
                boxShadow: isDark
                  ? "0 4px 14px rgba(0, 0, 0, 0.4), 0 0 10px rgba(56, 189, 248, 0.1)"
                  : "0 2px 10px rgba(15, 23, 42, 0.06)",
              }}
            >
              {/* Pulsing Live Traffic Status Beacon */}
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>

              {/* Active Users */}
              <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                <strong data-testid="footer-active-users" className="tabular-nums font-bold">
                  {stats.active || activeUsers}
                </strong>
                <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                  Active Online
                </span>
              </span>

              {/* Separator */}
              <span className="text-slate-300 dark:text-slate-700 select-none">•</span>

              {/* Total Visitors */}
              <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-200">
                <Users className="h-3.5 w-3.5 text-blue-600 dark:text-sky-400 shrink-0" />
                <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                  Visitors:
                </span>
                <strong data-testid="footer-visitor-count" className="tabular-nums font-bold text-slate-900 dark:text-white">
                  {(stats.totalVisitors || visitorCount).toLocaleString("en-US")}
                </strong>
              </span>
            </div>

            {/* Detailed Traffic Hover Tooltip Popover */}
            <AnimatePresence>
              {isStatsHovered && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: -6, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.95 }}
                  transition={{ duration: 0.18 }}
                  className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 rounded-xl p-3 text-xs font-medium backdrop-blur-md shadow-2xl z-50"
                  style={{
                    background: isDark ? "rgba(15, 23, 42, 0.96)" : "#0f172a",
                    color: "#ffffff",
                    border: isDark ? "1px solid rgba(56, 189, 248, 0.3)" : "1px solid #1e293b",
                    boxShadow: "0 12px 30px rgba(0, 0, 0, 0.4)",
                  }}
                >
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between pb-1.5 border-b border-slate-700/80 text-[11px] font-bold text-sky-400">
                      <span>GK Nexergy Traffic</span>
                      <span className="flex items-center gap-1 text-[10px] text-emerald-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" /> LIVE
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-emerald-400">
                      <span>Active Online Now:</span>
                      <strong className="font-bold tabular-nums">{stats.active || activeUsers}</strong>
                    </div>
                    <div className="flex items-center justify-between text-slate-200">
                      <span>Total Visitors Visited:</span>
                      <strong className="font-bold tabular-nums text-white">
                        {(stats.totalVisitors || visitorCount).toLocaleString("en-US")}
                      </strong>
                    </div>
                    <div className="flex items-center justify-between text-slate-300">
                      <span>Today's Visitors:</span>
                      <strong className="font-bold tabular-nums text-white">
                        {(stats.todayVisitors || 1).toLocaleString("en-US")}
                      </strong>
                    </div>
                    <div className="flex items-center justify-between text-slate-400 text-[10.5px] pt-1 border-t border-slate-800">
                      <span>Total Interactions:</span>
                      <strong className="text-slate-300 tabular-nums">
                        {visitorCount.toLocaleString("en-US")}
                      </strong>
                    </div>
                    <div className="text-[9px] text-sky-300/80 text-center pt-0.5 font-medium">
                      Click to open Full Live Analytics Dashboard
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
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
