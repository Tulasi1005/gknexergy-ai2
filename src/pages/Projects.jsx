import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import SEO from "../components/SEO";
import './Projects.css';

const projectsData = [
  {
    id: 1,
    icon: '🏥',
    title: 'AI-Integrated Hospital Management System',
    category: 'Healthcare',
    categoryLogo: 'https://cdn-icons-png.flaticon.com/512/3081/3081915.png',
    status: 'upcoming',
    progress: 30,
    description: 'A smart hospital management platform designed to streamline patient management, appointments, medical records, billing and hospital operations. AI capabilities will help improve operational efficiency, assist with information management and provide intelligent insights for healthcare teams. The platform integrates seamlessly with existing hospital infrastructure and provides real-time analytics for better decision-making.',
    tech: ['React', 'Node.js', 'AI', 'MongoDB'],
    details: [
      'AI Patient Management',
      'Smart Diagnostics',
      'Operational Excellence',
      'Healthcare Analytics',
    ],
  },
  {
    id: 2,
    icon: '🏠',
    title: 'AI-Integrated Real Estate Business Platform',
    category: 'Real Estate',
    categoryLogo: 'https://cdn-icons-png.flaticon.com/512/3163/3163454.png',
    status: 'upcoming',
    progress: 40,
    description: 'A modern real estate solution designed to manage properties, listings, leads, customers and transactions in one platform. AI integration will enable smarter property discovery, lead management, recommendations and business insights. The platform includes advanced search capabilities, automated valuation models, and predictive analytics for market trends.',
    tech: ['Next.js', 'Python', 'AI', 'PostgreSQL'],
    details: [
      'Property Discovery AI',
      'Market Intelligence',
      'Lead Generation',
      'Business Analytics',
    ],
  },
  {
    id: 3,
    icon: '🍽️',
    title: 'AI-Enabled Restaurant Management Platform',
    category: 'Food & Beverage',
    categoryLogo: 'https://cdn-icons-png.flaticon.com/512/1046/1046855.png',
    status: 'upcoming',
    progress: 50,
    description: 'A technology-driven restaurant solution covering menu management, orders, customer engagement and business operations. AI features can support personalized recommendations, customer insights, demand analysis and operational efficiency. The platform helps restaurants optimize their operations and enhance customer experiences through data-driven insights.',
    tech: ['React', 'Express', 'AI', 'Firebase'],
    details: [
      'Personalized Dining',
      'Operational Excellence',
      'Customer Intelligence',
      'AI Recommendations',
    ],
  },
  {
    id: 4,
    icon: '🥗',
    title: 'NutriBest – Health & Wellness E-Commerce Platform',
    category: 'E-Commerce',
    categoryLogo: 'https://nutribest.us/wp-content/uploads/2026/07/NutribestLogo_112X112px.webp',
    status: 'completed',
    progress: 100,
    liveUrl: 'https://nutribest.us/',
    description: 'NutriBest is a premier online destination for high-quality nutritional supplements, essential vitamins, and science-backed dietary formulas. The platform empowers wellness journeys with premium-grade health products — vitamins, minerals, probiotics, protein, joint support and plant-based nutrition — delivered straight to your door. Includes smart product discovery, subscription plans, order management and customer wellness engagement tools. The platform features a user-friendly interface, secure payment processing, and personalized product recommendations based on customer preferences and health goals.',
    tech: ['WordPress', 'WooCommerce', 'Elementor', 'Stripe'],
    details: [
      'Premium Nutritional Supplements Store',
      'Vitamins, Minerals & Wellness Products',
      'Subscription & Order Management',
      'Customer Wellness Engagement',
    ],
  },
  {
    id: 5,
    icon: '🏢',
    title: 'Quintera Holdings – Insurance & Real Estate Advisory',
    category: 'Corporate',
    categoryLogo: '/images/quintera-logo.png',
    status: 'completed',
    progress: 100,
    liveUrl: 'https://quintera.us/',
    description: "A professionally designed corporate website for Quintera Holdings — a trusted insurance and real estate advisory firm guided by Vision, Integrity & Impact. The site showcases their full advisory portfolio: Personal Lines Coverage (homeowners, auto, boat, umbrella), Commercial Coverage (workers' compensation, general liability, fleet auto), Policy Management, Risk Assessment, and Residential & Commercial Real Estate brokerage services. The website features a modern, professional design with clear navigation, detailed service pages, and easy-to-use contact forms for client inquiries.",
    tech: ['HTML5', 'CSS3', 'JavaScript', 'FontAwesome'],
    details: [
      'Personal & Commercial Insurance Coverage',
      'Real Estate Brokerage Services',
      'Policy Management & Risk Assessment',
      'SEO Optimized Corporate Presence',
    ],
  },
  {
    id: 6,
    icon: '🌿',
    title: 'AYU S.S. Pharmacy – Ayurvedic Pharmacy Platform',
    category: 'Pharmacy',
    categoryLogo: '/images/ayu-corporate-logo.png',
    status: 'completed',
    progress: 100,
    liveUrl: 'https://ayuss-pharmacy.vercel.app/',
    description: 'A dedicated digital platform for AYU S.S. Pharmacy — a government-licensed Ayurvedic manufacturer (AYUSH License R-1970/Ayur, Govt. of Andhra Pradesh). The site features proprietary herbal remedies including Dr. Lion Pain Cream, Dr. Lion Pain Pills, and Moon Light Skin Cream — manufactured at a GMP-certified facility in Yerraguntla, Kadapa District. Rooted in tradition, committed to quality. The platform provides detailed product information, wholesale distributor enquiry system, and educational content about Ayurvedic principles and natural healing.',
    tech: ['React', 'Next.js', 'Tailwind CSS', 'Vercel'],
    details: [
      'Govt-Licensed Ayurvedic Product Showcase',
      'GMP Certified Facility & Quality Standards',
      'Wholesale Distributor Enquiry System',
      'Traditional Formulation Product Catalog',
    ],
  },
  {
    id: 7,
    icon: '💻',
    title: 'GK Nexergy – Corporate Website',
    category: 'Corporate',
    categoryLogo: '/images/center.png',
    status: 'completed',
    progress: 100,
    // liveUrl: '/',
    description: 'The official digital presence of GK Nexergy, showcasing our technology solutions, software development capabilities, digital growth services and Nexergy Academy. The website reflects our commitment to innovation, excellence, and client success through a clean, modern design that effectively communicates our brand values and service offerings to potential clients and partners.',
    tech: ['Next.js', 'TypeScript', 'GSAP', 'Sass'],
    details: [
      'Brand Representation',
      'Services Catalog',
      'Academy Integration',
      'Optimized Performance',
    ],
  },
];

