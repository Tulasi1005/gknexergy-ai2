import {
    Code2, Smartphone, RefreshCw, BrainCircuit, BarChart3, TrendingUp,
    ShieldCheck, Megaphone, Database, Layers, Cloud, GraduationCap,
} from "lucide-react";

export const SOLUTIONS = [
    {
        slug: "software-development",
        icon: Code2,
        title: "Software Development",
        shortTitle: "Software & Application Engineering",
        tagline: "Software Built Around Your Business.",
        description:
            "We design and engineer web applications, custom software and business platforms that fit the way your organisation actually works — scalable, maintainable and built for real users.",
        features: [
            "Web applications",
            "Custom software",
            "Business platforms",
            "API development",
            "Workflow systems",
            "Scalable architecture",
        ],
        flow: ["Discover", "Design", "Develop", "Deploy", "Improve"],
        cta: "Discuss Your Software Project",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop",
        visual: "architecture",
    },
    {
        slug: "mobile-development",
        icon: Smartphone,
        title: "Mobile Application Development",
        shortTitle: "Mobile Applications",
        tagline: "Mobile Experiences Designed for Real Users.",
        description:
            "From customer-facing apps to internal business tools, we build mobile experiences that are fast, reliable and designed around the people who use them every day.",
        features: [
            "Android applications",
            "iOS applications",
            "Cross-platform applications",
            "Business applications",
            "Customer applications",
            "Scalable mobile architecture",
        ],
        flow: ["Discover", "Design", "Develop", "Deploy", "Improve"],
        cta: "Build a Mobile Solution",
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1200&auto=format&fit=crop",
        visual: "mobile",
    },
    {
        slug: "digital-transformation",
        icon: RefreshCw,
        title: "Digital Transformation",
        shortTitle: "Digital Transformation",
        tagline: "From Manual Processes to Digital Possibilities.",
        description:
            "We enable businesses to transition from traditional and manual processes toward scalable, technology-enabled operating models — at the pace your organisation can absorb.",
        features: [
            "Process digitisation",
            "Workflow automation readiness",
            "Technology roadmapping",
            "Systems integration",
            "Change enablement",
            "Scalable operating models",
        ],
        flow: ["Manual", "Connected", "Automated", "Intelligent"],
        cta: "Start Your Transformation",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop",
        visual: "transformation",
    },
    {
        slug: "ai-automation",
        icon: BrainCircuit,
        title: "AI & Automation",
        shortTitle: "AI & Automation",
        tagline: "Turn Data and Workflows Into Intelligent Systems.",
        description:
            "We help organisations apply AI and automation where it genuinely adds value — intelligent workflows, decision support and process automation grounded in your real operations.",
        features: [
            "AI automation",
            "Intelligent workflows",
            "Generative AI",
            "Predictive capabilities",
            "Decision support",
            "Process automation",
            "Personalization",
        ],
        flow: ["Data", "Model", "Automate", "Assist", "Learn"],
        cta: "Explore AI for Your Business",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200&auto=format&fit=crop",
        visual: "ai",
    },
    {
        slug: "data-analytics",
        icon: BarChart3,
        title: "Data & Analytics",
        shortTitle: "Data & Analytics",
        tagline: "Turn Business Data Into Better Decisions.",
        description:
            "We transform fragmented business information into actionable intelligence — from databases and reporting to business intelligence and data engineering.",
        features: [
            "Data analytics",
            "Database solutions",
            "Reporting",
            "Business intelligence",
            "Data engineering",
        ],
        flow: ["Data", "Insight", "Decision", "Action"],
        cta: "Unlock Your Data",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
        visual: "data",
    },
    {
        slug: "digital-growth",
        icon: TrendingUp,
        title: "Digital Growth",
        shortTitle: "Digital Growth",
        tagline: "Build a Stronger Digital Presence.",
        description:
            "We help organisations strengthen their digital presence — combining digital strategy, brand visibility and AI-powered marketing tools to reach and engage the right audiences.",
        features: [
            "Digital marketing",
            "Brand visibility",
            "Customer reach",
            "Digital strategy",
            "AI-powered marketing tools",
            "Market engagement",
        ],
        flow: ["Presence", "Reach", "Engage", "Convert", "Grow"],
        cta: "Grow With Us",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
        visual: "growth",
    },
];

