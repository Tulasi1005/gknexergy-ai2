import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    CheckCircle2,
    ArrowRight,
    Sparkles,
    Check,
    ChevronDown,
    Clock,
    Users,
    Layers,
    ChevronsRight,
    Share2,
    Image as ImageIcon,
    Clapperboard,
    PenTool,
    Megaphone,
    Camera,
    TrendingUp,
    MapPin,
    Target,
    Palette,
    FileText,
    ShieldCheck,
    DollarSign,
    Minus,
    Zap,
    SlidersHorizontal,
    Smartphone,
    Globe,
    Search
} from "lucide-react";
import { Reveal } from "../Reveal";
import "./PricingPlans.css";

export const MOBILE_PRICING_DATA = [
    {
        id: "starter",
        number: "01",
        exactLabel: "Starter",
        exactArrow: ">>",
        theme: "cyan",
        icon: Smartphone,
        cardClass: "pillar-card-starter",
        headerClass: "pillar-header-starter",
        btnClass: "pillar-btn-starter",
        badge: "STARTER • MOBILE ASO",
        title: "Starter",
        subtitle: "ASO + Paid Ads Management + Basic Monthly Reporting",
        features: [
            {
                title: "App Store Optimisation (ASO)",
                desc: "Rankings and installs on App Store & Google Play with keyword & metadata optimization"
            },
            {
                title: "Paid Ads Management",
                desc: "Targeted Meta & Google Ads conversion funnels for app installs"
            },
            {
                title: "Basic Monthly Reporting",
                desc: "Attribution, cost per install (CPI), and core performance analytics tracking"
            },
            {
                title: "AI Tools & Automation",
                desc: "Automated keyword research, metadata suggestions, and ranking monitoring alerts"
            }
        ],
        ctaText: "Get Started with Starter",
        ctaTo: "/contact?plan=mobile-starter",
        isPopular: false
    },
    {
        id: "growth",
        number: "02",
        exactLabel: "Growth",
        exactArrow: ">>",
        theme: "royal",
        icon: Target,
        cardClass: "pillar-card-growth",
        headerClass: "pillar-header-growth",
        btnClass: "pillar-btn-growth",
        badge: "RECOMMENDED • SCALE-UP",
        recommendedLabel: "Recommended",
        title: "Growth",
        subtitle: "ASO + Paid Ads + Content/SEO + Social Media + Retention + Full Reporting",
        features: [
            {
                title: "App Store Optimisation (ASO)",
                desc: "Comprehensive metadata, keyword gap ranking, competitor tracking & conversion asset optimization"
            },
            {
                title: "Paid Ads Management",
                desc: "Multi-channel Meta Ads & Google Ads conversion funnels scaled to target CPA/CPI"
            },
            {
                title: "Content & Organic SEO",
                desc: "Technical, on-page, and authority content driving web-to-app organic discovery"
            },
            {
                title: "Social Media Marketing",
                desc: "Platform-native creative content, branded reels, and active app community growth"
            },
            {
                title: "User Retention & Funnels",
                desc: "Automated drip messaging, push notifications, and onboarding funnel optimization"
            },
            {
                title: "Full Monthly Reporting",
                desc: "Comprehensive attribution dashboards, cohort retention, CPI, and CAC analytics"
            }
        ],
        ctaText: "Scale with Growth",
        ctaTo: "/contact?plan=mobile-growth",
        isPopular: true
    },
    {
        id: "scale",
        number: "03",
        exactLabel: "Scale",
        exactArrow: ">>",
        theme: "navy",
        icon: Sparkles,
        cardClass: "pillar-card-scale",
        headerClass: "pillar-header-scale",
        btnClass: "pillar-btn-scale",
        badge: "SCALE • MAXIMUM DOMINANCE",
        title: "Scale",
        subtitle: "Everything in Growth + Influencer Management + Advanced CRO + Priority Support",
        features: [
            {
                title: "Everything in Growth Included",
                desc: "Full ASO, Paid Ads, Content/SEO, Social Media, User Retention & Full Reporting"
            },
            {
                title: "Influencer Management",
                desc: "Whitelisted creator campaigns, outreach, briefs, contract negotiation & attribution"
            },
            {
                title: "Advanced CRO",
                desc: "App Store product page A/B testing (icons, screenshots, preview videos) & custom in-app paywall optimization"
            },
            {
                title: "AI Tools & Performance Scaling",
                desc: "Predictive lifetime-value models, automated bidding optimization, and intelligent chatbots"
            },
            {
                title: "Priority Dedicated Support",
                desc: "Dedicated Senior Growth Partner, same-day turnarounds & direct WhatsApp hotline"
            }
        ],
        ctaText: "Dominate with Scale",
        ctaTo: "/contact?plan=mobile-scale",
        isPopular: false
    }
];

