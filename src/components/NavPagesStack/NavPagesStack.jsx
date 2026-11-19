import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Check,
  Building2,
  Code2,
  GraduationCap,
  FolderGit2,
  Users,
  PhoneCall,
  Home as HomeIcon,
  Bot,
  Languages,
  Sparkles,
  Send,
  X,
  Copy,
  RotateCcw,
  CheckCheck,
  Globe2,
  ExternalLink,
  Key,
  Navigation,
  Compass,
} from 'lucide-react';
import { SUPPORTED_LANGUAGES, setGlobalPageLanguage, getInitialLanguage } from '../../utils/translator';

// COMPLETE KNOWLEDGE BASE FOR REAL-TIME AI ASSISTANT
const GK_KNOWLEDGE_BASE = `
GK Nexergy is an enterprise technology and workforce empowerment company headquartered in Andhra Pradesh, India.
Tagline: Train. Build. Transform.
One Company. Two Powerful Ecosystems:

1. ENTERPRISE TECHNOLOGY SOLUTIONS (/solutions):
- Software & Application Engineering (/solutions/software-development): Custom software, high-performance web applications, scalable React/Node.js/Python architectures, custom APIs, cloud platforms.
- Mobile App Development (/solutions/mobile-development): Cross-platform iOS & Android mobile applications built with React Native & Flutter.
- Digital Transformation (/solutions/digital-transformation): Process digitization, workflow automation readiness, tech roadmapping, operating model modernization.
- AI & Process Automation (/solutions/ai-automation): Generative AI, RAG pipelines, predictive capabilities, intelligent workflow automation.
- Data & Analytics (/solutions/data-analytics): Database engineering, PostgreSQL specialization, business intelligence, reporting.
- Digital Growth (/solutions/digital-growth): Brand visibility, AI-assisted growth strategy, audience reach.

2. NEXERGY ACADEMY (/academy):
- Practical education aligned with active IT industry standards with direct mentor-led apprenticeships.
- Cyber Security & Ethical Hacking (/academy/cyber-security): 16-Week intensive training on vulnerability assessment, network security, and offensive/defensive tooling.
- PostgreSQL Database Mastery (/academy/postgresql-mastery): Database internals, query optimization, indexing, replication, and high availability.
- Foundation Program (/academy/foundation-program): Python, Cloud fundamentals, Linux, modern full-stack foundations.
- AI & Digital Marketing (/academy/ai-digital-marketing): Applied AI tools for productivity, campaign planning, and digital growth.

3. DELIVERED PROJECTS (/projects):
- AI-Integrated Hospital Management Platform: Intelligent diagnostic triage, multi-specialty workflows, electronic health records.
- AI Real Estate Discovery & Lead Analytics: Automated MLS ingest, predictive valuation, hyper-local lead scoring.
- NutriBest Health & Wellness Global E-Commerce: High-throughput e-commerce, international checkout, subscriptions.

4. COMPANY & STRATEGY (/company & /about):
- Premier Engineering Center of Excellence.
- Dedicated practicing engineering delivery pods.
- 100% intellectual property & data ownership for clients.
- Executive technology advisory & modernization.

5. HIRING & CAREERS (/careers):
- Autonomous agile pods with rapid sprint cycles.
- Tech Stack: React, Node.js, Python, PostgreSQL, Framer Motion, AI/ML, Cloud DevOps.
- Accelerated career progression with direct product ownership.

6. CONTACT & CONSULTATION (/contact):
- Free 30-minute architectural discovery session.
- Direct phone, WhatsApp, and Google Form consultation.
`;