export const MEGA_COMPANY = {
    columns: [
        {
            title: "About & Leadership",
            to: "/about",
            image: "/images/mega-team.jpg",
            links: [
                { label: "About Us & Story", to: "/about" },
                { label: "Vision & Strategic Mission", to: "/vision" },
            ],
        },
        {
            title: "Why GK Nexergy",
            to: "/why-gk-nexergy",
            badge: "SPECIALIST",
            image: "/images/mega-globe.jpg",
            links: [
                { label: "What Sets Us Apart", to: "/why-gk-nexergy" },
                { label: "Client Success & Projects", to: "/projects" },
            ],
        },
        {
            title: "Industries & Reach",
            to: "/industries",
            image: "/images/mega-skyscrapers.jpg",
            links: [
                { label: "Industries We Serve", to: "/industries" },
                { label: "Interactive Showcase", to: "/landing" },
            ],
        },
    ],
    callout: {
        title: "Building Digital Excellence.",
        desc: "Partner with GK Nexergy for proven software architecture, digital roadmaps, and transformative engineering capacity.",
        ctaLabel: "GK NEXERGY",
        to: "/contact",
    },
};

export const MEGA_SOLUTIONS = {
    columns: [
        {
            title: "Software & Engineering",
            to: "/solutions/software-development",
            image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80",
            links: [
                { label: "Software Development", to: "/solutions/software-development" },
                { label: "Mobile Applications", to: "/solutions/mobile-development" },
            ],
        },
        {
            title: "AI & Innovation",
            to: "/solutions/ai-automation",
            badge: "SPECIALIST",
            image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=600&q=80",
            links: [
                { label: "AI & Automation", to: "/solutions/ai-automation" },
                { label: "Digital Transformation", to: "/solutions/digital-transformation" },
            ],
        },
        {
            title: "Data & Strategy",
            to: "/solutions/data-analytics",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
            links: [
                { label: "Data & Analytics", to: "/solutions/data-analytics" },
                { label: "Digital Growth", to: "/solutions/digital-growth" },
            ],
        },
    ],
    callout: {
        title: "Reasonable and Reliable Solutions.",
        desc: "Reasonable and reliable technology, GK Nexergy has an engineering package tailored to your exact business needs! In a rush? Connect with us in as little as 10 minutes.",
        ctaLabel: "GK NEXERGY",
        to: "/contact",
    },
};

export const MEGA_ACADEMY = {
    columns: [
        {
            title: "Academy & Foundations",
            to: "/academy",
            image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80",
            links: [
                { label: "Nexergy Academy Overview", to: "/academy" },
                { label: "Foundation Program (Python & Cloud)", to: "/academy/foundation-program" },
            ],
        },
        {
            title: "Cyber Security",
            to: "/academy/cyber-security",
            badge: "SPECIALIST",
            image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80",
            links: [
                { label: "Cyber Security & Ethical Hacking", to: "/academy/cyber-security" },
                { label: "Explore All Courses", to: "/academy/courses" },
            ],
        },
        {
            title: "Data & Databases",
            to: "/academy/postgresql-mastery",
            image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80",
            links: [
                { label: "Database Architecture Mastery", to: "/academy/postgresql-mastery" },
                { label: "AI & Digital Marketing", to: "/academy/ai-digital-marketing" },
            ],
        },
    ],
    callout: {
        title: "Train. Build. Transform.",
        desc: "Equipping developers, graduates, and professionals with hands-on, high-demand skills to build successful technology careers.",
        ctaLabel: "JOIN ACADEMY",
        to: "/academy",
    },
};

