import Marquee from "react-fast-marquee";
import { Sparkles } from "lucide-react";

const EditorialMarquee = ({ className = "" }) => (
    <div
        className={`relative overflow-hidden border-y border-blue-200/70 bg-gradient-to-r from-blue-50/90 via-white to-blue-50/90 py-6 sm:py-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_4px_20px_-4px_rgba(15,45,107,0.06)] dark:border-cyan-500/25 dark:from-[#060c1c] dark:via-[#0c1c3f] dark:to-[#060c1c] dark:shadow-[0_12px_36px_-10px_rgba(7,13,30,0.5),inset_0_1px_0_rgba(255,255,255,0.12)] ${className}`}
        data-testid="editorial-marquee"
    >
        {/* Subtle background ambient glow */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.06)_0%,transparent_70%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.12)_0%,transparent_70%)]" />

        {/* Gradient edge mask to smoothly fade in/out at left and right */}
        <div
            style={{
                WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
                maskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
            }}
        >
            <Marquee speed={34} gradient={false} pauseOnHover={false}>
                {[0, 1, 2, 3].map((i) => (
                    <div key={i} className="mx-8 sm:mx-12 flex items-center gap-8 sm:gap-12">
                        {/* Phrase with rich typography and glowing gradient accent */}
                        <div className="flex items-center gap-2.5 sm:gap-3.5 font-display text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-wide uppercase">
                            <span className="text-navy dark:text-white">
                                Your
                            </span>
                            <span className="bg-gradient-to-r from-brand via-blue-600 to-indigo-600 bg-clip-text text-transparent dark:from-sky-300 dark:via-cyan-200 dark:to-blue-400 dark:drop-shadow-[0_0_20px_rgba(56,189,248,0.45)]">
                                IT Success
                            </span>
                            <span className="text-navy/85 dark:text-white/90">
                                Designed
                            </span>
                            <span className="text-blue-600 dark:text-sky-300 dark:drop-shadow-[0_0_15px_rgba(125,211,252,0.35)]">
                                Blueprint
                            </span>
                        </div>

                        {/* Luxury divider element */}
                        <div className="flex items-center gap-2.5 opacity-90">
                            <span className="h-px w-6 sm:w-8 bg-gradient-to-r from-transparent to-blue-400/60 dark:to-cyan-400/70" />
                            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 border border-blue-300/80 text-brand shadow-sm dark:bg-cyan-950/80 dark:border-cyan-400/40 dark:text-cyan-300 dark:shadow-[0_0_12px_rgba(56,189,248,0.4)]">
                                <Sparkles className="h-3.5 w-3.5" />
                            </div>
                            <span className="h-px w-6 sm:w-8 bg-gradient-to-l from-transparent to-blue-400/60 dark:to-cyan-400/70" />
                        </div>
                    </div>
                ))}
            </Marquee>
        </div>
    </div>
);

export default EditorialMarquee;

