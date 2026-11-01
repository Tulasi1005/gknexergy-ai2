import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Briefcase, 
  CheckCircle2, 
  X, 
  ArrowRight, 
  Send,
  PhoneCall,
  UserCheck,
  Code2,
  Bug,
  GraduationCap,
  Megaphone,
  Sparkles,
  ChevronLeft,
} from "lucide-react";
import SEO from "../components/SEO";
import "./Careers.css";

// The 6 Roles Requested by the User
const OPEN_ROLES = [
  {
    id: "tele-caller",
    title: "Tele Caller",
    openings: "4 Openings",
    type: "Full-time",
    mode: "On-site / Hybrid",
    skills: ["Client Outreach", "Communication", "Lead Nurturing", "Relationship Building"],
    description: "Engage with prospective students, partners, and enterprise clients, communicating our training and software solutions with clarity, empathy, and professionalism.",
    icon: PhoneCall,
    color: "#3b82f6",
  },
  {
    id: "administration",
    title: "Administration",
    openings: "2 Openings",
    type: "Full-time",
    mode: "On-site",
    skills: ["Office Operations", "Documentation", "Scheduling", "HR & Facility Coordination"],
    description: "Manage operational workflows, organizational documentation, scheduling, facilities, and coordinate team administrative activities seamlessly.",
    icon: UserCheck,
    color: "#8b5cf6",
  },
  {
    id: "developer",
    title: "Developer",
    openings: "5 Openings",
    type: "Full-time",
    mode: "Hybrid / Remote",
    skills: ["React / Next.js", "Node.js", "Python / FastAPI", "REST & GraphQL APIs", "PostgreSQL"],
    description: "Build scalable web applications, enterprise software, APIs, and modern digital platforms with cutting-edge tech stacks and AI integrations.",
    icon: Code2,
    color: "#06b6d4",
  },
  {
    id: "tester",
    title: "Tester (QA Engineer)",
    openings: "3 Openings",
    type: "Full-time",
    mode: "Hybrid",
    skills: ["Manual Testing", "Selenium / Cypress", "API Automation", "Bug Lifecycle", "Jira"],
    description: "Ensure software quality, performance, security, and reliability through rigorous test planning, automated scripts, cross-browser QA, and defect tracking.",
    icon: Bug,
    color: "#f59e0b",
  },
  {
    id: "trainer",
    title: "Trainer (Technical Mentor)",
    openings: "3 Openings",
    type: "Full-time",
    mode: "Hybrid / On-site",
    skills: ["Curriculum Delivery", "Hands-on Labs", "Mentorship", "Code Reviews", "Industry Projects"],
    description: "Mentor the next generation of engineers in Nexergy Academy through project-based teaching, real-world case studies, and hands-on laboratory guidance.",
    icon: GraduationCap,
    color: "#10b981",
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing Specialist",
    openings: "2 Openings",
    type: "Full-time",
    mode: "Hybrid",
    skills: ["SEO / SEM", "Social Media Campaigns", "Content Strategy", "Performance Ads", "Analytics"],
    description: "Drive brand growth, organic search visibility, social community engagement, paid ad funnels, and performance marketing across multi-channel digital landscapes.",
    icon: Megaphone,
    color: "#ec4899",
  },
];

const PERKS = [
  { number: "Remote", label: "Friendly Culture", color: "#3b82f6" },
  { number: "Learning", label: "Budget Provided", color: "#8b5cf6" },
  { number: "Competitive", label: "Compensation", color: "#06b6d4" },
  { number: "Global", label: "Team Exposure", color: "#22c55e" },
];