export const COURSES = [
    {
        slug: "cyber-security",
        icon: ShieldCheck,
        category: "Security",
        title: "Cyber Security",
        subtitle: "Ethical Hacking",
        tagline: "Learn to Think Like an Attacker. Defend Like a Professional.",
        description:
            "A practical cyber security program covering security fundamentals and ethical hacking — built around hands-on labs, real attack surfaces and defensive thinking.",
        topics: [
            "Cyber security fundamentals",
            "Ethical hacking methodology",
            "Network & system security",
            "Vulnerability assessment",
            "Web application security",
            "Security tooling & labs",
        ],
        outcomes: [
            "Understand how attacks are planned and executed",
            "Assess systems for common vulnerabilities",
            "Apply defensive and hardening practices",
            "Work confidently with industry security tools",
        ],
        audience: "Students, graduates and professionals who want to enter or move into cyber security.",
        image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1600&auto=format&fit=crop",
    },
    {
        slug: "ai-digital-marketing",
        icon: Megaphone,
        category: "AI & Growth",
        title: "AI Tools & Digital Marketing",
        subtitle: "AI-Assisted Growth",
        tagline: "Market Smarter With AI at Your Side.",
        description:
            "A practical program on using modern AI tools across digital marketing — from AI-assisted content and productivity to digital growth strategy and real campaign applications.",
        topics: [
            "AI tools for marketing",
            "Digital marketing fundamentals",
            "AI-assisted content creation",
            "Productivity with AI",
            "Digital growth strategy",
            "Practical campaign applications",
        ],
        outcomes: [
            "Use AI tools confidently in daily marketing work",
            "Plan and execute digital campaigns",
            "Create AI-assisted content responsibly",
            "Measure and improve digital growth efforts",
        ],
        audience: "Students, marketers, entrepreneurs and professionals looking to combine AI with digital marketing.",
        image: "https://images.unsplash.com/photo-1644088379091-d574269d422f?q=80&w=1600&auto=format&fit=crop",
    },
    {
        slug: "databases",
        icon: Database,
        category: "Data",
        title: "Databases In-Depth",
        subtitle: "Enterprise Database Architecture",
        tagline: "Master the Layer Every Application Depends On.",
        description:
            "A deep, practical program on enterprise databases — from data modelling and system architecture to high-speed queries and real application data flows.",
        topics: [
            "Database fundamentals",
            "Advanced Database Querying",
            "Enterprise Database Systems",
            "Data modelling",
            "Querying & optimisation",
            "Practical database concepts",
        ],
        outcomes: [
            "Design clean, well-modelled databases",
            "Write confident, efficient database queries",
            "Build and scale real-world enterprise databases",
            "Understand how data powers applications",
        ],
        audience: "Students, graduates and developers who want strong, practical database skills.",
        image: "https://images.unsplash.com/photo-1666875753105-c63a6f3bdc86?q=80&w=1600&auto=format&fit=crop",
    },
    {
        slug: "foundation-program",
        icon: Layers,
        category: "Foundation",
        title: "Foundation Program",
        subtitle: "Python • Databases • Cloud • AI",
        tagline: "Build Your Technology Foundation.",
        description:
            "A structured learning journey across the core technologies of modern software — Python, Databases, Cloud Platforms and AI Fundamentals — designed to take learners from basics to industry readiness.",
        topics: [
            "Python programming",
            "Enterprise Databases",
            "AWS / Azure cloud fundamentals",
            "AI fundamentals",
            "Practical projects",
            "Mentored learning",
        ],
        journey: [
            { step: "Python", text: "Programming fundamentals and problem solving with Python." },
            { step: "Databases", text: "Data modelling, architecture, and real-world database systems." },
            { step: "AWS / Azure", text: "Cloud fundamentals and deploying real workloads." },
            { step: "AI Fundamentals", text: "How modern AI works and where it is applied." },
        ],
        audience: "Students, graduates, career returnees and anyone starting a serious technology journey.",
        image: "https://images.unsplash.com/photo-1610563166150-b34df4f3bcd6?q=80&w=1600&auto=format&fit=crop",
    },
];

