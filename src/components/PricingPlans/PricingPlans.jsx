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
    SlidersHorizontal
} from "lucide-react";
import { Reveal } from "../Reveal";
import "./PricingPlans.css";

export const PRICING_DATA = [
    {
        id: "starter",
        exactLabel: "Starter",
        exactArrow: ">>",
        theme: "cyan",
        badge: "STARTER • SMALL BUSINESS",
        tagline: "Perfect for small businesses just getting started",
        description: "Build your foundational digital footprint with consistent organic social media posting, branded creatives, and targeted Meta ads campaigns.",
        stats: {
            platforms: "2 (IG & FB)",
            posts: "8 Static / Mo",
            reels: "2 Reels / Mo",
            shoots: "On-Demand"
        },
        bestFor: "Small Shops, Local Services, Startups, New Businesses",
        categoryGroups: [
            {
                title: "Social Media Management",
                subtitle: "Instagram & Facebook",
                icon: Share2,
                items: [
                    "Content posting & weekly scheduling",
                    "Basic profile & page management",
                    "Targeted hashtag & bio optimization"
                ]
            },
            {
                title: "Creatives & Graphic Design",
                icon: ImageIcon,
                items: [
                    "8 custom-branded static posts / month",
                    "2 high-resolution posts per week",
                    "Visual consistency & story templates"
                ]
            },
            {
                title: "Reels & Short-Form Video",
                icon: Clapperboard,
                items: [
                    "2 Reels / Month",
                    "Basic video editing, audio & captions"
                ]
            },
            {
                title: "Copywriting & Captions",
                icon: PenTool,
                items: [
                    "Captions for all posts & reels",
                    "High-converting ad copy & CTAs"
                ]
            },
            {
                title: "Meta Ads Management",
                icon: Megaphone,
                items: [
                    "Targeted campaign setup (FB & IG)",
                    "Audience research & local targeting",
                    "Monthly ad budget optimization",
                    "Monthly campaign performance report"
                ]
            },
            {
                title: "Reporting & Support",
                icon: TrendingUp,
                items: [
                    "Monthly performance report with key insights",
                    "Direct support via WhatsApp & email"
                ]
            }
        ],
        tags: ["Instagram & Facebook", "8 Posts / Mo", "2 Reels", "Meta Ads"],
        ctaText: "Get Started with Starter",
        ctaTo: "/contact?plan=starter",
        isPopular: false
    },
    {
        id: "growth",
        exactLabel: "Growth",
        exactArrow: ">>",
        theme: "blue",
        badge: "MOST POPULAR • SCALE-UP",
        tagline: "Ideal for businesses ready to grow and get more leads",
        description: "Accelerate audience reach and lead acquisition across Instagram, Facebook, and YouTube with on-site shoot visits, AI reels, and lead generation ad funnels.",
        stats: {
            platforms: "3 (+ YouTube)",
            posts: "12 Static / Mo",
            reels: "4 Reels / Mo",
            shoots: "2 Visits / Mo"
        },
        bestFor: "Growing Businesses, Retail Stores, Service Providers",
        categoryGroups: [
            {
                title: "Social Media Management",
                subtitle: "Instagram, Facebook & YouTube",
                icon: Share2,
                items: [
                    "Omnichannel content posting & scheduling",
                    "Hashtag research, trends & keyword mapping",
                    "Community engagement & page hygiene"
                ]
            },
            {
                title: "Creatives & Graphic Design",
                icon: ImageIcon,
                items: [
                    "12 Static Posts / Month (3 posts/week)",
                    "Custom branded carousel designs & graphics",
                    "Promotional story sets & seasonal banners"
                ]
            },
            {
                title: "Reels & Short-Form Video",
                icon: Clapperboard,
                items: [
                    "4 Reels / Month",
                    "AI reels, trending viral audio & captions"
                ]
            },
            {
                title: "Copywriting & Conversions",
                icon: PenTool,
                items: [
                    "Captions for all posts, reels & ad funnels",
                    "High-converting CTA writing & bio setup"
                ]
            },
            {
                title: "Video Production (On-Site)",
                icon: Camera,
                items: [
                    "2 On-site Shoot Visits / Month",
                    "Product, ambience, staff & testimonial shoots"
                ]
            },
            {
                title: "Meta Ads Management (Lead Gen)",
                icon: Megaphone,
                items: [
                    "Campaign setup & in-depth audience research",
                    "High-converting lead generation funnels",
                    "Weekly optimization & remarketing setup",
                    "Monthly performance dashboard"
                ]
            },
            {
                title: "Additional Business Setup",
                icon: MapPin,
                items: [
                    "Google Business Profile Optimization",
                    "WhatsApp Business setup & automated replies"
                ]
            }
        ],
        tags: ["Meta + YouTube", "12 Posts + 4 Reels", "2 Shoot Visits", "WhatsApp Setup"],
        ctaText: "Scale with Growth",
        ctaTo: "/contact?plan=growth",
        isPopular: true
    },
    {
        id: "premium",
        exactLabel: "Premium",
        exactArrow: ">>",
        theme: "navy",
        badge: "PREMIUM • MAXIMUM GROWTH",
        tagline: "For businesses that want maximum exposure and high growth",
        description: "Full-scale multi-channel digital dominance across Instagram, Facebook, YouTube, and LinkedIn with Google & Meta Ads, monthly video shoots, and local SEO.",
        stats: {
            platforms: "4 (+ LinkedIn)",
            posts: "20+ Static / Mo",
            reels: "8+ Reels / Mo",
            shoots: "4 Visits / Mo"
        },
        bestFor: "Established Businesses, Brands, Real Estate, E-commerce",
        categoryGroups: [
            {
                title: "Social Media Management",
                subtitle: "Instagram, Facebook, YouTube & LinkedIn",
                icon: Share2,
                items: [
                    "Omnichannel content posting & scheduling",
                    "Dedicated community management & engagement",
                    "In-depth competitor, hashtag & trend research",
                    "Complete page optimization & brand authority"
                ]
            },
            {
                title: "Creatives & Brand Assets",
                icon: ImageIcon,
                items: [
                    "20+ Static Posts / Month (5+ posts per week)",
                    "High-quality branded designs, carousels & banners",
                    "Custom story highlights & promotional kits"
                ]
            },
            {
                title: "Reels & Video Content",
                icon: Clapperboard,
                items: [
                    "8 Reels / Month + YouTube Shorts",
                    "AI reels, product showcase reels & testimonials"
                ]
            },
            {
                title: "Copywriting & Content Strategy",
                icon: PenTool,
                items: [
                    "Captions, powerful ad copies & website copy",
                    "2 Authority SEO blog posts / month"
                ]
            },
            {
                title: "Video Production (Professional)",
                icon: Camera,
                items: [
                    "4 On-site Professional Shoot Visits / Month",
                    "Dedicated videographer for products, ambience & testimonials"
                ]
            },
            {
                title: "Meta & Google Ads Management",
                icon: Megaphone,
                items: [
                    "Meta Ads (Facebook & Instagram lead gen & sales)",
                    "Google Ads (Search, Display & YouTube campaigns)",
                    "Weekly optimization, conversion tracking & remarketing"
                ]
            },
            {
                title: "Advanced Local Marketing",
                icon: MapPin,
                items: [
                    "Google Business Profile optimization & regular posts",
                    "Local SEO basics, citations & directory listings"
                ]
            },
            {
                title: "Reporting & Growth Strategy",
                icon: TrendingUp,
                items: [
                    "Bi-weekly performance reports & KPI tracking",
                    "In-depth competitor analysis & strategic roadmapping",
                    "Monthly 1-on-1 strategy advisory call"
                ]
            }
        ],
        tags: ["4 Platforms", "20+ Posts & 8 Reels", "Google + Meta Ads", "4 Shoot Visits"],
        ctaText: "Dominate with Premium",
        ctaTo: "/contact?plan=premium",
        isPopular: false
    }
];

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
        q: "How does ad budget payment work?",
        category: "Billing & Budget",
        lead: "Ad spend is paid directly by you to Meta and Google through your own ad account with 100% financial transparency.",
        bullets: [
            {
                title: "Direct Client Billing",
                text: "You link your own corporate credit card, debit card, or UPI directly inside Meta Ads Manager and Google Ads — no agency middleman."
            },
            {
                title: "Full-Service Campaign Execution",
                text: "Our monthly package fee covers campaign architecture, ad copy, graphic design, audience targeting, conversion tracking, and weekly bid optimization."
            },
            {
                title: "Zero Markup Guarantee",
                text: "We charge a transparent fixed monthly retainer with absolutely zero commission or hidden markups on your advertising budget."
            }
        ],
        highlight: "Zero Commission • 100% Direct Account Billing"
    },
    {
        q: "How are the on-site shoot visits conducted?",
        category: "Video Shoots",
        lead: "For Growth (2 visits/month) and Premium (4 visits/month), our professional cinema media crew comes directly to your location.",
        bullets: [
            {
                title: "Locations Covered",
                text: "Retail stores, restaurants, clinics, real estate projects, corporate offices, gyms, showrooms, and manufacturing facilities."
            },
            {
                title: "What We Capture",
                text: "4K product showcases, client testimonials, aesthetic ambience B-roll, and founder/team talking-head reels."
            },
            {
                title: "Post-Production Included",
                text: "Cinema color grading, audio cleanup, trending audio sync, viral hook editing, and captions ready for Reels & Shorts."
            }
        ],
        highlight: "Professional 4K Video Production Crew Included"
    },
    {
        q: "Can we review and approve all posts before they are published?",
        category: "Review & Sign-Off",
        lead: "Yes, 100%. Nothing is ever published to your social handles without your prior review and final sign-off.",
        bullets: [
            {
                title: "Advanced Content Calendar",
                text: "We deliver complete weekly and monthly content plans with graphics, copy, hashtags, and reel scripts in advance."
            },
            {
                title: "Rapid Feedback Loop",
                text: "Request revisions, suggest real-time adjustments, or approve drafts directly via your dedicated WhatsApp group or portal."
            },
            {
                title: "Brand Integrity",
                text: "Every piece of copy and design is vetted against your brand typography, color palette, and business values."
            }
        ],
        highlight: "100% Sign-Off Control • Zero Unapproved Publishing"
    },
    {
        q: "What results can we expect and how soon?",
        category: "Timeline & ROI",
        lead: "Targeted paid campaigns start driving leads within 3 to 7 days, while organic presence builds compounding market authority.",
        bullets: [
            {
                title: "Days 3 to 7 (Paid Campaigns)",
                text: "Meta and Google Ads campaigns start generating customer inquiries, calls, and qualified inbound leads."
            },
            {
                title: "Weeks 2 to 4 (Organic Authority)",
                text: "Consistent static creatives, trending reels, and Google Business Profile optimization elevate local discovery and map rankings."
            },
            {
                title: "Month 2 Onwards (Compounding Growth)",
                text: "Retargeting audiences mature, driving down your cost-per-lead and building lasting digital brand equity."
            }
        ],
        highlight: "Fast Inquiries in 3–7 Days • Compounding Digital Authority"
    },
    {
        q: "Can we start with Starter and upgrade to Growth or Premium later?",
        category: "Plan Flexibility",
        lead: "Yes, absolutely. You can upgrade, scale, or customize your plan at any time as your business demands expand.",
        bullets: [
            {
                title: "Start Baseline",
                text: "Begin with Starter to establish your brand presence, regular posting cadence, and foundational Meta advertising."
            },
            {
                title: "Seamless Upgrades",
                text: "Switch to Growth or Premium whenever you are ready to unlock on-site video shoots, Google Ads, and local SEO."
            },
            {
                title: "Zero Disruption",
                text: "All existing pixel tracking data, audience segments, creative assets, and performance learnings transfer seamlessly."
            }
        ],
        highlight: "Flexible Month-to-Month • Seamless Tier Upgrades"
    }
];

