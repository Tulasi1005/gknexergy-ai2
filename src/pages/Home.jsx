import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Code2, Smartphone, BrainCircuit, Sparkles } from "lucide-react";
import SEO from "../components/SEO";
import Ecosystem from "../components/Ecosystem";
import EditorialMarquee from "../components/Marquee";
import CTABand from "../components/CTABand";
import FlowSteps from "../components/FlowSteps";
import { Reveal } from "../components/Reveal";
import { SOLUTIONS } from "../data/site";
import { NavPagesStack } from "../components/NavPagesStack/NavPagesStack";
import EnterpriseTransformation from "../components/EnterpriseTransformation";

const HERO_BG_NODES = [
    {
        key: "software-engineering",
        label: "Software Engineering",
        tagline: "Scalable Platforms & Applications",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1920&auto=format&fit=crop",
        accent: "#2563eb",
    },
    {
        key: "digital-transformation",
        label: "Digital Transformation",
        tagline: "Scalable Operating Models",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1920&auto=format&fit=crop",
        accent: "#0ea5e9",
    },
    {
        key: "digital-growth",
        label: "Digital Growth",
        tagline: "Intelligent Workflows & Growth",
        image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=1920&auto=format&fit=crop",
        accent: "#38bdf8",
    },
    {
        key: "nexergy-academy",
        label: "Nexergy Academy",
        tagline: "Industry Readiness Ecosystem",
        image: "https://imageio.forbes.com/specials-images/imageserve/6200b0dddcf32d3be937fa84/0x0.jpg?format=jpg&height=900&width=1600&fit=bounds",
        accent: "#6366f1",
    },
];

const FEATURED_HIGHLIGHTS = [
    {
        title: "Software & Application Engineering",
        tagline: "Scalable Platforms & Web Apps",
        description: "Custom software, high-performance web applications, and business platforms built for real-world reliability.",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop",
        icon: Code2,
        to: "/solutions/software-development",
        tags: ["Web Apps", "Custom APIs", "Cloud Ready"],
    },
    {
        title: "Mobile App Development",
        tagline: "iOS & Android Experiences",
        description: "Native and cross-platform mobile apps engineered for seamless performance and delightful user experience.",
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1000&auto=format&fit=crop",
        icon: Smartphone,
        to: "/solutions/mobile-development",
        tags: ["iOS & Android", "Cross-Platform", "Fast UI"],
    },
    {
        title: "AI & Process Automation",
        tagline: "Intelligent Workflows",
        description: "Transform operations with generative AI, machine learning pipelines, and predictive automation.",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000&auto=format&fit=crop",
        icon: BrainCircuit,
        to: "/solutions/ai-automation",
        tags: ["GenAI", "Automated Ops", "Data Insights"],
    },
];

