import { Award, BookOpen, Briefcase, Building2, Sparkles, Users, MapPin, Globe2, Quote } from "lucide-react";
import SEO from "../components/SEO";
import PageHero from "../components/PageHero";
import CTABand from "../components/CTABand";
import Reveal from "../components/Reveal";

const reasons = [
    { icon: Award, title: "25+ Years of Industry Experience", text: "Founded and led by professionals who have spent decades delivering software, projects and training in the real IT industry." },
    { icon: BookOpen, title: "Industry-Relevant Learning", text: "Our programs follow what the industry actually uses — current tools, current practices, current expectations." },
    { icon: Briefcase, title: "Real-World Projects", text: "Learners work on practical, real-world problems — building experience, not just completing lessons." },
    { icon: Building2, title: "Business-Focused Technology", text: "We start with the business problem, then choose the technology — never the other way around." },
    { icon: Sparkles, title: "Emerging Technologies", text: "AI, data, cloud and automation — applied thoughtfully, where they genuinely create value." },
    { icon: Users, title: "Human Capital Development", text: "We invest in people: mentorship, practical skills and career development that lasts." },
    { icon: MapPin, title: "Local Talent Empowerment", text: "We build technology capability in local, rural and semi-urban communities — where talent is and opportunity should be." },
    { icon: Globe2, title: "Inclusive Growth", text: "A future-ready workforce should include everyone. Our ecosystem is built for inclusive participation in the digital economy." },
];

const Why = () => (
    <>
        <SEO
            title="Why GK Nexergy | Software Development Company in Hyderabad & IT Consulting"
            description="Discover why growing businesses trust GK Nexergy for custom software development, IT consulting services, business process automation, and practical technology solutions in India."
            keywords={[
                "IT Consulting Services",
                "Business Process Automation",
                "Software Development Company in Hyderabad",
                "Technology Solutions in India",
                "Custom Software Development"
            ]}
            canonical="/why-gk-nexergy"
        />
        <PageHero
            eyebrow="Why GK Nexergy"
            titleLines={["Why GK Nexergy?"]}
            description="Because technology is only valuable when it creates meaningful outcomes."
            testId="why-hero"
        />
        <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 sm:py-28" data-testid="why-reasons">
            <div className="grid gap-5 sm:grid-cols-2">
                {reasons.map((r, i) => (
                    <Reveal key={r.title} delay={(i % 2) * 0.1}>
                        <div className="flex h-full gap-5 rounded-2xl border border-slate-200 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 dark:border-slate-800 dark:bg-card dark:hover:border-electric/40 sm:p-8" data-testid={`why-reason-${i}`}>
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-ice dark:bg-navy/40">
                                <r.icon className="h-5 w-5 text-brand dark:text-electric" strokeWidth={1.6} />
                            </div>
                            <div>
                                <p className="font-grotesk text-xs font-semibold tracking-[0.3em] text-slate-400 dark:text-slate-500">
                                    {String(i + 1).padStart(2, "0")}
                                </p>
                                <h2 className="mt-1 font-display text-lg font-bold text-ink dark:text-white sm:text-xl">{r.title}</h2>
                                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{r.text}</p>
                            </div>
                        </div>
                    </Reveal>
                ))}
            </div>
            <Reveal>
                <div className="mt-16 rounded-2xl bg-gradient-to-br from-blue-50 via-sky-50 to-indigo-50 border border-blue-200/80 p-8 dark:border-slate-800 dark:bg-card dark:bg-none sm:p-12" data-testid="why-statement">
                    <Quote className="h-7 w-7 text-brand dark:text-electric" strokeWidth={1.5} />
                    <p className="mt-5 max-w-3xl font-display text-xl font-bold leading-snug text-ink dark:text-white sm:text-2xl lg:text-3xl">
                        We don't simply introduce technology. We identify the right technology for the right problem at the right stage of growth.
                    </p>
                </div>
            </Reveal>
        </section>
        <CTABand />
    </>
);

export default Why;
