import { GraduationCap, Lightbulb, FlaskConical, Briefcase, DoorOpen, Handshake, Users, Globe2, Target } from "lucide-react";
import SEO from "../components/SEO";
import PageHero from "../components/PageHero";
import CTABand from "../components/CTABand";
import FlowSteps from "../components/FlowSteps";
import Reveal from "../components/Reveal";

const highlights = [
    { icon: GraduationCap, title: "Quality Technology Education", text: "Learning designed around what industry actually needs — not outdated syllabi." },
    { icon: Lightbulb, title: "Innovation", text: "Emerging technologies explored through practical, hands-on work." },
    { icon: FlaskConical, title: "Practical Learning", text: "Skills built by doing — labs, projects and real problem solving." },
    { icon: Briefcase, title: "Real-World Experience", text: "Exposure to how technology is delivered in actual organisations." },
    { icon: DoorOpen, title: "Employment Opportunities", text: "Connecting skills to genuine pathways into the technology industry." },
    { icon: Handshake, title: "Industry Collaboration", text: "Working alongside businesses so learning stays relevant and current." },
    { icon: Users, title: "Inclusive Growth", text: "Opening technology careers to local, rural and underserved communities." },
    { icon: Globe2, title: "Digital Economy", text: "Contributing to a stronger, future-ready digital economy for all." },
];

const Vision = () => (
    <>
        <SEO
            title="Vision & Mission | GK Nexergy - Technology Solutions in India"
            description="Building a future-ready technology ecosystem across India through practical innovation, custom software engineering, AI adoption, and human capital development."
            keywords={[
                "Technology Solutions in India",
                "AI Solutions for Businesses",
                "Digital Transformation Services",
                "IT Consulting Services",
                "Software Development Company in Hyderabad"
            ]}
            canonical="/vision"
        />
        <PageHero
            eyebrow="Vision & Mission"
            titleLines={["Building a Future-Ready", "Technology Ecosystem"]}
            description="Our vision is a connected ecosystem where quality technology education, innovation and real-world experience create opportunity — for individuals, for businesses and for the wider digital economy."
            testId="vision-hero"
        />

        <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 sm:py-28" data-testid="vision-highlights">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {highlights.map((h, i) => (
                    <Reveal key={h.title} delay={(i % 4) * 0.08}>
                        <div className="h-full rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 dark:border-slate-800 dark:bg-card dark:hover:border-electric/40">
                            <h.icon className="h-6 w-6 text-brand dark:text-electric" strokeWidth={1.6} />
                            <h3 className="mt-4 font-display text-base font-bold text-ink dark:text-white">{h.title}</h3>
                            <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{h.text}</p>
                        </div>
                    </Reveal>
                ))}
            </div>
        </section>


        <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 sm:py-28 dark:bg-ink" data-testid="vision-mission">
            <Reveal>
                <div className="grid gap-8 rounded-2xl border border-slate-200 bg-white p-8 dark:border-slate-800 dark:bg-card sm:p-12 lg:grid-cols-12">
                    <div className="lg:col-span-4">
                        <Target className="h-7 w-7 text-brand dark:text-electric" strokeWidth={1.5} />
                        <h2 className="mt-4 font-display text-2xl font-extrabold tracking-tight text-ink dark:text-white sm:text-3xl">
                            Our Mission
                        </h2>
                    </div>
                    <div className="lg:col-span-8">
                        <p className="text-base leading-relaxed text-slate-600 dark:text-slate-300 sm:text-lg">
                            To train people with industry-relevant technology skills, build dependable software and digital solutions for businesses, and help organisations transform through the right use of AI, data, cloud and automation — connecting people, technology and business to create lasting opportunity for communities.
                        </p>
                    </div>
                </div>
            </Reveal>
        </section>
        <CTABand />
    </>
);

export default Vision;
