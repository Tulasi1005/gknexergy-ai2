import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  Sparkles,
  BookOpen,
  Copy,
  Check,
  X,
  ArrowRight,
  ExternalLink,
  Clock,
  Compass,
  Lightbulb,
  CheckCircle2,
  Bot,
} from "lucide-react";
import { SOLUTIONS, COURSES } from "../../data/site";
import {
  translateText,
} from "../../utils/multilingualVoiceEngine";
import {
  getCurrentLanguage,
  SUPPORTED_LANGUAGES,
} from "../../utils/translator";
import { MULTILINGUAL_SUMMARIES } from "../../data/summarizerTranslations";

/**
 * Curated high-precision page summaries for all core routes.
 */
const ROUTE_SUMMARIES = {
  "/": {
    title: "GK Nexergy • Enterprise Engineering & Digital Growth Ecosystem",
    badge: "Enterprise Platform",
    readTime: "30 sec summary (vs 4 min read)",
    stats: "Engineering Pods • AI Workflows • Nexergy Academy • Marketing Retainers",
    targetAudience: "Startups, enterprises, scaling businesses & tech leaders",
    summary:
      "GK Nexergy unites full-stack enterprise software engineering, native/cross-platform mobile apps, Generative AI workflows, cloud architecture, Nexergy Academy talent acceleration, and results-driven digital marketing retainers under the philosophy: Train. Build. Transform.",
    highlights: [
      "Full-stack web & mobile app engineering with 100% intellectual property ownership and zero vendor lock-in.",
      "Dedicated autonomous agile pods delivering enterprise-grade code without agency overhead.",
      "Nexergy Academy bridging industry talent gaps in Cybersecurity, PostgreSQL, Python, and AI.",
      "Transparent Digital Marketing Packages (Starter, Growth, Premium) with on-site shoots and Meta/Google ads.",
    ],
    actionLabel: "Explore",
    actionRoute: "/home",
  },
  "/landing": {
    title: "GK Nexergy • Enterprise Engineering & Digital Growth Ecosystem",
    badge: "Enterprise Platform",
    readTime: "30 sec summary (vs 4 min read)",
    stats: "Engineering Pods • AI Workflows • Nexergy Academy • Marketing Retainers",
    targetAudience: "Startups, enterprises, scaling businesses & tech leaders",
    summary:
      "GK Nexergy unites full-stack enterprise software engineering, native/cross-platform mobile apps, Generative AI workflows, cloud architecture, Nexergy Academy talent acceleration, and results-driven digital marketing retainers under the philosophy: Train. Build. Transform.",
    highlights: [
      "Full-stack web & mobile app engineering with 100% intellectual property ownership and zero vendor lock-in.",
      "Dedicated autonomous agile pods delivering enterprise-grade code without agency overhead.",
      "Nexergy Academy bridging industry talent gaps in Cybersecurity, PostgreSQL, Python, and AI.",
      "Transparent Digital Marketing Packages (Starter, Growth, Premium) with on-site shoots and Meta/Google ads.",
    ],
    actionLabel: "Explore",
    actionRoute: "/home",
  },
  "/home": {
    title: "GK Nexergy • Enterprise Engineering Ecosystem",
    badge: "Platform Overview",
    readTime: "30 sec summary (vs 4 min read)",
    stats: "5 Core Solutions • 4 Academy Disciplines • 3 Marketing Retainers",
    targetAudience: "Startups, enterprises, scaling businesses & aspiring tech professionals",
    summary:
      "GK Nexergy unites enterprise software engineering, mobile app development, Generative AI workflows, and cloud architecture with hands-on talent incubation at Nexergy Academy under the philosophy: Train. Build. Transform.",
    highlights: [
      "Full-stack web & native/cross-platform mobile apps built with 100% client IP ownership.",
      "Dedicated autonomous agile pods delivering enterprise-grade code without agency overhead.",
      "Nexergy Academy bridging industry talent gaps in Cybersecurity, PostgreSQL, Python, and AI.",
      "Structured Digital Marketing Retainers (Starter, Growth, Premium) with on-site shoots and ads management.",
    ],
    actionLabel: "Pricing",
    actionRoute: "/pricing",
  },
  "/about": {
    title: "About GK Nexergy • Leadership & Philosophy",
    badge: "Company Story",
    readTime: "25 sec summary (vs 3 min read)",
    stats: "Andhra Pradesh HQ • 100% IP Guarantee • Dedicated Pods",
    targetAudience: "Prospective enterprise clients, partners, and engineering candidates",
    summary:
      "GK Nexergy is an enterprise engineering and talent acceleration hub dedicated to designing and building reliable software products, custom AI systems, and cloud infrastructure for businesses worldwide.",
    highlights: [
      "Operates under the guiding principle of 'Train. Build. Transform.'",
      "Guarantees 100% intellectual property ownership to clients with zero vendor lock-in.",
      "Employs autonomous delivery pods with lead architects, full-stack devs, and QA specialists.",
      "Direct consultation access with architectural discovery response within 10 minutes.",
    ],
    actionLabel: "Contact",
    actionRoute: "/contact",
  },
  "/company": {
    title: "About GK Nexergy • Leadership & Philosophy",
    badge: "Company Story",
    readTime: "25 sec summary (vs 3 min read)",
    stats: "Andhra Pradesh HQ • 100% IP Guarantee • Dedicated Pods",
    targetAudience: "Prospective enterprise clients, partners, and engineering candidates",
    summary:
      "GK Nexergy is an enterprise engineering and talent acceleration hub dedicated to designing and building reliable software products, custom AI systems, and cloud infrastructure for businesses worldwide.",
    highlights: [
      "Operates under the guiding principle of 'Train. Build. Transform.'",
      "Guarantees 100% intellectual property ownership to clients with zero vendor lock-in.",
      "Employs autonomous delivery pods with lead architects, full-stack devs, and QA specialists.",
      "Direct consultation access with architectural discovery response within 10 minutes.",
    ],
    actionLabel: "Contact",
    actionRoute: "/contact",
  },
  "/vision": {
    title: "Strategic Vision & Roadmap • GK Nexergy",
    badge: "Strategic Blueprint",
    readTime: "25 sec summary (vs 3 min read)",
    stats: "Global Reach • Ethical AI • Sustainable Scaling",
    targetAudience: "CTOs, business executives, innovators & tech leaders",
    summary:
      "GK Nexergy's strategic vision centers on democratizing enterprise-grade software engineering, cultivating world-class technology talent locally, and empowering businesses with ethical, transparent AI workflows.",
    highlights: [
      "Uncompromising client autonomy: you own every line of code, design, and schema.",
      "Merging high-level architectural innovation with practical, cost-effective delivery.",
      "Upskilling developers for the next frontier of AI, cybersecurity, and distributed cloud.",
      "Architectures engineered to handle scale seamlessly from day one.",
    ],
    actionLabel: "Explore",
    actionRoute: "/why-gk-nexergy",
  },
  "/why-gk-nexergy": {
    title: "Why Choose GK Nexergy • Core Differentiators",
    badge: "Competitive Advantage",
    readTime: "30 sec summary (vs 3.5 min read)",
    stats: "100% IP Ownership • No Agency Overhead • 30-Day Warranty",
    targetAudience: "Founders, product managers, and enterprise decision-makers",
    summary:
      "Unlike conventional agencies with bloated overhead and vendor lock-in, GK Nexergy delivers autonomous agile pods, direct architect engagement, complete code ownership, and guaranteed warranty support.",
    highlights: [
      "100% IP & Data Ownership: Full transfer of GitHub repos, credentials, and schemas.",
      "Dedicated Autonomous Pods: Cross-functional units delivering sprint-by-sprint velocity.",
      "Integrated Academy Pipeline: Immediate access to trained, specialized developer talent.",
      "Free 30-minute architectural consultation and 10-minute discovery response SLA.",
    ],
    actionLabel: "Pricing",
    actionRoute: "/pricing",
  },
  "/pricing": {
    title: "Digital Marketing Packages & Pricing • GK Nexergy",
    badge: "Transparent Retainers",
    readTime: "35 sec summary (vs 4 min read)",
    stats: "Starter • Growth (Most Popular) • Premium • Direct Ad Spend",
    targetAudience: "Small shops, local services, startups, retail stores, real estate & established brands",
    summary:
      "Comprehensive, results-driven digital marketing retainers covering social media management, static creatives, reels, on-site professional video shoots, and revenue-generating Meta & Google ads campaigns.",
    packages: [
      {
        name: "Starter",
        badge: "Small Business",
        posts: "8 Static / Mo",
        reels: "2 Reels / Mo",
        shoots: "On-Demand",
        ads: "Meta Ads (IG & FB)",
        bestFor: "Startups & Local Shops",
      },
      {
        name: "Growth",
        badge: "Most Popular",
        posts: "12 Static / Mo",
        reels: "4 Reels / Mo",
        shoots: "2 Visits / Mo",
        ads: "Meta Lead Gen & Remarketing",
        bestFor: "Growing Retail & Services",
      },
      {
        name: "Premium",
        badge: "Max Growth",
        posts: "20+ Static / Mo",
        reels: "8 Reels / Mo",
        shoots: "4 Visits / Mo",
        ads: "Meta & Google Ads Suite",
        bestFor: "Established Brands & Real Estate",
      },
    ],
    highlights: [
      "Starter Package: 8 static posts/mo (2/wk), 2 reels/mo, Instagram & Facebook management, Meta ads campaign setup, audience targeting, and monthly performance report.",
      "Growth Package (Most Popular): 12 static posts/mo (3/wk), 4 reels/mo, 2 on-site video shoot visits/mo, Meta ads (lead gen & remarketing), Google Business Profile & WhatsApp Business setup.",
      "Premium Package: 20+ static posts/mo (5+/wk), 8 reels/mo, 4 on-site video shoot visits/mo, Meta & Google Ads (Search, Display, YouTube), Local SEO & bi-weekly reporting.",
      "100% Transparent Ad Spend: Clients pay ad budgets directly to Meta and Google (recommended ₹5k–₹5L+/mo benchmarks) with zero agency commission or hidden budget markups.",
      "Why Work With Us: Result-focused execution, data-driven optimization, professional on-site video production, transparent reporting, and dedicated support.",
    ],
    actionLabel: "Contact Us",
    actionRoute: "/contact",
  },
  "/solutions": {
    title: "Enterprise Solutions & Engineering Capabilities",
    badge: "Solutions Catalog",
    readTime: "30 sec summary (vs 4 min read)",
    stats: "6 Specialized Disciplines • Cloud Native • AI Workflows",
    targetAudience: "Companies seeking reliable software, mobile apps, or digital transformation",
    summary:
      "GK Nexergy delivers end-to-end technology solutions across custom software development, mobile apps, digital transformation, AI & automation, data analytics, and digital growth retainers.",
    highlights: [
      "Software Engineering: Robust web applications, APIs, and scalable distributed architectures.",
      "Mobile Applications: High-performance iOS and Android apps with native-feel fluid UX.",
      "AI & Automation: Enterprise RAG knowledge engines, automated workflows, and predictive analytics.",
      "Digital Growth: Structured digital marketing retainers (Starter, Growth, Premium) with on-site shoots and ads.",
    ],
    actionLabel: "Explore",
    actionRoute: "/solutions/software-development",
  },
  "/solutions/digital-growth": {
    title: "Digital Growth & Marketing Packages • GK Nexergy",
    badge: "Packages & Pricing",
    readTime: "35 sec summary (vs 4 min read)",
    stats: "Starter • Growth (Most Popular) • Premium • Transparent Ad Spend",
    targetAudience: "Small shops, local services, startups, retail stores, real estate & scaling brands",
    summary:
      "Accelerate your market presence with structured digital marketing retainers — combining omnichannel social media management, branded creatives, viral reels, on-site video shoots, and high-ROI Meta & Google ads campaigns.",
    packages: [
      {
        name: "Starter",
        badge: "Small Business",
        posts: "8 Static / Mo",
        reels: "2 Reels / Mo",
        shoots: "On-Demand",
        ads: "Meta Ads (IG & FB)",
        bestFor: "Startups & Local Shops",
      },
      {
        name: "Growth",
        badge: "Most Popular",
        posts: "12 Static / Mo",
        reels: "4 Reels / Mo",
        shoots: "2 Visits / Mo",
        ads: "Meta Lead Gen & Remarketing",
        bestFor: "Growing Retail & Services",
      },
      {
        name: "Premium",
        badge: "Max Growth",
        posts: "20+ Static / Mo",
        reels: "8 Reels / Mo",
        shoots: "4 Visits / Mo",
        ads: "Meta & Google Ads Suite",
        bestFor: "Established Brands & Real Estate",
      },
    ],
    highlights: [
      "Starter Plan: 8 static posts/mo (2/wk), 2 reels/mo, IG & FB management, Meta ads setup, audience targeting, and monthly performance report.",
      "Growth Plan (Most Popular): 12 static posts/mo (3/wk), 4 reels/mo, 2 on-site video shoot visits/mo, Meta lead generation & remarketing, Google Business & WhatsApp setup.",
      "Premium Plan: 20+ static posts/mo (5+/wk), 8 reels/mo, 4 on-site video shoot visits/mo, Meta & Google Ads (Search, Display, YouTube), Local SEO & bi-weekly reviews.",
      "Direct Ad Spend Transparency: Clients pay ad budgets directly to Meta and Google (₹5k–₹5L+/mo benchmarks) with zero agency commission or budget markup.",
      "Full-Funnel Capabilities: Brand awareness, creative graphic design, on-site video shoots, conversion copywriting, and multi-channel attribution.",
    ],
    actionLabel: "View Pricing",
    actionRoute: "/pricing",
  },
  "/solutions/software-development": {
    title: "Software Engineering & Custom Platforms • GK Nexergy",
    badge: "Enterprise Practice",
    readTime: "30 sec summary",
    stats: "Workflow: Discover → Design → Develop → Deploy → Improve",
    targetAudience: "Enterprises, product companies, and startups needing bespoke software",
    summary:
      "We design and engineer robust web applications, custom enterprise platforms, and microservices architectures built specifically around your business workflows.",
    highlights: [
      "Full-stack web applications built with modern frameworks (React, Next.js, Node.js, Python, PostgreSQL).",
      "100% intellectual property & complete source code transfer with zero vendor lock-in.",
      "Autonomous agile delivery pods ensuring sprint-by-sprint velocity, clean architecture, and rigorous QA.",
      "Cloud-native deployment, automated CI/CD pipelines, and enterprise-grade security standards.",
    ],
    actionLabel: "Inquire",
    actionRoute: "/contact",
  },
  "/solutions/mobile-development": {
    title: "Mobile Application Development • GK Nexergy",
    badge: "Enterprise Practice",
    readTime: "30 sec summary",
    stats: "Workflow: Discover → Design → Develop → Deploy → Improve",
    targetAudience: "Enterprises and consumer brands building high-performance mobile apps",
    summary:
      "From customer-facing apps to mission-critical field operations tools, we engineer mobile experiences that are fast, intuitive, and built for real-world reliability.",
    highlights: [
      "Native iOS (Swift), Android (Kotlin), and cross-platform (Flutter, React Native) mobile applications.",
      "Fluid 60fps gesture-driven UX designed around real user behavior and offline resiliency.",
      "Enterprise API integration, real-time push notifications, biometric auth, and secure offline storage.",
      "End-to-end release lifecycle: App Store and Play Store compliance, review management, and ongoing maintenance.",
    ],
    actionLabel: "Inquire",
    actionRoute: "/contact",
  },
  "/solutions/digital-transformation": {
    title: "Digital Transformation & Cloud Modernization • GK Nexergy",
    badge: "Enterprise Practice",
    readTime: "30 sec summary",
    stats: "Workflow: Manual → Connected → Automated → Intelligent",
    targetAudience: "Traditional businesses and enterprises modernizing legacy operations",
    summary:
      "We help organizations transition from manual, paper-heavy workflows to modern, cloud-connected operating models at a sustainable, manageable pace.",
    highlights: [
      "Systematic modernization of monolithic legacy systems into secure, modular cloud architectures.",
      "End-to-end workflow digitization eliminating paper bottlenecks and operational latency.",
      "Deep systems integration bridging legacy databases, ERPs, CRMs, and modern APIs.",
      "Change enablement roadmaps minimizing operational disruption and accelerating team adoption.",
    ],
    actionLabel: "Inquire",
    actionRoute: "/contact",
  },
  "/solutions/ai-automation": {
    title: "Enterprise AI & Workflow Automation • GK Nexergy",
    badge: "Enterprise Practice",
    readTime: "30 sec summary",
    stats: "Workflow: Data → Model → Automate → Assist → Learn",
    targetAudience: "Organizations seeking intelligent automation, custom LLMs & predictive workflows",
    summary:
      "We apply Artificial Intelligence where it drives measurable ROI — building enterprise RAG knowledge bases, automated decision support, and intelligent business workflows.",
    highlights: [
      "Production Generative AI workflows, domain-adapted LLMs, and enterprise RAG retrieval engines.",
      "Automated document parsing, intelligent customer response bots, and operational task automation.",
      "Privacy-first, isolated architectures keeping proprietary business data safe and compliant.",
      "Continuous learning loops and human-in-the-loop oversight to ensure high output fidelity.",
    ],
    actionLabel: "Inquire",
    actionRoute: "/contact",
  },
  "/solutions/data-analytics": {
    title: "Data Engineering & Business Intelligence • GK Nexergy",
    badge: "Enterprise Practice",
    readTime: "30 sec summary",
    stats: "Workflow: Data → Insight → Decision → Action",
    targetAudience: "Executives and managers seeking clear, real-time visibility into business data",
    summary:
      "We turn fragmented business records into actionable executive intelligence — from database performance tuning to interactive BI reporting dashboards.",
    highlights: [
      "High-performance enterprise database architecture, schema normalization, and indexing.",
      "Real-time Business Intelligence (BI) dashboards providing immediate visibility into KPIs.",
      "Automated ETL data pipelines extracting and harmonizing disparate data sources cleanly.",
      "Predictive modeling helping leadership forecast market trends, demand, and resource utilization.",
    ],
    actionLabel: "Inquire",
    actionRoute: "/contact",
  },
  "/academy": {
    title: "Nexergy Academy • Practical Tech Acceleration",
    badge: "Talent Ecosystem",
    readTime: "30 sec summary (vs 3.5 min read)",
    stats: "4 Specializations • 100% Hands-On Labs • Placement Support",
    targetAudience: "Students, engineering graduates, career transitioners & developers",
    summary:
      "Nexergy Academy bridges the gap between collegiate education and actual industry production standards through intensive, mentor-led programs in Cybersecurity, PostgreSQL, Cloud/Python, and AI Marketing.",
    highlights: [
      "100% project-based learning focused on production tools, Git workflows, and live labs.",
      "Specialist tracks in Cyber Security & Ethical Hacking and PostgreSQL Database Mastery.",
      "Direct talent integration into live GK Nexergy enterprise engineering projects.",
      "Dedicated career coaching, resume workshops, and interview preparation.",
    ],
    actionLabel: "Courses",
    actionRoute: "/academy/courses",
  },
  "/academy/courses": {
    title: "Academy Course Catalog & Curriculums • Nexergy Academy",
    badge: "Course Directory",
    readTime: "25 sec summary (vs 3 min read)",
    stats: "Cyber Security • PostgreSQL • Foundation Program • AI Marketing",
    targetAudience: "Aspiring developers, ethical hackers, and database engineers",
    summary:
      "Browse Nexergy Academy's flagship technical curriculums designed to give you industry-grade skills and a competitive edge in modern tech hiring.",
    highlights: [
      "Cyber Security & Ethical Hacking: Network defense, vulnerability analysis, and pen testing.",
      "Databases In-Depth: Schema design, query optimization, indexing, and enterprise PostgreSQL.",
      "Foundation Program: Python programming, cloud fundamentals (AWS/Azure), and clean code.",
      "AI Tools & Digital Marketing: Automated growth engines, AI-assisted content, and analytics.",
    ],
    actionLabel: "Explore",
    actionRoute: "/academy/cyber-security",
  },
  "/academy/cyber-security": {
    title: "Cyber Security & Ethical Hacking • Nexergy Academy",
    badge: "Specialized Academy Track",
    readTime: "30 sec summary",
    stats: "Category: Security • 100% Practical Labs • Hands-On Attack Surfaces",
    targetAudience: "Students, graduates, and IT professionals aiming to enter cybersecurity",
    summary:
      "Learn to think like an attacker and defend like a seasoned professional through intensive hands-on lab environments, network defense, and ethical hacking methodology.",
    highlights: [
      "Hands-on ethical hacking methodology, reconnaissance, and penetration testing.",
      "Network & system security, firewalls, Wireshark packet analysis, and Nmap scanning.",
      "Web application vulnerability assessment (OWASP Top 10, SQLi, XSS, CSRF).",
      "Security tooling, defensive hardening, and incident response preparation.",
    ],
    actionLabel: "Enroll",
    actionRoute: "/contact",
  },
  "/academy/ai-digital-marketing": {
    title: "AI Tools & Digital Marketing • Nexergy Academy",
    badge: "Specialized Academy Track",
    readTime: "30 sec summary",
    stats: "Category: AI & Growth • 100% Practical Labs • Live Campaigns",
    targetAudience: "Marketers, entrepreneurs, students, and growth professionals",
    summary:
      "Master modern AI tools to accelerate content creation, automate campaign workflows, and run high-ROI digital marketing strategies across Meta and Google.",
    highlights: [
      "Modern AI tools for high-speed copywriting, visual asset design, and campaign scripting.",
      "Digital marketing fundamentals, audience targeting, and multi-channel funnel strategy.",
      "AI-assisted content production, viral short-form video scripting, and prompt engineering.",
      "Practical campaign execution, A/B testing, and growth analytics interpretation.",
    ],
    actionLabel: "Enroll",
    actionRoute: "/contact",
  },
  "/academy/databases": {
    title: "Databases In-Depth & Enterprise Architecture • Nexergy Academy",
    badge: "Specialized Academy Track",
    readTime: "30 sec summary",
    stats: "Category: Data • 100% Practical Labs • Enterprise PostgreSQL",
    targetAudience: "Developers, database administrators, and backend engineers",
    summary:
      "Master the data foundation every high-scale enterprise application depends on — from data modeling and query optimization to high availability and backup strategies.",
    highlights: [
      "Relational database design, normalization, ACID properties, and transaction semantics.",
      "Advanced SQL querying, complex joins, subqueries, and window functions.",
      "Query execution planning, indexing strategies (B-Tree, GIN, GiST), and performance tuning.",
      "High availability, replication, connection pooling, and disaster recovery.",
    ],
    actionLabel: "Enroll",
    actionRoute: "/contact",
  },
  "/academy/foundation-program": {
    title: "Foundation Program (Python, DB, Cloud, AI) • Nexergy Academy",
    badge: "Specialized Academy Track",
    readTime: "30 sec summary",
    stats: "Category: Foundation • 4 Core Tech Pillars • Mentor-Led Labs",
    targetAudience: "Beginners, career transitioners, and students building strong core tech skills",
    summary:
      "A structured 4-pillar learning journey across the foundational technologies of modern software — Python, Databases, Cloud (AWS/Azure), and AI Fundamentals.",
    highlights: [
      "Python programming fundamentals, data structures, algorithms, and clean code.",
      "Enterprise database essentials, relational modeling, and SQL querying.",
      "Cloud computing fundamentals on AWS/Azure, virtual machines, and deployment basics.",
      "AI fundamentals, understanding machine learning workflows, and practical applications.",
    ],
    actionLabel: "Enroll",
    actionRoute: "/contact",
  },
  "/projects": {
    title: "Delivered Client Projects & Case Studies • GK Nexergy",
    badge: "Portfolio & Impact",
    readTime: "30 sec summary (vs 3.5 min read)",
    stats: "Production Web Apps • Mobile Platforms • AI Workflows",
    targetAudience: "Enterprises assessing technical capability and delivery reliability",
    summary:
      "Detailed architectural case studies highlighting how GK Nexergy designed, built, and deployed robust solutions across healthcare, fintech, supply chain, and digital commerce.",
    highlights: [
      "Proven track record of on-time, on-budget delivery with zero vendor lock-in.",
      "Measurable business outcomes: reduced page latency, streamlined workflows, and revenue growth.",
      "Production cloud deployments across AWS, Google Cloud, and modern serverless platforms.",
      "Architecture case breakdowns detailing tech stacks, challenges, and solutions.",
    ],
    actionLabel: "Contact",
    actionRoute: "/contact",
  },
  "/careers": {
    title: "Careers at GK Nexergy • Build the Future With Us",
    badge: "Open Opportunities",
    readTime: "25 sec summary (vs 3 min read)",
    stats: "Agile Pods • Fast-Track Growth • Remote / Hybrid",
    targetAudience: "Software engineers, mobile devs, designers, and AI specialists",
    summary:
      "Join autonomous engineering pods working on challenging enterprise software, modern mobile apps, and cutting-edge AI systems in an empowering, merit-based culture.",
    highlights: [
      "Work in focused, collaborative squads where every engineer influences technical decisions.",
      "Culture emphasizing clean code, continuous learning, and architectural excellence.",
      "Clear advancement tracks with competitive compensation and skill mentorship.",
      "Opportunities across full-stack engineering, React, Node.js, Python, and cloud DevOps.",
    ],
    actionLabel: "Apply",
    actionRoute: "/contact",
  },
  "/industries": {
    title: "Industries Served & Vertical Solutions • GK Nexergy",
    badge: "Industry Focus",
    readTime: "25 sec summary (vs 3 min read)",
    stats: "Fintech • Healthcare • Logistics • E-Commerce • EdTech",
    targetAudience: "Industry leaders requiring compliant, scalable tech architectures",
    summary:
      "Custom software engineering and digital transformation roadmaps tailored specifically to the regulatory, latency, and operational requirements of diverse industries.",
    highlights: [
      "Healthcare: HIPAA-compliant data pipelines, patient portals, and telehealth tools.",
      "Fintech: High-security payment interfaces, audit trails, and financial dashboards.",
      "Logistics: Real-time asset tracking, automated routing, and warehouse dispatch systems.",
      "Retail & Commerce: Omnichannel shopping, lightning-fast search, and automated inventory.",
    ],
    actionLabel: "Contact",
    actionRoute: "/contact",
  },
  "/contact": {
    title: "Contact GK Nexergy • Connect With Our Engineers",
    badge: "Direct Contact",
    readTime: "20 sec summary (vs 2 min read)",
    stats: "10-Min Response SLA • Phone +91 9704585960 • Andhra Pradesh, India",
    targetAudience: "Clients, prospective students, partners, and enterprise inquiries",
    summary:
      "Get in touch directly with GK Nexergy's lead architects and team for project discovery, pricing inquiries, academy admissions, or general assistance.",
    highlights: [
      "Direct phone & WhatsApp: +91 9704585960 | Email: contact@gknexergy.com.",
      "Headquarters: Andhra Pradesh, India — serving clients globally.",
      "Discovery consultation response within 10 minutes during business hours.",
      "Free initial 30-minute architectural and project feasibility advisory session.",
    ],
    actionLabel: "WhatsApp",
    actionRoute: "https://wa.me/919704585960",
    isExternal: true,
  },
};

