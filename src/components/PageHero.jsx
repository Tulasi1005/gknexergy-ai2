import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { Reveal, MaskedLines } from "./Reveal";
import { smartNavigateBack } from "../utils/navigation";

const PageHero = ({
    eyebrow,
    titleLines,
    description,
    children,
    showBackToStack = true,
    testId = "page-hero",
    afterTitle = null
}) => {
    const navigate = useNavigate();

    const handleBack = (e) => {
        e.preventDefault();
        smartNavigateBack(navigate, "/home");
    };

    return (
        <section className="relative overflow-hidden bg-grid-light" data-testid={testId}>
            <div className="pointer-events-none absolute -top-32 right-0 h-96 w-96 rounded-full bg-ice blur-3xl dark:bg-navy/40" />
            <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-28 sm:px-6 sm:pt-36 lg:px-8 lg:pb-24">
                <div className={`grid items-center gap-10 sm:gap-12 ${children ? "lg:grid-cols-2" : ""}`}>
                    <div>
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4 sm:mb-5">
                            {showBackToStack && (
                                <Reveal>
                                    <button
                                        type="button"
                                        onClick={handleBack}
                                        data-testid="back-to-stack-link"
                                        aria-label="Back to previous page"
                                        title="Back to previous page"
                                        className="group inline-flex items-center justify-center h-8 w-8 sm:h-9 sm:w-9 rounded-full border border-blue-500/25 bg-blue-500/10 text-brand hover:border-brand/50 hover:bg-blue-500/20 dark:border-blue-400/25 dark:bg-blue-400/10 dark:text-blue-300 dark:hover:bg-blue-400/20 transition-all duration-200 hover:scale-105 shadow-sm cursor-pointer"
                                    >
                                        <ChevronLeft className="h-4 w-4 sm:h-4.5 sm:w-4.5 transition-transform group-hover:-translate-x-0.5" />
                                    </button>
                                </Reveal>
                            )}
                        {eyebrow && (
                            <Reveal>
                                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand dark:text-electric">
                                    {eyebrow}
                                </p>
                            </Reveal>
                        )}
                    </div>
                    <MaskedLines
                        lines={titleLines}
                        className="font-display text-2xl min-[360px]:text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.15] tracking-tight text-ink dark:text-white break-words"
                    />
                    {afterTitle && (
                        <Reveal delay={0.2}>
                            <div className="mt-4 sm:mt-5">
                                {afterTitle}
                            </div>
                        </Reveal>
                    )}
                    {description && (
                        <Reveal delay={0.35}>
                            <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-600 dark:text-slate-300 sm:text-lg">
                                {description}
                            </p>
                        </Reveal>
                    )}
                </div>
                {children && <Reveal delay={0.25}>{children}</Reveal>}
            </div>
        </div>
    </section>
    );
};

export default PageHero;
