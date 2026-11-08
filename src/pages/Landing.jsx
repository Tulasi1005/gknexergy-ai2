import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import CosmicCursor from "../components/CosmicCursor";
import { motion } from "framer-motion";

const Landing = () => {
  return (
    <>
      <SEO
        title="GK Nexergy | Enterprise Digital Transformation & AI Solutions"
        description="Your technology innovation partner in Hyderabad, India. Build, train, and transform with custom software development, AI automation services, and enterprise solutions."
        keywords={[
          "AI Solutions for Businesses",
          "AI Automation Services",
          "Custom Software Development",
          "Digital Transformation Services",
          "Software Development Company in Hyderabad",
          "Technology Solutions in India"
        ]}
        canonical="/"
      />

      {/* Interactive Custom Cosmic Cursor */}
      <CosmicCursor />

      {/* SIDE-BY-SIDE IMMERSIVE FULLSCREEN LANDING SECTION */}
      {/* IMMERSIVE FULLSCREEN SINGLE-SCREEN LANDING SECTION */}
      <div className="relative flex min-h-screen h-screen w-full flex-col justify-between overflow-hidden bg-ink text-white px-3 sm:px-8 lg:px-12 py-3 sm:py-5">
        {/* Background.gif layer with ambient cosmic glow */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <img
            src="/images/Background.gif"
            alt="Animated technology background"
            className="h-full w-full object-cover object-center opacity-40 mix-blend-screen filter saturate-150 contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-transparent to-ink/90" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand/20 via-transparent to-ink/90" />
          {/* Ambient glow highlights */}
          <div className="absolute -top-32 right-1/4 h-[450px] w-[450px] rounded-full bg-electric/15 blur-[140px] pointer-events-none" />
          <div className="absolute -bottom-32 left-1/4 h-[450px] w-[450px] rounded-full bg-brand/20 blur-[140px] pointer-events-none" />
        </div>

        {/* Subtle tech grid background */}
        <div className="pointer-events-none absolute inset-0 bg-grid-light opacity-25 z-[1]" />

        {/* Top Spacer */}
        <header className="relative z-10 mx-auto w-full max-w-7xl flex items-center justify-between" />

        {/* Main Single-Column Content: Compact Globe on top, Text below */}
        <main className="relative z-10 mx-auto my-auto w-full max-w-5xl py-1 sm:py-2 flex flex-col items-center justify-center">
          <div className="landing-single-column">
            {/* 1. TOP: The Globe Video (Normal height & width, single screen fit) */}
            <div className="landing-globe-container">
              <motion.div
                initial={{ scale: 0.92, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  duration: 1.1,
                  delay: 0.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ scale: 1.03 }}
                className="relative flex w-[130px] sm:w-[160px] md:w-[185px] lg:w-[210px] xl:w-[225px] aspect-square items-center justify-center"
              >
                {/* Ambient pulsing luminous glow halos behind globe video */}
                <div className="pointer-events-none absolute h-[130px] w-[130px] sm:h-[160px] sm:w-[160px] lg:h-[200px] lg:w-[200px] rounded-full bg-electric/25 blur-[35px] sm:blur-[45px] lg:blur-[60px] animate-pulse" />
                <div className="pointer-events-none absolute h-[95px] w-[95px] sm:h-[120px] sm:w-[120px] lg:h-[155px] lg:w-[155px] rounded-full bg-brand/30 blur-[25px] sm:blur-[35px] lg:blur-[48px]" />

                {/* Seamless Holographic Globe Video */}
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="relative z-10 w-full h-full object-contain rounded-full filter drop-shadow-[0_0_35px_rgba(56,189,248,0.7)]"
                >
                  <source src="/images/globe.webm" type="video/webm" />
                  <source src="/images/globe.mp4" type="video/mp4" />
                </video>
              </motion.div>
            </div>

            {/* 2. BELOW: Text Content - Clean, Neat & Professional Google Fonts */}
            <div className="landing-content-container">
              {/* Subtle dark ambient backdrop for text clarity */}
              <div className="pointer-events-none absolute h-[260px] w-[540px] rounded-full bg-ink/85 blur-[85px] -z-10" />

              {/* Headline: YOUR IT INNOVATION JOURNEY in ONE LINE ONLY - Catchy-Mager font */}
              <motion.h1
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="landing-single-line-title"
              >
                YOUR IT INNOVATION JOURNEY
              </motion.h1>

              {/* Subheading: Designed in Blueprint - Catchy-Mager font */}
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="landing-subtitle"
              >
                Designed in Blueprint
              </motion.p>

              {/* Subtitle Tagline: BUILD • TRAIN • TRANSFORM - Catchy-Mager font */}
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.32,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="landing-tagline"
              >
                BUILD{" "}
                <span className="text-electric font-bold mx-2 sm:mx-2.5 drop-shadow-[0_0_8px_rgba(56,189,248,0.7)]">•</span>{" "}
                TRAIN{" "}
                <span className="text-electric font-bold mx-2 sm:mx-2.5 drop-shadow-[0_0_8px_rgba(56,189,248,0.7)]">•</span>{" "}
                TRANSFORM
              </motion.p>

              {/* CTA Button: Discover the Vision - Catchy-Mager font */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.45,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="landing-cta-wrapper"
              >
                <Link
                  to="/home"
                  data-testid="discover-vision-btn"
                  className="landing-vision-btn"
                >
                  Discover the Vision
                </Link>
              </motion.div>
            </div>
          </div>
        </main>

        {/* Bottom Minimal Copyright Bar */}
        <footer className="relative z-10 mx-auto w-full max-w-7xl text-center text-[11px] sm:text-xs text-slate-500 py-1">
          <p>© {new Date().getFullYear()} GK Nexergy. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
};

export default Landing;
