import { Link } from "react-router-dom";
import {
  ArrowRight,
  Users,
  Cpu,
  Factory,
  DoorOpen,
  Compass,
  FlaskConical,
  Briefcase,
  HeartHandshake,
  Sparkles,
  MapPin,
  Building,
  TrendingUp,
  Workflow,
  BarChart3,
  Megaphone,
} from "lucide-react";
import SEO from "../components/SEO";
import PageHero from "../components/PageHero";
import CTABand from "../components/CTABand";
import Reveal from "../components/Reveal";

const sections = [
  {
    id: "story",
    title: "Our Story",
    text:
      "GK Nexergy brings together technology expertise, software solutions, digital growth, and skill development. Founded by professionals with over 25 years of IT industry experience across software development, project delivery, and workforce development, we aim to help people and businesses understand how technology can solve practical problems.",
    items: [],
  },
  {
    id: "purpose",
    title: "Why We Exist",
    text:
      "Many businesses want to grow, reach more customers, and improve the way they work—but may not know which technology to use, where to begin, or whom to approach. Others assume that digital transformation is too complicated or costly for them. GK Nexergy aims to bridge this gap with guidance and practical solutions shaped around each business's needs, goals, and resources.",
    items: [
      "Make technology easier to understand",
      "Help businesses identify digital opportunities",
      "Start with real business challenges",
    ],
    icons: [Sparkles, Compass, HeartHandshake],
  },
  {
    id: "what-we-do",
    title: "What We Do",
    text:
      "We help businesses explore and implement technology that supports their goals. Depending on the business need, this may include custom software development, workflow and process automation, digital marketing, data analytics, cloud solutions, and AI-enabled opportunities. We also provide practical technology training to help learners build skills they can apply to real-world challenges.",
    items: [
      "Software development",
      "Business process automation",
      "Digital marketing and SEO",
      "Data analytics and reporting",
      "Cloud and AI solutions",
      "Technology training",
    ],
    icons: [Cpu, Workflow, Megaphone, BarChart3, Sparkles, Users],
  },
  {
    id: "approach",
    title: "Our Approach",
    text:
      "We believe digital transformation should begin with understanding—not with selling a particular tool. We work to understand the business challenge, explain relevant options, and identify practical next steps. The right solution may be a new software application, a more efficient workflow, a stronger digital presence, or better use of business data.",
    items: [
      "Understand the business problem",
      "Educate and explore options",
      "Recommend practical next steps",
      "Build and implement solutions",
      "Review opportunities to improve",
    ],
    icons: [Compass, Sparkles, HeartHandshake, FlaskConical, TrendingUp],
  },
  {
    id: "ecosystem",
    title: "People, Technology and Industry",
    text:
      "Technology creates greater value when it connects business needs with capable people. Alongside our business-focused services, GK Nexergy emphasizes practical, project-based learning and industry-oriented skill development. Our goal is to help learners build relevant capabilities and understand how technology is used to solve real problems.",
    items: [
      "People and skills",
      "Technology solutions",
      "Industry needs",
      "Real-world opportunities",
    ],
    icons: [Users, Cpu, Factory, DoorOpen],
  },
  {
    id: "impact",
    title: "Who We Aim to Support",
    text:
      "We aim to support small and medium-sized businesses, traditional businesses exploring digital adoption, entrepreneurs, growing organizations, students, graduates, working professionals, and career returnees. We are particularly interested in helping expand access to practical technology knowledge and opportunities in rural, semi-urban, and underserved communities.",
    items: [
      "Small and medium-sized businesses",
      "Traditional businesses going digital",
      "Entrepreneurs and growing organizations",
      "Students and graduates",
      "Working professionals and career returnees",
      "Rural and semi-urban communities",
    ],
    icons: [Building, TrendingUp, Briefcase, Users, HeartHandshake, MapPin],
  },
];

const About = () => (
  <>
    <SEO
      title="About GK Nexergy | IT Consulting & Software Development Company in Hyderabad"
      description="GK Nexergy bridges business and technology through custom software development, AI automation services, digital transformation, and workforce empowerment across India."
      keywords={[
        "IT Consulting Services",
        "Software Development Company in Hyderabad",
        "Digital Transformation Services",
        "Custom Software Development",
        "Technology Solutions in India"
      ]}
      canonical="/about"
    />

    <PageHero
      eyebrow="About GK Nexergy"
      titleLines={[
        "Bridging Business and Technology.",
        "Empowering Growth.",
      ]}
      description="GK Nexergy is a technology solutions, digital transformation, and skill development company. We help businesses understand practical ways to use technology and help learners build skills for real-world challenges."
      testId="about-hero"
    >
      <div
        className="relative overflow-hidden rounded-2xl"
        data-testid="about-hero-image"
      >
        <video
          src="/images/GKpromo.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="ecosystem-center-img"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
      </div>
    </PageHero>

    <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 sm:py-28">
      <div className="space-y-20">
        {sections.map((sec, idx) => (
          <Reveal key={sec.id}>
            <div
              className="grid gap-8 lg:grid-cols-12"
              data-testid={`about-section-${sec.id}`}
            >
              <div className="lg:col-span-4">
                <p className="font-grotesk text-sm font-semibold tracking-[0.3em] text-brand/60 dark:text-electric/60">
                  {String(idx + 1).padStart(2, "0")}
                </p>
                <h2 className="mt-2 font-display text-2xl font-extrabold tracking-tight text-ink dark:text-white sm:text-3xl">
                  {sec.title}
                </h2>
              </div>

              <div className="lg:col-span-8">
                <p className="text-base leading-relaxed text-slate-600 dark:text-slate-300 sm:text-lg">
                  {sec.text}
                </p>

                {sec.items.length > 0 && (
                  <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {sec.items.map((item, i) => {
                      const Icon = sec.icons[i];
                      return (
                        <div
                          key={item}
                          className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3.5 transition-colors hover:border-brand/40 dark:border-slate-800 dark:bg-card dark:hover:border-electric/40"
                        >
                          <Icon
                            className="h-5 w-5 shrink-0 text-brand dark:text-electric"
                            strokeWidth={1.6}
                            aria-hidden="true"
                          />
                          <span className="text-sm font-semibold text-ink dark:text-slate-100">
                            {item}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div className="mt-20">
          <Link
            to="/vision"
            data-testid="about-vision-cta"
            className="group inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 font-display text-sm font-bold text-white transition-colors duration-300 hover:bg-electric hover:text-ink"
          >
            Explore Our Vision
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </Reveal>
    </section>

    <CTABand />
  </>
);

export default About;