const projectImages = {
  1: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
  2: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80',
  3: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
  4: 'https://nutribest.us/wp-content/uploads/2026/07/Nutribest-banner1200X630.webp',
  5: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
  6: 'https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?auto=format&fit=crop&w=800&q=80',
  7: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
};

// Brand logos shown in the modal for live projects
const projectLogos = {
  4: 'https://nutribest.us/wp-content/uploads/2026/07/NutribestLogo_112X112px.webp',
  5: '/images/quintera-logo.png',
  6: '/images/ayu-corporate-logo.png',
  7: '/images/center.png',
};

const tabs = [
  { value: 'all', label: 'All Projects' },
  { value: 'completed', label: 'Completed Projects' },
  { value: 'upcoming', label: 'Upcoming Solutions' },
];

/* ---------- Minimal Vector Icons ---------- */
const Icon = {
  rocket: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  ),
  check: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="12" cy="12" r="10" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  ),
  timeline: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M3 3v18h18" />
      <path d="M7 15l4-6 3 3 5-8" />
    </svg>
  ),
  calendar: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  ),
  people: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  arrow: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  ),
  circleArrow: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="12" cy="12" r="10" />
      <path d="M10 8l4 4-4 4" />
    </svg>
  ),
  close: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  ),
  launch: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <path d="M15 3h6v6M10 14L21 3" />
    </svg>
  ),
  plus: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  ),
};

/* ---------- Animated Counter ---------- */
function AnimatedCounter({ end, duration = 1200 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const done = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !done.current) {
          done.current = true;
          const start = performance.now();
          const tick = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            setCount(Math.floor(progress * end));
            if (progress < 1) requestAnimationFrame(tick);
            else setCount(end);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [end, duration]);

  return <span ref={ref}>{count}</span>;
}