const Home = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isUserInteracted, setIsUserInteracted] = useState(false);

    useEffect(() => {
        if (window.location.hash === '#our-ecosystems') {
            setTimeout(() => {
                const el = document.getElementById('our-ecosystems');
                if (el) {
                    el.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        }
    }, []);

    useEffect(() => {
        if (isUserInteracted) {
            const timer = setTimeout(() => setIsUserInteracted(false), 12000);
            return () => clearTimeout(timer);
        }
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % HERO_BG_NODES.length);
        }, 5500);
        return () => clearInterval(interval);
    }, [isUserInteracted]);

    const handleSelectNode = (idx) => {
        setActiveIndex(idx);
        setIsUserInteracted(true);
    };

    const activeNode = HERO_BG_NODES[activeIndex] || HERO_BG_NODES[0];

    return (
        <>
            <SEO
                title="GK Nexergy | Custom Software Development & AI Solutions for Businesses"
                description="Leading software development company in Hyderabad providing AI solutions for businesses, custom software development, digital transformation, and IT consulting services in India."
                keywords={[
                    "AI Solutions for Businesses",
                    "AI Automation Services",
                    "Custom Software Development",
                    "Digital Transformation Services",
                    "Business Process Automation",
                    "IT Consulting Services",
                    "Enterprise Software Solutions",
                    "Data Analytics Solutions",
                    "Web and Mobile App Development",
                    "Technology Solutions in India",
                    "Software Development Company in Hyderabad"
                ]}
                canonical="/home"
            />

            {/* HERO */}
            <section className="hero-home-section relative overflow-hidden bg-grid-light" data-testid="home-hero">
                {/* Dynamic Background Image per Active Node */}
                <div className="hero-bg-layer">
                    <AnimatePresence mode="sync">
                        <motion.div
                            key={activeNode.key}
                            initial={{ opacity: 0, scale: 1.04 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                            className="absolute inset-0"
                        >
                            <img
                                src={activeNode.image}
                                alt={activeNode.label}
                                className="hero-bg-img"
                            />
                        </motion.div>
                    </AnimatePresence>

                    {/* Seamless Edge Blending to allow background image to be prominently visible */}
                    <div className="hero-edge-blend" />
                    <div className="hero-v-blend" />

                    {/* Dynamic Ambient Accent Glow tailored to Active Node */}
                    <motion.div
                        key={`glow-${activeNode.key}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.2 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                        style={{ backgroundColor: activeNode.accent }}
                        className="absolute -top-32 right-1/4 h-[520px] w-[520px] rounded-full blur-[140px] pointer-events-none"
                    />
                    <div className="absolute -left-32 top-24 h-96 w-96 rounded-full bg-ice blur-3xl dark:bg-navy/40 pointer-events-none" />

                    {/* Subtle Tech Grid */}
                    <div className="absolute inset-0 bg-grid-light opacity-25 pointer-events-none" />
                </div>

                <div className="hero-home-grid relative mx-auto grid w-full max-w-[1760px] items-center gap-8 sm:gap-16 px-4 pt-20 pb-16 sm:gap-16 sm:px-8 sm:pt-36 sm:pb-36 lg:grid-cols-2 lg:gap-16 xl:gap-24 2xl:gap-32 lg:px-12 xl:px-16 lg:pt-40 lg:pb-44 xl:pt-44 xl:pb-48">
                    {/* LEFT CORNER: Content Box */}
                    <div className="hero-home-col-text relative z-20 w-full max-w-3xl lg:max-w-[620px] xl:max-w-[680px] 2xl:max-w-[740px] lg:justify-self-start order-1">
                        <div className="hero-text-card lg:mr-auto">

                            {/* HERO HEADING */}
                            <Reveal delay={0.1}>
                                <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[2.85rem] xl:text-[3.35rem] 2xl:text-[3.75rem] font-extrabold leading-[1.15] tracking-tight text-ink dark:text-white drop-shadow-[0_2px_12px_rgba(255,255,255,0.8)] dark:drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
                                    <span className="hero-heading-line-1 block">
                                        One Company. <span className="text-brand dark:text-electric">Two Powerful</span>
                                    </span>
                                    <span className="hero-heading-line-2 block text-brand dark:text-electric">
                                        Ecosystems.
                                    </span>
                                </h1>
                            </Reveal>

                            <Reveal delay={0.25}>
                                <p className="mt-5 max-w-2xl text-sm sm:text-lg lg:text-[1.125rem] leading-relaxed text-slate-700 dark:text-slate-300 font-medium">
                                    GK Nexergy brings technology, learning, industry and opportunity together through one connected ecosystem.
                                </p>

                                <p className="mt-3 sm:mt-4 max-w-2xl text-sm sm:text-lg lg:text-[1.125rem] font-medium leading-relaxed text-slate-800 dark:text-slate-200">
                                    We empower businesses with custom software development, AI solutions, and digital transformation services — bridging enterprise innovation and real-world technology solutions in India.
                                </p>
                            </Reveal>

                            <Reveal delay={0.4}>
                                <div className="mt-6 sm:mt-8 flex flex-row flex-wrap items-center gap-3 sm:gap-4 w-auto">
                                    <Link
                                        to="/contact"
                                        data-testid="hero-build-cta"
                                        className="group inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3 sm:px-7 sm:py-3.5 font-display text-sm sm:text-base font-bold text-white transition-all duration-300 hover:bg-electric hover:text-ink w-auto shrink-0 text-center shadow-md shadow-brand/25 hover:shadow-electric/30 hover:scale-[1.02]"
                                    >
                                        Build With Us
                                        <ArrowRight className="h-4 w-4 sm:h-4.5 sm:w-4.5 transition-transform duration-300 group-hover:translate-x-1" />
                                    </Link>

                                    <Link
                                        to="/academy"
                                        data-testid="hero-academy-cta"
                                        className="group inline-flex items-center justify-center gap-2 rounded-full border border-navy/30 px-6 py-3 sm:px-7 sm:py-3.5 font-display text-sm sm:text-base font-bold text-navy transition-all duration-300 hover:border-brand hover:text-brand dark:border-slate-500/80 dark:text-white dark:hover:border-electric dark:hover:text-electric w-auto shrink-0 text-center bg-white/80 dark:bg-slate-900/50 backdrop-blur-sm hover:scale-[1.02]"
                                    >
                                        Explore Nexergy Academy
                                        <ArrowRight className="h-4 w-4 sm:h-4.5 sm:w-4.5 transition-transform duration-300 group-hover:translate-x-1" />
                                    </Link>
                                </div>
                            </Reveal>
                        </div>
                    </div>

                    {/* RIGHT CORNER: Orbiting Ecosystem Nodes */}
                    <Reveal delay={0.2} y={0} className="hero-home-col-nodes relative z-30 flex items-center justify-center lg:justify-end w-full lg:justify-self-end order-2">
                        <div className="w-full overflow-visible px-2 flex justify-center lg:justify-end">
                            <Ecosystem activeIndex={activeIndex} onSelectNode={handleSelectNode} />
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ALL MAIN NAV PAGES STACK SECTION */}
            <NavPagesStack />

            {/* AI + DIGITAL BUSINESS TRANSFORMATION SECTION */}
            <EnterpriseTransformation />

            {/* <EditorialMarquee /> */}

            {/* TWO ECOSYSTEMS (WITH CLEAN IMAGES & GENEROUS SPACING) */}
            <section
                id="our-ecosystems"
                className="mx-auto max-w-7xl px-4 pt-6 pb-16 sm:px-8 sm:pt-10 sm:pb-24 scroll-mt-24"
                data-testid="home-ecosystems"
            >
                <Reveal>
                    <div className="ecosystems-header">
                        <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-brand dark:text-electric">
                            Our Ecosystems
                        </h2>
                        <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-400">
                            Bridging high-end technology solutions for businesses with industry-grade workforce empowerment.
                        </p>
                    </div>
                </Reveal>

                <div className="core-ecosystems-grid">
                    {/* ECOSYSTEM 1: SOLUTIONS CARD WITH CLEAN IMAGE */}
                    <Reveal delay={0.2} className="grid-cell-stretch">
                        <Link
                            to="/solutions"
                            data-testid="ecosystem-solutions-card"
                            className="group pro-card"
                        >
                            {/* Clean Photographic Banner (NO Text Overlay) */}
                            <div className="relative h-60 sm:h-72 w-full overflow-hidden bg-slate-900 flex-shrink-0">
                                <img
                                    src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop"
                                    alt="GK Nexergy Enterprise Solutions"
                                    loading="lazy"
                                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>

                            {/* Card Body */}
                            <div className="flex flex-1 flex-col p-6 sm:p-8">
                                <h3 className="font-display text-2xl font-extrabold text-ink group-hover:text-brand dark:text-white dark:group-hover:text-electric transition-colors">
                                    GK Nexergy Solutions
                                </h3>

                                <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300 sm:text-base flex-1 min-h-[54px]">
                                    End-to-end custom software engineering, cloud platforms, predictive AI automation, and digital transformation tailored to your business realities.
                                </p>

                                <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-800">
                                    <span className="inline-flex items-center gap-2 font-display text-sm font-bold text-brand transition-colors group-hover:text-electric dark:text-electric">
                                        Explore All Solutions
                                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                                    </span>
                                </div>
                            </div>
                        </Link>
                    </Reveal>

                    {/* ECOSYSTEM 2: ACADEMY CARD WITH CLEAN IMAGE */}
                    <Reveal delay={0.1} className="grid-cell-stretch">
                        <Link
                            to="/academy"
                            data-testid="ecosystem-academy-card"
                            className="group pro-card"
                        >
                            {/* Clean Photographic Banner (NO Text Overlay) */}
                            <div className="relative h-60 sm:h-72 w-full overflow-hidden bg-slate-900 flex-shrink-0">
                                <img
                                    src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1200&auto=format&fit=crop"
                                    alt="Nexergy Academy Skill Development"
                                    loading="lazy"
                                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>

                            {/* Card Body */}
                            <div className="flex flex-1 flex-col p-6 sm:p-8">
                                <h3 className="font-display text-2xl font-extrabold text-ink group-hover:text-brand dark:text-white dark:group-hover:text-electric transition-colors">
                                    Nexergy Academy
                                </h3>

                                <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300 sm:text-base flex-1 min-h-[54px]">
                                    Practical education aligned with active IT industry standards — hands-on labs, mentored apprenticeships, and direct pathways to digital careers.
                                </p>

                                <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-800">
                                    <span className="inline-flex items-center gap-2 font-display text-sm font-bold text-brand transition-colors group-hover:text-electric dark:text-electric">
                                        Explore Academy Programs
                                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                                    </span>
                                </div>
                            </div>
                        </Link>
                    </Reveal>
                </div>

            </section>

            {/* FEATURED CAPABILITIES GRID WITH CLEAN IMAGES */}
            <section className="bg-slate-50/80 py-20 sm:py-32 dark:bg-ink/60 border-t border-slate-200/60 dark:border-slate-800/60" data-testid="home-featured-capabilities">
                <div className="mx-auto max-w-7xl px-4 sm:px-8">
                    <Reveal>
                        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-12 sm:pb-16 border-b border-slate-200/80 dark:border-slate-800/80">
                            <div>
                                <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand dark:text-electric">
                                    What We Build
                                </p>
                                <h2 className="mt-2.5 font-display text-2xl sm:text-4xl font-extrabold tracking-tight text-ink dark:text-white">
                                    Proven Capabilities in Action
                                </h2>
                            </div>
                            <Link
                                to="/solutions"
                                className="inline-flex items-center gap-2 font-display text-sm font-bold text-brand hover:text-electric dark:text-electric transition-colors"
                            >
                                View All Capabilities <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                    </Reveal>

                    <div className="mt-14 featured-capabilities-grid">
                        {FEATURED_HIGHLIGHTS.map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <Reveal key={item.title} delay={index * 0.1} className="grid-cell-stretch">
                                    <Link
                                        to={item.to}
                                        className="group pro-card"
                                    >
                                        {/* Pure Photographic Banner - NO TEXT OVERLAY */}
                                        <div className="pro-card-img-wrap">
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                loading="lazy"
                                                className="pro-card-img"
                                            />
                                        </div>

                                        {/* Card Content */}
                                        <div className="pro-card-body">
                                            <div className="flex items-center justify-between gap-3 mb-2.5">
                                                <p className="pro-card-eyebrow !mb-0">
                                                    {item.tagline}
                                                </p>
                                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-brand dark:bg-slate-800 dark:text-electric shrink-0">
                                                    <Icon className="h-4 w-4" strokeWidth={1.8} />
                                                </div>
                                            </div>

                                            <h3 className="pro-card-title">
                                                {item.title}
                                            </h3>
                                            <p className="pro-card-desc">
                                                {item.description}
                                            </p>



                                            <div className="pro-card-footer">
                                                <span className="pro-card-action">
                                                    Learn More
                                                    <ArrowRight className="pro-card-arrow h-4 w-4" />
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                </Reveal>
                            );
                        })}
                    </div>
                </div>
            </section>


            <CTABand />
        </>
    );
};

export default Home;