export const PageSummarizer = ({
  theme = "light",
  isOpen: controlledIsOpen,
  onClose,
  onOpen,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isControlled = controlledIsOpen !== undefined;
  const isOpen = isControlled ? controlledIsOpen : internalIsOpen;

  const setIsOpen = useCallback(
    (val) => {
      const nextVal = typeof val === "function" ? val(isOpen) : val;
      if (isControlled) {
        if (nextVal) {
          onOpen?.();
        } else {
          onClose?.();
        }
      } else {
        setInternalIsOpen(nextVal);
      }
    },
    [isControlled, isOpen, onOpen, onClose]
  );

  const [copied, setCopied] = useState(false);
  const [fontScale, setFontScale] = useState(1);
  const isDark = theme === "dark";

  // Real-time language synchronization
  const [currentLang, setCurrentLang] = useState(() => getCurrentLanguage());
  const [translatedData, setTranslatedData] = useState(null);
  const [isTranslating, setIsTranslating] = useState(false);

  useEffect(() => {
    const handleLangChange = (e) => {
      const code = e?.detail || getCurrentLanguage();
      setCurrentLang(code);
    };
    window.addEventListener("gk-language-changed", handleLangChange);
    window.addEventListener("storage", handleLangChange);
    return () => {
      window.removeEventListener("gk-language-changed", handleLangChange);
      window.removeEventListener("storage", handleLangChange);
    };
  }, []);

  // Update language whenever modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentLang(getCurrentLanguage());
    }
  }, [isOpen]);

  // Lock body scroll and pause Lenis smooth scroll while modal is open
  useEffect(() => {
    if (!isOpen) return;

    // 1. Pause Lenis smooth scrolling so wheel/touch gestures cannot scroll background
    if (window.__lenis) {
      try {
        window.__lenis.stop();
      } catch (err) {}
    }

    // 2. Lock body and html scroll
    const prevBodyOverflow = document.body.style.overflow;
    const prevHtmlOverflow = document.documentElement.style.overflow;
    const prevBodyPaddingRight = document.body.style.paddingRight;

    // Compensate for desktop scrollbar shift to prevent background layout jumping
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = prevBodyOverflow;
      document.documentElement.style.overflow = prevHtmlOverflow;
      document.body.style.paddingRight = prevBodyPaddingRight;

      if (window.__lenis) {
        try {
          window.__lenis.start();
        } catch (err) {}
      }
    };
  }, [isOpen]);

  // Derive dynamic summary based on route, solutions slug, or courses slug
  const pageData = useMemo(() => {
    const path = location.pathname.toLowerCase().replace(/\/$/, "") || "/";

    // 1. Check exact route match
    if (ROUTE_SUMMARIES[path]) {
      return ROUTE_SUMMARIES[path];
    }

    // 2. Check Solution Detail: /solutions/:slug
    if (path.startsWith("/solutions/")) {
      const slug = path.replace("/solutions/", "");
      const solution = SOLUTIONS.find((s) => s.slug === slug);
      if (solution) {
        return {
          title: `${solution.title} • GK Nexergy Enterprise Solution`,
          badge: "Enterprise Practice",
          readTime: "30 sec summary",
          stats: `Workflow: ${solution.flow?.join(" → ") || "Discover → Deliver"}`,
          targetAudience: "Enterprises seeking scalable, custom digital capabilities",
          summary: solution.description || solution.tagline,
          highlights: solution.features || [
            "Custom-engineered architecture built around your business workflow.",
            "100% intellectual property and source code ownership.",
            "Autonomous agile pod delivery with sprint-based milestones.",
            "Enterprise-grade reliability and security standards.",
          ],
          actionLabel: "Inquire",
          actionRoute: "/contact",
        };
      }
    }

    // 3. Check Course Detail: /academy/:slug
    if (path.startsWith("/academy/")) {
      const slug = path.replace("/academy/", "");
      const course = COURSES.find((c) => c.slug === slug);
      if (course) {
        return {
          title: `${course.title} • ${course.subtitle || "Nexergy Academy"}`,
          badge: "Specialized Academy Track",
          readTime: "30 sec summary",
          stats: `Category: ${course.category || "Technology"} • 100% Practical Labs`,
          targetAudience: "Aspiring developers, career shifters & professionals",
          summary: course.description || course.tagline,
          highlights: course.topics?.slice(0, 5) || [
            "Intensive hands-on labs with real-world attack and defense surfaces.",
            "Direct mentorship from senior engineering practitioners.",
            "Production tools and portfolio-grade project building.",
            "Career placement guidance and interview readiness.",
          ],
          actionLabel: "Enroll",
          actionRoute: "/contact",
        };
      }
    }

    // 4. Fallback DOM extraction
    const heading = document.querySelector("h1")?.innerText || "GK Nexergy";
    const subtext = document.querySelector("p")?.innerText || "";
    return {
      title: `${heading} • GK Nexergy`,
      badge: "Page Overview",
      readTime: "20 sec summary",
      stats: "Enterprise Engineering & Talent Acceleration",
      targetAudience: "Businesses, innovators & tech professionals",
      summary: subtext || "Explore GK Nexergy's digital solutions, architectural capabilities, and academy courses.",
      highlights: [
        "100% Client Intellectual Property & code ownership.",
        "Autonomous agile delivery pods with direct architect access.",
        "Industry-aligned technology stack built for scale.",
        "Fast 10-minute discovery response SLA.",
      ],
      actionLabel: "Contact",
      actionRoute: "/contact",
    };
  }, [location.pathname]);

  // Compute translated data whenever language, route, or pageData changes
  useEffect(() => {
    if (!pageData) return;
    const path = location.pathname.toLowerCase().replace(/\/$/, "") || "/";
    const cleanLang = (currentLang || "en").split("-")[0];

    if (cleanLang === "en") {
      setTranslatedData(null);
      return;
    }

    // 1. Check curated high-fidelity multilingual summaries
    if (MULTILINGUAL_SUMMARIES[cleanLang]?.[path]) {
      setTranslatedData({
        ...pageData,
        ...MULTILINGUAL_SUMMARIES[cleanLang][path],
        lang: cleanLang,
      });
      return;
    }

    // 2. Dynamic translation via translateText
    let isCancelled = false;
    setIsTranslating(true);

    Promise.all([
      translateText(pageData.title, cleanLang, "en"),
      translateText(pageData.summary, cleanLang, "en"),
      Promise.all(
        (pageData.highlights || []).map((h) => translateText(h, cleanLang, "en"))
      ),
      translateText(pageData.badge || "Overview", cleanLang, "en"),
    ])
      .then(([tTitle, tSummary, tHighlights, tBadge]) => {
        if (!isCancelled) {
          setTranslatedData({
            ...pageData,
            title: tTitle.translatedText || pageData.title,
            summary: tSummary.translatedText || pageData.summary,
            highlights: tHighlights.map((th, i) => th.translatedText || pageData.highlights[i]),
            badge: tBadge.translatedText || pageData.badge,
            lang: cleanLang,
          });
          setIsTranslating(false);
        }
      })
      .catch((err) => {
        console.warn("Summarizer auto-translation error:", err);
        if (!isCancelled) setIsTranslating(false);
      });

    return () => {
      isCancelled = true;
    };
  }, [location.pathname, pageData, currentLang]);

  const displayData = (currentLang !== "en" && translatedData) ? translatedData : pageData;

  const currentLangObj = useMemo(() => {
    const clean = (currentLang || "en").split("-")[0];
    return SUPPORTED_LANGUAGES.find((l) => l.code === currentLang || l.code === clean) || SUPPORTED_LANGUAGES[0];
  }, [currentLang]);

  // Listen for global custom trigger event (e.g. from Navbar)
  useEffect(() => {
    const handleTrigger = () => {
      setIsOpen(true);
    };
    window.addEventListener("open-page-summarizer", handleTrigger);
    return () => window.removeEventListener("open-page-summarizer", handleTrigger);
  }, []);

  // Keyboard shortcut: Alt + S to toggle Page Summarizer, Escape to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.altKey && (e.key === "s" || e.key === "S")) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === "Escape" && isOpen) {
        e.preventDefault();
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, setIsOpen]);