/* ---------- Project Card ---------- */
function ProjectCard({ project, index, onOpen }) {
  const coverImage = projectImages[project.id] || projectImages[1];
  const isUpcoming = project.status === 'upcoming';

  return (
    <div
      className={`pro-card ${project.status}`}
      style={{ animationDelay: `${index * 0.05}s` }}
      onClick={() => {
        if (!isUpcoming) onOpen(project);
      }}
      tabIndex={isUpcoming ? -1 : 0}
      role={isUpcoming ? 'article' : 'button'}
      onKeyDown={(e) => {
        if (!isUpcoming && (e.key === 'Enter' || e.key === ' ')) onOpen(project);
      }}
    >
      {/* Visual Media Header */}
      <div className="card-thumb-header">
        <img src={coverImage} alt={project.title} className="card-photo" loading="lazy" />
        <div className="card-photo-overlay" />

        <div className="card-top-badges">
          <span className="card-category-badge">
            {project.categoryLogo && (
              <img
                src={project.categoryLogo}
                alt={project.category}
                className={`category-logo ${
                  project.categoryLogo.includes('flaticon') || project.categoryLogo.includes('icon')
                    ? 'silhouette-icon'
                    : 'brand-logo'
                }`}
                loading="lazy"
              />
            )}
            {project.category}
          </span>
          <span className={`status-pill ${project.status}`}>
            <span className="status-dot" />
            {project.status === 'completed' ? 'Completed' : 'In Progress'}
          </span>
        </div>
      </div>

      {/* Card Content Area */}
      <div className="card-content-area">
        <h3 className="card-title">{project.title}</h3>
        <p className="card-desc">{project.description}</p>

        {/* Bottom Footer Bar */}
        <div className="card-footer-bar">
          <div className="progress-group">
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${project.progress}%` }} />
            </div>
            <span className="progress-text">{project.progress}%</span>
          </div>

          <div className="card-action-row">
            {!isUpcoming ? (
              <button
                className="details-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpen(project);
                }}
              >
                <span>Details</span>
                <Icon.arrow className="arrow-icon" />
              </button>
            ) : (
              <span className="in-dev-pill">
                <span className="dev-dot" />
                In Dev
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Filler Panel ---------- */
function FillerPanel({ type }) {
  const fillerContent = {
    completed: {
      title: '🚀 Ready to Launch Your Project?',
      description: 'We\'ve delivered exceptional solutions across healthcare, e-commerce, real estate, and more. Let\'s bring your vision to life with the same excellence.',
      cta: 'Start Your Project',
      link: '/contact',
      stats: '4 Completed Projects',
      icon: '✨'
    },
    upcoming: {
      title: '🔮 Shaping the Future of Business',
      description: 'Our upcoming AI-integrated solutions are designed to revolutionize industries with intelligent automation, predictive analytics, and seamless user experiences.',
      cta: 'Discuss Your Idea',
      link: '/contact',
      stats: '3 Upcoming Solutions',
      icon: '🌟'
    }
  };

  const content = fillerContent[type] || fillerContent.completed;

  return (
    <div className="filler-panel">
      <div className="filler-panel-inner">
        <div className="filler-icon">{content.icon}</div>
        <h3 className="filler-title">{content.title}</h3>
        <p className="filler-description">{content.description}</p>
        <div className="filler-stats">
          <span className="filler-stat-badge">{content.stats}</span>
        </div>
        <a href={content.link} className="filler-cta-btn">
          {content.cta}
          <Icon.arrow className="arrow-icon" />
        </a>
      </div>
    </div>
  );
}

/* ---------- Modal ---------- */
function ProjectModal({ project, onClose }) {
  const coverImage = project ? (projectImages[project.id] || projectImages[1]) : '';
  const logo = project ? (projectLogos[project.id] || null) : null;

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.classList.add('no-scroll');
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, []);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!project) return null;

  const handleLaunch = () => {
    if (project.liveUrl) {
      window.open(project.liveUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-horizontal-panel" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <Icon.close />
        </button>

        {/* LEFT COLUMN: Visual Showcase */}
        <div className="modal-left-showcase">
          <img src={coverImage} alt={project.title} className="modal-hero-photo" />
          <div className="modal-photo-scrim" />
          <div className="modal-showcase-caption">
            {logo && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '12px',
              }}>
                <img
                  src={logo}
                  alt={`${project.title} logo`}
                  style={{
                    width: '48px',
                    height: '48px',
                    objectFit: 'contain',
                    borderRadius: '8px',
                    background: 'rgba(255,255,255,0.9)',
                    padding: '4px',
                  }}
                />
              </div>
            )}
            <h2>{project.title}</h2>
            {project.liveUrl && (
              <div style={{ marginTop: '10px' }}>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: '0.75rem',
                    color: 'rgba(255,255,255,0.8)',
                    textDecoration: 'underline',
                    wordBreak: 'break-all',
                  }}
                >
                  {project.liveUrl}
                </a>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Content */}
        <div className="modal-right-content">
          <div className="modal-scroll-pane">
            <h4 className="section-label">Overview</h4>
            <p className="modal-desc-body">{project.description}</p>

            <h4 className="section-label">Key Architecture & Capabilities</h4>
            <ul className="modal-checklist">
              {project.details.map((d, i) => (
                <li key={i} className="deliverable-item" style={{ animationDelay: `${0.1 + i * 0.05}s` }}>
                  <span className="check-mark">✓</span>
                  <span>{d}</span>
                </li>
              ))}
            </ul>

            <div className="modal-progress-section">
              <div className="progress-header-row">
                <span>Completion Status</span>
                <span className="progress-num">{project.progress}%</span>
              </div>
              <div className="progress-track">
                <div className="progress-fill" style={{ width: `${project.progress}%` }} />
              </div>
            </div>
          </div>

          <div className="modal-action-bottom">
            {project.liveUrl ? (
              <button
                className="modal-primary-action"
                onClick={handleLaunch}
                style={{
                  background: 'linear-gradient(135deg, #10b981, #059669)',
                  boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #34d399, #059669)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(16, 185, 129, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #10b981, #059669)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.3)';
                }}
              >
                <span>🚀 Launch Live Project</span>
                <Icon.launch className="btn-icon" />
              </button>
            ) : (
              <button
                className="modal-primary-action"
                onClick={onClose}
                style={{
                  background: 'linear-gradient(135deg, #6b7280, #4b5563)',
                  boxShadow: '0 4px 12px rgba(107, 114, 128, 0.3)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #9ca3af, #6b7280)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(107, 114, 128, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #6b7280, #4b5563)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(107, 114, 128, 0.3)';
                }}
              >Close
                     </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Main Component ---------- */
export default function Projects() {
  const [tabValue, setTabValue] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  // Sort projects: completed first, then upcoming
  const sortProjects = (projects) => {
    return [...projects].sort((a, b) => {
      if (a.status === 'completed' && b.status === 'upcoming') return -1;
      if (a.status === 'upcoming' && b.status === 'completed') return 1;
      return 0;
    });
  };

  // Get filtered and sorted projects
  const getFilteredProjects = () => {
    let filtered = projectsData;
    if (tabValue === 'completed') {
      filtered = projectsData.filter((p) => p.status === 'completed');
    } else if (tabValue === 'upcoming') {
      filtered = projectsData.filter((p) => p.status === 'upcoming');
    }
    return sortProjects(filtered);
  };

  const filteredProjects = getFilteredProjects();
  const totalProjects = projectsData.length;
  const completedCount = projectsData.filter((p) => p.status === 'completed').length;
  const upcomingCount = projectsData.filter((p) => p.status === 'upcoming').length;

  const getTabCount = (value) => {
    if (value === 'all') return totalProjects;
    return projectsData.filter((p) => p.status === value).length;
  };

  // Function to render grid with filler panels
  const renderGridWithFillers = (projects) => {
    const COLS = 3;
    const rows = [];
    let i = 0;

    while (i < projects.length) {
      const rowProjects = projects.slice(i, i + COLS);
      rows.push(rowProjects);
      i += COLS;
    }

    return rows.map((row, rowIndex) => {
      const isLastRow = rowIndex === rows.length - 1;
      const needsFiller = isLastRow && row.length < COLS && row.length > 0;

      let fillerType = 'completed';
      if (needsFiller) {
        const hasUpcoming = row.some(p => p.status === 'upcoming');
        if (hasUpcoming) {
          fillerType = 'upcoming';
        } else {
          const hasAnyUpcoming = projects.some(p => p.status === 'upcoming');
          fillerType = hasAnyUpcoming ? 'upcoming' : 'completed';
        }
      }

      return (
        <div className="pro-cards-grid" key={rowIndex}>
          {row.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onOpen={setSelectedProject}
            />
          ))}
          {needsFiller && (
            <FillerPanel type={fillerType} />
          )}
        </div>
      );
    });
  };

  return (
    <>
      <SEO
        title="Projects & Case Studies | Enterprise Software & AI Implementations"
        description="Explore GK Nexergy's real-world software engineering projects, web applications, e-commerce platforms, and AI-enabled enterprise systems built for scalability in India."
        keywords={[
          "Enterprise Software Solutions",
          "Custom Software Development",
          "AI Solutions for Businesses",
          "Web and Mobile App Development",
          "Technology Solutions in India",
          "Case Studies"
        ]}
        canonical="/projects"
      />
      <div className="projects-page-wrapper">
        {/* Ambient Layer */}
        <div className="ambient-layer" aria-hidden="true">
          <div className="ambient-mesh-canvas" />
          <span className="light-orb orb-1" />
          <span className="light-orb orb-2" />
        </div>

        <div className="projects-content-container">
          {/* EXECUTIVE SPOTLIGHT HERO */}
          <section className="executive-spotlight-box">
            <div className="spotlight-lead-card">
              <Link
                to="/home#pages-stack-section"
                data-testid="back-to-stack-link"
                aria-label="Back"
                title="Back"
                className="global-back-to-stack-btn group mb-3.5"
              >
                <ChevronLeft className="global-back-to-stack-icon group-hover:-translate-x-0.5" strokeWidth={2.8} />
              </Link>
              <h1 className="spotlight-title">Our Projects</h1>
              <p className="spotlight-desc">
                At GK Nexergy, we transform ideas into practical technology solutions. From business websites and e-commerce platforms to AI-enabled enterprise applications, our projects focus on innovation, usability, scalability and real-world business needs.
              </p>
            </div>

            <div className="spotlight-stats-panel">
              <div className="stat-card" onClick={() => setTabValue('all')}>
                <div className="stat-icon-wrap blue-icon"><Icon.rocket /></div>
                <div className="stat-info">
                  <span className="stat-digit"><AnimatedCounter end={totalProjects} /></span>
                  <span className="stat-text">Total Projects</span>
                </div>
              </div>

              <div className="stat-card" onClick={() => setTabValue('completed')}>
                <div className="stat-icon-wrap green-icon"><Icon.check /></div>
                <div className="stat-info">
                  <span className="stat-digit"><AnimatedCounter end={completedCount} /></span>
                  <span className="stat-text">Completed</span>
                </div>
              </div>

              <div className="stat-card" onClick={() => setTabValue('upcoming')}>
                <div className="stat-icon-wrap amber-icon"><Icon.timeline /></div>
                <div className="stat-info">
                  <span className="stat-digit"><AnimatedCounter end={upcomingCount} /></span>
                  <span className="stat-text">Upcoming Solutions</span>
                </div>
              </div>
            </div>
          </section>

          {/* FILTER TABS */}
          <div className="tabs-nav-row">
            <div className="tabs-pill-box">
              {tabs.map((tab) => (
                <button
                  key={tab.value}
                  className={`tab-btn-item ${tabValue === tab.value ? 'active' : ''}`}
                  onClick={() => setTabValue(tab.value)}
                >
                  {tab.label}
                  <span className="tab-badge-num">{getTabCount(tab.value)}</span>
                </button>
              ))}
            </div>
            <span className="results-badge-label">{filteredProjects.length} Projects Active</span>
          </div>

          {/* CARDS GRID */}
          <div className="grid-wrapper">
            {filteredProjects.length > 0 ? (
              renderGridWithFillers(filteredProjects)
            ) : (
              <div className="empty-state">
                <p>No projects found in this category.</p>
              </div>
            )}
          </div>

          {/* CTA FOOTER */}
          <div className="executive-cta-box">
            <div className="cta-left-copy">
              <h3>Have a project in mind?</h3>
              <p>Let's collaborate to build something exceptional that drives real growth.</p>
            </div>
            <Link to="/contact" className="cta-action-btn">
              <span>Get in Touch</span>
              <Icon.arrow className="arrow-icon" />
            </Link>
          </div>
        </div>

        {/* MODAL */}
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </div>
    </>
  );
}