export const PricingPlans = ({
    showHeader = true,
    showComparison = true,
    showFaqs = true,
    showAdCostGuide = true,
    initialPlan = "growth"
}) => {
    const [activePlan, setActivePlan] = useState(initialPlan || "growth");
    const [expandedFaq, setExpandedFaq] = useState(null);

    useEffect(() => {
        if (initialPlan) {
            setActivePlan(initialPlan);
        }
    }, [initialPlan]);

    const currentPlanId = activePlan || initialPlan || "growth";
    const selectedPlan =
        PRICING_DATA.find((p) => p.id === currentPlanId) ||
        PRICING_DATA.find((p) => p.id === "growth") ||
        PRICING_DATA[0];

    const handleSelectSegment = (planId) => {
        setActivePlan(planId);
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
                    <span className={tier === "premium" ? "matrix-diff-badge-vip" : "matrix-diff-badge"}>
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
                {/* 3-SEGMENT BOX: [ Starter >> | Growth >> | Premium >> ]                    */}
                {/* ========================================================================= */}
                <Reveal delay={0.15}>
                    <div className="pricing-image-selector-wrap" data-testid="pricing-exact-selector">
                        <div className="pricing-segmented-bar" role="tablist" aria-label="Pricing Plan Options">
                            {PRICING_DATA.map((plan) => {
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
                {/* ACTIVE TAB PLAN CARD (ONLY SELECTED PLAN IS VISIBLE)                      */}
                {/* ========================================================================= */}
                <div className="mt-8 pkg-single-container" data-testid="pricing-packages-container">
                    <AnimatePresence mode="wait">
                        {selectedPlan && (
                            <motion.div
                                key={selectedPlan.id}
                                initial={{ opacity: 0, y: 16, scale: 0.98 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -16, scale: 0.98 }}
                                transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                                className="w-full"
                            >
                                <div
                                    id={`pricing-card-${selectedPlan.id}`}
                                    data-testid={`pricing-card-${selectedPlan.id}`}
                                    className={`pkg-card pkg-single-view pkg-theme-${selectedPlan.theme} ${selectedPlan.isPopular ? "is-popular" : ""} is-focused`}
                                >
                                    {/* Card Header with clean gradients and tier badge */}
                                    <div className="pkg-header">
                                        <div className="pkg-header-top-row">
                                            <span className="pkg-tier-eyebrow">{selectedPlan.badge}</span>
                                            {selectedPlan.isPopular && (
                                                <div className="pkg-popular-badge">
                                                    <Sparkles className="w-3.5 h-3.5" />
                                                    <span>MOST POPULAR</span>
                                                </div>
                                            )}
                                        </div>
                                        <h3 className="pkg-title">{selectedPlan.exactLabel.toUpperCase()}</h3>
                                        <p className="pkg-tagline">{selectedPlan.tagline}</p>
                                    </div>

                                    {/* Quick Deliverables Snapshot Bar */}
                                    <div className="pkg-stats-strip">
                                        <div className="pkg-stat-item">
                                            <span className="pkg-stat-lbl">PLATFORMS</span>
                                            <span className="pkg-stat-val">{selectedPlan.stats.platforms}</span>
                                        </div>
                                        <div className="pkg-stat-item">
                                            <span className="pkg-stat-lbl">STATIC POSTS</span>
                                            <span className="pkg-stat-val">{selectedPlan.stats.posts}</span>
                                        </div>
                                        <div className="pkg-stat-item">
                                            <span className="pkg-stat-lbl">REELS</span>
                                            <span className="pkg-stat-val">{selectedPlan.stats.reels}</span>
                                        </div>
                                        <div className="pkg-stat-item">
                                            <span className="pkg-stat-lbl">SHOOTS</span>
                                            <span className="pkg-stat-val">{selectedPlan.stats.shoots}</span>
                                        </div>
                                    </div>

                                    {/* Body with categorized feature groups in 2-columns */}
                                    <div className="pkg-body pkg-body-2col">
                                        {selectedPlan.categoryGroups.map((group, gIdx) => {
                                            const GroupIcon = group.icon;
                                            return (
                                                <div key={gIdx} className="pkg-feature-card">
                                                    <div className="pkg-group-header">
                                                        <div className="pkg-group-icon-wrap">
                                                            <GroupIcon className="pkg-group-icon" />
                                                        </div>
                                                        <div>
                                                            <h4 className="pkg-group-title">{group.title.toUpperCase()}</h4>
                                                            {group.subtitle && (
                                                                <p className="pkg-group-sub">{group.subtitle}</p>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <ul className="pkg-items-list">
                                                        {group.items.map((item, iIdx) => (
                                                            <li key={iIdx} className="pkg-item-row">
                                                                <CheckCircle2 className="pkg-item-check" />
                                                                <span>{item}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    {/* Footer: Target Audience Box + Single Primary CTA Button */}
                                    <div className="pkg-footer">
                                        <div className="pkg-audience-box">
                                            <span className="pkg-audience-badge">🎯 TARGET FIT</span>
                                            <p className="pkg-audience-text">{selectedPlan.bestFor}</p>
                                        </div>

                                        <Link
                                            to={selectedPlan.ctaTo}
                                            data-testid={`pricing-cta-${selectedPlan.id}`}
                                            className="pkg-cta-btn"
                                        >
                                            <span>{selectedPlan.ctaText}</span>
                                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                        <p className="pkg-footer-note">Direct kickoff • Zero long-term lock-in</p>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* ========================================================================= */}
                {/* SECTION: HOW MUCH DOES IT COST TO RUN ADS? (FROM USER'S IMAGE)            */}
                {/* ========================================================================= */}
                {showAdCostGuide && (
                    <Reveal delay={0.2}>
                        <div id="ad-spend-guide" className="mt-24 ad-cost-guide-container">
                            <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20 ad-cost-header-wrap">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-widest bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-900/40 mb-3">
                                    <DollarSign className="w-3.5 h-3.5" />
                                    Ad Spend Transparency Guide
                                </span>
                                <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">
                                    HOW MUCH DOES IT COST TO RUN ADS?
                                </h3>
                                <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400">
                                    Recommended advertising budgets and approximate costs for Meta and Google Ads.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 mt-6 sm:mt-10 ad-cost-cards-grid">
                                {/* META ADS CARD */}
                                <div className="ad-cost-card meta-card">
                                    <div className="ad-cost-header meta-header">
                                        <div className="flex items-center gap-3.5">
                                            <div className="flex items-center gap-1.5 shrink-0">
                                                {/* Facebook Official Icon */}
                                                <svg className="w-9 h-9 shrink-0 drop-shadow-sm rounded-xl overflow-hidden" viewBox="0 0 36 36" fill="none">
                                                    <rect width="36" height="36" rx="9" fill="#1877F2" />
                                                    <path d="M24.5 19H20.75V31H16V19H13.75V15.25H16V12.6C16 10.1 17.5 8.5 20.5 8.5H23.75V12.25H21.875C20.75 12.25 20.75 12.8 20.75 13.75V15.25H24.1L24.5 19Z" fill="white" />
                                                </svg>
                                                {/* Instagram Official Icon */}
                                                <svg className="w-9 h-9 shrink-0 drop-shadow-sm rounded-xl overflow-hidden" viewBox="0 0 36 36" fill="none">
                                                    <defs>
                                                        <radialGradient id="ig-grad-meta" cx="15%" cy="105%" r="125%">
                                                            <stop offset="0%" stopColor="#fdf497" />
                                                            <stop offset="15%" stopColor="#fdf497" />
                                                            <stop offset="50%" stopColor="#fd5949" />
                                                            <stop offset="70%" stopColor="#d6249f" />
                                                            <stop offset="100%" stopColor="#285AEB" />
                                                        </radialGradient>
                                                    </defs>
                                                    <rect width="36" height="36" rx="9" fill="url(#ig-grad-meta)" />
                                                    <rect x="8.5" y="8.5" width="19" height="19" rx="5.5" stroke="white" strokeWidth="2.2" fill="none" />
                                                    <circle cx="18" cy="18" r="4.5" stroke="white" strokeWidth="2.2" fill="none" />
                                                    <circle cx="23.2" cy="12.8" r="1.3" fill="white" />
                                                </svg>
                                            </div>
                                            <div className="ml-1">
                                                <h4 className="ad-cost-platform-title">META ADS</h4>
                                                <span className="ad-cost-platform-sub">(FACEBOOK & INSTAGRAM)</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-6 sm:p-7 space-y-7">
                                        {/* Budgets Table */}
                                        <div>
                                            <h5 className="ad-cost-table-title">RECOMMENDED MONTHLY BUDGET</h5>
                                            <div className="ad-cost-table-wrap">
                                                <table className="ad-cost-table">
                                                    <tbody>
                                                        {AD_COST_META.budgets.map((b, idx) => (
                                                            <tr key={idx}>
                                                                <td className="font-medium text-slate-800 dark:text-slate-200">{b.business}</td>
                                                                <td className="font-bold text-right text-brand dark:text-blue-400">
                                                                    {b.budgetInr}
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>

                                        {/* Approx Costs Table */}
                                        <div>
                                            <h5 className="ad-cost-table-title">APPROXIMATE COSTS (INDIA)</h5>
                                            <div className="ad-cost-table-wrap">
                                                <table className="ad-cost-table">
                                                    <tbody>
                                                        {AD_COST_META.metrics.map((m, idx) => (
                                                            <tr key={idx}>
                                                                <td className="font-medium text-slate-800 dark:text-slate-200">{m.name}</td>
                                                                <td className="font-bold text-right text-emerald-600 dark:text-emerald-400">
                                                                    {m.valInr}
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>

                                        {/* What Affects Cost */}
                                        <div>
                                            <h5 className="ad-cost-table-title">WHAT AFFECTS COST?</h5>
                                            <div className="flex flex-wrap gap-2 mt-2">
                                                {AD_COST_META.factors.map((f, idx) => (
                                                    <span key={idx} className="ad-factor-tag">
                                                        <Check className="w-3 h-3 text-brand" />
                                                        {f}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* GOOGLE ADS CARD */}
                                <div className="ad-cost-card google-card">
                                    <div className="ad-cost-header google-header">
                                        <div className="flex items-center gap-3.5">
                                            <div className="w-11 h-11 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700/80 flex items-center justify-center p-1.5 shrink-0">
                                                <svg className="w-8 h-8 shrink-0 drop-shadow-sm" viewBox="0 0 48 48" fill="none">
                                                    <path d="M43.1 36.3L23.8 2.8C22.4 0.4 19.3 -0.4 16.9 1C14.5 2.4 13.7 5.5 15.1 7.9L34.4 41.4C35.8 43.8 38.9 44.6 41.3 43.2C43.7 41.8 44.5 38.7 43.1 36.3Z" fill="#4285F4"/>
                                                    <path d="M16.9 1C14.5 -0.4 11.4 0.4 10 2.8L0.7 18.9C-0.7 21.3 0.1 24.4 2.5 25.8C4.9 27.2 8 26.4 9.4 24L18.7 7.9C20.1 5.5 19.3 2.4 16.9 1Z" fill="#FBBC04"/>
                                                    <circle cx="21.9" cy="37" r="6.2" fill="#34A853"/>
                                                </svg>
                                            </div>
                                            <div className="ml-1">
                                                <h4 className="ad-cost-platform-title">GOOGLE ADS</h4>
                                                <span className="ad-cost-platform-sub">(SEARCH, DISPLAY, YOUTUBE)</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-6 sm:p-7 space-y-7">
                                        {/* Budgets Table */}
                                        <div>
                                            <h5 className="ad-cost-table-title">RECOMMENDED MONTHLY BUDGET</h5>
                                            <div className="ad-cost-table-wrap">
                                                <table className="ad-cost-table">
                                                    <tbody>
                                                        {AD_COST_GOOGLE.budgets.map((b, idx) => (
                                                            <tr key={idx}>
                                                                <td className="font-medium text-slate-800 dark:text-slate-200">{b.business}</td>
                                                                <td className="font-bold text-right text-brand dark:text-blue-400">
                                                                    {b.budgetInr}
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>

                                        {/* Search Ads CPC Table */}
                                        <div>
                                            <h5 className="ad-cost-table-title">SEARCH ADS CPC (APPROX.)</h5>
                                            <div className="ad-cost-table-wrap">
                                                <table className="ad-cost-table">
                                                    <thead>
                                                        <tr className="border-b border-slate-100 dark:border-slate-800 text-xs text-slate-400">
                                                            <th className="text-left pb-2">INDUSTRY</th>
                                                            <th className="text-right pb-2">CPC (APPROX)</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {AD_COST_GOOGLE.industryCpc.map((item, idx) => (
                                                            <tr key={idx}>
                                                                <td className="font-medium text-slate-800 dark:text-slate-200">{item.industry}</td>
                                                                <td className="font-bold text-right text-amber-600 dark:text-amber-400">
                                                                    {item.cpcInr}
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>

                                        {/* What Affects Cost */}
                                        <div>
                                            <h5 className="ad-cost-table-title">WHAT AFFECTS COST?</h5>
                                            <div className="flex flex-wrap gap-2 mt-2">
                                                {AD_COST_GOOGLE.factors.map((f, idx) => (
                                                    <span key={idx} className="ad-factor-tag">
                                                        <Check className="w-3 h-3 text-emerald-600" />
                                                        {f}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                )}

                {/* ========================================================================= */}
                {/* PACKAGE COMPARISON DIFFERENCE MATRIX                                     */}
                {/* ========================================================================= */}
                {showComparison && (
                    <Reveal delay={0.25}>
                        <div id="packages-comparison" className="comparison-matrix-container">
                            <div className="matrix-card-wrap">
                                <div className="matrix-header-row text-center mb-8">
                                    <div className="max-w-2xl mx-auto text-center">
                                        <span className="text-xs font-extrabold uppercase tracking-widest text-brand dark:text-blue-400">
                                            SIDE-BY-SIDE MATRIX
                                        </span>
                                        <h3 className="matrix-title text-center">
                                            PACKAGE COMPARISON AT A GLANCE
                                        </h3>
                                        <p className="matrix-subtitle text-center mt-2">
                                            Review deliverables, content volume, shoots, and ad management across all three tiers.
                                        </p>
                                    </div>
                                </div>

                                <div className="matrix-table-scroll">
                                    <table className="comparison-matrix-table" data-testid="pricing-comparison-table">
                                        <thead>
                                            <tr>
                                                <th className="matrix-th-feature">
                                                    <span>FEATURES</span>
                                                </th>
                                                <th className="matrix-th-starter">
                                                    <span className="matrix-th-title">STARTER</span>
                                                    <span className="matrix-th-sub">Small Business</span>
                                                </th>
                                                <th className="matrix-th-growth">
                                                    <div className="matrix-popular-tag">
                                                        <Sparkles className="w-3 h-3 text-amber-800" />
                                                        <span>MOST POPULAR</span>
                                                    </div>
                                                    <span className="matrix-th-title">GROWTH</span>
                                                    <span className="matrix-th-sub">Scale-Up Tier</span>
                                                </th>
                                                <th className="matrix-th-premium">
                                                    <span className="matrix-th-title">PREMIUM</span>
                                                    <span className="matrix-th-sub">Market Dominance</span>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {displayCategories.map((cat, cIdx) => (
                                                <React.Fragment key={cIdx}>
                                                    <tr className="matrix-cat-row">
                                                        <td colSpan={4}>
                                                            {cat.category}
                                                        </td>
                                                    </tr>
                                                    {cat.rows.map((row, rIdx) => (
                                                        <tr key={rIdx} className={row.isDiff ? "matrix-row-is-diff" : ""}>
                                                            <td className="matrix-td-feature">
                                                                <div className="font-extrabold text-slate-900 dark:text-white leading-snug">
                                                                    {row.feature}
                                                                </div>
                                                            </td>
                                                            <td className="matrix-td-starter">
                                                                {renderMatrixCell(row.starter, row.starterDiff, "starter")}
                                                            </td>
                                                            <td className="matrix-td-growth">
                                                                {renderMatrixCell(row.growth, row.growthDiff, "growth")}
                                                            </td>
                                                            <td className="matrix-td-premium">
                                                                {renderMatrixCell(row.premium, row.premiumDiff, "premium")}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </React.Fragment>
                                            ))}

                                            {/* Bottom Action / CTA Row */}
                                            <tr className="matrix-action-row">
                                                <td className="matrix-td-feature">
                                                    <div className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                                                        SELECT YOUR PLAN
                                                    </div>
                                                </td>
                                                <td className="matrix-td-starter">
                                                    <Link to="/contact?plan=starter" className="matrix-btn-starter">
                                                        Get Started
                                                    </Link>
                                                </td>
                                                <td className="matrix-td-growth">
                                                    <Link to="/contact?plan=growth" className="matrix-btn-growth">
                                                        Scale with Growth →
                                                    </Link>
                                                </td>
                                                <td className="matrix-td-premium">
                                                    <Link to="/contact?plan=premium" className="matrix-btn-premium">
                                                        Dominate with Premium
                                                    </Link>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                )}

                {/* ========================================================================= */}
                {/* WHY WORK WITH US? (6 TRUST BADGES FROM IMAGE)                             */}
                {/* ========================================================================= */}
                <Reveal delay={0.28}>
                    <div id="why-work-with-us" className="mt-20">
                        <div className="text-center mb-10">
                            <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
                                WHY WORK WITH US?
                            </h3>
                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                                Built for growth-stage businesses, established retail, startups, and brands.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                            {WHY_WORK_POINTS.map((pt, pIdx) => {
                                const PointIcon = pt.icon;
                                return (
                                    <div
                                        key={pIdx}
                                        className="p-5 rounded-2xl bg-white dark:bg-card border border-slate-200 dark:border-slate-800 text-center hover:border-brand/40 transition-all shadow-sm flex flex-col items-center justify-center"
                                    >
                                        <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/50 text-brand dark:text-blue-400 flex items-center justify-center mb-3">
                                            <PointIcon className="w-6 h-6" />
                                        </div>
                                        <h4 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white leading-tight">
                                            {pt.title}
                                        </h4>
                                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1.5 hidden sm:block">
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
                    <Reveal delay={0.3}>
                        <div id="pricing-faq" className="faq-section-container">
                            <div className="text-center mb-10">
                                <span className="text-xs font-extrabold uppercase tracking-widest text-brand dark:text-sky-400">
                                    TRANSPARENCY & CLARITY
                                </span>
                                <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">
                                    Frequently Asked Questions
                                </h3>
                                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2 max-w-xl mx-auto">
                                    Everything you need to know about our digital marketing retainers, on-site shoots, and transparent ad spend.
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