// Fallback clipboard copy for legacy browsers or insecure contexts
const fallbackCopyText = (text) => {
  try {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-9999px";
    textArea.style.top = "-9999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
  } catch (e) {
    // ignore
  }
};

  // Copy summary to clipboard
  const handleCopySummary = useCallback(() => {
    if (!displayData) return;
    let packagesText = "";
    if (displayData.packages?.length) {
      packagesText = "\n\nPackages & Plans:\n" +
        displayData.packages
          .map((p) => `• ${p.name} (${p.badge}): ${p.posts} | ${p.reels} | ${p.shoots} | ${p.ads}`)
          .join("\n");
    }

    const textToCopy = `${displayData.title}
Badge: ${displayData.badge}
Stats: ${displayData.stats}${packagesText}

Executive Summary:
${displayData.summary}

Key Takeaways:
${displayData.highlights?.map((h) => `• ${h}`).join("\n")}

Who this is for:
${displayData.targetAudience || "Enterprises & growing businesses"}

Read more at GK Nexergy: ${typeof window !== "undefined" ? window.location.href : "https://gknexergy.com"}`;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(textToCopy).catch(() => {
        fallbackCopyText(textToCopy);
      });
    } else {
      fallbackCopyText(textToCopy);
    }

    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  }, [displayData]);

  // Ask AI Assistant about this page
  const handleAskAI = useCallback(() => {
    setIsOpen(false);
    // Dispatch global event to open AI Chatbot
    window.dispatchEvent(new CustomEvent("open-gk-chatbot"));
  }, []);

  const fontStack = "'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

  return (
    <div style={{ fontFamily: fontStack }}>
      {/* ========================================================= */}
      {/* AI PAGE SUMMARIZER MODAL (Triggered via Navbar / Alt+S)   */}
      {/* ========================================================= */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Ambient Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsOpen(false)}
              data-lenis-prevent="true"
              onWheel={(e) => {
                e.stopPropagation();
              }}
              onTouchMove={(e) => {
                e.stopPropagation();
              }}
              style={{
                position: "fixed",
                inset: 0,
                backgroundColor: isDark ? "rgba(3, 7, 18, 0.7)" : "rgba(15, 23, 42, 0.4)",
                backdropFilter: "blur(5px)",
                zIndex: 99999988,
                overscrollBehavior: "contain",
                touchAction: "none",
              }}
            />

            {/* Summarizer Center Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, x: "-50%", y: "-47%" }}
              animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
              exit={{ opacity: 0, scale: 0.94, x: "-50%", y: "-47%" }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              data-testid="page-summarizer-modal"
              data-lenis-prevent="true"
              role="dialog"
              aria-label="GK Nexergy AI Page Summary"
              onWheel={(e) => e.stopPropagation()}
              style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                zIndex: 99999989,
                width: "min(520px, calc(100vw - 16px))",
                maxHeight: "min(720px, calc(100vh - 30px))",
                borderRadius: "18px",
                backgroundColor: isDark ? "#090e18" : "#ffffff",
                border: isDark ? "1px solid rgba(255, 255, 255, 0.12)" : "1px solid #e2e8f0",
                boxShadow: isDark
                  ? "0 25px 70px -10px rgba(0, 0, 0, 0.9), 0 0 1px 1px rgba(255, 255, 255, 0.08)"
                  : "0 25px 60px -12px rgba(15, 23, 42, 0.25), 0 0 1px 1px rgba(0, 0, 0, 0.05)",
                color: isDark ? "#f8fafc" : "#090e18",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                overscrollBehavior: "contain",
                fontFamily: fontStack,
              }}
            >
              {/* --- HEADER --- */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "14px 18px",
                  borderBottom: isDark ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid #f1f5f9",
                  backgroundColor: isDark ? "#0c1322" : "#f8fafc",
                }}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "10px",
                      backgroundColor: isDark ? "#1e293b" : "#e0f2fe",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <BookOpen
                      style={{
                        width: "16px",
                        height: "16px",
                        color: isDark ? "#38bdf8" : "#0369a1", fontWeight: 800,
                      }}
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span
                        style={{
                          fontSize: "14.5px",
                          fontWeight: 700,
                          letterSpacing: "-0.01em",
                        }}
                      >
                        AI Page Summary
                      </span>
                      <span
                        style={{
                          fontSize: "10.5px",
                          fontWeight: 700,
                          padding: "2px 7px",
                          borderRadius: "6px",
                          backgroundColor: isDark ? "rgba(56, 189, 248, 0.15)" : "#e0f2fe",
                          color: isDark ? "#38bdf8" : "#0052cc",
                        }}
                      >
                        {displayData.badge}
                      </span>
                      {currentLang !== "en" && (
                        <span
                          style={{
                            fontSize: "10px",
                            fontWeight: 700,
                            padding: "2px 6px",
                            borderRadius: "6px",
                            backgroundColor: isDark ? "rgba(37, 99, 235, 0.25)" : "#dbeafe",
                            color: isDark ? "#60a5fa" : "#2563eb",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "3px",
                          }}
                        >
                          {currentLangObj?.flag} {currentLangObj?.native}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px]" style={{ color: isDark ? "#94a3b8" : "#334155", fontWeight: 600 }}>
                      <Clock style={{ width: "11px", height: "11px" }} />
                      <span>{displayData.readTime}</span>
                    </div>
                  </div>
                </div>

                {/* Header Action Icons */}
                <div className="flex items-center gap-1.5 shrink-0">
                  {/* Text Size Control (A- / A+) */}
                  <div
                    className="flex items-center rounded-lg p-0.5 border"
                    style={{
                      backgroundColor: isDark ? "rgba(255, 255, 255, 0.05)" : "#f1f5f9",
                      borderColor: isDark ? "rgba(255, 255, 255, 0.1)" : "#e2e8f0",
                    }}
                    title="Adjust text size (A- / A+)"
                  >
                    <button
                      type="button"
                      onClick={() => setFontScale((s) => Math.max(0.85, Number((s - 0.1).toFixed(2))))}
                      title="Decrease text size"
                      aria-label="Decrease text size"
                      className="px-1.5 py-0.5 font-bold cursor-pointer rounded transition-colors hover:bg-black/5 dark:hover:bg-white/10"
                      style={{
                        fontSize: "11px",
                        color: isDark ? "#cbd5e1" : "#090e18",
                        fontWeight: 800,
                      }}
                    >
                      A-
                    </button>
                    <span
                      style={{
                        fontSize: "10px",
                        opacity: 0.35,
                        padding: "0 1px",
                        color: isDark ? "#ffffff" : "#000000",
                      }}
                    >
                      |
                    </span>
                    <button
                      type="button"
                      onClick={() => setFontScale((s) => Math.min(1.25, Number((s + 0.1).toFixed(2))))}
                      title="Increase text size"
                      aria-label="Increase text size"
                      className="px-1.5 py-0.5 font-bold cursor-pointer rounded transition-colors hover:bg-black/5 dark:hover:bg-white/10"
                      style={{
                        fontSize: "12px",
                        color: isDark ? "#cbd5e1" : "#090e18",
                        fontWeight: 800,
                      }}
                    >
                      A+
                    </button>
                  </div>

                  {/* Copy Button */}
                  <button
                    data-testid="summarizer-copy-btn"
                    onClick={handleCopySummary}
                    title={copied ? "Summary Copied!" : "Copy Summary Text"}
                    aria-label="Copy Summary"
                    className="p-1.5 rounded-lg transition-colors cursor-pointer"
                    style={{
                      color: copied ? "#10b981" : isDark ? "#cbd5e1" : "#090e18",
                    }}
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </button>

                  {/* Close Button */}
                  <button
                    data-testid="summarizer-close-btn"
                    onClick={() => setIsOpen(false)}
                    aria-label="Close Summary Modal"
                    className="p-1.5 rounded-lg transition-colors cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-800"
                    style={{
                      color: isDark ? "#cbd5e1" : "#090e18",
                    }}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* --- SCROLLABLE BODY --- */}
              <div
                className="page-summarizer-scroll"
                data-lenis-prevent="true"
                style={{
                  padding: "16px 18px",
                  overflowY: "auto",
                  overscrollBehavior: "contain",
                  WebkitOverflowScrolling: "touch",
                  touchAction: "pan-y",
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  gap: "14px",
                }}
              >
                {/* Stats Bar */}
                {displayData.stats && (
                  <div
                    style={{
                      padding: "8px 12px",
                      borderRadius: "10px",
                      backgroundColor: isDark ? "rgba(15, 23, 42, 0.7)" : "#f1f5f9",
                      border: isDark ? "1px solid rgba(255, 255, 255, 0.06)" : "1px solid #e2e8f0",
                      fontSize: `${(12 * fontScale).toFixed(1)}px`,
                      color: isDark ? "#93c5fd" : "#082f49",
                      fontWeight: 700,
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <Compass style={{ width: "13px", height: "13px", flexShrink: 0 }} />
                    <span className="truncate">{displayData.stats}</span>
                  </div>
                )}

                {/* Page Title */}
                <div>
                  <h3
                    style={{
                      fontSize: `${(16.5 * fontScale).toFixed(1)}px`,
                      fontWeight: 800,
                      letterSpacing: "-0.015em",
                      lineHeight: "1.35",
                      color: isDark ? "#ffffff" : "#0f172a",
                    }}
                  >
                    {displayData.title}
                  </h3>
                </div>

                {/* --- PACKAGES AT A GLANCE STRIP --- */}
                {displayData.packages && (
                  <div
                    style={{
                      padding: "12px 14px",
                      borderRadius: "14px",
                      backgroundColor: isDark ? "rgba(30, 41, 59, 0.45)" : "#f8fafc",
                      border: isDark ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid #e2e8f0",
                    }}
                  >
                    <div className="flex items-center justify-between mb-2.5">
                      <div className="flex items-center gap-1.5">
                        <Sparkles style={{ width: "13px", height: "13px", color: "#2563eb" }} />
                        <span
                          style={{
                            fontSize: "11px",
                            fontWeight: 800,
                            textTransform: "uppercase",
                            letterSpacing: "0.05em",
                            color: isDark ? "#60a5fa" : "#2563eb",
                          }}
                        >
                          TIERED PACKAGES AT A GLANCE
                        </span>
                      </div>
                      <span
                        style={{
                          fontSize: "10px",
                          color: isDark ? "#94a3b8" : "#0f172a",
                          fontWeight: 800,
                        }}
                      >
                        Direct Ad Spend • Zero Markup
                      </span>
                    </div>

                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 1fr)",
                        gap: "8px",
                      }}
                    >
                      {displayData.packages.map((pkg, idx) => {
                        const isPopular = pkg.name === "Growth";
                        return (
                          <div
                            key={idx}
                            style={{
                              padding: "10px 8px",
                              borderRadius: "10px",
                              backgroundColor: isPopular
                                ? isDark
                                  ? "rgba(37, 99, 235, 0.18)"
                                  : "#eff6ff"
                                : isDark
                                ? "rgba(15, 23, 42, 0.6)"
                                : "#ffffff",
                              border: isPopular
                                ? isDark
                                  ? "1.5px solid rgba(59, 130, 246, 0.5)"
                                  : "1.5px solid #93c5fd"
                                : isDark
                                ? "1px solid rgba(255, 255, 255, 0.06)"
                                : "1px solid #e2e8f0",
                              textAlign: "center",
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "space-between",
                            }}
                          >
                            <div>
                              <div
                                style={{
                                  fontSize: `${(13 * fontScale).toFixed(1)}px`,
                                  fontWeight: 800,
                                  color: isPopular
                                    ? isDark
                                      ? "#93c5fd"
                                      : "#1d4ed8"
                                    : isDark
                                    ? "#ffffff"
                                    : "#000000",
                                }}
                              >
                                {pkg.name}
                              </div>
                              <span
                                style={{
                                  display: "inline-block",
                                  fontSize: "9px",
                                  fontWeight: 800,
                                  textTransform: "uppercase",
                                  padding: "1px 5px",
                                  borderRadius: "4px",
                                  marginTop: "2px",
                                  backgroundColor: isPopular
                                    ? "#2563eb"
                                    : isDark
                                    ? "rgba(255, 255, 255, 0.08)"
                                    : "#f1f5f9",
                                  color: isPopular
                                    ? "#ffffff"
                                    : isDark
                                    ? "#94a3b8"
                                    : "#0f172a",
                                }}
                              >
                                {pkg.badge}
                              </span>
                            </div>

                            <div
                              style={{
                                marginTop: "6px",
                                fontSize: `${(10.5 * fontScale).toFixed(1)}px`,
                                lineHeight: "1.35",
                                color: isDark ? "#cbd5e1" : "#090e18",
                                fontWeight: 700,
                              }}
                            >
                              <div style={{ fontWeight: 800 }}>{pkg.posts}</div>
                              <div>{pkg.reels}</div>
                              <div style={{ fontWeight: 600, color: isDark ? "#38bdf8" : "#0369a1" }}>
                                {pkg.shoots}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Executive Summary Block */}
                <div
                  style={{
                    padding: "12px 14px",
                    borderRadius: "12px",
                    backgroundColor: isDark ? "rgba(56, 189, 248, 0.08)" : "#f0f9ff",
                    border: isDark ? "1px solid rgba(56, 189, 248, 0.2)" : "1px solid #bae6fd",
                  }}
                >
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <Lightbulb style={{ width: "13px", height: "13px", color: isDark ? "#38bdf8" : "#0369a1" }} />
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.04em",
                        color: isDark ? "#38bdf8" : "#0369a1",
                      }}
                    >
                      Executive Summary
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: `${(13.5 * fontScale).toFixed(1)}px`,
                      lineHeight: "1.58",
                      color: isDark ? "#f1f5f9" : "#090e18",
                      fontWeight: 600,
                    }}
                  >
                    {displayData.summary}
                  </p>
                </div>

                {/* Key Takeaways & Highlights */}
                <div>
                  <div className="flex items-center gap-1.5 mb-2">
                    <CheckCircle2 style={{ width: "13px", height: "13px", color: "#10b981" }} />
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: 800,
                        textTransform: "uppercase",
                        letterSpacing: "0.04em",
                        color: isDark ? "#cbd5e1" : "#090e18",
                      }}
                    >
                      Key Takeaways
                    </span>
                  </div>
                  <ul className="space-y-2">
                    {displayData.highlights?.map((point, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2"
                        style={{
                          fontSize: `${(13 * fontScale).toFixed(1)}px`,
                          lineHeight: "1.52",
                          color: isDark ? "#f1f5f9" : "#090e18",
                          fontWeight: 600,
                        }}
                      >
                        <span
                          style={{
                            width: "5px",
                            height: "5px",
                            borderRadius: "50%",
                            backgroundColor: isDark ? "#38bdf8" : "#2563eb",
                            marginTop: "6px",
                            flexShrink: 0,
                          }}
                        />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Target Audience Note */}
                {displayData.targetAudience && (
                  <div
                    style={{
                      fontSize: `${(12 * fontScale).toFixed(1)}px`,
                      lineHeight: "1.45",
                      color: isDark ? "#e2e8f0" : "#090e18",
                      fontWeight: 600,
                      borderTop: isDark ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid #f1f5f9",
                      paddingTop: "10px",
                    }}
                  >
                    <strong style={{ color: isDark ? "#f8fafc" : "#0f172a" }}>Who this is for: </strong>
                    {displayData.targetAudience}
                  </div>
                )}
              </div>

              {/* --- FOOTER ACTION BAR --- */}
              <div
                style={{
                  padding: "11px 14px",
                  borderTop: isDark ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid #f1f5f9",
                  backgroundColor: isDark ? "#0c1322" : "#f8fafc",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  width: "100%",
                  boxSizing: "border-box",
                }}
              >
                {/* Ask AI Assistant Button */}
                <button
                  data-testid="summarizer-ask-ai-btn"
                  onClick={handleAskAI}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-bold transition-all duration-200 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    minHeight: "42px",
                    fontSize: `${(13 * fontScale).toFixed(1)}px`,
                    backgroundColor: isDark ? "rgba(56, 189, 248, 0.12)" : "#f0f7ff",
                    color: isDark ? "#38bdf8" : "#0369a1",
                    border: isDark ? "1.5px solid rgba(56, 189, 248, 0.3)" : "1.5px solid #bae6fd",
                    boxShadow: isDark
                      ? "0 2px 8px rgba(0, 0, 0, 0.35)"
                      : "0 2px 6px rgba(2, 132, 199, 0.08)",
                  }}
                >
                  <Bot className="h-4 w-4 shrink-0" strokeWidth={2.2} />
                  <span>Ask</span>
                </button>

                {/* Primary Page Action Button */}
                {displayData.actionRoute && (
                  displayData.isExternal ? (
                    <a
                      href={displayData.actionRoute}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-bold text-white transition-all duration-200 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                      style={{
                        minHeight: "42px",
                        fontSize: `${(13 * fontScale).toFixed(1)}px`,
                        background: "linear-gradient(135deg, #0284c7 0%, #2563eb 100%)",
                        boxShadow: "0 4px 14px rgba(37, 99, 235, 0.35)",
                      }}
                    >
                      <span>{displayData.actionLabel}</span>
                      <ExternalLink className="h-4 w-4 shrink-0" strokeWidth={2.2} />
                    </a>
                  ) : (
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        navigate(displayData.actionRoute);
                      }}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-bold text-white transition-all duration-200 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                      style={{
                        minHeight: "42px",
                        fontSize: `${(13 * fontScale).toFixed(1)}px`,
                        background: "linear-gradient(135deg, #0284c7 0%, #2563eb 100%)",
                        boxShadow: "0 4px 14px rgba(37, 99, 235, 0.35)",
                      }}
                    >
                      <span>{displayData.actionLabel}</span>
                      <ArrowRight className="h-4 w-4 shrink-0" strokeWidth={2.2} />
                    </button>
                  )
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PageSummarizer;
