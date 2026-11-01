import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowRight, ArrowLeft, CheckCircle2, Target, Users } from "lucide-react";
import SEO from "../components/SEO";
import PageHero from "../components/PageHero";
import CTABand from "../components/CTABand";
import Reveal from "../components/Reveal";
import { COURSES } from "../data/site";

const CourseDetail = () => {
    const { slug } = useParams();
    const course = COURSES.find(
        (c) => c.slug === slug ||
        (slug === "postgresql-mastery" && c.slug === "databases") ||
        (slug === "databases" && c.slug === "postgresql-mastery")
    );
    if (!course) return <Navigate to="/academy/courses" replace />;
    const Icon = course.icon;

    const courseSchema = {
        "@type": "Course",
        "@id": `https://gknexergy.com/academy/${course.slug}#course`,
        "name": course.title,
        "description": `${course.tagline} ${course.description}`,
        "provider": {
            "@type": "Organization",
            "name": "Nexergy Academy - GK Nexergy",
            "sameAs": "https://gknexergy.com"
        }
    };

    return (
        <>
            <SEO
                title={`${course.title} Course | Nexergy Academy`}
                description={`${course.tagline} ${course.description}`}
                keywords={[
                    course.title,
                    course.category,
                    "Technology Training Hyderabad",
                    "Software Certification India",
                    "Nexergy Academy"
                ]}
                canonical={`/academy/${course.slug}`}
                ogImage={course.image}
                schema={courseSchema}
            />
            <PageHero
                eyebrow={`Nexergy Academy — ${course.category}`}
                titleLines={[course.tagline]}
                description={course.description}
                testId={`course-hero-${slug}`}
            >
                <div className="relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800" data-testid="course-hero-image">
                    <img src={course.image} alt={course.title} className="aspect-[4/3] w-full object-cover" loading="eager" />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-5 flex items-center gap-2.5">
                        <Icon className="h-5 w-5 text-electric" strokeWidth={1.6} />
                        <span className="font-display text-sm font-bold text-white">{course.title} — {course.subtitle}</span>
                    </div>
                </div>
            </PageHero>

            <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 sm:py-24">
                <div className="grid gap-14 lg:grid-cols-12">
                    <div className="lg:col-span-7">
                        {course.journey ? (
                            <>
                                <Reveal>
                                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand dark:text-electric">Structured Learning Journey</p>
                                    <h2 className="mt-4 font-display text-2xl font-extrabold tracking-tight text-ink dark:text-white sm:text-3xl">
                                        Your Path Through the Program
                                    </h2>
                                </Reveal>
                                <div className="mt-8 space-y-4" data-testid="course-journey">
                                    {course.journey.map((j, i) => (
                                        <Reveal key={j.step} delay={i * 0.07}>
                                            <div className="flex gap-5 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-card">
                                                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-brand/40 font-grotesk text-sm font-bold text-brand dark:border-electric/40 dark:text-electric">
                                                    {String(i + 1).padStart(2, "0")}
                                                </span>
                                                <div>
                                                    <h3 className="font-display text-lg font-bold text-ink dark:text-white">{j.step}</h3>
                                                    <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{j.text}</p>
                                                </div>
                                            </div>
                                        </Reveal>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <>
                                <Reveal>
                                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand dark:text-electric">Course Overview</p>
                                    <h2 className="mt-4 font-display text-2xl font-extrabold tracking-tight text-ink dark:text-white sm:text-3xl">
                                        What You'll Learn
                                    </h2>
                                </Reveal>
                                <div className="mt-8 grid gap-3 sm:grid-cols-2" data-testid="course-topics">
                                    {course.topics.map((t, i) => (
                                        <Reveal key={t} delay={i * 0.05}>
                                            <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3.5 dark:border-slate-800 dark:bg-card">
                                                <CheckCircle2 className="h-5 w-5 shrink-0 text-brand dark:text-electric" strokeWidth={1.8} />
                                                <span className="text-sm font-semibold text-ink dark:text-slate-100">{t}</span>
                                            </div>
                                        </Reveal>
                                    ))}
                                </div>
                                {course.outcomes && (
                                    <>
                                        <Reveal>
                                            <h2 className="mt-14 flex items-center gap-3 font-display text-2xl font-extrabold tracking-tight text-ink dark:text-white sm:text-3xl">
                                                <Target className="h-6 w-6 text-brand dark:text-electric" strokeWidth={1.6} />
                                                Learning Outcomes
                                            </h2>
                                        </Reveal>
                                        <div className="mt-6 space-y-3" data-testid="course-outcomes">
                                            {course.outcomes.map((o, i) => (
                                                <Reveal key={o} delay={i * 0.05}>
                                                    <div className="flex items-start gap-3 rounded-xl bg-mist px-5 py-4 dark:bg-ink">
                                                        <span className="mt-0.5 font-grotesk text-xs font-bold text-brand dark:text-electric">
                                                            {String(i + 1).padStart(2, "0")}
                                                        </span>
                                                        <span className="text-sm leading-relaxed text-slate-700 dark:text-slate-200">{o}</span>
                                                    </div>
                                                </Reveal>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </>
                        )}
                    </div>
                    <div className="lg:col-span-5">
                        <Reveal delay={0.1}>
                            <div className="rounded-2xl bg-mist p-8 dark:bg-ink" data-testid="course-sidebar">
                                <div className="flex items-center gap-3">
                                    <Users className="h-5 w-5 text-brand dark:text-electric" strokeWidth={1.6} />
                                    <h3 className="font-display text-lg font-extrabold text-ink dark:text-white">Who Should Join</h3>
                                </div>
                                <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{course.audience}</p>
                                <div className="mt-8 border-t border-slate-200 pt-6 dark:border-slate-700">
                                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                                        Practical Learning
                                    </p>
                                    <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                                        Every Nexergy Academy program is built around hands-on practice, real projects and mentorship from industry professionals.
                                    </p>
                                </div>
                                <Link
                                    to="/contact"
                                    data-testid="course-enquire-cta"
                                    className="group mt-6 inline-flex w-auto items-center justify-center gap-2 rounded-full bg-brand px-6 py-3 sm:px-7 sm:py-3.5 font-display text-sm sm:text-base font-bold text-white transition-colors duration-300 hover:bg-electric hover:text-ink"
                                >
                                    Enquire About This Course
                                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                                </Link>
                            </div>
                        </Reveal>
                    </div>
                </div>
                <Reveal>
                    <Link
                        to="/academy/courses"
                        data-testid="course-back"
                        className="mt-14 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition-colors hover:text-brand dark:text-slate-300 dark:hover:text-electric"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        All Courses
                    </Link>
                </Reveal>
            </section>
            <CTABand
                title="Learn With Industry. Grow With Nexergy."
                text="Programs designed by professionals with 25+ years of IT industry experience."
                primary={{ label: "Enquire Now", to: "/contact" }}
                secondary={{ label: "All Courses", to: "/academy/courses" }}
            />
        </>
    );
};

export default CourseDetail;
