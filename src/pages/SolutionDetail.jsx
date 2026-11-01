import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowRight, CheckCircle2, ArrowLeft } from "lucide-react";
import SEO from "../components/SEO";
import PageHero from "../components/PageHero";
import CTABand from "../components/CTABand";
import FlowSteps from "../components/FlowSteps";
import Reveal from "../components/Reveal";
import PricingPlans from "../components/PricingPlans/PricingPlans";
import { SOLUTIONS } from "../data/site";

const SolutionDetail = () => {
    const { slug } = useParams();
    const solution = SOLUTIONS.find((s) => s.slug === slug);
    if (!solution) return <Navigate to="/solutions" replace />;
    const Icon = solution.icon;

    const solutionKeywords = {
        "software-development": [
            "Custom Software Development",
            "Enterprise Software Solutions",
            "Software Development Company in Hyderabad",
            "Web and Mobile App Development",
            "Technology Solutions in India"
        ],
        "mobile-development": [
            "Web and Mobile App Development",
            "Custom Software Development",
            "Mobile Application Engineering",
            "Android and iOS Development",
            "Software Development Company in Hyderabad"
        ],
        "digital-transformation": [
            "Digital Transformation Services",
            "Business Process Automation",
            "Enterprise Software Solutions",
            "IT Consulting Services",
            "Technology Solutions in India"
        ],
        "ai-automation": [
            "AI Solutions for Businesses",
            "AI Automation Services",
            "Business Process Automation",
            "Enterprise AI Solutions",
            "Software Development Company in Hyderabad"
        ],
        "data-analytics": [
            "Data Analytics Solutions",
            "AI Solutions for Businesses",
            "Enterprise Software Solutions",
            "Business Intelligence India",
            "IT Consulting Services"
        ],
        "digital-growth": [
            "Digital Growth Services",
            "Performance Marketing",
            "Meta and Google Ads",
            "Technology Solutions in India",
            "Digital Transformation Services"
        ]
    }[solution.slug] || [
        "Custom Software Development",
        "AI Solutions for Businesses",
        "Digital Transformation Services"
    ];

    const serviceSchema = {
        "@type": "Service",
        "@id": `https://gknexergy.com/solutions/${solution.slug}#service`,
        "name": solution.title,
        "serviceType": solution.shortTitle || solution.title,
        "description": solution.description,
        "provider": {
            "@id": "https://gknexergy.com/#organization"
        },
        "areaServed": {
            "@type": "Country",
            "name": "India"
        },
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": `${solution.title} Capabilities`,
            "itemListElement": solution.features.map((feat) => ({
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Service",
                    "name": feat
                }
            }))
        }
    };

    return (
        <>
            <SEO
                title={`${solution.title} | GK Nexergy - Custom Software & Technology Solutions`}
                description={`${solution.tagline} ${solution.description}`}
                keywords={solutionKeywords}
                canonical={`/solutions/${solution.slug}`}
                ogImage={solution.image}
                schema={serviceSchema}
            />
            <PageHero
                eyebrow="GK Nexergy Solutions"
                titleLines={[solution.tagline]}
                description={solution.description}
                testId={`solution-hero-${slug}`}
            >
                <div className="relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800" data-testid="solution-hero-image">
                    <img src={solution.image} alt={solution.title} className="aspect-[4/3] w-full object-cover" loading="eager" />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-5 flex items-center gap-2.5">
                        <Icon className="h-5 w-5 text-electric" strokeWidth={1.6} />
                        <span className="font-display text-sm font-bold text-white">{solution.title}</span>
                    </div>
                </div>
            </PageHero>

            <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 sm:py-24">
                <div className="grid gap-14 lg:grid-cols-12">
                    <div className="lg:col-span-7">
                        <Reveal>
                            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand dark:text-electric">Capabilities</p>
                            <h2 className="mt-4 font-display text-2xl font-extrabold tracking-tight text-ink dark:text-white sm:text-3xl">
                                What We Deliver
                            </h2>
                        </Reveal>
                        <div className="mt-8 grid gap-3 sm:grid-cols-2" data-testid="solution-features">
                            {solution.features.map((f, i) => (
                                <Reveal key={f} delay={i * 0.05}>
                                    <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3.5 dark:border-slate-800 dark:bg-card">
                                        <CheckCircle2 className="h-5 w-5 shrink-0 text-brand dark:text-electric" strokeWidth={1.8} />
                                        <span className="text-sm font-semibold text-ink dark:text-slate-100">{f}</span>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                    <div className="lg:col-span-5">
                        <Reveal delay={0.1}>
                            <div className="rounded-2xl bg-mist p-8 dark:bg-ink" data-testid="solution-approach">
                                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand dark:text-electric">Our Approach</p>
                                <h3 className="mt-3 font-display text-xl font-extrabold text-ink dark:text-white">
                                    How We Work
                                </h3>
                                <div className="mt-6 space-y-4">
                                    {solution.flow.map((step, i) => (
                                        <div key={step} className="flex items-center gap-4">
                                            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-brand/40 font-grotesk text-xs font-bold text-brand dark:border-electric/40 dark:text-electric">
                                                {String(i + 1).padStart(2, "0")}
                                            </span>
                                            <span className="font-display text-sm font-bold text-ink dark:text-white">{step}</span>
                                            {i < solution.flow.length - 1 && (
                                                <span className="ml-auto h-px flex-1 bg-slate-200 dark:bg-slate-700" aria-hidden="true" />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </div>

                <Reveal>
                    <div className="mt-16 flex flex-wrap items-center gap-5">
                        <Link
                            to="/contact"
                            data-testid="solution-cta"
                            className="group inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 font-display text-sm font-bold text-white transition-colors duration-300 hover:bg-electric hover:text-ink"
                        >
                            {solution.cta}
                            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                        <Link
                            to="/solutions"
                            data-testid="solution-back"
                            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition-colors hover:text-brand dark:text-slate-300 dark:hover:text-electric"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            All Solutions
                        </Link>
                    </div>
                </Reveal>
            </section>

            {/* PRICING PLANS SECTION FOR DIGITAL GROWTH */}
            {slug === "digital-growth" && (
                <PricingPlans
                    showHeader={true}
                    showComparison={true}
                    showFaqs={true}
                    initialPlan="growth"
                />
            )}
            
            <CTABand />
        </>
    );
};

export default SolutionDetail;
