import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Rocket, Store, GraduationCap, Briefcase, ShoppingBag, HeartPulse, Landmark, Cpu, Building2 } from "lucide-react";
import SEO from "../components/SEO";
import PageHero from "../components/PageHero";
import CTABand from "../components/CTABand";
import Reveal from "../components/Reveal";
import { INDUSTRIES } from "../data/site";
import "./Industries.css";

const icons = [Rocket, Store, GraduationCap, Briefcase, ShoppingBag, HeartPulse, Landmark, Cpu, Building2];

const Industries = () => {
    const [activeCard, setActiveCard] = useState(null);

    const handleCardClick = (index) => {
        setActiveCard((prev) => (prev === index ? null : index));
    };

    return (
        <>
            <SEO
                title="Industries We Serve | Enterprise Software Solutions & Digital Transformation"
                description="GK Nexergy delivers industry-specific enterprise software solutions, digital transformation services, and business process automation across healthcare, finance, retail, and education."
                keywords={[
                    "Enterprise Software Solutions",
                    "Digital Transformation Services",
                    "Business Process Automation",
                    "AI Solutions for Businesses",
                    "Technology Solutions in India"
                ]}
                canonical="/industries"
            />
            <PageHero
                eyebrow="Industries"
                titleLines={["Technology That Understands", "Your Industry."]}
                description="Every organisation is different. We adapt technology to your industry's realities, your organisation's requirements and your stage of growth."
                testId="industries-hero"
            />
            <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 sm:py-28" data-testid="industries-grid">
                <div className="industries-grid">
                    {INDUSTRIES.map((ind, i) => {
                        const Icon = icons[i] || Building2;
                        const isActive = activeCard === i;
                        return (
                            <Reveal key={ind.name} delay={(i % 3) * 0.08}>
                                <div
                                    className={`industry-card group ${isActive ? "is-active" : ""}`}
                                    data-testid={`industry-card-${i}`}
                                    onClick={() => handleCardClick(i)}
                                >
                                    {/* Image Wrapper: Initially 100% full height, shrinks on hover */}
                                    <div className="industry-card-img-wrap">
                                        <img
                                            src={ind.image}
                                            alt={ind.name}
                                            loading="lazy"
                                            className="industry-card-img"
                                        />
                                        <div className="industry-card-img-overlay" />
                                        
                                        {/* Category Badge */}
                                        <span className="industry-card-badge">
                                            {ind.category}
                                        </span>

                                        {/* Initial state title preview (fades out on hover) */}
                                        <div className="industry-card-preview-bar">
                                            <div className="industry-preview-pill">
                                                <Icon className="h-4 w-4 text-brand dark:text-electric" strokeWidth={2} />
                                                <span className="industry-preview-title">{ind.name}</span>
                                            </div>
                                            <span className="industry-preview-hint">
                                                <ArrowRight className="h-3.5 w-3.5" />
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content Wrapper: Revealed below the image upon hover */}
                                    <div className="industry-card-content">
                                        <div className="industry-content-inner">
                                            <div className="industry-content-top">
                                                <div className="industry-content-header">
                                                    <div className="industry-icon-wrap">
                                                        <Icon className="h-5 w-5" strokeWidth={2} />
                                                    </div>
                                                    <div>
                                                        <span className="text-[11px] font-bold uppercase tracking-wider text-brand dark:text-electric">
                                                            {ind.category}
                                                        </span>
                                                        <h3 className="industry-content-title">
                                                            {ind.name}
                                                        </h3>
                                                    </div>
                                                </div>

                                                <p className="industry-content-desc">
                                                    {ind.text}
                                                </p>

                                                {/* Highlights Tags */}
                                                {ind.highlights && (
                                                    <div className="industry-tags">
                                                        {ind.highlights.map((tag) => (
                                                            <span key={tag} className="industry-tag">
                                                                {tag}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Action Link */}
                                            <Link
                                                to="/contact"
                                                className="industry-card-action"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <span>Discuss Your Challenge</span>
                                                <ArrowRight className="industry-action-arrow h-4 w-4" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </Reveal>
                        );
                    })}
                </div>

                <Reveal>
                    <div className="mt-14 flex justify-center">
                        <Link
                            to="/contact"
                            data-testid="industries-cta"
                            className="group inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3 sm:px-7 sm:py-3.5 font-display text-sm sm:text-base font-bold text-white transition-colors duration-300 hover:bg-electric hover:text-ink w-auto shadow-md hover:shadow-xl"
                        >
                            Discuss Your Business Challenge
                            <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                    </div>
                </Reveal>
            </section>
            <CTABand />
        </>
    );
};

export default Industries;