export const WEB_PRICING_DATA = [
    {
        id: "starter",
        number: "01",
        exactLabel: "Starter",
        exactArrow: ">>",
        theme: "cyan",
        icon: Globe,
        cardClass: "pillar-card-starter",
        headerClass: "pillar-header-starter",
        btnClass: "pillar-btn-starter",
        badge: "STARTER • WEB FOUNDATION",
        title: "Starter",
        subtitle: "Web Design & Development + SEO + AEO + Lead Capture + GA4 Analytics",
        features: [
            {
                title: "Web Design & Development",
                desc: "Fast, modern, SEO-ready and responsive website built to convert visitors"
            },
            {
                title: "SEO (Search Engine Optimisation)",
                desc: "Technical, on-page, off-page and local Google Business optimization"
            },
            {
                title: "AEO (Answer Engine Optimisation)",
                desc: "Structured schema architecture & authority content built for Google AI Overviews"
            },
            {
                title: "Lead Generation & CRM Setup",
                desc: "High-converting inquiry forms, CTA funnels, and CRM contact capture"
            },
            {
                title: "Email & WhatsApp Marketing",
                desc: "Automated inquiry alerts, WhatsApp click-to-chat & instant customer responses"
            },
            {
                title: "Analytics & Reporting",
                desc: "GA4 dashboards, Google Search Console & transparent attribution tracking"
            }
        ],
        ctaText: "Get Started with Web Starter",
        ctaTo: "/contact?plan=web-starter",
        isPopular: false
    },
    {
        id: "growth",
        number: "02",
        exactLabel: "Growth",
        exactArrow: ">>",
        theme: "royal",
        icon: Target,
        cardClass: "pillar-card-growth",
        headerClass: "pillar-header-growth",
        btnClass: "pillar-btn-growth",
        badge: "RECOMMENDED • FULL-FUNNEL WEB",
        recommendedLabel: "Recommended",
        title: "Growth",
        subtitle: "Everything in Starter + Paid Media + GEO + Content, Social & Marketing Automation",
        features: [
            {
                title: "Everything in Starter Included",
                desc: "Full web development, technical SEO, AEO, lead capture & GA4 attribution"
            },
            {
                title: "GEO (Generative Engine Optimisation)",
                desc: "Entity citations, brand authority and recommendations in ChatGPT & Perplexity"
            },
            {
                title: "Google & Meta Ads Management",
                desc: "Google Search, Shopping, Display, YouTube, and Facebook/Instagram conversion funnels"
            },
            {
                title: "PPC Advertising & Retargeting",
                desc: "Maximum conversions at minimum cost with full-funnel custom audience remarketing"
            },
            {
                title: "Content & Social Media Marketing",
                desc: "Platform-native content, thought leadership blogs & brand building assets"
            },
            {
                title: "Marketing Automation",
                desc: "HubSpot, Zoho & Salesforce set-ups with automated email & WhatsApp nurture drips"
            },
            {
                title: "Full Reporting & Conversion Optimization",
                desc: "Comprehensive ROAS attribution, cohort funnels & landing page conversion rate tuning"
            }
        ],
        ctaText: "Scale with Web Growth",
        ctaTo: "/contact?plan=web-growth",
        isPopular: true
    },
    {
        id: "scale",
        number: "03",
        exactLabel: "Scale",
        exactArrow: ">>",
        theme: "navy",
        icon: Sparkles,
        cardClass: "pillar-card-scale",
        headerClass: "pillar-header-scale",
        btnClass: "pillar-btn-scale",
        badge: "SCALE • ENTERPRISE REVENUE ENGINE",
        title: "Scale",
        subtitle: "Everything in Growth + Performance Marketing + AI Tools + ORM + Priority SLA",
        features: [
            {
                title: "Everything in Growth Included",
                desc: "Complete Web, SEO, AEO, GEO, Paid Media, Social & Marketing Automation"
            },
            {
                title: "Performance Marketing at Scale",
                desc: "Full-funnel programmatic campaigns scaled to aggressive CAC & revenue targets"
            },
            {
                title: "AI Tools & Intelligent Chatbots",
                desc: "Custom AI website chatbots, automated lead qualification & predictive analytics"
            },
            {
                title: "Advanced CRO & Multivariate Testing",
                desc: "Continuous A/B testing, heatmap tracking, UX performance audits & checkout optimization"
            },
            {
                title: "Online Reputation Management (ORM)",
                desc: "Continuous review monitoring, sentiment repair, PR placements & brand defense"
            },
            {
                title: "Corporate Training & Enterprise Integrations",
                desc: "Emblix Academy team training, custom API/webhook pipelines & SLA guarantees"
            },
            {
                title: "Priority Dedicated Growth Partner",
                desc: "Dedicated Senior Web Strategist, same-day dev turnarounds & 24/7 direct hotline"
            }
        ],
        ctaText: "Dominate with Web Scale",
        ctaTo: "/contact?plan=web-scale",
        isPopular: false
    }
];