export const INDUSTRIES = [
    {
        name: "Startups",
        category: "Venture & Growth",
        image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=1200&auto=format&fit=crop",
        text: "Move from idea to working product with technology that scales as you grow.",
        highlights: ["Rapid MVP Delivery", "Scalable Cloud Architecture", "Modern Tech Stack"],
    },
    {
        name: "Small & Medium Businesses",
        category: "Operations & SMB",
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop",
        text: "Practical systems and automation that remove manual effort without enterprise complexity.",
        highlights: ["Workflow Automation", "CRM & ERP Integrations", "Cost Efficiency"],
    },
    {
        name: "Education",
        category: "EdTech & Learning",
        image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200&auto=format&fit=crop",
        text: "Learning platforms, digital operations and technology-enabled delivery for education providers.",
        highlights: ["Interactive LMS", "Student Portals", "Assessment Tools"],
    },
    {
        name: "Professional Services",
        category: "Consulting & Corporate",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop",
        text: "Workflow systems, client platforms and data visibility for service-driven organisations.",
        highlights: ["Client Portals", "Document Automation", "Executive Analytics"],
    },
    {
        name: "Retail",
        category: "Commerce & Retail",
        image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop",
        text: "Digital presence, customer engagement and back-office technology for modern retail.",
        highlights: ["Omnichannel Stores", "Inventory Tracking", "Loyalty Systems"],
    },
    {
        name: "Healthcare",
        category: "HealthTech & Care",
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200&auto=format&fit=crop",
        text: "Reliable, secure systems that support care delivery and administrative efficiency.",
        highlights: ["HIPAA-Ready Compliance", "Electronic Health Records", "Telehealth Tech"],
    },
    {
        name: "Finance",
        category: "FinTech & Banking",
        image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1200&auto=format&fit=crop",
        text: "Data integrity, reporting and secure application development for finance operations.",
        highlights: ["Secure Integrations", "Real-Time Reporting", "Audit & Risk Tech"],
    },
    {
        name: "Technology",
        category: "Software & Cloud",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
        text: "Engineering capacity, specialist skills and delivery support for technology teams.",
        highlights: ["Dedicated Engineers", "Cloud & DevOps", "API Systems"],
    },
    {
        name: "Other Growing Organizations",
        category: "Enterprise Evolution",
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop",
        text: "Whatever your sector, we adapt technology to your organisation's requirements and stage of growth.",
        highlights: ["Custom Software", "Legacy Modernization", "Strategic Roadmap"],
    },
];

export const NAV = {
    company: [
        { label: "About", to: "/about", desc: "Who we are and what drives us" },
        { label: "Vision & Mission", to: "/vision", desc: "The future we are building toward" },
        { label: "Why GK Nexergy", to: "/why-gk-nexergy", desc: "What makes us different" },
        { label: "Industries", to: "/industries", desc: "Sectors we work with" },
        { label: "Landing Showcase", to: "/landing", desc: "Interactive globe & ecosystem showcase" },
    ],
    solutions: SOLUTIONS.map((s) => ({
        label: s.title,
        to: `/solutions/${s.slug}`,
        desc: s.tagline,
    })),
    academy: [
        { label: "Nexergy Academy", to: "/academy", desc: "Beyond technology. Building human capital." },
        { label: "Courses", to: "/academy/courses", desc: "Industry-relevant programs" },
        ...COURSES.map((c) => ({
            label: c.title,
            to: `/academy/${c.slug}`,
            desc: c.subtitle,
        })),
    ],
};

export const ECOSYSTEM_NODES = [
    {
        label: "Software Development",
        seoTitle: "Custom Software Development & Enterprise Engineering",
        icon: Code2,
        to: "/solutions/software-development",
        tagline: "Custom Software Engineering",
        desc: "Custom software development, high-performance web applications, and scalable API architecture.",
        keywords: "Custom Software Development, Web Application Engineering, API Architecture, Agile Pods",
    },
    {
        label: "Digital Transformation",
        seoTitle: "Enterprise Digital Transformation & Modernization",
        icon: RefreshCw,
        to: "/solutions/digital-transformation",
        tagline: "Enterprise Modernization",
        desc: "Enterprise digital transformation, cloud modernization, and automated operating models.",
        keywords: "Digital Transformation, Enterprise Modernization, Cloud Infrastructure, Process Automation",
    },
    {
        label: "Digital Growth",
        seoTitle: "AI-Powered Digital Growth & Marketing Strategy",
        icon: TrendingUp,
        to: "/solutions/digital-growth",
        tagline: "AI Marketing & Growth",
        desc: "AI-driven digital marketing strategy, customer acquisition systems, and brand visibility.",
        keywords: "Digital Growth, AI Marketing, Brand Strategy, Growth Architecture",
    },
    {
        label: "Nexergy Academy",
        seoTitle: "Nexergy Academy - Industry Tech Training & Upskilling",
        icon: GraduationCap,
        to: "/academy",
        tagline: "Tech Talent & Upskilling",
        desc: "Industry-ready developer training, ethical hacking, Python, and cloud certification pathways.",
        keywords: "Tech Academy, Cyber Security Training, Python Cloud Foundation, Industry Readiness",
    },
];

export const IMAGES = {
    team: "https://images.pexels.com/photos/6804068/pexels-photo-6804068.jpeg?auto=compress&cs=tinysrgb&w=1600",
};