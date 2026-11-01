import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Phone,
  Mail,
  Briefcase,
  Building2,
  MessageCircle,
  Clock,
  MapPin,
  Globe,
  Zap,
  User,
  MessageSquare,
  Send,
  ChevronLeft,
} from "lucide-react";
import SEO from "../components/SEO";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setError("Please enter your name");
      return;
    }
    if (!formData.email.trim()) {
      setError("Please enter your email address");
      return;
    }
    if (!formData.message.trim()) {
      setError("Please enter your message");
      return;
    }
    setError("");

    const text = `*New Inquiry from Website*\n\n*Name:* ${formData.name.trim()}\n*Email:* ${formData.email.trim()}\n*Message:* ${formData.message.trim()}`;
    const whatsappUrl = `https://wa.me/919704585960?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  const contactSchema = [
    {
      "@type": "ContactPage",
      "@id": "https://gknexergy.com/contact#contactpage",
      "name": "Contact GK Nexergy",
      "description": "Contact GK Nexergy for custom software development, AI solutions, and IT consulting in Hyderabad, India.",
      "url": "https://gknexergy.com/contact"
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://gknexergy.com/#localbusiness",
      "name": "GK Nexergy",
      "image": "https://gknexergy.com/images/gklogo.png",
      "telephone": "+91-9704585960",
      "email": "contact@gknexergy.com",
      "priceRange": "$$",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Hyderabad",
        "addressRegion": "Telangana",
        "addressCountry": "IN"
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday"
        ],
        "opens": "09:00",
        "closes": "19:00"
      }
    }
  ];

  return (
    <div className="contact-page">
      <SEO
        title="Contact GK Nexergy | Software Development Company in Hyderabad"
        description="Get in touch with GK Nexergy's technology architects in Hyderabad. Inquire about custom software development, AI solutions for businesses, enterprise automation, and IT consulting services in India."
        keywords={[
          "Software Development Company in Hyderabad",
          "IT Consulting Services",
          "Technology Solutions in India",
          "Custom Software Development",
          "AI Solutions for Businesses",
          "Contact GK Nexergy"
        ]}
        canonical="/contact"
        schema={contactSchema}
      />

      {/* Hero */}
      <section className="contact-hero">
        <Link
          to="/home#pages-stack-section"
          data-testid="back-to-stack-link"
          aria-label="Back"
          title="Back"
          className="global-back-to-stack-btn group mb-3.5"
        >
          <ChevronLeft className="global-back-to-stack-icon group-hover:-translate-x-0.5" strokeWidth={2.8} />
        </Link>
        <h1>Let’s start a conversation.</h1>
        <p>Send us a direct WhatsApp message or choose from our channels below.</p>
      </section>

      {/* Contact Cards */}
      <section className="contact-cards-section">
        <div className="contact-card-grid">

          <article className="contact-card">
            <div className="card-top">
              <div className="card-icon blue">
                <Phone size={20} strokeWidth={2.2} />
              </div>
              <span className="card-eyebrow">Immediate Support</span>
            </div>
            <h3>Call or WhatsApp</h3>
            <p>
              Speak with our team about courses, mentorship, admissions, or the next step in your learning journey.
            </p>
            <div className="card-footer">
              <a href="tel:+919704585960" className="phone-link">
                +919704585960
              </a>
              <a
                href="https://wa.me/919704585960?text=Hi%2C%20I%20would%20like%20to%20know%20more%20about%20your%20courses%20and%20programs."
                target="_blank"
                rel="noopener noreferrer"
                className="whatsapp-btn group"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="17"
                  height="17"
                  fill="currentColor"
                  className="whatsapp-icon"
                  aria-hidden="true"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.888 9.885m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <span className="whatsapp-btn-text">WhatsApp</span>
              </a>
            </div>
          </article>

          <article className="contact-card">
            <div className="card-top">
              <div className="card-icon indigo">
                <Mail size={20} strokeWidth={2.2} />
              </div>
              <span className="card-eyebrow">General Inquiries</span>
            </div>
            <h3>Email us</h3>
            <p>
              For questions about programs, partnerships, college tie-ups, or any information you would like in writing.
            </p>
            <div className="card-footer">
              <a href="mailto:contact@gknexergy.com" className="email-link">
                contact@gknexergy.com
              </a>
            </div>
          </article>

        </div>
      </section>

      {/* WhatsApp Fast Contact Form */}
      <section className="contact-form-section">
        <div className="contact-form-container">
          <div className="contact-form-header">
            <div className="contact-form-badge">
              <MessageCircle size={15} />
              <span>DIRECT WHATSAPP INQUIRY</span>
            </div>
            <h2>Quick Inquiry Form</h2>
            <p>
              Fill out the form below to initiate an immediate chat with our team on WhatsApp.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="contact-whatsapp-form">
            {error && <div className="contact-form-error">{error}</div>}

            <div className="form-grid-2">
              <div className="form-group">
                <label htmlFor="contact-name">
                  Your Name <span className="req">*</span>
                </label>
                <div className="input-wrap">
                  <User size={18} className="input-icon" />
                  <input
                    id="contact-name"
                    type="text"
                    placeholder="e.g. Rahul Sharma"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="contact-email">
                  Email Address <span className="req">*</span>
                </label>
                <div className="input-wrap">
                  <Mail size={18} className="input-icon" />
                  <input
                    id="contact-email"
                    type="email"
                    placeholder="e.g. rahul@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="contact-message">
                Your Message <span className="req">*</span>
              </label>
              <div className="input-wrap textarea-wrap">
                <MessageSquare size={18} className="input-icon textarea-icon" />
                <textarea
                  id="contact-message"
                  rows="4"
                  placeholder="How can we help you? Describe your requirements, questions, or learning goals..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div className="form-action-row">
              <button type="submit" className="whatsapp-submit-btn">
                <MessageCircle size={19} />
                <span>Send via WhatsApp</span>
                <Send size={16} className="btn-send-arrow" />
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Response Hours */}
      <section className="response-hours-wrapper">
        <div className="response-hours-container">
          <div className="response-hours-glow" />

          <div className="response-hours-icon-circle">
            <Clock size={22} strokeWidth={2} />
          </div>

          <div className="response-hours-badge">
            <span className="response-hours-pulse" />
            RESPONSE HOURS & AVAILABILITY
          </div>

          <h2 className="response-hours-title">Monday – Saturday</h2>
          <p className="response-hours-time">9:00 AM – 7:00 PM IST</p>

          <div className="response-hours-meta-row">
            <div className="response-hours-pill">
              <MapPin size={13} />
              India Headquarters
            </div>
            <div className="response-hours-pill">
              <Globe size={13} />
              Worldwide Remote Support
            </div>
            <div className="response-hours-pill">
              <Zap size={13} />
              Fast Response Across Time Zones
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Contact;