export const PRICING_DATA = MOBILE_PRICING_DATA;

export const COMPARISON_CATEGORIES = [
    {
        category: "Content & Creative Volume",
        rows: [
            {
                feature: "Social Media Platforms",
                starter: "2 Platforms (Instagram, FB)",
                growth: "3 Platforms (+ YouTube)",
                premium: "4 Platforms (+ LinkedIn)",
                isDiff: true,
                starterDiff: "IG & FB",
                growthDiff: "+ YouTube Included",
                premiumDiff: "+ LinkedIn & YouTube"
            },
            {
                feature: "Static Branded Posts / Month",
                starter: "8 Posts (2 / week)",
                growth: "12 Posts (3 / week)",
                premium: "20+ Posts (5+ / week)",
                isDiff: true,
                starterDiff: "2 per week",
                growthDiff: "+4 Posts (3/wk)",
                premiumDiff: "+12 Posts (5+/wk)"
            },
            {
                feature: "Reels & Short-Form Video",
                starter: "2 Reels / Month",
                growth: "4 Reels / Month",
                premium: "8+ Reels / Month",
                isDiff: true,
                starterDiff: "Basic Editing",
                growthDiff: "+ AI & Trending Audio",
                premiumDiff: "+ YouTube Shorts & Viral"
            },
            {
                feature: "On-Site Shoot Visits / Month",
                starter: "—",
                growth: "2 Visits / Month",
                premium: "4 Visits / Month",
                isDiff: true,
                starterDiff: "On-Demand Only",
                growthDiff: "2 On-Site Visits",
                premiumDiff: "4 Professional Shoots"
            }
        ]
    },
    {
        category: "Paid Advertising & Funnels",
        rows: [
            {
                feature: "Meta Ads (Facebook & Instagram)",
                starter: "✓ Campaign Setup & Targeting",
                growth: "✓ Lead Gen & Retargeting",
                premium: "✓ Advanced Conversion Scaling",
                isDiff: true,
                starterDiff: "Audience Setup",
                growthDiff: "Lead Gen & Remarketing",
                premiumDiff: "Full Conversion Funnels"
            },
            {
                feature: "Google Ads Management",
                starter: "—",
                growth: "—",
                premium: "✓ Search, Display, YouTube Ads",
                isDiff: true,
                starterDiff: "Not Included",
                growthDiff: "Not Included",
                premiumDiff: "Full Google Suite"
            }
        ]
    },
    {
        category: "Local Discovery & Conversion",
        rows: [
            {
                feature: "Google Business Profile",
                starter: "Basic Setup",
                growth: "✓ Optimization & Updates",
                premium: "✓ Optimization + Local SEO",
                isDiff: true,
                starterDiff: "Basic Setup",
                growthDiff: "Full Optimization",
                premiumDiff: "Local SEO & Citations"
            },
            {
                feature: "WhatsApp Business Setup",
                starter: "—",
                growth: "✓ Catalog & Quick-Replies",
                premium: "✓ Multi-Agent Routing & CRM",
                isDiff: true,
                starterDiff: "Not Included",
                growthDiff: "Quick-Replies & Catalog",
                premiumDiff: "Automated Routing"
            }
        ]
    },
    {
        category: "Strategy, Reporting & Support",
        rows: [
            {
                feature: "Performance Reporting",
                starter: "Monthly Report",
                growth: "Monthly Report + Strategy",
                premium: "Bi-weekly Reports + Strategy Call",
                isDiff: true,
                starterDiff: "Monthly Insights",
                growthDiff: "Monthly + Recommendations",
                premiumDiff: "Bi-weekly + 1-on-1 Call"
            },
            {
                feature: "Best Suited For",
                starter: "Startups & Local Services",
                growth: "Growing Businesses & Retail",
                premium: "Established Brands & Real Estate",
                isDiff: false,
                starterDiff: "Startups & Local",
                growthDiff: "Retail & Scaling",
                premiumDiff: "Established Brands"
            }
        ]
    }
];

