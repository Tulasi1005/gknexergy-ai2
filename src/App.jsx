import { useEffect, useState, useCallback } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Lenis from "lenis";
import { useReadOnlyProtection } from "@/utils/readOnlyProtection";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AIChatbot from "@/components/AIChatbot/AIChatbot";
import PageSummarizer from "@/components/PageSummarizer/PageSummarizer";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Vision from "@/pages/Vision";
import Why from "@/pages/Why";
import Industries from "@/pages/Industries";
import Solutions from "@/pages/Solutions";
import SolutionDetail from "@/pages/SolutionDetail";
import Academy from "@/pages/Academy";
import Courses from "@/pages/Courses";
import CourseDetail from "@/pages/CourseDetail";
import Projects from "@/pages/Projects";
import Careers from "@/pages/Careers";
import Contact from "@/pages/Contact";
import Pricing from "@/pages/Pricing";

import Landing from "@/pages/Landing";

const ScrollToTop = () => {
    useEffect(() => {
        if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual';
        }
    }, []);
    const { pathname, hash } = useLocation();
    useEffect(() => {
        if (hash) {
            setTimeout(() => {
                const element = document.querySelector(hash);
                if (element) {
                    if (window.__lenis) {
                        window.__lenis.scrollTo(element, { offset: -80 });
                    } else {
                        element.scrollIntoView({ behavior: "smooth" });
                    }
                }
            }, 120);
        } else {
            if (window.__lenis) {
                window.__lenis.scrollTo(0, { immediate: true });
            }
            window.scrollTo(0, 0);
        }
    }, [pathname, hash]);
    return null;
};

const useSmoothScroll = () => {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        const lenis = new Lenis({
            duration: 1.15,
            smoothWheel: true,
            autoResize: true,
        });
        window.__lenis = lenis;

        let rafId;
        const loop = (time) => {
            lenis.raf(time);
            rafId = requestAnimationFrame(loop);
        };
        rafId = requestAnimationFrame(loop);

        // Dynamically observe content and image height changes
        let resizeObserver;
        if (typeof ResizeObserver !== "undefined") {
            resizeObserver = new ResizeObserver(() => {
                lenis.resize();
            });
            if (document.body) {
                resizeObserver.observe(document.body);
            }
            if (document.documentElement) {
                resizeObserver.observe(document.documentElement);
            }
        }

        const handleResize = () => lenis.resize();
        window.addEventListener("resize", handleResize);
        window.addEventListener("load", handleResize);

        return () => {
            cancelAnimationFrame(rafId);
            if (resizeObserver) resizeObserver.disconnect();
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("load", handleResize);
            lenis.destroy();
            window.__lenis = null;
        };
    }, []);

    // Recompute scroll limits and handle smooth navigation on route/hash changes
    useEffect(() => {
        const lenis = window.__lenis;
        if (!lenis) return;

        if (hash) {
            const timer = setTimeout(() => {
                const el = document.querySelector(hash);
                if (el) {
                    lenis.scrollTo(el, { offset: -80, duration: 0.8 });
                }
            }, 150);
            return () => clearTimeout(timer);
        } else {
            lenis.scrollTo(0, { immediate: true });
        }

        // Staggered resize calls to sync after route mounting and lazy image layout
        lenis.resize();
        const t1 = setTimeout(() => lenis.resize(), 100);
        const t2 = setTimeout(() => lenis.resize(), 350);
        const t3 = setTimeout(() => lenis.resize(), 800);

        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
        };
    }, [pathname, hash]);
};

const Shell = ({ theme, onToggleTheme }) => {
    const [isSummarizerOpen, setIsSummarizerOpen] = useState(false);
    const { pathname } = useLocation();
    const isLanding = pathname === "/" || pathname === "/landing";

    useSmoothScroll();

    return (
        <div className="flex min-h-screen flex-col">
            <ScrollToTop />
            {!isLanding && (
                <Navbar
                    theme={theme}
                    onToggleTheme={onToggleTheme}
                    onOpenSummarizer={() => setIsSummarizerOpen(true)}
                />
            )}
            <main className="flex-1">
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/landing" element={<Landing />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/company" element={<About />} />
                    <Route path="/vision" element={<Vision />} />
                    <Route path="/why-gk-nexergy" element={<Why />} />
                    <Route path="/industries" element={<Industries />} />
                    <Route path="/solutions" element={<Solutions />} />
                    <Route path="/solutions/:slug" element={<SolutionDetail />} />
                    <Route path="/academy" element={<Academy />} />
                    <Route path="/academy/courses" element={<Courses />} />
                    <Route path="/academy/:slug" element={<CourseDetail />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/careers" element={<Careers />} />
                    <Route path="/pricing" element={<Pricing />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="*" element={<Home />} />
                </Routes>
            </main>
            {!isLanding && <Footer theme={theme} />}
            {!isLanding && <AIChatbot theme={theme} />}
            {!isLanding && (
                <PageSummarizer
                    theme={theme}
                    isOpen={isSummarizerOpen}
                    onClose={() => setIsSummarizerOpen(false)}
                    onOpen={() => setIsSummarizerOpen(true)}
                />
            )}
        </div>
    );
};

function App() {
    useReadOnlyProtection();
    const [theme, setTheme] = useState(() => localStorage.getItem("gk-theme") || "light");

    useEffect(() => {
        document.documentElement.classList.toggle("dark", theme === "dark");
        localStorage.setItem("gk-theme", theme);
    }, [theme]);

    const onToggleTheme = useCallback(
        () => setTheme((t) => (t === "dark" ? "light" : "dark")),
        []
    );

    return (
        <BrowserRouter>
            <Shell theme={theme} onToggleTheme={onToggleTheme} />
        </BrowserRouter>
    );
}

export default App;
