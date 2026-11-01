import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SEO from "../components/SEO";
import PageHero from "../components/PageHero";
import CTABand from "../components/CTABand";
import Reveal from "../components/Reveal";
import { COURSES } from "../data/site";

const Courses = () => (
    <>
        <SEO
            title="Technology Courses & Professional Certifications | Nexergy Academy"
            description="Master industry-demanded tech skills: Cyber Security, AI Tools & Digital Marketing, Databases In-Depth, and Foundation Software Engineering programs in India."
            keywords={[
                "Technology Courses Hyderabad",
                "Cyber Security Training",
                "AI Digital Marketing Course",
                "Databases Training",
                "Tech Certifications India"
            ]}
            canonical="/academy/courses"
        />
        <PageHero
            eyebrow="Nexergy Academy — Courses"
            titleLines={["Learn Technology That Moves", "With the Industry."]}
            description="Practical programs designed by industry professionals — built around current tools, real projects and honest skill development."
            testId="courses-hero"
        />
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-28" data-testid="courses-grid">
            <div className="two-col-cards-grid">
                {COURSES.map((c, i) => (
                    <Reveal key={c.slug} delay={(i % 2) * 0.1} className="grid-cell-stretch">
                        <div className="group pro-card" data-testid={`course-card-${c.slug}`}>
                            <div className="pro-card-img-wrap">
                                <img
                                    src={c.image}
                                    alt={c.title}
                                    loading="lazy"
                                    className="pro-card-img"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />
                                <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-navy backdrop-blur dark:bg-ink/90 dark:text-electric">
                                    {c.category}
                                </span>
                                <div className="absolute bottom-4 left-4 flex items-center gap-2.5">
                                    <c.icon className="h-5 w-5 text-electric" strokeWidth={1.8} />
                                    <span className="font-display text-lg font-extrabold text-white">{c.title}</span>
                                </div>
                            </div>
                            <div className="pro-card-body">
                                <p className="pro-card-eyebrow">{c.subtitle}</p>
                                <p className="pro-card-desc">{c.description}</p>
                                <div className="pro-card-tags">
                                    {c.topics.slice(0, 4).map((t) => (
                                        <span key={t} className="pro-card-tag">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                                <p className="mt-2 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                                    <span className="font-semibold text-slate-700 dark:text-slate-200">Target Audience: </span>
                                    {c.audience}
                                </p>
                                <div className="pro-card-footer">
                                    <Link
                                        to={`/academy/${c.slug}`}
                                        data-testid={`course-explore-${c.slug}`}
                                        className="pro-card-action"
                                    >
                                        Explore Program Details
                                        <ArrowRight className="pro-card-arrow h-4 w-4" />
                                    </Link>
                                    <Link
                                        to="/contact"
                                        className="text-xs font-semibold text-slate-500 hover:text-brand dark:hover:text-electric transition-colors"
                                    >
                                        Enquire →
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                ))}
            </div>
        </section>
        <CTABand
            title="Not Sure Which Course Fits You?"
            text="Tell us where you are and where you want to go — we'll help you choose the right starting point."
            primary={{ label: "Talk to Us", to: "/contact" }}
            secondary={{ label: "About the Academy", to: "/academy" }}
        />
    </>
);

export default Courses;