const COMPARISON_ROWS = [
    {
        feature: "Social Media Platforms",
        starter: "2 Platforms (Instagram, FB)",
        growth: "3 Platforms (+ YouTube)",
        premium: "4 Platforms (+ LinkedIn)"
    },
    {
        feature: "Static Posts / Month",
        starter: "8 (2 / week)",
        growth: "12 (3 / week)",
        premium: "20+ (5+ / week)"
    },
    {
        feature: "Reels / Month",
        starter: "2 (Basic editing)",
        growth: "4 (AI + Trending Audio)",
        premium: "8+ Reels + Shorts"
    },
    {
        feature: "On-site Shoots / Month",
        starter: "—",
        growth: "2 Visits",
        premium: "4 Visits"
    },
    {
        feature: "Meta Ads Management",
        starter: "✓ Included",
        growth: "✓ Included (Lead Gen)",
        premium: "✓ Included (Advanced)"
    },
    {
        feature: "Google Ads Management",
        starter: "—",
        growth: "—",
        premium: "✓ Included (Search, Display, YT)"
    },
    {
        feature: "Google Business Profile",
        starter: "Basic",
        growth: "✓ Optimization",
        premium: "✓ Optimization + Posts + Local SEO"
    },
    {
        feature: "Reporting",
        starter: "Monthly",
        growth: "Monthly",
        premium: "Bi-weekly + Strategy Call"
    },
    {
        feature: "Best For",
        starter: "Startups & Local Services",
        growth: "Growing Businesses & Retail",
        premium: "Established Brands & Real Estate"
    }
];

const AD_COST_META = {
    title: "Meta Ads (Facebook & Instagram)",
    budgets: [
        { business: "Small Local Business", budgetInr: "₹5,000 – ₹15,000 / month" },
        { business: "Medium Business", budgetInr: "₹15,000 – ₹50,000 / month" },
        { business: "E-commerce", budgetInr: "₹30,000 – ₹2,00,000+ / month" },
        { business: "Real Estate", budgetInr: "₹50,000 – ₹5,00,000+ / month" }
    ],
    metrics: [
        { name: "CPC (Cost Per Click)", valInr: "₹2 – ₹20+" },
        { name: "CPM (Cost per 1,000 Impressions)", valInr: "₹30 – ₹300+" },
        { name: "Lead Cost: Local Business", valInr: "₹20 – ₹150" },
        { name: "Lead Cost: Real Estate", valInr: "₹200 – ₹2,000+" }
    ],
    factors: [
        "Audience Targeting",
        "Competition in Your Industry",
        "Ad Placement (Feed, Reels, Stories)",
        "Ad Creative Quality",
        "Time of the Year & Demand"
    ]
};

const AD_COST_GOOGLE = {
    title: "Google Ads (Search, Display, YouTube)",
    budgets: [
        { business: "Local Search Ads", budgetInr: "₹5,000 – ₹20,000 / month" },
        { business: "E-commerce", budgetInr: "₹20,000 – ₹2,00,000+ / month" },
        { business: "Real Estate", budgetInr: "₹50,000+ / month" },
        { business: "YouTube Ads", budgetInr: "₹5,000 – ₹50,000+ / month" }
    ],
    industryCpc: [
        { industry: "Local Businesses", cpcInr: "₹5 – ₹30" },
        { industry: "Restaurants", cpcInr: "₹5 – ₹20" },
        { industry: "Dry Fruits / Retail", cpcInr: "₹5 – ₹25" },
        { industry: "Education", cpcInr: "₹20 – ₹100" },
        { industry: "Real Estate", cpcInr: "₹50 – ₹500+" },
        { industry: "Finance / Insurance", cpcInr: "₹100 – ₹1,000+" }
    ],
    factors: [
        "Keywords You Target",
        "Competition for Keywords",
        "Quality Score of Ads",
        "Landing Page Experience",
        "Budget & Bidding Strategy"
    ]
};

const WHY_WORK_POINTS = [
    { title: "Result Focused", desc: "Every campaign is laser-focused on real leads, store footfalls, and revenue.", icon: Target },
    { title: "Data Driven Strategies", desc: "Every post, caption, and budget allocation is backed by deep analytics.", icon: TrendingUp },
    { title: "High Quality Creatives", desc: "Thumb-stopping branded graphic designs, motion assets, and trending reels.", icon: Palette },
    { title: "Transparent Reporting", desc: "Zero fluff. Crystal-clear reports detailing impressions, reach, and leads.", icon: FileText },
    { title: "Dedicated Support", desc: "Direct WhatsApp group & dedicated account manager for instant updates.", icon: Users },
    { title: "On-time Delivery", desc: "Consistent calendar scheduling, regular shoot dates, and reliable turnarounds.", icon: Clock }
];

