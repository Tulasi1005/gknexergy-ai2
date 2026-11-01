import { Link } from "react-router-dom";
import { ArrowRight, ChevronLeft } from "lucide-react";
import { Reveal } from "./Reveal";

const CTABand = ({
    title = "Let's Build What Comes Next.",
    text = "Whether you want to build technology, develop talent or transform your business let's start the conversation.",
    primary = { label: "Talk to Us", to: "/contact" },
    secondary = { label: "Explore Academy", to: "/academy" },
    showStackButton = true,
}) => (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50/90 via-sky-50/70 to-indigo-50/80 dark:bg-abyss dark:bg-none border-y border-blue-200/60 dark:border-slate-850" data-testid="cta-band">
        <div className="pointer-events-none absolute inset-0 bg-grid-light opacity-40 dark:opacity-60" />
        <div className="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-blue-400/20 dark:bg-navy blur-3xl" />
        
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-8 sm:py-24">
            <Reveal>
                <h2 className="max-w-3xl font-display text-3xl font-extrabold tracking-tight text-ink dark:text-white sm:text-4xl lg:text-5xl">
                    {title}
                </h2>
            </Reveal>

            <Reveal delay={0.12}>
                <p className="mt-6 max-w-3xl text-lg sm:text-xl lg:text-2xl leading-relaxed text-slate-700 dark:text-slate-200 font-normal">
                    {text}
                </p>
            </Reveal>

            <Reveal delay={0.22}>
                <div className="mt-8 sm:mt-10 flex flex-wrap gap-3 sm:gap-4 items-center">
                    <Link
                        to={primary.to}
                        data-testid="cta-band-primary"
                        className="group inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3 sm:px-7 sm:py-3.5 font-display text-sm sm:text-base font-bold text-white transition-colors duration-300 hover:bg-electric hover:text-ink text-center shadow-md shadow-brand/20 w-auto"
                    >
                        {primary.label}
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>

                    {secondary && (
                        <Link
                            to={secondary.to}
                            data-testid="cta-band-secondary"
                            className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 dark:border-white/25 px-6 py-3 sm:px-7 sm:py-3.5 font-display text-sm sm:text-base font-bold text-slate-800 dark:text-white transition-colors duration-300 hover:border-brand hover:text-brand dark:hover:border-electric dark:hover:text-electric bg-white/80 dark:bg-transparent text-center shadow-sm w-auto"
                        >
                            {secondary.label}
                        </Link>
                    )}

                    {showStackButton && (
                        <Link
                            to="/home#pages-stack-section"
                            data-testid="cta-band-stack"
                            aria-label="Back"
                            title="Back"
                            className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-brand/10 hover:bg-brand/20 dark:bg-white/10 dark:hover:bg-white/20 border border-brand/25 dark:border-white/20 text-brand dark:text-cyan-200 transition-all duration-300 hover:scale-105 shadow-sm"
                        >
                            <ChevronLeft className="h-5 w-5" />
                        </Link>
                    )}
                </div>
            </Reveal>
        </div>
    </section>
);

export default CTABand;