export const NavPagesStack = () => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const scrollTabsRef = useRef(null);

  // Theme Detection (Dark vs Light)
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains('dark'));
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  // AI Modal States
  const [chatOpen, setChatOpen] = useState(false);
  const [translateOpen, setTranslateOpen] = useState(false);
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const [openAiKey, setOpenAiKey] = useState(() => localStorage.getItem('gk_openai_key') || '');

  // Lock body scroll and pause Lenis smooth scroll while interactive modals are open
  useEffect(() => {
    if (!chatOpen && !translateOpen) return;

    if (window.__lenis) {
      try {
        window.__lenis.stop();
      } catch (err) {}
    }

    const prevBodyOverflow = document.body.style.overflow;
    const prevHtmlOverflow = document.documentElement.style.overflow;
    const prevBodyPaddingRight = document.body.style.paddingRight;

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

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
  }, [chatOpen, translateOpen]);

  // Chatbot State
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: 'Hello! I am the GK Nexergy AI Assistant. I know every detail of our solutions, academy courses, projects, and hiring pods. Ask me anything, or ask me to navigate you to any page!',
      time: 'Just now',
      actions: [
        { label: 'Explore Solutions', to: '/solutions' },
        { label: 'Nexergy Academy', to: '/academy' },
        { label: 'View Projects', to: '/projects' },
      ],
    },
  ]);

  // Translation State
  const [sourceText, setSourceText] = useState('GK Nexergy brings technology, learning, industry and opportunity together through one connected ecosystem.');
  const [targetLang, setTargetLang] = useState('te');
  const [translatedResult, setTranslatedResult] = useState('జికె నెక్సర్గీ సాంకేతికత, అభ్యాసం, పరిశ్రమ మరియు అవకాశాలను ఒక అనుసంధానిత పర్యావరణ వ్యవస్థ ద్వారా అందిస్తుంది.');
  const [isTranslating, setIsTranslating] = useState(false);
  const [copied, setCopied] = useState(false);

  const pagesData = [
    {
      id: 'company',
      to: '/about',
      tabLabel: 'Company',
      icon: Building2,
      category: 'STRATEGIC ADVISORY',
      title: 'Company & Vision',
      tagline: 'Modern software engineering built for real-world enterprise growth.',
      badge: 'ABOUT US',
      highlightOutcome: '100% Client IP Ownership',
      bullets: [
        'Premier Engineering Center of Excellence',
        'Dedicated Agile practicing engineering pods',
        'Full proprietary code control and architectural security',
        'Executive technology roadmap & modern architecture',
      ],
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop',
    },
    {
      id: 'ecosystem',
      to: '#our-ecosystems',
      tabLabel: 'Ecosystem',
      icon: Globe2,
      category: 'DUAL SYNERGY',
      title: 'Connected Ecosystem',
      tagline: 'Train. Build. Transform. Uniting enterprise engineering and workforce empowerment.',
      badge: 'OUR MODEL',
      highlightOutcome: 'Direct Talent Alignment',
      bullets: [
        'Integrated enterprise software & client delivery pods',
        'Nexergy Academy industry training & apprenticeship model',
        'Direct alignment with live client solution roadmaps',
        'Holistic digital transformation and workforce enablement',
      ],
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop',
    },
    {
      id: 'solutions',
      to: '/solutions',
      tabLabel: 'Solutions',
      icon: Code2,
      category: 'CUSTOM ARCHITECTURE',
      title: 'Enterprise Solutions',
      tagline: 'High-performance web apps, mobile apps, and cloud platforms.',
      badge: 'SERVICES',
      highlightOutcome: 'Scalable Cloud Infrastructure',
      bullets: [
        'Custom web applications & modern microservices',
        'Cross-platform iOS & Android mobile systems',
        'Intelligent automation & AI smart assistants',
        'High-performance database & data engineering',
      ],
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop',
    },
    {
      id: 'projects',
      to: '/projects',
      tabLabel: 'Projects',
      icon: FolderGit2,
      category: 'PROVEN CASE STUDIES',
      title: 'Delivered Projects',
      tagline: 'Production-tested digital systems driving compounding scale.',
      badge: 'PORTFOLIO',
      highlightOutcome: 'Demonstrated Enterprise Value',
      bullets: [
        'AI-Powered Hospital Management & Triage Platform',
        'Real Estate Lead Intelligence & Analytics Engine',
        'NutriBest Global E-Commerce & Checkout Suite',
        'High-throughput business portals & system integrations',
      ],
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop',
    },
    {
      id: 'hiring',
      to: '/careers',
      tabLabel: 'Hiring',
      icon: Users,
      category: 'TALENT ACCELERATION',
      title: 'Careers & Hiring',
      tagline: 'Join high-impact engineering delivery pods with rapid career progression.',
      badge: 'JOIN US',
      highlightOutcome: 'Active Sprint Pods',
      bullets: [
        'Autonomous engineering roles in modern tech stacks',
        'Modern Web, Cloud & AI Engineering Stack',
        'End-to-end feature ownership on live client solutions',
        'Competitive compensation with fast-track leadership',
      ],
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop',
    },
    {
      id: 'academy',
      to: '/academy',
      tabLabel: 'Academy',
      icon: GraduationCap,
      category: 'INDUSTRY EDUCATION',
      title: 'Nexergy Academy',
      tagline: 'Practical IT education with real repo apprenticeships & mentors.',
      badge: 'PROGRAMS',
      highlightOutcome: 'Production-Ready Engineers',
      bullets: [
        '16-Week Cyber Security & Ethical Hacking Program',
        'Enterprise Database Architecture & Performance',
        'Full-Stack Web & Applied AI Tools Foundation',
        'Mentored hands-on labs with production repositories',
      ],
      image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1200&auto=format&fit=crop',
    },
    {
      id: 'contact',
      to: '/contact',
      tabLabel: 'Contact',
      icon: PhoneCall,
      category: 'CONSULTATION & DISCOVERY',
      title: 'Contact & Connect',
      tagline: 'Consult with our engineering team for roadmap & feasibility.',
      badge: 'REACH OUT',
      highlightOutcome: 'Zero-Obligation Architecture Call',
      bullets: [
        'Complimentary 30-minute feasibility blueprint',
        'Rapid scope definition & transparent estimation',
        'Direct telephone, WhatsApp & email access',
        'Premier Engineering Hub, AP, India',
      ],
      image: 'https://images.unsplash.com/photo-1534536281715-e28d76689b4d?q=80&w=1200&auto=format&fit=crop',
    },
  ];

  const total = pagesData.length;
  const currentIndex = hoveredIndex !== null ? hoveredIndex : activeIndex;
  const currentCard = pagesData[currentIndex] || pagesData[0];

  const handleNext = () => {
    const nextIdx = (activeIndex + 1) % total;
    setActiveIndex(nextIdx);
    setHoveredIndex(nextIdx);
  };

  const handlePrev = () => {
    const prevIdx = (activeIndex - 1 + total) % total;
    setActiveIndex(prevIdx);
    setHoveredIndex(prevIdx);
  };

  const handleCardClick = (card) => {
    if (card.isAi) {
      if (card.aiAction === 'chat') {
        window.dispatchEvent(new CustomEvent('open-gk-chatbot'));
      } else if (card.aiAction === 'translate') {
        setTranslateOpen(true);
      }
    } else if (card.id === 'ecosystem' || card.to === '#our-ecosystems' || card.to === '/home#our-ecosystems') {
      const el = document.getElementById('our-ecosystems') || document.querySelector('[data-testid="home-ecosystems"]');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        if (window.history && window.history.pushState) {
          window.history.pushState(null, '', '#our-ecosystems');
        }
      } else {
        navigate('/home#our-ecosystems');
      }
    } else if (card.to) {
      navigate(card.to);
    }
  };

  // Auto-scroll active tab into view in mobile horizontal bar
  useEffect(() => {
    if (scrollTabsRef.current) {
      const activeBtn = scrollTabsRef.current.children[currentIndex];
      if (activeBtn) {
        const parent = scrollTabsRef.current; const targetLeft = activeBtn.offsetLeft - (parent.clientWidth - activeBtn.clientWidth) / 2; parent.scrollTo({ left: targetLeft, behavior: 'smooth' });
      }
    }
  }, [currentIndex]);

  // AI Chat response logic with Real-time OpenAI & In-Chat Navigation
  const handleSendMessage = async (e) => {
    e?.preventDefault();
    if (!chatInput.trim()) return;

    const queryText = chatInput.trim();
    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: queryText,
      time: 'Just now',
    };

    setChatMessages((prev) => [...prev, userMsg]);
    setChatInput('');
    setIsTyping(true);

    const query = queryText.toLowerCase();

    // Check for direct navigation commands
    if (
      query.startsWith('go to') ||
      query.startsWith('navigate to') ||
      query.startsWith('take me to') ||
      query.startsWith('open ')
    ) {
      let targetRoute = null;
      let targetTitle = '';
      if (query.includes('academy') || query.includes('course') || query.includes('cyber')) {
        targetRoute = '/academy';
        targetTitle = 'Nexergy Academy';
      } else if (query.includes('solution') || query.includes('software') || query.includes('service')) {
        targetRoute = '/solutions';
        targetTitle = 'Enterprise Solutions';
      } else if (query.includes('project') || query.includes('portfolio') || query.includes('work')) {
        targetRoute = '/projects';
        targetTitle = 'Delivered Projects';
      } else if (query.includes('career') || query.includes('job') || query.includes('hiring')) {
        targetRoute = '/careers';
        targetTitle = 'Careers & Hiring';
      } else if (query.includes('company') || query.includes('about') || query.includes('vision')) {
        targetRoute = '/about';
        targetTitle = 'Company & Vision';
      } else if (query.includes('contact') || query.includes('call') || query.includes('email')) {
        targetRoute = '/contact';
        targetTitle = 'Contact & Connect';
      } else if (query.includes('home')) {
        targetRoute = '/home';
        targetTitle = 'Home';
      }

      if (targetRoute) {
        setTimeout(() => {
          setChatMessages((prev) => [
            ...prev,
            {
              id: Date.now() + 1,
              sender: 'bot',
              text: `Navigating you directly to **${targetTitle}**... Click the button below if the page does not open automatically!`,
              time: 'Just now',
              actions: [{ label: `Go to ${targetTitle}`, to: targetRoute, primary: true }],
            },
          ]);
          setIsTyping(false);
          setTimeout(() => {
            setChatOpen(false);
            navigate(targetRoute);
          }, 800);
        }, 500);
        return;
      }
    }

    // =========================================================================
    // OPTIONAL: OpenAI Real-Time API Integration (Configured via .env)
    // =========================================================================
    // Reads key from import.meta.env.VITE_OPENAI_API_KEY or user-entered key.
    // Uncomment this block to enable direct OpenAI GPT-4o-mini API calls.
    // -------------------------------------------------------------------------
    /*
    const activeApiKey = openAiKey || (typeof import.meta !== 'undefined' && import.meta.env?.VITE_OPENAI_API_KEY) || '';
    if (activeApiKey && activeApiKey.startsWith('sk-')) {
      try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${activeApiKey}`,
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [
              {
                role: 'system',
                content: `You are the official GK Nexergy AI Assistant. You have full knowledge of the GK Nexergy website, services, and academy. Answer accurately, concisely, and professionally based on the following website context:\n${GK_KNOWLEDGE_BASE}\nAlways recommend appropriate website routes (/solutions, /academy, /projects, /careers, /company, /contact) when helpful.`,
              },
              { role: 'user', content: queryText },
            ],
            temperature: 0.7,
            max_tokens: 300,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const aiResponse = data.choices?.[0]?.message?.content || 'I processed your request.';
          
          // Extract matching action routes
          const actions = [];
          if (aiResponse.toLowerCase().includes('academy') || query.includes('academy') || query.includes('course')) {
            actions.push({ label: 'Nexergy Academy', to: '/academy' });
          }
          if (aiResponse.toLowerCase().includes('solution') || query.includes('software')) {
            actions.push({ label: 'Explore Solutions', to: '/solutions' });
          }
          if (aiResponse.toLowerCase().includes('career') || query.includes('hiring')) {
            actions.push({ label: 'View Careers', to: '/careers' });
          }
          if (aiResponse.toLowerCase().includes('contact') || query.includes('quote')) {
            actions.push({ label: 'Contact Us', to: '/contact' });
          }

          setChatMessages((prev) => [
            ...prev,
            {
              id: Date.now() + 1,
              sender: 'bot',
              text: aiResponse,
              time: 'Just now',
              actions: actions.length ? actions : [{ label: 'Explore Solutions', to: '/solutions' }],
            },
          ]);
          setIsTyping(false);
          return;
        }
      } catch (err) {
        console.warn('OpenAI call fallback:', err);
      }
    }
    */

    // Default High-Accuracy Smart RAG Knowledge Engine
    setTimeout(() => {
      let botReply = '';
      let actions = [];

      if (query.includes('cyber') || query.includes('security') || query.includes('ethical hack')) {
        botReply = 'Nexergy Academy offers a flagship **16-Week Cyber Security & Ethical Hacking** program. It features hands-on attack labs, vulnerability assessment, web security, and direct mentor-led guidance.';
        actions = [
          { label: 'Cyber Security Course', to: '/academy/cyber-security', primary: true },
          { label: 'All Academy Courses', to: '/academy' },
        ];
      } else if (query.includes('postgres') || query.includes('database') || query.includes('sql')) {
        botReply = 'We offer specialized **PostgreSQL Database Mastery** at Nexergy Academy and provide enterprise database scaling, indexing, replication, and query optimization services.';
        actions = [
          { label: 'PostgreSQL Course', to: '/academy/postgresql-mastery', primary: true },
          { label: 'Data Solutions', to: '/solutions/data-analytics' },
        ];
      } else if (query.includes('academy') || query.includes('course') || query.includes('student') || query.includes('train')) {
        botReply = 'Nexergy Academy is our industry-readiness ecosystem. Programs include Cyber Security, PostgreSQL Mastery, Python & Cloud Foundations, and AI Tools for Digital Marketing with real repository apprenticeships.';
        actions = [
          { label: 'Open Nexergy Academy', to: '/academy', primary: true },
          { label: 'Foundation Program', to: '/academy/foundation-program' },
        ];
      } else if (query.includes('software') || query.includes('app') || query.includes('web') || query.includes('develop')) {
        botReply = 'GK Nexergy builds scalable web applications, React/Node/Python platforms, microservices, and cross-platform iOS & Android mobile apps with full 100% intellectual property ownership for clients.';
        actions = [
          { label: 'Software Development', to: '/solutions/software-development', primary: true },
          { label: 'Mobile Apps', to: '/solutions/mobile-development' },
        ];
      } else if (query.includes('ai') || query.includes('automation') || query.includes('bot') || query.includes('llm')) {
        botReply = 'Our AI & Automation pod engineers Generative AI assistants, enterprise RAG document intelligence, automated workflow pipelines, and predictive machine learning models for businesses.';
        actions = [
          { label: 'AI & Automation Solutions', to: '/solutions/ai-automation', primary: true },
          { label: 'Discuss AI Project', to: '/contact' },
        ];
      } else if (query.includes('project') || query.includes('portfolio') || query.includes('case study') || query.includes('client')) {
        botReply = 'Our delivered work includes an AI-Integrated Hospital Management Platform, AI Real Estate Discovery & Lead Analytics, and the NutriBest Global E-Commerce portal.';
        actions = [
          { label: 'View Delivered Projects', to: '/projects', primary: true },
          { label: 'Explore Solutions', to: '/solutions' },
        ];
      } else if (query.includes('job') || query.includes('career') || query.includes('hiring') || query.includes('apply')) {
        botReply = 'We are hiring for autonomous agile pods! We welcome developers skilled in React, Node.js, Python, PostgreSQL, and AI engineering.';
        actions = [
          { label: 'Careers & Open Roles', to: '/careers', primary: true },
          { label: 'About Our Team', to: '/about' },
        ];
      } else if (query.includes('contact') || query.includes('quote') || query.includes('consult') || query.includes('call') || query.includes('email') || query.includes('price')) {
        botReply = 'You can book a complimentary 30-minute architectural discovery session. Our engineering leads will review your project scope within 24 hours.';
        actions = [
          { label: 'Book Discovery Session', to: '/contact', primary: true },
          { label: 'Inquiry Form', to: 'https://forms.gle/GCqvWiWqxwvDSzoZ6', external: true },
        ];
      } else if (query.includes('company') || query.includes('about') || query.includes('vision') || query.includes('who are you')) {
        botReply = 'GK Nexergy is an enterprise technology engineering and workforce transformation partner. We operate premier engineering centers ensuring 100% IP ownership and agile pod delivery.';
        actions = [
          { label: 'Company & Vision', to: '/about', primary: true },
          { label: 'Why GK Nexergy', to: '/why-gk-nexergy' },
        ];
      } else {
        botReply = `GK Nexergy bridges high-performance software engineering with industry workforce training. Where would you like to navigate or learn more about?`;
        actions = [
          { label: 'Enterprise Solutions', to: '/solutions' },
          { label: 'Nexergy Academy', to: '/academy' },
          { label: 'Contact Us', to: '/contact' },
        ];
      }

      setChatMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'bot',
          text: botReply,
          time: 'Just now',
          actions: actions,
        },
      ]);
      setIsTyping(false);
    }, 600);
  };

  const samplePrompts = [
    'Take me to Nexergy Academy',
    'What software do you build?',
    'Tell me about Cyber Security course',
    'How do I apply for engineering roles?',
    'Book an AI consultation call',
  ];

  // AI Translation mapping dictionary
  const translationsMap = {
    te: {
      'GK Nexergy brings technology, learning, industry and opportunity together through one connected ecosystem.':
        'జికె నెక్సర్గీ సాంకేతికత, అభ్యాసం, పరిశ్రమ మరియు అవకాశాలను ఒక అనుసంధానిత పర్యావరణ వ్యవస్థ ద్వారా అందిస్తుంది.',
      'Train. Build. Transform.': 'శిక్షణ. నిర్మాణం. పరివర్తన.',
      'Software & Application Engineering for modern enterprises.':
        'ఆధునిక సంస్థల కోసం సాఫ్ట్‌వేర్ మరియు అప్లికేషన్ ఇంజనీరింగ్.',
      'Practical education aligned with IT industry standards.':
        'ఐటీ పరిశ్రమ ప్రమాణాలకు అనుగుణంగా ఆచరణాత్మక విద్య.',
    },
    hi: {
      'GK Nexergy brings technology, learning, industry and opportunity together through one connected ecosystem.':
        'जीके नेक्सर्जी एक जुड़े हुए इकोसिस्टम के माध्यम से तकनीक, शिक्षा, उद्योग और अवसर को एक साथ लाता है।',
      'Train. Build. Transform.': 'प्रशिक्षण। निर्माण। परिवर्तन।',
      'Software & Application Engineering for modern enterprises.':
        'आधुनिक उद्यमों के लिए सॉफ्टवेयर और एप्लीकेशन इंजीनियरिंग।',
      'Practical education aligned with IT industry standards.':
        'आईटी उद्योग मानकों के अनुरूप व्यावहारिक शिक्षा।',
    },
    es: {
      'GK Nexergy brings technology, learning, industry and opportunity together through one connected ecosystem.':
        'GK Nexergy une la tecnología, el aprendizaje, la industria y las oportunidades a través de un ecosistema conectado.',
      'Train. Build. Transform.': 'Entrenar. Construir. Transformar.',
      'Software & Application Engineering for modern enterprises.':
        'Ingeniería de software y aplicaciones para empresas modernas.',
      'Practical education aligned with IT industry standards.':
        'Educación práctica alineada con los estándares de la industria.',
    },
    fr: {
      'GK Nexergy brings technology, learning, industry and opportunity together through one connected ecosystem.':
        'GK Nexergy rassemble la technologie, l’apprentissage, l’industrie et les opportunités au sein d’un écosystème connecté.',
      'Train. Build. Transform.': 'Former. Construire. Transformer.',
      'Software & Application Engineering for modern enterprises.':
        'Ingénierie logicielle et d’applications pour entreprises modernes.',
      'Practical education aligned with IT industry standards.':
        'Formation pratique alignée sur les standards de l’industrie.',
    },
    de: {
      'GK Nexergy brings technology, learning, industry and opportunity together through one connected ecosystem.':
        'GK Nexergy verbindet Technologie, Bildung, Industrie und Chancen in einem vernetzten Ökosystem.',
      'Train. Build. Transform.': 'Trainieren. Bauen. Transformieren.',
      'Software & Application Engineering for modern enterprises.':
        'Software- und Anwendungsentwicklung für moderne Unternehmen.',
      'Practical education aligned with IT industry standards.':
        'Praxisnahe Ausbildung nach aktuellen IT-Industriestandards.',
    },
    ja: {
      'GK Nexergy brings technology, learning, industry and opportunity together through one connected ecosystem.':
        'GK Nexergyは、連携したエコシステムを通じてテクノロジー、学習、産業、機会を結びつけます。',
      'Train. Build. Transform.': 'トレーニング。開発。トランスフォーム。',
      'Software & Application Engineering for modern enterprises.':
        '最新の企業向けソフトウェアおよびアプリケーション開発。',
      'Practical education aligned with IT industry standards.':
        'IT業界の標準に即した実践的な教育。',
    },
  };

  const handleTranslate = (text, lang) => {
    setIsTranslating(true);
    setGlobalPageLanguage(lang);
    setTimeout(() => {
      const match = translationsMap[lang]?.[text];
      if (match) {
        setTranslatedResult(match);
      } else {
        const langObj = SUPPORTED_LANGUAGES.find((l) => l.code === lang);
        setTranslatedResult(`[${langObj?.label || lang} AI Translation]: ${text}`);
      }
      setIsTranslating(false);
    }, 450);
  };

  const handleCopyTranslation = () => {
    navigator.clipboard.writeText(translatedResult);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="nav-pages-stack-section" id="pages-stack-section">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none" style={{ position: 'absolute', inset: 0 }}>
        <div style={{ position: 'absolute', top: '25%', left: '20%', width: 500, height: 350, borderRadius: '50%', background: 'rgba(37,99,235,0.08)', filter: 'blur(140px)' }} />
        <div style={{ position: 'absolute', bottom: '20%', right: '20%', width: 500, height: 350, borderRadius: '50%', background: 'rgba(56,189,248,0.06)', filter: 'blur(140px)' }} />
        <div className="absolute inset-0 bg-grid-light opacity-15" />
      </div>

      <div className="nav-stack-container">
        {/* Centered Header */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', maxWidth: '780px', margin: '0 auto 2.5rem auto' }}>
          {/* Section Heading */}
          <h2
            style={{ fontFamily: "'Manrope', sans-serif", fontSize: 'clamp(1.75rem, 3.5vw, 2.85rem)', fontWeight: 800, color: isDark ? '#ffffff' : '#0F172A', lineHeight: 1.15, letterSpacing: '-0.025em', marginBottom: '0.85rem' }}
          >
            Capabilities{' '}
            <span className="nav-stack-heading-gradient">
              & Core Offerings
            </span>
          </h2>

          {/* Subtitle */}
          <p
            style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.95rem', color: isDark ? '#CBD5E1' : '#475569', lineHeight: 1.6, maxWidth: 620 }}
          >
            Explore our end-to-end capabilities across custom engineering, industry training, client case studies, and career opportunities.
          </p>
        </div>

        {/* CENTERED: Responsive Card Deck */}
        <div className="nav-stack-centered-deck">

            {/* ======================================================== */}
            {/* 1. MOBILE & TABLET TOUCH DECK (< 1024px)                 */}
            {/* ======================================================== */}
            <div className="nav-stack-mobile-deck">
              
              {/* Horizontal Scrollable Tabs Bar */}
              <div
                ref={scrollTabsRef}
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.75rem', marginBottom: '1rem', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {pagesData.map((p, idx) => {
                  const isCurrent = currentIndex === idx;
                  const IconComp = p.icon;
                  return (
                    <button
                      key={p.id}
                      onClick={() => {
                        if (p.id === 'ecosystem' && isCurrent) {
                          handleCardClick(p);
                        } else {
                          setActiveIndex(idx);
                          setHoveredIndex(idx);
                        }
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.375rem',
                        padding: '0.5rem 0.75rem',
                        borderRadius: '0.75rem',
                        fontSize: '0.875rem',
                        fontWeight: 700,
                        whiteSpace: 'nowrap',
                        cursor: 'pointer',
                        border: isCurrent ? '1.5px solid #2563EB' : isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid #E2E8F0',
                        backgroundColor: isCurrent ? '#2563EB' : isDark ? 'rgba(255,255,255,0.04)' : '#ffffff',
                        color: isCurrent ? '#ffffff' : isDark ? '#ffffff' : '#0F172A',
                        boxShadow: isCurrent ? '0 4px 15px rgba(37,99,235,0.4)' : isDark ? 'none' : '0 1px 3px rgba(0,0,0,0.05)',
                        flexShrink: 0
                      }}
                    >
                      <IconComp style={{ width: 14, height: 14 }} />
                      <span>{p.tabLabel}</span>
                      <span style={{ fontSize: '0.675rem', fontFamily: "'Manrope', sans-serif", fontWeight: 700, marginLeft: 2, padding: '0.1rem 0.25rem', borderRadius: 4, backgroundColor: isCurrent ? 'rgba(0,0,0,0.3)' : isDark ? 'rgba(255,255,255,0.1)' : '#F1F5F9', color: isCurrent ? '#ffffff' : isDark ? '#94A3B8' : '#64748B' }}>
                        0{idx + 1}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Mobile Deck Header / Arrow Controls */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 0.5rem', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.75rem', fontFamily: "'Manrope', sans-serif", color: isDark ? '#94A3B8' : '#64748B' }}>
                  <strong style={{ color: isDark ? '#ffffff' : '#0F172A' }}>0{currentIndex + 1}</strong> / 0{total} &mdash; {currentCard.badge}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                  <button
                    onClick={handlePrev}
                    style={{ width: 32, height: 32, borderRadius: '50%', backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)', border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)', color: isDark ? '#ffffff' : '#0F172A', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                    aria-label="Previous page"
                  >
                    <ChevronLeft style={{ width: 16, height: 16 }} />
                  </button>
                  <button
                    onClick={handleNext}
                    style={{ width: 32, height: 32, borderRadius: '50%', backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)', border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)', color: isDark ? '#ffffff' : '#0F172A', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                    aria-label="Next page"
                  >
                    <ChevronRight style={{ width: 16, height: 16 }} />
                  </button>
                </div>
              </div>

              {/* Mobile Active Card */}
              <div
                onClick={() => handleCardClick(currentCard)}
                style={{ width: '100%', borderRadius: '1.25rem', backgroundColor: isDark ? '#0B1528' : '#ffffff', border: isDark ? '2px solid rgba(59,130,246,0.8)' : '2px solid rgba(37,99,235,0.5)', padding: '1.4rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: isDark ? '0 20px 40px rgba(0,0,0,0.8)' : '0 12px 30px rgba(15,23,42,0.1)', cursor: 'pointer' }}
                role="button"
                tabIndex={0}
              >
                <div>
                  {/* Visual Banner */}
                  <div style={{ position: 'relative', width: '100%', height: 165, borderRadius: '0.85rem', overflow: 'hidden', marginBottom: '1rem', flexShrink: 0, backgroundColor: isDark ? '#0F172A' : '#F1F5F9', border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid #E2E8F0' }}>
                    <img
                      src={currentCard.image}
                      alt={currentCard.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      loading="lazy"
                    />
                    <div style={{ position: 'absolute', inset: 0, background: isDark ? 'linear-gradient(to top, #0B1528 0%, rgba(11,21,40,0.3) 50%, rgba(0,0,0,0.6) 100%)' : 'linear-gradient(to top, rgba(15,23,42,0.8) 0%, rgba(15,23,42,0.2) 50%, rgba(0,0,0,0.4) 100%)' }} />

                    {/* Badges - GK Logo from chatbot */}
                    <div style={{ position: 'absolute', top: 10, left: 10, right: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 10 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                        <div
                          style={{
                            width: 28,
                            height: 28,
                            borderRadius: '50%',
                            backgroundColor: '#ffffff',
                            border: '1px solid rgba(255,255,255,0.8)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'hidden',
                            flexShrink: 0,
                            boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
                          }}
                        >
                          <img
                            src="/images/gk-avatar-badge.png"
                            alt="GK Logo"
                            style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '1.5px' }}
                          />
                        </div>
                        <span style={{ fontSize: 9, fontWeight: 700, color: '#93C5FD', textTransform: 'uppercase', letterSpacing: '0.08em', backgroundColor: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(8px)', padding: '0.2rem 0.5rem', borderRadius: 4, border: '1px solid rgba(255,255,255,0.1)' }}>
                          {currentCard.category}
                        </span>
                      </div>
                      <span style={{ fontSize: 10, fontFamily: "'Manrope', sans-serif", fontWeight: 700, color: '#ffffff', backgroundColor: 'rgba(0,0,0,0.65)', padding: '0.2rem 0.5rem', borderRadius: 9999, border: '1px solid rgba(255,255,255,0.1)' }}>
                        0{currentIndex + 1} / 0{total}
                      </span>
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <h3
                    style={{ fontFamily: "'Manrope', sans-serif", fontSize: '1.15rem', fontWeight: 700, color: isDark ? '#ffffff' : '#0F172A', marginBottom: '0.25rem', lineHeight: 1.25 }}
                  >
                    {currentCard.title}
                  </h3>
                  <p
                    style={{ fontFamily: "'Inter', sans-serif", color: isDark ? '#CBD5E1' : '#475569', fontSize: '0.75rem', fontWeight: 500, marginBottom: '0.75rem', lineHeight: 1.4 }}
                  >
                    {currentCard.tagline}
                  </p>

                  {/* Bullets */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem', marginBottom: '0.75rem', backgroundColor: isDark ? 'rgba(0,0,0,0.3)' : '#F8FAFC', padding: '0.625rem', borderRadius: '0.75rem', border: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid #E2E8F0' }}>
                    {currentCard.bullets.map((b, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: isDark ? '#E2E8F0' : '#334155' }}>
                        <div style={{ width: 14, height: 14, borderRadius: '50%', backgroundColor: 'rgba(37,99,235,0.15)', color: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <Check style={{ width: 9, height: 9 }} />
                        </div>
                        <span style={{ fontSize: '0.7rem', lineHeight: 1.35 }}>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mobile Bottom Info Strip */}
                <div style={{ marginTop: '0.5rem', paddingTop: '0.65rem', borderTop: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                  <span style={{ fontWeight: 600, color: isDark ? '#94A3B8' : '#64748B', fontSize: '0.75rem' }}>
                    {currentCard.highlightOutcome}
                  </span>
                  <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#2563EB', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                    {currentCard.badge} <ArrowUpRight style={{ width: 11, height: 11 }} />
                  </span>
                </div>
              </div>

              {/* Mobile Dot Nav */}
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.375rem', marginTop: '0.875rem' }}>
                {pagesData.map((c, i) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      setActiveIndex(i);
                      setHoveredIndex(i);
                    }}
                    style={{
                      height: 6,
                      borderRadius: 9999,
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.3s',
                      width: currentIndex === i ? 24 : 6,
                      backgroundColor: currentIndex === i ? '#2563EB' : isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)'
                    }}
                    aria-label={`Jump to ${c.title}`}
                  />
                ))}
              </div>
            </div>

            {/* ======================================================== */}
            {/* 2. DESKTOP FANNED PHYSICAL STACK (>= 1024px)              */}
            {/* Matches the Whiteboard Drawing Layout                      */}
            {/* ======================================================== */}
            <div
              className="nav-stack-desktop-deck"
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Top Header & Deck Controls */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid #E2E8F0' }}>
                <div>
                  <span
                    style={{
                      fontFamily: "'Manrope', sans-serif",
                      fontSize: '16px',
                      letterSpacing: '0.06em',
                      color: isDark ? '#38BDF8' : '#2563EB',
                      textTransform: 'uppercase',
                      fontWeight: 800,
                      display: 'block',
                    }}
                  >
                    GK NEXERGY ECOSYSTEM
                  </span>
                </div>

                {/* Counter & Controls */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span
                    style={{ fontFamily: "'Manrope', sans-serif", fontSize: '12px', fontWeight: 700, color: isDark ? '#94A3B8' : '#64748B' }}
                  >
                    <strong style={{ color: isDark ? '#ffffff' : '#0F172A', fontSize: '14px' }}>0{currentIndex + 1}</strong> / 0{total}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                    <button
                      onClick={handlePrev}
                      style={{ width: 36, height: 36, borderRadius: '50%', backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)', border: isDark ? '1px solid rgba(255,255,255,0.15)' : '1px solid rgba(0,0,0,0.12)', color: isDark ? '#E2E8F0' : '#0F172A', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s' }}
                      aria-label="Previous card"
                    >
                      <ChevronLeft style={{ width: 16, height: 16 }} />
                    </button>
                    <button
                      onClick={handleNext}
                      style={{ width: 36, height: 36, borderRadius: '50%', backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)', border: isDark ? '1px solid rgba(255,255,255,0.15)' : '1px solid rgba(0,0,0,0.12)', color: isDark ? '#E2E8F0' : '#0F172A', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s' }}
                      aria-label="Next card"
                    >
                      <ChevronRight style={{ width: 16, height: 16 }} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Whiteboard-Matched Fanning Stack Container */}
              <div className="nav-stack-stage">
                
                {/* 1. BACKGROUND FANNED CARDS (Slots 1..N stepped to the right) */}
                {pagesData.slice(1).map((card, offsetIdx) => {
                  const cardIdx = offsetIdx + 1;
                  const isSelected = currentIndex === cardIdx;
                  const xOffset = cardIdx * 58; // 58px right step per card
                  const yOffset = isSelected ? -14 : cardIdx * -3;
                  const zIndex = 25 - cardIdx;

                  return (
                    <div
                      key={card.id}
                      onMouseEnter={() => setHoveredIndex(cardIdx)}
                      onClick={() => handleCardClick(card)}
                      style={{
                        transform: `translateX(${xOffset}px) translateY(${yOffset}px)`,
                        zIndex: zIndex,
                      }}
                      className={`nav-stack-fanned-card ${isSelected ? 'is-active' : ''}`}
                    >
                      {/* Full-Bleed Image Background */}
                      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
                        <img
                          src={card.image}
                          alt={card.title}
                          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: isSelected ? (isDark ? 0.4 : 0.3) : (isDark ? 0.2 : 0.15), transition: 'all 0.5s' }}
                          loading="lazy"
                        />
                        <div style={{ position: 'absolute', inset: 0, background: isDark ? 'linear-gradient(to top, #0B1528 0%, rgba(9,17,34,0.85) 60%, rgba(9,17,34,0.7) 100%)' : 'linear-gradient(to top, rgba(248,250,252,0.95) 0%, rgba(248,250,252,0.85) 60%, rgba(248,250,252,0.7) 100%)' }} />
                      </div>

                      {/* Background Card Peek Content (visible in the space when hovered) */}
                      <div style={{ position: 'relative', zIndex: 10, height: '100%', padding: '1.5rem', paddingRight: '4.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', pointerEvents: 'none' }}>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.65rem' }}>
                            <div
                              style={{
                                width: 28,
                                height: 28,
                                borderRadius: '50%',
                                backgroundColor: '#ffffff',
                                border: '1px solid rgba(255,255,255,0.8)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                overflow: 'hidden',
                                flexShrink: 0,
                                boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
                              }}
                            >
                              <img
                                src="/images/gk-avatar-badge.png"
                                alt="GK Logo"
                                style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '1.5px' }}
                              />
                            </div>
                            <span style={{ fontSize: 11, fontWeight: 700, color: isDark ? '#93C5FD' : '#2563EB', textTransform: 'uppercase', letterSpacing: '0.08em', backgroundColor: isDark ? 'rgba(0,0,0,0.6)' : '#E0E7FF', backdropFilter: 'blur(8px)', padding: '0.2rem 0.6rem', borderRadius: 6, border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(37,99,235,0.2)' }}>
                              {card.category}
                            </span>
                          </div>
                          <h4 style={{ fontSize: '1.25rem', fontWeight: 700, color: isDark ? '#ffffff' : '#0F172A', marginBottom: '0.35rem' }}>
                            {card.title}
                          </h4>
                          <p style={{ fontSize: '0.85rem', color: isDark ? '#CBD5E1' : '#475569', lineHeight: 1.5 }}>
                            {card.tagline}
                          </p>
                        </div>

                        {/* Visual Thumbnail in the peek space */}
                        <div style={{ backgroundColor: isDark ? 'rgba(0,0,0,0.4)' : '#FFFFFF', backdropFilter: 'blur(8px)', padding: '0.75rem', borderRadius: '0.75rem', border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid #E2E8F0', boxShadow: isDark ? 'none' : '0 2px 8px rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <div style={{ width: 44, height: 44, borderRadius: 10, overflow: 'hidden', flexShrink: 0, border: '1px solid rgba(96,165,250,0.4)' }}>
                            <img src={card.image} alt={card.title || "GK Nexergy Solution"} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          </div>
                          <div style={{ minWidth: 0 }}>
                            <span style={{ fontSize: 10, fontWeight: 600, color: '#2563EB', display: 'block', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                              {card.category}
                            </span>
                            <span style={{ fontSize: 12, color: isDark ? '#E2E8F0' : '#1E293B', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block' }}>
                              {card.title}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* THE PHYSICAL RIGHT TAB (Permanently Visible in Fanned Stack like whiteboard drawing) */}
                      <div className={`nav-stack-tab-strip ${isSelected ? 'is-active' : ''}`}>
                        {/* Number Index */}
                        <span
                          style={{
                            fontFamily: "'Manrope', sans-serif",
                            fontSize: 14,
                            fontWeight: 800,
                            letterSpacing: '0.04em',
                            color: isDark ? '#ffffff' : (isSelected ? '#2563EB' : '#0F172A'),
                          }}
                        >
                          0{cardIdx + 1}
                        </span>

                        {/* Vertical Title Tab Label with "AI" or Page tag */}
                        <span 
                          className={`nav-stack-tab-label ${isSelected ? 'is-active' : ''}`}
                          style={{
                            color: isDark ? '#ffffff' : undefined,
                          }}
                        >
                          {card.tabLabel}
                        </span>

                        {/* Bottom Dot */}
                        <div
                          style={{
                            width: 10,
                            height: 10,
                            borderRadius: '50%',
                            backgroundColor: isSelected ? (isDark ? '#60A5FA' : '#2563EB') : isDark ? 'rgba(255,255,255,0.45)' : '#CBD5E1',
                            boxShadow: isSelected ? '0 0 10px rgba(37,99,235,0.6)' : 'none',
                            transform: isSelected ? 'scale(1.25)' : 'scale(1)',
                            transition: 'all 0.25s'
                          }}
                        />
                      </div>
                    </div>
                  );
                })}

                {/* 2. FRONT MAIN CARD (Positioned at left: 0, zIndex: 30) */}
                <div
                  onMouseEnter={() => setHoveredIndex(0)}
                  onClick={() => handleCardClick(currentCard)}
                  style={{
                    zIndex: currentIndex === 0 ? 35 : 30,
                    transform: currentIndex === 0 ? 'translateY(-4px)' : 'translateY(0px)',
                  }}
                  className="nav-stack-front-card"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleCardClick(currentCard);
                    }
                  }}
                  aria-label={`Explore ${currentCard.title}`}
                >
                  <div key={currentCard.id} style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      {/* TOP VISUAL BANNER with GK Monogram & Badges (Whiteboard Style) */}
                      <div style={{ position: 'relative', width: '100%', height: 215, borderRadius: '1rem', overflow: 'hidden', marginBottom: '1.15rem', flexShrink: 0, backgroundColor: isDark ? '#0F172A' : '#F1F5F9', border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid #E2E8F0' }}>
                        <img
                          src={currentCard.image}
                          alt={currentCard.title}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          loading="lazy"
                        />
                        <div style={{ position: 'absolute', inset: 0, background: isDark ? 'linear-gradient(to top, #0B1528 0%, rgba(11,21,40,0.3) 50%, rgba(0,0,0,0.6) 100%)' : 'linear-gradient(to top, rgba(15,23,42,0.85) 0%, rgba(15,23,42,0.3) 50%, rgba(0,0,0,0.5) 100%)' }} />

                        {/* Floating Badges: GK Logo from chatbot */}
                        <div style={{ position: 'absolute', top: 12, left: 12, right: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 10 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                            <div
                              style={{
                                width: 38,
                                height: 38,
                                borderRadius: '50%',
                                backgroundColor: '#ffffff',
                                border: '1.5px solid rgba(255,255,255,0.85)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                overflow: 'hidden',
                                flexShrink: 0,
                                boxShadow: '0 4px 14px rgba(0,0,0,0.35)',
                              }}
                            >
                              <img
                                src="/images/gk-avatar-badge.png"
                                alt="GK Nexergy Logo"
                                style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '2px' }}
                              />
                            </div>
                            <span
                              style={{ fontFamily: "'Manrope', sans-serif", fontSize: 11, fontWeight: 700, color: '#93C5FD', textTransform: 'uppercase', letterSpacing: '0.08em', backgroundColor: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(8px)', padding: '0.25rem 0.65rem', borderRadius: 6, border: '1px solid rgba(255,255,255,0.1)' }}
                            >
                              {currentCard.category}
                            </span>
                          </div>

                          <span
                            style={{ fontFamily: "'Manrope', sans-serif", fontSize: 12, fontWeight: 700, color: '#ffffff', backgroundColor: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(8px)', padding: '0.25rem 0.65rem', borderRadius: 9999, border: '1px solid rgba(255,255,255,0.1)' }}
                          >
                            0{currentIndex + 1} / 0{total}
                          </span>
                        </div>
                      </div>

                      {/* Title & Tagline */}
                      <h3
                        style={{ fontFamily: "'Manrope', sans-serif", fontSize: '1.5rem', fontWeight: 800, color: isDark ? '#ffffff' : '#0F172A', marginBottom: '0.35rem', lineHeight: 1.2 }}
                      >
                        {currentCard.title}
                      </h3>
                      <p
                        style={{ fontFamily: "'Inter', sans-serif", color: isDark ? '#CBD5E1' : '#475569', fontSize: '0.9rem', fontWeight: 500, marginBottom: '1rem', lineHeight: 1.5 }}
                      >
                        {currentCard.tagline}
                      </p>

                      {/* 4 Feature Deliverable Bullets (Matching the Whiteboard Card Lines) */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '0.85rem', backgroundColor: isDark ? 'rgba(0,0,0,0.3)' : '#F8FAFC', padding: '0.9rem 1rem', borderRadius: '0.85rem', border: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid #E2E8F0' }}>
                        {currentCard.bullets.map((b, i) => (
                          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.85rem', color: isDark ? '#E2E8F0' : '#334155' }}>
                            <div style={{ width: 16, height: 16, borderRadius: '50%', backgroundColor: 'rgba(37,99,235,0.15)', color: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                              <Check style={{ width: 11, height: 11 }} />
                            </div>
                            <span style={{ fontFamily: "'Inter', sans-serif", lineHeight: 1.4, fontSize: '0.85rem' }}>{b}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Info Strip */}
                    <div style={{ paddingTop: '0.85rem', borderTop: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                      <span style={{ fontWeight: 600, color: isDark ? '#94A3B8' : '#64748B', fontSize: '0.8rem', letterSpacing: '0.04em' }}>
                        {currentCard.highlightOutcome}
                      </span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontWeight: 700, color: '#2563EB' }}>
                        <span style={{ textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.08em' }}>
                          {currentCard.badge}
                        </span>
                        <ArrowUpRight style={{ width: 13, height: 13 }} />
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Bottom Dot Nav Indicators */}
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', marginTop: '1.25rem' }}>
                {pagesData.map((c, i) => (
                  <button
                    key={c.id}
                    onMouseEnter={() => setHoveredIndex(i)}
                    onClick={() => {
                      setActiveIndex(i);
                      setHoveredIndex(i);
                    }}
                    style={{
                      height: 6,
                      borderRadius: 9999,
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.3s',
                      width: currentIndex === i ? 32 : 8,
                      backgroundColor: currentIndex === i ? '#3B82F6' : 'rgba(255,255,255,0.2)'
                    }}
                    aria-label={`Jump to ${c.title}`}
                  />
                ))}
              </div>

            </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 3. AI CHATBOT INTERACTIVE MODAL WITH REAL-TIME NAVIGATION */}
      {/* ======================================================== */}
      <AnimatePresence>
        {chatOpen && (
          <div data-lenis-prevent="true" style={{ position: 'fixed', inset: 0, zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', backgroundColor: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)', overscrollBehavior: 'contain' }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.25 }}
              data-lenis-prevent="true"
              style={{ width: '100%', maxWidth: 580, height: 640, maxHeight: '92vh', backgroundColor: '#0A1120', border: '1px solid rgba(96,165,250,0.3)', borderRadius: '1.25rem', boxShadow: '0 25px 60px rgba(0,0,0,0.85)', display: 'flex', flexDirection: 'column', overflow: 'hidden', overscrollBehavior: 'contain' }}
            >
              {/* Chat Header */}
              <div style={{ padding: '1rem 1.25rem', backgroundColor: '#0F1A30', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ width: 38, height: 38, borderRadius: '50%', overflow: 'hidden', boxShadow: '0 4px 12px rgba(37,99,235,0.4)' }}>
                    <img src="/images/gk-avatar-badge.png" alt="GK Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff', margin: 0 }}>
                        GK Nexergy AI Assistant
                      </h3>
                      <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#34D399', backgroundColor: 'rgba(16,185,129,0.15)', padding: '0.1rem 0.4rem', borderRadius: 9999 }}>
                        LIVE ONLINE
                      </span>
                    </div>
                    <p style={{ fontSize: '0.75rem', color: '#94A3B8', margin: 0 }}>
                      Real-time Website Knowledge & Live Page Navigation
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <button
                    onClick={() => setShowApiKeyInput(!showApiKeyInput)}
                    style={{ padding: '0.35rem 0.6rem', borderRadius: 8, backgroundColor: openAiKey ? 'rgba(37,99,235,0.2)' : 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: openAiKey ? '#60A5FA' : '#94A3B8', cursor: 'pointer', fontSize: '0.7rem', display: 'flex', alignItems: 'center', gap: 4 }}
                    title="Configure OpenAI API Key (Optional)"
                  >
                    <Key style={{ width: 12, height: 12 }} />
                    <span style={{ display: 'none', md: 'inline' }}>{openAiKey ? 'OpenAI Active' : 'API Key'}</span>
                  </button>
                  <button
                    onClick={() => setChatMessages([chatMessages[0]])}
                    style={{ padding: '0.35rem', borderRadius: 8, backgroundColor: 'rgba(255,255,255,0.06)', border: 'none', color: '#94A3B8', cursor: 'pointer' }}
                    title="Reset conversation"
                  >
                    <RotateCcw style={{ width: 14, height: 14 }} />
                  </button>
                  <button
                    onClick={() => setChatOpen(false)}
                    style={{ padding: '0.35rem', borderRadius: 8, backgroundColor: 'rgba(255,255,255,0.06)', border: 'none', color: '#94A3B8', cursor: 'pointer' }}
                  >
                    <X style={{ width: 16, height: 16 }} />
                  </button>
                </div>
              </div>

              {/* Optional OpenAI API Key drawer */}
              {showApiKeyInput && (
                <div style={{ padding: '0.75rem 1rem', backgroundColor: '#080E1A', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <input
                    type="password"
                    placeholder="Enter OpenAI API Key (sk-...) for live GPT-4o-mini"
                    value={openAiKey}
                    onChange={(e) => {
                      setOpenAiKey(e.target.value);
                      localStorage.setItem('gk_openai_key', e.target.value);
                    }}
                    style={{ flex: 1, padding: '0.4rem 0.75rem', borderRadius: 6, backgroundColor: '#030712', border: '1px solid rgba(255,255,255,0.15)', color: '#ffffff', fontSize: '0.75rem', outline: 'none' }}
                  />
                  <button
                    onClick={() => setShowApiKeyInput(false)}
                    style={{ padding: '0.4rem 0.75rem', borderRadius: 6, backgroundColor: '#2563EB', color: '#ffffff', fontSize: '0.75rem', fontWeight: 600, border: 'none', cursor: 'pointer' }}
                  >
                    Save
                  </button>
                </div>
              )}

              {/* Chat Messages Body */}
              <div style={{ flex: 1, padding: '1rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                {chatMessages.map((msg) => (
                  <div
                    key={msg.id}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                    }}
                  >
                    <div
                      style={{
                        maxWidth: '88%',
                        padding: '0.85rem 1rem',
                        borderRadius: '1rem',
                        borderBottomRightRadius: msg.sender === 'user' ? '0.25rem' : '1rem',
                        borderBottomLeftRadius: msg.sender === 'bot' ? '0.25rem' : '1rem',
                        backgroundColor: msg.sender === 'user' ? '#2563EB' : 'rgba(255,255,255,0.06)',
                        color: msg.sender === 'user' ? '#ffffff' : '#E2E8F0',
                        fontSize: '0.85rem',
                        lineHeight: 1.55,
                        border: msg.sender === 'bot' ? '1px solid rgba(255,255,255,0.08)' : 'none',
                      }}
                    >
                      <div>{msg.text}</div>

                      {/* Interactive In-Chat Navigation Actions */}
                      {msg.actions && msg.actions.length > 0 && (
                        <div style={{ marginTop: '0.75rem', paddingTop: '0.65rem', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                          {msg.actions.map((act, i) => (
                            <button
                              key={i}
                              onClick={() => {
                                if (act.external) {
                                  window.open(act.to, '_blank');
                                } else {
                                  setChatOpen(false);
                                  navigate(act.to);
                                }
                              }}
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.35rem',
                                padding: '0.35rem 0.75rem',
                                borderRadius: 9999,
                                backgroundColor: act.primary ? '#2563EB' : 'rgba(255,255,255,0.1)',
                                color: '#ffffff',
                                fontSize: '0.75rem',
                                fontWeight: 700,
                                border: act.primary ? '1px solid #60A5FA' : '1px solid rgba(255,255,255,0.15)',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                              }}
                            >
                              <Navigation style={{ width: 11, height: 11 }} />
                              <span>{act.label}</span>
                              {act.external ? <ExternalLink style={{ width: 10, height: 10 }} /> : <ArrowRight style={{ width: 10, height: 10 }} />}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    <span style={{ fontSize: '0.65rem', color: '#64748B', marginTop: 4, padding: '0 4px' }}>
                      {msg.sender === 'user' ? 'You' : 'GK Assistant'} &bull; {msg.time}
                    </span>
                  </div>
                ))}

                {isTyping && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 0.85rem', backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: '1rem', width: 'fit-content' }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#60A5FA' }} className="animate-ping" />
                    <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>AI Assistant is thinking...</span>
                  </div>
                )}
              </div>

              {/* Quick Prompts */}
              <div style={{ padding: '0.5rem 1rem', backgroundColor: 'rgba(0,0,0,0.2)', borderTop: '1px solid rgba(255,255,255,0.04)', display: 'flex', gap: '0.5rem', overflowX: 'auto', scrollbarWidth: 'none' }}>
                {samplePrompts.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setChatInput(p);
                    }}
                    style={{ fontSize: '0.7rem', padding: '0.35rem 0.65rem', borderRadius: 9999, backgroundColor: 'rgba(37,99,235,0.12)', border: '1px solid rgba(59,130,246,0.3)', color: '#93C5FD', whiteSpace: 'nowrap', cursor: 'pointer', flexShrink: 0 }}
                  >
                    {p}
                  </button>
                ))}
              </div>

              {/* Chat Input Bar */}
              <form onSubmit={handleSendMessage} style={{ padding: '0.85rem 1rem', backgroundColor: '#0F1A30', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', gap: '0.5rem' }}>
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask anything or type 'Take me to Academy'..."
                  style={{ flex: 1, padding: '0.65rem 0.85rem', borderRadius: '0.75rem', backgroundColor: '#070D1B', border: '1px solid rgba(255,255,255,0.12)', color: '#ffffff', fontSize: '0.85rem', outline: 'none' }}
                />
                <button
                  type="submit"
                  disabled={!chatInput.trim()}
                  style={{ padding: '0.65rem 1rem', borderRadius: '0.75rem', backgroundColor: '#2563EB', color: '#ffffff', border: 'none', cursor: chatInput.trim() ? 'pointer' : 'not-allowed', opacity: chatInput.trim() ? 1 : 0.5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <Send style={{ width: 16, height: 16 }} />
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ======================================================== */}
      {/* 4. AI TRANSLATION TOOL INTERACTIVE MODAL                 */}
      {/* ======================================================== */}
      <AnimatePresence>
        {translateOpen && (
          <div data-lenis-prevent="true" style={{ position: 'fixed', inset: 0, zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', backgroundColor: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)', overscrollBehavior: 'contain' }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.25 }}
              data-lenis-prevent="true"
              style={{ width: '100%', maxWidth: 560, backgroundColor: '#0A1120', border: '1px solid rgba(99,102,241,0.4)', borderRadius: '1.25rem', boxShadow: '0 25px 60px rgba(0,0,0,0.85)', display: 'flex', flexDirection: 'column', overflow: 'hidden', overscrollBehavior: 'contain' }}
            >
              {/* Header */}
              <div style={{ padding: '1rem 1.25rem', backgroundColor: '#0F1A30', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ width: 38, height: 38, borderRadius: 10, backgroundColor: '#4F46E5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', boxShadow: '0 4px 12px rgba(79,70,229,0.4)' }}>
                    <Languages style={{ width: 20, height: 20 }} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff', margin: 0 }}>
                      GK Neural Language Translator
                    </h3>
                    <p style={{ fontSize: '0.75rem', color: '#94A3B8', margin: 0 }}>
                      Live real-time translation for global clients & students
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setTranslateOpen(false)}
                  style={{ padding: '0.35rem', borderRadius: 8, backgroundColor: 'rgba(255,255,255,0.06)', border: 'none', color: '#94A3B8', cursor: 'pointer' }}
                >
                  <X style={{ width: 16, height: 16 }} />
                </button>
              </div>

              {/* Translation Workspace */}
              <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                
                {/* Language Selectors */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem', backgroundColor: 'rgba(255,255,255,0.03)', padding: '0.75rem', borderRadius: '0.75rem', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Globe2 style={{ width: 16, height: 16, color: '#60A5FA' }} />
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#ffffff' }}>Source: English</span>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '0.8rem', color: '#94A3B8' }}>Translate To:</span>
                    <select
                      value={targetLang}
                      onChange={(e) => {
                        const newLang = e.target.value;
                        setTargetLang(newLang);
                        handleTranslate(sourceText, newLang);
                      }}
                      style={{ padding: '0.35rem 0.65rem', borderRadius: 6, backgroundColor: '#070D1B', border: '1px solid rgba(96,165,250,0.4)', color: '#ffffff', fontSize: '0.8rem', outline: 'none', cursor: 'pointer' }}
                    >
                      <option value="te">Telugu (తెలుగు)</option>
                      <option value="hi">Hindi (हिन्दी)</option>
                      <option value="es">Spanish (Español)</option>
                      <option value="fr">French (Français)</option>
                      <option value="de">German (Deutsch)</option>
                      <option value="ja">Japanese (日本語)</option>
                    </select>
                  </div>
                </div>

                {/* Text Input Area */}
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#94A3B8', display: 'block', marginBottom: '0.35rem' }}>
                    Input Text:
                  </label>
                  <textarea
                    rows={3}
                    value={sourceText}
                    onChange={(e) => setSourceText(e.target.value)}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '0.75rem', backgroundColor: '#070D1B', border: '1px solid rgba(255,255,255,0.12)', color: '#ffffff', fontSize: '0.85rem', outline: 'none', resize: 'none' }}
                  />
                </div>

                {/* Action Row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: '0.35rem', overflowX: 'auto' }}>
                    {[
                      'Train. Build. Transform.',
                      'Software & Application Engineering for modern enterprises.',
                      'Practical education aligned with IT industry standards.',
                    ].map((sample, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setSourceText(sample);
                          handleTranslate(sample, targetLang);
                        }}
                        style={{ fontSize: '0.65rem', padding: '0.25rem 0.5rem', borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#CBD5E1', cursor: 'pointer', whiteSpace: 'nowrap' }}
                      >
                        Sample {idx + 1}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => handleTranslate(sourceText, targetLang)}
                    disabled={isTranslating}
                    style={{ padding: '0.5rem 1.25rem', borderRadius: 9999, backgroundColor: '#4F46E5', color: '#ffffff', fontWeight: 700, fontSize: '0.8rem', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: '0 4px 15px rgba(79,70,229,0.4)' }}
                  >
                    <Sparkles style={{ width: 14, height: 14 }} />
                    <span>{isTranslating ? 'Translating...' : 'Translate'}</span>
                  </button>
                </div>

                {/* Translation Output Card */}
                <div style={{ backgroundColor: '#070D1B', border: '1px solid rgba(99,102,241,0.3)', borderRadius: '0.75rem', padding: '1rem', position: 'relative' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#A5B4FC', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      AI Output Result
                    </span>
                    <button
                      onClick={handleCopyTranslation}
                      style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', padding: '0.2rem 0.5rem', borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.06)', border: 'none', color: '#94A3B8', fontSize: '0.7rem', cursor: 'pointer' }}
                    >
                      {copied ? <CheckCheck style={{ width: 12, height: 12, color: '#34D399' }} /> : <Copy style={{ width: 12, height: 12 }} />}
                      <span>{copied ? 'Copied!' : 'Copy'}</span>
                    </button>
                  </div>
                  <p style={{ color: '#ffffff', fontSize: '0.925rem', lineHeight: 1.6, margin: 0 }}>
                    {translatedResult}
                  </p>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default NavPagesStack;