export const FAQS = [
    {
        q: "What is the difference between SEO, AEO, and GEO in your digital visibility plans?",
        category: "Search & AI Visibility",
        lead: "We engineer multi-layered visibility across traditional search engines (SEO), Google AI Overviews (AEO), and conversational AI models like ChatGPT and Perplexity (GEO).",
        bullets: [
            {
                title: "SEO (Search Engine Optimisation)",
                text: "Focuses on technical website health, high-intent keyword ranking, on-page optimization, and local Google Business Profile dominance."
            },
            {
                title: "AEO (Answer Engine Optimisation)",
                text: "Structures your content with semantic schema markup and direct answers to win featured snippets and Google AI Overviews."
            },
            {
                title: "GEO (Generative Engine Optimisation)",
                text: "Builds authoritative entity citations, brand mentions, and knowledge-graph presence so AI search engines recommend your business."
            }
        ],
        highlight: "Complete AI & Search Coverage • SEO + AEO + GEO"
    },
    {
        q: "How do your Mobile App Growth plans drive downloads and rankings?",
        category: "Mobile App Growth",
        lead: "Our mobile plans combine App Store Optimisation (ASO), paid install funnels, and retention systems to scale active users on iOS and Android.",
        bullets: [
            {
                title: "App Store Optimisation (ASO)",
                text: "Optimizes keywords, metadata, titles, and creative screenshots/previews to dramatically increase organic search impressions and store conversion rate."
            },
            {
                title: "Targeted Paid Ads Management",
                text: "High-converting Meta and Google App campaigns tuned to acquire qualified users at the lowest Cost Per Install (CPI)."
            },
            {
                title: "User Retention & Funnels",
                text: "Automated onboarding sequences, push notification triggers, and paywall CRO to improve 30-day retention and maximize customer LTV."
            }
        ],
        highlight: "Organic ASO + High-ROI Paid Install Acquisition"
    },
    {
        q: "How does GK Nexergy build websites that convert visitors into qualified leads?",
        category: "Web Engineering & CRO",
        lead: "Every website we develop is engineered for sub-second load times, persuasive user journeys, and instant lead capture.",
        bullets: [
            {
                title: "Conversion-Focused Architecture",
                text: "Clean, responsive UI with strategic CTA placement, clear value propositions, and friction-free mobile layouts."
            },
            {
                title: "Automated Inbound Lead Capture",
                text: "Custom lead forms, WhatsApp click-to-chat widgets, and automated instant alerts routed directly to your team."
            },
            {
                title: "Conversion Rate Optimisation (CRO)",
                text: "Heatmap analysis, user behavior tracking, and continuous A/B testing on core landing pages to boost conversion rates."
            }
        ],
        highlight: "Engineered for Speed • High Conversion • Instant Lead Capture"
    },
    {
        q: "How do Marketing Automation and AI Tools integrate into our existing CRM?",
        category: "Automation & AI Tools",
        lead: "We integrate your inbound funnels directly with your existing sales CRM and communication stack for automated, hands-off lead nurture.",
        bullets: [
            {
                title: "CRM Integrations",
                text: "Seamless end-to-end integration with HubSpot, Zoho, Salesforce, and custom database webhooks."
            },
            {
                title: "WhatsApp & Email Nurture Drips",
                text: "Automated qualification drip sequences that nurture inquiries and book appointments without manual overhead."
            },
            {
                title: "Intelligent AI Chatbots",
                text: "On-site conversational AI agents that answer product questions, qualify high-value leads, and capture contact info 24/7."
            }
        ],
        highlight: "24/7 AI Lead Qualification • Zero Manual Overhead"
    },
    {
        q: "Can we switch between Mobile and Web, or upgrade from Starter to Growth or Scale?",
        category: "Plan Flexibility",
        lead: "Yes, 100% flexible. You can switch between Mobile and Web capabilities or upgrade your tier at any time as your roadmap evolves.",
        bullets: [
            {
                title: "Start Baseline & Scale Up",
                text: "Begin with Starter to establish your digital foundation, then upgrade to Growth or Scale to unlock GEO, Paid Media, or AI Chatbots."
            },
            {
                title: "Cross-Platform Freedom",
                text: "Seamlessly pivot between Mobile App growth and Website lead engines based on your quarterly business priorities."
            },
            {
                title: "Zero Disruption or Data Loss",
                text: "All existing pixel tracking, keyword rankings, audience data, and funnel assets transfer smoothly with zero downtime."
            }
        ],
        highlight: "Month-to-Month Flexibility • Zero Lock-In • Seamless Upgrades"
    },
    {
        q: "What results can we expect and what is the turnaround timeline?",
        category: "Timeline & Attribution",
        lead: "Technical foundations and paid campaigns begin delivering measurable traction within 7 days, while organic search authority compounds over time.",
        bullets: [
            {
                title: "Week 1 (Setup & Audits)",
                text: "Complete website/app audit, tracking pixel deployment, ASO metadata optimization, and lead capture triggers activated."
            },
            {
                title: "Weeks 2 to 4 (Inbound & Paid Funnels)",
                text: "Paid conversion funnels launch, keyword visibility improves, and qualified inbound inquiries flow into your CRM."
            },
            {
                title: "Month 2 Onwards (Compounding Scale)",
                text: "AEO/GEO citations solidify, retargeting pools mature, customer acquisition cost (CAC) drops, and inbound volume compounds."
            }
        ],
        highlight: "Fast Inbound Traction in 7 Days • Compounding Digital Authority"
    }
];