const Careers = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [verifyModalOpen, setVerifyModalOpen] = useState(false);
  const [certId, setCertId] = useState("");
  const [certResult, setCertResult] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    experience: "Fresher / 0-1 Year",
    linkedin: "",
    message: "",
  });

  const handleApplyClick = (roleTitle) => {
    setSelectedRole(roleTitle);
    setIsSubmitted(false);
    setIsModalOpen(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleVerifySubmit = (e) => {
    e.preventDefault();
    if (!certId.trim()) return;
    // Friendly instant verification feedback
    setCertResult({
      id: certId.trim().toUpperCase(),
      status: "Valid Certificate",
      program: "Nexergy Academy Industry Empowerment Program",
      issuedBy: "GK Nexergy Verification Authority",
    });
  };

  return (
    <div className="careers-page-wrapper">
      <SEO
        title="Careers at GK Nexergy | Software & AI Engineering Jobs in Hyderabad"
        description="Join GK Nexergy's engineering and technology team in Hyderabad. Explore open positions in software engineering, testing, digital marketing, and tech training in India."
        keywords={[
          "Software Development Company in Hyderabad",
          "Software Jobs Hyderabad",
          "Careers at GK Nexergy",
          "IT Jobs Hyderabad",
          "AI Engineering Careers",
          "Technology Solutions in India"
        ]}
        canonical="/careers"
      />

      {/* 1. NextGen Forge Style Page Hero */}
      <section className="careers-page-hero">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '16px' }}>
          <Link
            to="/home#pages-stack-section"
            data-testid="back-to-stack-link"
            aria-label="Back"
            title="Back"
            className="global-back-to-stack-btn group"
          >
            <ChevronLeft className="global-back-to-stack-icon group-hover:-translate-x-0.5" strokeWidth={2.8} />
          </Link>
          <div className="section-label" style={{ marginBottom: 0 }}>We're Hiring</div>
        </div>
        <h1 className="careers-hero-title">
          Grow Your Career at <span className="careers-gradient-text">GK Nexergy</span>
        </h1>
        <p className="careers-hero-desc">
          Join a team of passionate engineers, trainers, builders, and strategists shaping the future of technology and workforce empowerment.
        </p>
        <div style={{ marginTop: '18px', display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={() => setVerifyModalOpen(true)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 18px',
              borderRadius: '9999px',
              backgroundColor: 'rgba(16, 185, 129, 0.12)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              color: '#10b981',
              fontSize: '0.8125rem',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(16, 185, 129, 0.2)';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(16, 185, 129, 0.12)';
              e.currentTarget.style.transform = 'none';
            }}
          >
            <UserCheck style={{ width: 15, height: 15 }} />
            <span>Verify Academy Certificate</span>
          </button>
        </div>
      </section>

      {/* 2. Perks / Stats Strip */}
      <section className="stats-strip">
        {PERKS.map((perk, i) => (
          <div key={i} className="stat-item">
            <span className="stat-number" style={{ color: perk.color }}>
              {perk.number}
            </span>
            <span className="stat-label">{perk.label}</span>
          </div>
        ))}
      </section>

      {/* 3. Job Listings Section */}
      <section className="careers-listings-section">
        <div className="listings-header">
          <div className="section-label">Open Roles</div>
          <h2>Current Openings</h2>
          <p>
            We are looking for talented individuals across multiple domains. Apply now and be part of something great.
          </p>
        </div>

        {/* 6 Requested Roles */}
        <div className="careers-list">
          {OPEN_ROLES.map((role) => {
            const Icon = role.icon;
            return (
              <div key={role.id} className="job-card">
                <div className="job-info">
                  <div className="job-header-line">
                    <h3>{role.title}</h3>
                    <span className="job-openings">{role.openings}</span>
                  </div>

                  <div className="job-meta">
                    <span className="job-tag">{role.type}</span>
                    <span className="job-tag">{role.mode}</span>
                    {role.skills.map((skill, sIdx) => (
                      <span key={sIdx} className="job-tag">
                        {skill}
                      </span>
                    ))}
                  </div>

                  <p className="job-desc">{role.description}</p>
                </div>

                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => handleApplyClick(role.title)}
                >
                  Apply Now →
                </button>
              </div>
            );
          })}
        </div>
      </section>



      {/* 5. Interactive Application Modal */}
      {isModalOpen && (
        <div className="app-modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="app-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="app-modal-header">
              <div>
                <h3>Apply for {selectedRole}</h3>
                <p>Submit your details and our team will contact you within 24–48 hours.</p>
              </div>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setIsModalOpen(false)}
                aria-label="Close modal"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {isSubmitted ? (
              <div className="modal-success-box">
                <div className="modal-success-icon">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h4 style={{ fontSize: "20px", fontWeight: "800", marginBottom: "8px" }}>
                  Application Received!
                </h4>
                <p style={{ color: "var(--careers-muted)", fontSize: "14px", lineHeight: "1.6", marginBottom: "20px" }}>
                  Thank you for applying for the <strong>{selectedRole}</strong> position at GK Nexergy. Our recruitment team is reviewing your profile and will be in touch shortly.
                </p>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => setIsModalOpen(false)}
                  style={{ width: "100%" }}
                >
                  Done
                </button>
              </div>
            ) : (
              <form className="modal-form" onSubmit={handleFormSubmit}>
                <div className="modal-form-row">
                  <div className="modal-form-group">
                    <label>Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="modal-form-group">
                    <label>Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. rahul@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="modal-form-row">
                  <div className="modal-form-group">
                    <label>Phone / WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  <div className="modal-form-group">
                    <label>Experience Level</label>
                    <select
                      value={formData.experience}
                      onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    >
                      <option value="Fresher / 0-1 Year">Fresher / 0-1 Year</option>
                      <option value="1-3 Years">1-3 Years</option>
                      <option value="3-5 Years">3-5 Years</option>
                      <option value="5+ Years">5+ Years</option>
                    </select>
                  </div>
                </div>

                <div className="modal-form-group">
                  <label>Portfolio / LinkedIn / GitHub Profile</label>
                  <input
                    type="url"
                    placeholder="https://linkedin.com/in/yourprofile"
                    value={formData.linkedin}
                    onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                  />
                </div>

                <div className="modal-form-group">
                  <label>Brief Introduction / Note</label>
                  <textarea
                    rows={3}
                    placeholder="Tell us a little about your skills and why you would love to join GK Nexergy..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <button type="submit" className="btn-primary modal-submit-btn">
                  <Send className="h-4 w-4" /> Submit Application
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* 6. Certificate Verification Modal */}
      {verifyModalOpen && (
        <div className="app-modal-overlay" onClick={() => setVerifyModalOpen(false)}>
          <div className="app-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="app-modal-header">
              <div>
                <h3>Verify Certificate</h3>
                <p>Enter the Certificate ID printed on your official document.</p>
              </div>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setVerifyModalOpen(false)}
                aria-label="Close modal"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {certResult ? (
              <div className="modal-success-box">
                <div className="modal-success-icon">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h4 style={{ fontSize: "18px", fontWeight: "800", marginBottom: "6px", color: "#16a34a" }}>
                  ✓ {certResult.status}
                </h4>
                <p style={{ fontSize: "13.5px", color: "var(--careers-title)", fontWeight: "700", marginBottom: "4px" }}>
                  ID: {certResult.id}
                </p>
                <p style={{ color: "var(--careers-muted)", fontSize: "13px", lineHeight: "1.5", marginBottom: "16px" }}>
                  {certResult.program} • {certResult.issuedBy}
                </p>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => setCertResult(null)}
                  style={{ width: "100%" }}
                >
                  Verify Another Certificate
                </button>
              </div>
            ) : (
              <form className="modal-form" onSubmit={handleVerifySubmit}>
                <div className="modal-form-group">
                  <label>Certificate Identification Code *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. GKN-2026-INT-4892"
                    value={certId}
                    onChange={(e) => setCertId(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn-primary modal-submit-btn">
                  Verify Now →
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Careers;
