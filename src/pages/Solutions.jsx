import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SEO from "../components/SEO";
import PageHero from "../components/PageHero";
import CTABand from "../components/CTABand";
import Reveal from "../components/Reveal";
import { SOLUTIONS } from "../data/site";

const Solutions = () => (
    <>
        <SEO
            title="Technology Solutions & Services | Custom Software, AI & App Development"
            description="Explore GK Nexergy's end-to-end technology solutions: custom software development, web and mobile app development, AI automation services, and data analytics solutions."
            keywords={[
                "Custom Software Development",
                "Web and Mobile App Development",
                "AI Automation Services",
                "Data Analytics Solutions",
                "Digital Transformation Services",
                "Software Development Company in Hyderabad"
            ]}
            canonical="/solutions"
        />
        <PageHero
            eyebrow="Solutions"
            titleLines={["Technology Solutions Built", "Around Your Business."]}
            description="Right Technology. Right Problem. Right Time. We design and deliver solutions that fit your business — not the other way around."
            testId="solutions-hero"
        />
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-28" data-testid="solutions-grid">
            <div className="featured-capabilities-grid">
                {SOLUTIONS.map((s, i) => (
                    <Reveal key={s.slug} delay={(i % 3) * 0.1} className="grid-cell-stretch">
                        <Link
                            to={`/solutions/${s.slug}`}
                            data-testid={`solutions-card-${s.slug}`}
                            className="group pro-card"
                        >
                            {/* Card Image Banner */}
                            <div className="pro-card-img-wrap">
                                <img
                                    src={s.image}
                                    alt={s.title}
                                    className="pro-card-img"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                                
                                {/* Floating Category Icon */}
                                <div className="absolute bottom-3 left-4 flex items-center gap-2">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/95 text-brand shadow-md backdrop-blur dark:bg-ink/90 dark:text-electric">
                                        <s.icon className="h-5 w-5" strokeWidth={1.8} />
                                    </div>
                                </div>

                                {/* Step / Card Number */}
                                <span className="absolute top-3 right-3 rounded-full bg-slate-900/70 px-2.5 py-0.5 font-grotesk text-xs font-semibold text-white/90 backdrop-blur">
                                    {String(i + 1).padStart(2, "0")}
                                </span>
                            </div>

                            {/* Card Body */}
                            <div className="pro-card-body">
                                <p className="pro-card-eyebrow">
                                    {s.tagline}
                                </p>
                                <h2 className="pro-card-title">
                                    {s.title}
                                </h2>
                                <p className="pro-card-desc">
                                    {s.description}
                                </p>

                                {/* Features pill tags */}
                                {s.features && (
                                    <div className="pro-card-tags">
                                        {s.features.slice(0, 3).map((feat) => (
                                            <span
                                                key={feat}
                                                className="pro-card-tag"
                                            >
                                                {feat}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                <div className="pro-card-footer">
                                    <span className="pro-card-action">
                                        Explore Solution
                                        <ArrowRight className="pro-card-arrow h-4 w-4" />
                                    </span>
                                </div>
                            </div>
                        </Link>
                    </Reveal>
                ))}
            </div>
        </section>
        <CTABand
            title="Not Sure Where to Start?"
            text="Tell us the problem you're trying to solve — we'll help you identify the right technology for it."
            primary={{ label: "Talk to Us", to: "/contact" }}
            secondary={{ label: "View Industries", to: "/industries" }}
        />
    </>
);

export default Solutions;