export const PricingPlans = ({
    showHeader = true,
    showComparison = false,
    showFaqs = true,
    showAdCostGuide = false,
    initialPlan = "growth",
    initialPlatform = "mobile"
}) => {
    const [platform, setPlatform] = useState(initialPlatform || "mobile");

    const normalizePlan = (id) => {
        if (!id) return "growth";
        const lower = String(id).toLowerCase();
        if (lower === "premium") return "scale";
        return lower;
    };

    const [activePlan, setActivePlan] = useState(() => normalizePlan(initialPlan));
    const [expandedFaq, setExpandedFaq] = useState(null);

    useEffect(() => {
        if (initialPlan) {
            setActivePlan(normalizePlan(initialPlan));
        }
    }, [initialPlan]);

    const activePricingData = platform === "mobile" ? MOBILE_PRICING_DATA : WEB_PRICING_DATA;

    const currentPlanId = normalizePlan(activePlan);
    const selectedPlan =
        activePricingData.find((p) => p.id === currentPlanId) ||
        activePricingData.find((p) => p.id === "growth") ||
        activePricingData[0];

    const handleSelectSegment = (planId) => {
        setActivePlan(normalizePlan(planId));
    };

    const displayCategories = COMPARISON_CATEGORIES;

    const renderMatrixCell = (val, diffBadge, tier) => {
        if (!val || val === "—") {
            return (
                <div className="flex flex-col items-center justify-center py-1">
                    <span className="matrix-dash-pill">
                        <Minus className="w-3.5 h-3.5" />
                    </span>
                    {diffBadge && (
                        <span className="text-[11px] text-slate-400 dark:text-slate-500 mt-1 font-semibold">
                            {diffBadge}
                        </span>
                    )}
                </div>
            );
        }

        const isCheck = typeof val === "string" && (val.startsWith("✓") || val.includes("Included"));
        const displayText = isCheck ? val.replace(/^✓s*/, "") : val;

        return (
            <div className="flex flex-col items-center justify-center py-0.5">
                {isCheck ? (
                    <span className="matrix-check-pill">
                        <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 stroke-[2.8]" />
                        <span className="text-xs sm:text-sm">{displayText}</span>
                    </span>
                ) : (
                    <span
                        className={`font-extrabold text-xs sm:text-sm ${
                            tier === "growth"
                                ? "text-blue-700 dark:text-blue-300"
                                : "text-slate-800 dark:text-slate-200"
                        }`}
                    >
                        {displayText}
                    </span>
                )}
                {diffBadge && (
                    <span className={(tier === "premium" || tier === "scale") ? "matrix-diff-badge-vip" : "matrix-diff-badge"}>
                        {diffBadge}
                    </span>
                )}
            </div>
        );
    };

    return (
        <section className="pricing-section py-16 sm:py-24" id="pricing-plans" data-testid="pricing-section">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* SECTION HEADER */}
                {showHeader && (
                    <Reveal>
                        <div className="text-center max-w-3xl mx-auto">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-widest bg-blue-50 dark:bg-blue-950/60 text-brand dark:text-blue-400 border border-blue-200 dark:border-blue-900/40 mb-4">
                                <Sparkles className="w-3.5 h-3.5" />
                                Digital Marketing Packages
                            </span>
                            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-ink dark:text-white">
                                Choose the Right Package for <span className="text-brand dark:text-blue-400">Your Business Growth</span>
                            </h2>
                            <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                                Complete multi-channel growth packages. Organic social media, branded creatives, reels production, video shoots, and high-ROI Meta & Google ads.
                            </p>
                        </div>
                    </Reveal>
                )}

                {/* ========================================================================= */}
                {/* PLATFORM SWITCHER (LIKE ON & OFF BUTTONS: MOBILE vs WEB)                  */}
                {/* ========================================================================= */}
                <Reveal delay={0.06}>
                    <div className="platform-toggle-container" data-testid="platform-toggle-container">
                        <div className="platform-toggle-track" role="tablist" aria-label="Target Platform Selector">
                            <button
                                type="button"
                                role="tab"
                                aria-selected={platform === "mobile"}
                                onClick={() => setPlatform("mobile")}
                                data-testid="toggle-platform-mobile"
                                className={`platform-toggle-btn ${platform === "mobile" ? "active" : ""}`}
                            >
                                <Smartphone className="w-4 h-4" />
                                <span>Mobile</span>
                                {platform === "mobile" && <span className="platform-toggle-indicator" />}
                            </button>

                            <button
                                type="button"
                                role="tab"
                                aria-selected={platform === "web"}
                                onClick={() => setPlatform("web")}
                                data-testid="toggle-platform-web"
                                className={`platform-toggle-btn ${platform === "web" ? "active" : ""}`}
                            >
                                <Globe className="w-4 h-4" />
                                <span>Web</span>
                                {platform === "web" && <span className="platform-toggle-indicator" />}
                            </button>
                        </div>
                    </div>
                </Reveal>

                {/* ========================================================================= */}
                {/* 3-SEGMENT BOX: [ Starter >> | Growth >> | Scale >> ]                      */}
                {/* ========================================================================= */}
                <Reveal delay={0.12}>
                    <div className="pricing-image-selector-wrap" data-testid="pricing-exact-selector">
                        <div className="pricing-segmented-bar" role="tablist" aria-label="Pricing Plan Options">
                            {activePricingData.map((plan) => {
                                const isActive = currentPlanId === plan.id;
                                return (
                                    <button
                                        key={plan.id}
                                        role="tab"
                                        aria-selected={isActive}
                                        onClick={() => handleSelectSegment(plan.id)}
                                        data-testid={`pricing-tab-${plan.id}`}
                                        className={`pricing-segment-tab ${isActive ? "active" : ""}`}
                                    >
                                        <span className="tab-name">{plan.exactLabel}</span>
                                        <span className="tab-arrow">
                                            <ChevronsRight className="tab-arrow-icon" strokeWidth={2.8} />
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </Reveal>

                {/* ========================================================================= */}
                {/* ACTIVE TAB PLAN CARD (WITH TABLE DELIVERABLES INCORPORATED IN CARD)       */}
                {/* ========================================================================= */}
                <div className="mt-8 pkg-single-container" data-testid="pricing-packages-container">
                    <AnimatePresence mode="wait">
                        {selectedPlan && (
                            <motion.div
                                key={`${platform}-${selectedPlan.id}`}
                                initial={{ opacity: 0, y: 16, scale: 0.98 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -16, scale: 0.98 }}
                                transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                                className="w-full"
                            >
                                <div
                                    id={`pricing-card-${selectedPlan.id}`}
                                    data-testid={`pricing-card-${selectedPlan.id}`}
                                    className={`pillar-card-wrapper ${selectedPlan.cardClass || ""}`}
                                >
                                    {/* Card Header matching reference: frosted icon, watermark number, title, and deliverables summary */}
                                    <div className={`pillar-header ${selectedPlan.headerClass || "pillar-header-starter"}`}>
                                        <div className="pillar-header-top">
                                            <div className="pillar-icon-box">
                                                {(() => {
                                                    const IconComponent = selectedPlan.icon || Smartphone;
                                                    return <IconComponent className="w-5 h-5 text-white" strokeWidth={2.2} />;
                                                })()}
                                            </div>
                                            <span className="pillar-watermark">{selectedPlan.number}</span>
                                        </div>

                                        <div className="pillar-title-wrap">
                                            <div className="pillar-title-row">
                                                <h3 className="pillar-title">{selectedPlan.title}</h3>
                                                {selectedPlan.recommendedLabel && (
                                                    <span className="pillar-recommended-badge">
                                                        {selectedPlan.recommendedLabel}
                                                    </span>
                                                )}
                                            </div>
                                            <p className="pillar-subtitle">{selectedPlan.subtitle}</p>
                                        </div>
                                    </div>

                                    {/* Feature rows: bold title + clear description + horizontal divider lines */}
                                    <div className="pillar-body">
                                        <div className="pillar-features-list">
                                            {selectedPlan.features && selectedPlan.features.map((feat, fIdx) => (
                                                <div key={fIdx} className="pillar-feature-row">
                                                    <h4 className="pillar-feature-title">{feat.title}</h4>
                                                    <p className="pillar-feature-desc">{feat.desc}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Card Footer: clean action CTA button matching tier theme */}
                                    <div className="pillar-footer">
                                        <Link
                                            to={selectedPlan.ctaTo}
                                            data-testid={`pricing-cta-${selectedPlan.id}`}
                                            className={`pillar-cta-btn ${selectedPlan.btnClass || "pillar-btn-starter"}`}
                                        >
                                            <span>{selectedPlan.ctaText}</span>
                                            <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
                                        </Link>
                                        <p className="pillar-footer-note">
                                            Direct kickoff • Dedicated growth partner • Zero lock-in
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* ========================================================================= */}
                {/* WHY WORK WITH US? (6 TRUST BADGES)                                        */}
                {/* ========================================================================= */}
                <Reveal delay={0.2}>
                    <div id="why-work-with-us" className="mt-20">
                        <div className="text-center mb-10">
                            <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white uppercase tracking-wider leading-tight mb-3">
                                WHY WORK WITH US?
                            </h3>
                            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
                                Engineered for high-growth startups, ambitious brands, and modern businesses.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 min-[380px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4 lg:gap-5">
                            {WHY_WORK_POINTS.map((pt, pIdx) => {
                                const PointIcon = pt.icon;
                                return (
                                    <div
                                        key={pIdx}
                                        className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-card border border-slate-200 dark:border-slate-800 text-center hover:border-brand/40 transition-all shadow-sm flex flex-col items-center justify-start h-full"
                                    >
                                        <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/50 text-brand dark:text-blue-400 flex items-center justify-center mb-3 sm:mb-4 shrink-0">
                                            <PointIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                                        </div>
                                        <h4 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white leading-snug mb-1.5 sm:mb-2">
                                            {pt.title}
                                        </h4>
                                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mt-0">
                                            {pt.desc}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </Reveal>

                {/* ========================================================================= */}
                {/* PRICING FAQ ACCORDION - STRUCTURED & FORMATTED                            */}
                {/* ========================================================================= */}
                {showFaqs && (
                    <Reveal delay={0.25}>
                        <div id="pricing-faq" className="faq-section-container">
                            <div className="text-center mb-10">
                                <span className="text-xs font-extrabold uppercase tracking-widest text-brand dark:text-sky-400">
                                    TRANSPARENCY & CLARITY
                                </span>
                                <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">
                                    Frequently Asked Questions
                                </h3>
                                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2 max-w-xl mx-auto">
                                    Everything you need to know about our SEO, AEO, GEO, Mobile ASO, web engineering, and automated growth plans.
                                </p>
                            </div>

                            <div className="space-y-4">
                                {FAQS.map((faq, fIdx) => {
                                    const isOpen = expandedFaq === fIdx;
                                    const numStr = String(fIdx + 1).padStart(2, "0");
                                    return (
                                        <div
                                            key={fIdx}
                                            className={`faq-accordion-item ${isOpen ? "is-open" : ""}`}
                                        >
                                            <button
                                                type="button"
                                                onClick={() => setExpandedFaq(isOpen ? null : fIdx)}
                                                className="faq-question-btn"
                                                aria-expanded={isOpen}
                                            >
                                                <div className="faq-question-left">
                                                    <span className="faq-num-pill">{numStr}</span>
                                                    <span className="faq-question-text">
                                                        {faq.q}
                                                    </span>
                                                </div>
                                                <span className="faq-chevron-wrap">
                                                    <ChevronDown
                                                        className={`h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                                                    />
                                                </span>
                                            </button>

                                            <AnimatePresence>
                                                {isOpen && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: "auto", opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.22 }}
                                                        className="overflow-hidden"
                                                    >
                                                        <div className="faq-answer-container">
                                                            {/* Lead Summary */}
                                                            {faq.lead && (
                                                                <p className="faq-lead-summary">
                                                                    {faq.lead}
                                                                </p>
                                                            )}

                                                            {/* Structured Points */}
                                                            {faq.bullets && faq.bullets.length > 0 && (
                                                                <div className="faq-points-grid">
                                                                    {faq.bullets.map((b, bIdx) => (
                                                                        <div key={bIdx} className="faq-point-row">
                                                                            <CheckCircle2 className="faq-point-icon" />
                                                                            <div>
                                                                                <strong>{b.title}:</strong>{" "}
                                                                                <span>{b.text}</span>
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            )}

                                                            {/* Backward compatibility for legacy string a */}
                                                            {!faq.lead && faq.a && (
                                                                <p className="faq-lead-summary">
                                                                    {faq.a}
                                                                </p>
                                                            )}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </Reveal>
                )}
            </div>
        </section>
    );
};

export default PricingPlans;