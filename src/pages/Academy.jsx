import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, FlaskConical, Hammer, Briefcase, TrendingUp, GraduationCap, Users, Sparkles, HeartHandshake, FolderKanban, Compass } from "lucide-react";
import SEO from "../components/SEO";
import PageHero from "../components/PageHero";
import CTABand from "../components/CTABand";
import FlowSteps from "../components/FlowSteps";
import Reveal from "../components/Reveal";

const offerings = [
    { icon: BookOpen, title: "Industry-Relevant Education", text: "Curricula built around what technology teams actually use today." },
    { icon: FlaskConical, title: "Practical Experience", text: "Hands-on labs and exercises that turn knowledge into capability." },
    { icon: Sparkles, title: "Emerging Technologies", text: "AI, cloud, data and security — learned as they are used in industry." },
    { icon: HeartHandshake, title: "Mentorship", text: "Guidance from professionals with decades of real industry experience." },
    { icon: FolderKanban, title: "Real-World Project Exposure", text: "Work that mirrors how software is actually delivered in organisations." },
    { icon: Compass, title: "Career Development", text: "Support for students, graduates, professionals and career returnees." },
];

const Academy = () => (
    <>
        <SEO
            title="Nexergy Academy | Industry-Ready Technology Skills & Workforce Training"
            description="Bridging the technology skills gap with hands-on training in Cyber Security, AI & Digital Marketing, Databases, and foundational software engineering in India."
            keywords={[
                "Nexergy Academy",
                "Technology Solutions in India",
                "AI Digital Marketing Course",
                "Cyber Security Training",
                "Software Skills Hyderabad"
            ]}
            canonical="/academy"
        />
        <PageHero
            eyebrow="Nexergy Academy"
            titleLines={["Beyond Technology.", "Building Human Capital."]}
            description="Industry-relevant learning connected to real-world technology. Nexergy Academy gives students, graduates, professionals and career returnees access to education, experience and mentorship that lead somewhere real."
            testId="academy-hero"
        >
            <div className="rounded-2xl border border-slate-200 bg-white p-8 dark:border-slate-800 dark:bg-card" data-testid="academy-journey">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand dark:text-electric">The Learning Journey</p>
                <div className="mt-6 space-y-5">
                    {[
                        { icon: BookOpen, step: "Learn", text: "Industry-relevant concepts and tools" },
                        { icon: FlaskConical, step: "Practice", text: "Hands-on labs and guided exercises" },
                        { icon: Hammer, step: "Build", text: "Real projects with real constraints" },
                        { icon: Briefcase, step: "Experience", text: "Exposure to professional delivery" },
                        { icon: TrendingUp, step: "Grow", text: "Toward careers and opportunity" },
                    ].map((j, i) => (
                        <div key={j.step} className="flex items-center gap-4">
                            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ice dark:bg-navy/40">
                                <j.icon className="h-5 w-5 text-brand dark:text-electric" strokeWidth={1.6} />
                            </span>
                            <div>
                                <p className="font-display text-sm font-bold text-ink dark:text-white">
                                    <span className="mr-2 font-grotesk text-xs text-slate-400">{String(i + 1).padStart(2, "0")}</span>
                                    {j.step}
                                </p>
                                <p className="text-xs text-slate-500 dark:text-slate-400">{j.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </PageHero>

        <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 sm:py-28" data-testid="academy-offerings">
            <Reveal>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand dark:text-electric">What Learners Access</p>
                <h2 className="mt-4 max-w-2xl font-display text-3xl font-extrabold tracking-tight text-ink dark:text-white sm:text-4xl">
                    Learning Connected to the Real World
                </h2>
            </Reveal>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {offerings.map((o, i) => (
                    <Reveal key={o.title} delay={(i % 3) * 0.08}>
                        <div className="h-full rounded-2xl border border-slate-200 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 dark:border-slate-800 dark:bg-card dark:hover:border-electric/40">
                            <o.icon className="h-6 w-6 text-brand dark:text-electric" strokeWidth={1.6} />
                            <h3 className="mt-4 font-display text-lg font-bold text-ink dark:text-white">{o.title}</h3>
                            <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{o.text}</p>
                        </div>
                    </Reveal>
                ))}
            </div>
        </section>

      
        <CTABand
            title="Ready to Start Learning?"
            text="Explore programs built by industry professionals — and connected to real technology work."
            primary={{ label: "Explore Courses", to: "/academy/courses" }}
            secondary={{ label: "Talk to Us", to: "/contact" }}
        />
    </>
);

export default Academy;
