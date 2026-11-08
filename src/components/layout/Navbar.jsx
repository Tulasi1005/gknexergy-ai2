import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
    ChevronDown,
    ChevronRight,
    Menu,
    X,
    Sun,
    Moon,
    ArrowRight,
    Languages,
    Globe,
    Bot,
    Sparkles,
    Check,
    CheckCheck,
    Layers,
    Code2,
    GraduationCap,
    Building2,
    FolderGit2,
    Users,
    PhoneCall,
    Zap,
    ExternalLink,
    Compass,
    Home as HomeIcon,
    Smartphone,
    BrainCircuit,
    BarChart3,
    Shield,
    Database,
} from "lucide-react";
import { MEGA_COMPANY, MEGA_SOLUTIONS, MEGA_ACADEMY } from "../../data/site";
import { SUPPORTED_LANGUAGES, setGlobalPageLanguage, getInitialLanguage } from "../../utils/translator";


/* =========================================================
   AI SMART HUB CARD (User Reference Implementation)
   ========================================================= */
const AISmartHubCard = ({ onClose, onOpenSummarizer, navigate, isDark, className = "" }) => {
    return (
        <div className={`ai-smart-hub-card ${className}`}>
            <div className="mb-3">
                {/* 1. Badge */}
                <div className="ai-hub-badge">
                    <Sparkles className="h-3 w-3 text-blue-600 dark:text-sky-400" strokeWidth={2.2} />
                    <span>AI SMART HUB</span>
                </div>

                {/* 2. Title */}
                <h3 className="ai-hub-title mb-0">
                    Ask AI Assistant
                </h3>
            </div>

            {/* 3. Action Buttons in Clean Adjusted Format */}
            <div className="ai-hub-actions">
                {/* Action 1: Summarise Page */}
                <button
                    type="button"
                    onClick={() => {
                        onClose?.();
                        onOpenSummarizer?.();
                        window.dispatchEvent(new CustomEvent('open-page-summarizer'));
                    }}
                    className="ai-hub-btn ai-hub-btn-summarise"
                >
                    <span className="ai-hub-btn-content">
                        <Sparkles className="ai-hub-btn-icon text-blue-600 dark:text-sky-400" strokeWidth={2} />
                        <span>Summarise</span>
                    </span>
                    <ArrowRight className="ai-hub-btn-arrow" strokeWidth={2} />
                </button>

                {/* Action 2: Ask AI Assistant */}
                <button
                    type="button"
                    onClick={() => {
                        onClose?.();
                        window.dispatchEvent(new CustomEvent('open-gk-chatbot'));
                    }}
                    className="ai-hub-btn ai-hub-btn-chat"
                >
                    <span className="ai-hub-btn-content">
                        <Bot className="ai-hub-btn-icon text-white" strokeWidth={2} />
                        <span>Ask AI Assistant</span>
                    </span>
                    <ArrowRight className="ai-hub-btn-arrow text-white/90" strokeWidth={2} />
                </button>

                {/* Action 3: Explore AI Stack of Cards */}
                <button
                    type="button"
                    onClick={() => {
                        onClose?.();
                        const el = document.getElementById('pages-stack-section') || document.querySelector('[data-testid="nav-pages-stack"]');
                        if (el) {
                            if (window.__lenis) {
                                window.__lenis.scrollTo(el, { offset: -80 });
                            } else {
                                el.scrollIntoView({ behavior: 'smooth' });
                            }
                        } else {
                            navigate('/home#pages-stack-section');
                        }
                    }}
                    className="ai-hub-btn ai-hub-btn-stack"
                >
                    <span className="ai-hub-btn-content">
                        <Layers className="ai-hub-btn-icon text-blue-600 dark:text-sky-400" strokeWidth={2} />
                        <span>Explore AI Stack of Cards</span>
                    </span>
                    <ArrowRight className="ai-hub-btn-arrow" strokeWidth={2} />
                </button>
            </div>
        </div>
    );
};

const Navbar = ({ theme, onToggleTheme, onOpenSummarizer }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeMegaDropdown, setActiveMegaDropdown] = useState(null);
    const [langModalOpen, setLangModalOpen] = useState(false);
    const [aiHubOpen, setAiHubOpen] = useState(false);
    const aiHubRef = useRef(null);
    const [selectedLang, setSelectedLang] = useState(() => getInitialLanguage());
    const [scrolled, setScrolled] = useState(false);

    const langDropdownRef = useRef(null);
    const headerRef = useRef(null);
    const closeTimerRef = useRef(null);

    const cancelCloseTimer = () => {
        if (closeTimerRef.current) {
            clearTimeout(closeTimerRef.current);
            closeTimerRef.current = null;
        }
    };

    const startCloseTimer = (delay = 140) => {
        cancelCloseTimer();
        closeTimerRef.current = setTimeout(() => {
            setMenuOpen(false);
            setActiveMegaDropdown(null);
        }, delay);
    };

    // Clean up close timer on unmount
    useEffect(() => {
        return () => cancelCloseTimer();
    }, []);

    const location = useLocation();
    const navigate = useNavigate();

    // Scroll listener for subtle elevation change
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Prevent background scrolling while floating menu is open
    useEffect(() => {
        if (menuOpen) {
            const originalOverflow = document.body.style.overflow;
            document.body.style.overflow = "hidden";
            return () => {
                document.body.style.overflow = originalOverflow;
            };
        }
    }, [menuOpen]);

    // Close menu & dropdowns on route change
    useEffect(() => {
        cancelCloseTimer();
        setMenuOpen(false);
        setActiveMegaDropdown(null);
        setLangModalOpen(false);
        setAiHubOpen(false);
    }, [location.pathname]);

    // Keyboard (Esc) listener to close menu
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                cancelCloseTimer();
                setMenuOpen(false);
                setActiveMegaDropdown(null);
                setLangModalOpen(false);
                setAiHubOpen(false);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    // Outside click listener for language dropdown
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (langDropdownRef.current && !langDropdownRef.current.contains(e.target)) {
                setLangModalOpen(false);
            }
            if (aiHubRef.current && !aiHubRef.current.contains(e.target)) {
                setAiHubOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("touchstart", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("touchstart", handleClickOutside);
        };
    }, []);

    const handleSelectLanguage = (langCode) => {
        setSelectedLang(langCode);
        setGlobalPageLanguage(langCode);
        setLangModalOpen(false);
    };

    const currentLangObj = SUPPORTED_LANGUAGES.find((l) => l.code === selectedLang) || SUPPORTED_LANGUAGES[0];
    const isDark = theme === "dark";

    const megaNavItems = [
        { label: "Home", to: "/home", isDropdown: false },
        { label: "Company", key: "company", to: "/about", isDropdown: true },
        { label: "Solutions", key: "solutions", to: "/solutions", isDropdown: true },
        { label: "Academy", key: "academy", to: "/academy", isDropdown: true },
        { label: "Projects", to: "/projects", isDropdown: false },
        { label: "Hiring", to: "/careers", isDropdown: false },
        { label: "Contact", to: "/contact", isDropdown: false },
    ];

    const activeMegaData =
        activeMegaDropdown === "company"
            ? MEGA_COMPANY
            : activeMegaDropdown === "solutions"
                ? MEGA_SOLUTIONS
                : activeMegaDropdown === "academy"
                    ? MEGA_ACADEMY
                    : null;

    return (
        <>
            {/* ========================================================= */}
            {/* 1. TOP FIXED NAVBAR HEADER                                */}
            {/* ========================================================= */}
            <header
                ref={headerRef}
                id="main-navbar-header"
                data-testid="main-navbar"
                onMouseEnter={cancelCloseTimer}
                onMouseLeave={() => {
                    if (menuOpen) {
                        startCloseTimer(200);
                    }
                }}
                className="fixed top-0 inset-x-0 w-full transition-all duration-300"
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    width: "100%",
                    zIndex: 9999,
                    backgroundColor: isDark ? "rgba(8, 14, 26, 0.94)" : "rgba(255, 255, 255, 0.94)",
                    backdropFilter: "blur(16px) saturate(180%)",
                    WebkitBackdropFilter: "blur(16px) saturate(180%)",
                    borderBottom: isDark ? "1px solid rgba(56, 189, 248, 0.18)" : "1px solid rgba(226, 232, 240, 0.85)",
                    boxShadow: scrolled
                        ? isDark
                            ? "0 10px 30px -5px rgba(0, 0, 0, 0.8), 0 0 25px rgba(37, 99, 235, 0.15)"
                            : "0 8px 24px -4px rgba(15, 23, 42, 0.08), 0 2px 6px rgba(15, 23, 42, 0.03)"
                        : isDark
                            ? "0 4px 20px rgba(0, 0, 0, 0.5)"
                            : "0 2px 10px -2px rgba(15, 23, 42, 0.05)",
                    transition: "background-color 0.3s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
            >
                <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
                    <div className="flex h-16 sm:h-20 items-center justify-between gap-3 lg:gap-6">

                        {/* 1. LEFT – Brand Logo (Seamless, Transparent Background) */}
                        <div className="flex items-center shrink-0">
                            <Link
                                to="/"
                                data-testid="nav-logo"
                                onClick={() => setMenuOpen(false)}
                                className="navbar-logo-card flex items-center transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                                style={{
                                    backgroundColor: "transparent",
                                    background: "transparent",
                                    border: "none",
                                    boxShadow: "none",
                                }}
                            >
                                <img
                                    src={isDark ? "/images/gklogo-dark.png" : "/images/gklogo.png"}
                                    alt="GK Nexergy - Custom Software Development & AI Solutions"
                                    className="navbar-logo object-contain"
                                    style={{
                                        border: "none",
                                        filter: isDark
                                            ? "drop-shadow(0 0 1px rgba(255, 255, 255, 0.45)) drop-shadow(0 2px 14px rgba(56, 189, 248, 0.35))"
                                            : "drop-shadow(0 1px 3px rgba(0, 0, 0, 0.08))",
                                    }}
                                />
                            </Link>
                        </div>

                        {/* 2. RIGHT – Action & Utility Controls with Animated Toggler */}
                        <div className="flex items-center gap-1.5 sm:gap-2 xl:gap-2.5 shrink-0 navbar-actions-island">

                            {/* 1. MAIN TOGGLER BUTTON (FIRST) */}
                            <button
                                id="main-nav-toggler"
                                data-testid="main-menu-toggle"
                                onClick={() => {
                                    cancelCloseTimer();
                                    setMenuOpen((v) => {
                                        const next = !v;
                                        if (!next) {
                                            setActiveMegaDropdown(null);
                                        }
                                        return next;
                                    });
                                }}
                                aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
                                title={menuOpen ? "Close navigation menu" : "Open navigation menu"}
                                className={`navbar-btn navbar-menu-btn ${menuOpen ? "is-open" : ""} flex items-center justify-center shrink-0 cursor-pointer overflow-hidden transition-all`}
                            >
                                <AnimatePresence mode="wait" initial={false}>
                                    {menuOpen ? (
                                        <motion.div
                                            key="close"
                                            initial={{ opacity: 0, rotate: -60, scale: 0.72 }}
                                            animate={{ opacity: 1, rotate: 0, scale: 1 }}
                                            exit={{ opacity: 0, rotate: 60, scale: 0.72 }}
                                            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                                            className="flex items-center justify-center pointer-events-none"
                                        >
                                            <X className="navbar-menu-icon" strokeWidth={2.4} />
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="menu"
                                            initial={{ opacity: 0, rotate: 60, scale: 0.72 }}
                                            animate={{ opacity: 1, rotate: 0, scale: 1 }}
                                            exit={{ opacity: 0, rotate: -60, scale: 0.72 }}
                                            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                                            className="flex items-center justify-center pointer-events-none"
                                        >
                                            <Menu className="navbar-menu-icon" strokeWidth={2.4} />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </button>

                            {/* 2. LANGUAGE TRANSLATION (NEXT) */}
                            <div className="relative" ref={langDropdownRef}>
                                <button
                                    data-testid="nav-language-btn"
                                    onClick={() => setLangModalOpen((v) => !v)}
                                    aria-label="Translate Entire Website"
                                    title="Select Website Language"
                                    className="navbar-btn navbar-lang-btn font-display font-bold transition-all shadow-sm cursor-pointer"
                                    style={{
                                        backgroundColor: langModalOpen
                                            ? "#2563eb"
                                            : isDark
                                                ? "rgba(15, 28, 56, 0.9)"
                                                : "rgba(248, 250, 252, 0.95)",
                                        color: langModalOpen ? "#ffffff" : isDark ? "#f1f5f9" : "#0f172a",
                                        borderColor: langModalOpen
                                            ? "#2563eb"
                                            : isDark
                                                ? "rgba(56, 189, 248, 0.28)"
                                                : "#cbd5e1",
                                        borderWidth: "1px",
                                        borderStyle: "solid",
                                        boxShadow: langModalOpen
                                            ? "0 0 14px rgba(37, 99, 235, 0.45)"
                                            : isDark
                                                ? "0 2px 8px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.08)"
                                                : "0 1px 2px rgba(15, 23, 42, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.9)",
                                    }}
                                >
                                    <Languages className={`navbar-lang-icon ${langModalOpen ? "text-white" : "text-brand dark:text-blue-400"}`} strokeWidth={2} />
                                    <span className="uppercase tracking-wider font-extrabold flex items-center gap-1 navbar-btn-label">
                                        <span className="hidden xs:inline">{currentLangObj.flag}</span>
                                        <span>{selectedLang.toUpperCase()}</span>
                                    </span>
                                    <ChevronDown className={`navbar-chevron-icon transition-transform duration-200 ${langModalOpen ? "rotate-180 text-white" : "text-slate-700 dark:text-slate-400"}`} strokeWidth={2} />
                                </button>

                                {/* Dropdown Menu */}
                                <AnimatePresence>
                                    {langModalOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 6, scale: 0.97 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 4, scale: 0.97 }}
                                            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                                            className="nav-lang-dropdown-panel absolute right-0 top-full mt-2 rounded-2xl border p-2.5 sm:p-3 shadow-2xl"
                                            style={{
                                                width: "280px",
                                                maxWidth: "calc(100vw - 20px)",
                                                zIndex: 10002,
                                                backgroundColor: isDark ? "#0c1e3d" : "#ffffff",
                                                borderColor: isDark ? "rgba(56, 189, 248, 0.4)" : "#cbd5e1",
                                                boxShadow: isDark
                                                    ? "0 20px 50px -10px rgba(0, 0, 0, 0.9), 0 0 25px rgba(56, 189, 248, 0.22)"
                                                    : "0 16px 36px -10px rgba(15, 23, 42, 0.15), 0 3px 12px rgba(0, 0, 0, 0.05)",
                                                backdropFilter: "blur(20px)",
                                            }}
                                        >
                                            {/* Header */}
                                            <div
                                                className="flex items-center justify-between pb-2 mb-1.5 border-b relative z-10"
                                                style={{
                                                    borderColor: isDark ? "rgba(255, 255, 255, 0.12)" : "#f1f5f9",
                                                }}
                                            >
                                                <div className="flex items-center gap-2">
                                                    <div
                                                        className="flex h-6 w-6 items-center justify-center rounded-lg"
                                                        style={{
                                                            backgroundColor: isDark ? "rgba(56, 189, 248, 0.2)" : "rgba(37, 99, 235, 0.1)",
                                                            color: isDark ? "#38bdf8" : "#2563eb",
                                                        }}
                                                    >
                                                        <Globe className="h-3.5 w-3.5" />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-display text-xs font-bold leading-tight text-slate-900 dark:text-white">
                                                            Translate Website
                                                        </h4>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => setLangModalOpen(false)}
                                                    className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                                                    aria-label="Close language selector"
                                                >
                                                    <X className="h-3.5 w-3.5" />
                                                </button>
                                            </div>

                                            {/* Clean, perfectly formatted language list */}
                                            <div className="flex flex-col gap-1 max-h-[270px] overflow-y-auto pt-1 pb-1 pr-0.5 custom-nav-scrollbar">
                                                {SUPPORTED_LANGUAGES.map((lang) => {
                                                    const isSelected = selectedLang === lang.code;
                                                    return (
                                                        <button
                                                            key={lang.code}
                                                            type="button"
                                                            onClick={() => handleSelectLanguage(lang.code)}
                                                            className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left transition-all cursor-pointer ${isSelected
                                                                    ? "bg-brand text-white font-bold shadow-sm shadow-brand/30"
                                                                    : isDark
                                                                        ? "text-white hover:bg-slate-800/90 hover:text-sky-300"
                                                                        : "text-slate-900 hover:bg-slate-100 hover:text-brand"
                                                                }`}
                                                        >
                                                            <div className="flex items-center gap-2 min-w-0">
                                                                <span className="text-sm leading-none shrink-0 select-none">
                                                                    {lang.flag}
                                                                </span>
                                                                <span
                                                                    className={`w-7 h-5 flex items-center justify-center text-[10px] font-extrabold uppercase rounded tracking-wider shrink-0 border ${isSelected
                                                                            ? "bg-white/20 text-white border-white/40"
                                                                            : isDark
                                                                                ? "bg-slate-800 text-sky-300 border-sky-400/40"
                                                                                : "bg-blue-50 text-blue-700 border-blue-200"
                                                                        }`}
                                                                >
                                                                    {lang.code.split('-')[0].toUpperCase()}
                                                                </span>
                                                                <span className={`font-bold text-xs truncate ${isSelected ? "text-white" : isDark ? "text-white" : "text-slate-900"}`}>
                                                                    {lang.label || lang.name}
                                                                </span>
                                                                {lang.native && lang.native !== (lang.label || lang.name) ? (
                                                                    <span
                                                                        className={`text-[11px] font-semibold truncate ${isSelected ? "text-blue-100" : isDark ? "text-sky-300" : "text-blue-700"
                                                                            }`}
                                                                    >
                                                                        ({lang.native})
                                                                    </span>
                                                                ) : (
                                                                    <span
                                                                        className={`text-[11px] font-semibold truncate ${isSelected ? "text-blue-100" : isDark ? "text-sky-300" : "text-blue-700"
                                                                            }`}
                                                                    >
                                                                        (US)
                                                                    </span>
                                                                )}
                                                            </div>
                                                            {isSelected && (
                                                                <Check className="h-4 w-4 shrink-0 text-white ml-2" strokeWidth={2.8} />
                                                            )}
                                                        </button>
                                                    );
                                                })}
                                            </div>

                                            {/* Reset to English Footer */}
                                            <div className="pt-2 mt-1 border-t border-slate-100 dark:border-slate-800/80">
                                                <button
                                                    type="button"
                                                    onClick={() => handleSelectLanguage("en")}
                                                    className="w-full py-1 text-center text-xs text-blue-600 hover:text-blue-700 dark:text-sky-400 dark:hover:text-sky-200 font-bold cursor-pointer transition-colors"
                                                >
                                                    Reset to English
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* 3. THEME TOGGLE (NEXT) */}
                            <button
                                data-testid="theme-toggle"
                                onClick={onToggleTheme}
                                aria-label="Toggle light and dark theme"
                                title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
                                className="navbar-btn navbar-theme-btn flex items-center justify-center transition-all shadow-sm cursor-pointer overflow-hidden"
                                style={{
                                    backgroundColor: isDark ? "rgba(15, 28, 56, 0.9)" : "rgba(248, 250, 252, 0.95)",
                                    borderColor: isDark ? "rgba(56, 189, 248, 0.28)" : "#cbd5e1",
                                    borderWidth: "1px",
                                    borderStyle: "solid",
                                    boxShadow: isDark
                                        ? "0 2px 8px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.08)"
                                        : "0 1px 2px rgba(15, 23, 42, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.9)",
                                }}
                            >
                                <AnimatePresence mode="wait" initial={false}>
                                    {isDark ? (
                                        <motion.div
                                            key="sun"
                                            initial={{ opacity: 0, rotate: -60, scale: 0.65 }}
                                            animate={{ opacity: 1, rotate: 0, scale: 1 }}
                                            exit={{ opacity: 0, rotate: 60, scale: 0.65 }}
                                            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                                            className="flex items-center justify-center pointer-events-none"
                                        >
                                            <Sun className="navbar-theme-icon text-amber-400" strokeWidth={2} />
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="moon"
                                            initial={{ opacity: 0, rotate: 60, scale: 0.65 }}
                                            animate={{ opacity: 1, rotate: 0, scale: 1 }}
                                            exit={{ opacity: 0, rotate: -60, scale: 0.65 }}
                                            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                                            className="flex items-center justify-center pointer-events-none"
                                        >
                                            <Moon className="navbar-theme-icon text-slate-700" strokeWidth={2} />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </button>

                            {/* 4. SUMMARY / AI SMART HUB ICON */}
                            <div className="relative" ref={aiHubRef}>
                                <button
                                    data-testid="nav-summarize-btn"
                                    onClick={() => setAiHubOpen((v) => !v)}
                                    title="AI Smart Hub & Assistant (Alt + S)"
                                    aria-label="Open AI Smart Hub"
                                    className="navbar-btn navbar-summarize-btn flex items-center justify-center transition-all shadow-sm cursor-pointer"
                                    style={{
                                        backgroundColor: aiHubOpen
                                            ? "#2563eb"
                                            : isDark
                                                ? "rgba(15, 28, 56, 0.9)"
                                                : "rgba(248, 250, 252, 0.95)",
                                        borderColor: aiHubOpen
                                            ? "#2563eb"
                                            : isDark
                                                ? "rgba(56, 189, 248, 0.28)"
                                                : "#cbd5e1",
                                        borderWidth: "1px",
                                        borderStyle: "solid",
                                        boxShadow: aiHubOpen
                                            ? "0 0 14px rgba(37, 99, 235, 0.45)"
                                            : isDark
                                                ? "0 2px 8px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.08)"
                                                : "0 1px 2px rgba(15, 23, 42, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.9)",
                                    }}
                                >
                                    <Sparkles className={`navbar-summarize-icon ${aiHubOpen ? "text-white" : "text-sky-400"} animate-pulse pointer-events-none`} strokeWidth={2} />
                                </button>

                                {/* AI Smart Hub Dropdown Popover */}
                                <AnimatePresence>
                                    {aiHubOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 8, scale: 0.96 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 6, scale: 0.97 }}
                                            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                                            className="ai-hub-popover-panel absolute right-0 top-full mt-2.5 rounded-2xl shadow-2xl"
                                            style={{
                                                width: "min(285px, calc(100vw - 20px))",
                                                maxWidth: "calc(100vw - 20px)",
                                                zIndex: 10002,
                                            }}
                                        >
                                            {/* Caret arrow pointing directly up to the Sparkles icon button */}
                                            <div className="ai-hub-popover-caret" aria-hidden="true" />

                                            <AISmartHubCard
                                                onClose={() => setAiHubOpen(false)}
                                                onOpenSummarizer={onOpenSummarizer}
                                                navigate={navigate}
                                                isDark={isDark}
                                            />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* 5. START A CONVERSATION CTA (Visible on Desktop >= xl) */}
                            <a
                                href="https://forms.gle/GCqvWiWqxwvDSzoZ6"
                                target="_blank"
                                rel="noopener noreferrer"
                                data-testid="nav-cta"
                                className="group hidden xl:inline-flex items-center gap-2 rounded-full px-4 sm:px-5 py-2 font-display text-xs xl:text-[13px] font-extrabold text-white transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/35 hover:scale-[1.02] active:scale-[0.98]"
                                style={{
                                    border: "none",
                                    background: "linear-gradient(135deg, #0284c7 0%, #2563eb 50%, #1d4ed8 100%)",
                                    boxShadow: "0 4px 16px -2px rgba(37, 99, 235, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.25)",
                                }}
                            >
                                <span>Start a Conversation</span>
                                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2} />
                            </a>
                        </div>

                    </div>
                </div>
            </header>

            {/* ========================================================= */}
            {/* 2. ANIMATED FLOATING LUXURY NAVIGATION DECK               */}
            {/* ========================================================= */}
            <AnimatePresence>
                {menuOpen && (
                    <>
                        {/* Dimmed Blurred Backdrop (Hover outside or Click to close) */}
                        <motion.div
                            key="nav-backdrop"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                            className="nav-backdrop fixed inset-0 top-16 sm:top-20 bg-black/50 dark:bg-black/75 backdrop-blur-md cursor-pointer"
                            style={{ zIndex: 9990 }}
                            onMouseEnter={() => startCloseTimer(100)}
                            onMouseMove={() => {
                                if (!closeTimerRef.current) {
                                    startCloseTimer(100);
                                }
                            }}
                            onClick={() => {
                                cancelCloseTimer();
                                setMenuOpen(false);
                                setActiveMegaDropdown(null);
                            }}
                        />

                        {/* Floating Navigation Deck Container */}
                        <motion.div
                            key="nav-deck"
                            initial={{ opacity: 0, y: -20, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{
                                opacity: 0,
                                y: -16,
                                scale: 0.98,
                                transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] },
                            }}
                            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                            className="nav-deck-wrapper fixed top-[68px] sm:top-[84px] inset-x-0 px-3 sm:px-6 pointer-events-none max-h-[calc(100vh-84px)] overflow-y-auto pb-8"
                            style={{ zIndex: 9995 }}
                        >
                            <div
                                data-testid="flyout-menu"
                                className={`nav-deck-container pointer-events-auto mx-auto w-full rounded-2xl sm:rounded-3xl border shadow-2xl overflow-hidden transition-all duration-300 ${activeMegaData ? "max-w-6xl" : "max-w-4xl lg:max-w-5xl"
                                    }`}
                                onMouseEnter={cancelCloseTimer}
                                onMouseLeave={() => startCloseTimer(150)}
                                style={{
                                    backgroundColor: isDark ? "rgba(9, 17, 34, 0.98)" : "rgba(255, 255, 255, 0.98)",
                                    backdropFilter: "blur(24px) saturate(180%)",
                                    WebkitBackdropFilter: "blur(24px) saturate(180%)",
                                    borderColor: isDark ? "rgba(56, 189, 248, 0.35)" : "rgba(226, 232, 240, 0.9)",
                                    boxShadow: isDark
                                        ? "0 35px 85px -15px rgba(0, 0, 0, 0.95), 0 0 40px rgba(56, 189, 248, 0.18), 0 0 0 1px rgba(56, 189, 248, 0.1)"
                                        : "0 30px 70px -15px rgba(15, 23, 42, 0.18), 0 10px 30px rgba(37, 99, 235, 0.08), 0 0 0 1px rgba(0, 0, 0, 0.03)",
                                }}
                            >
                                {/* Glowing Accent Stripe */}
                                <div className="h-[2.5px] w-full bg-gradient-to-r from-sky-400 via-blue-600 to-indigo-500" />

                                {/* A. HORIZONTAL NAVIGATION BAR (PICTURE 1 PARITY) */}
                                <motion.div
                                    initial={{ opacity: 0, y: -4 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.22, delay: 0.02, ease: [0.16, 1, 0.3, 1] }}
                                    className={`mega-nav-bar ${activeMegaData ? "has-active-dropdown" : ""}`}
                                >
                                    {megaNavItems.map((item) => {
                                        if (!item.isDropdown) {
                                            const isHome = item.label === "Home";
                                            const isActive = isHome
                                                ? location.pathname === "/" || location.pathname === "/home"
                                                : location.pathname.startsWith(item.to);

                                            return (
                                                <NavLink
                                                    key={item.label}
                                                    to={item.to}
                                                    onMouseEnter={() => {
                                                        cancelCloseTimer();
                                                        setActiveMegaDropdown(null);
                                                    }}
                                                    onMouseOver={() => {
                                                        cancelCloseTimer();
                                                        setActiveMegaDropdown(null);
                                                    }}
                                                    onClick={() => {
                                                        cancelCloseTimer();
                                                        setMenuOpen(false);
                                                        setActiveMegaDropdown(null);
                                                    }}
                                                    className={`mega-nav-item ${isActive ? "active" : ""}`}
                                                >
                                                    <span>{item.label}</span>
                                                </NavLink>
                                            );
                                        }

                                        const isDropOpen = activeMegaDropdown === item.key;
                                        const isRouteActive = location.pathname.startsWith(item.to);

                                        return (
                                            <button
                                                key={item.label}
                                                type="button"
                                                onClick={() => {
                                                    cancelCloseTimer();
                                                    setActiveMegaDropdown((prev) => (prev === item.key ? null : item.key));
                                                }}
                                                onMouseEnter={() => {
                                                    cancelCloseTimer();
                                                    setActiveMegaDropdown(item.key);
                                                }}
                                                onMouseOver={() => {
                                                    cancelCloseTimer();
                                                    setActiveMegaDropdown(item.key);
                                                }}
                                                onFocus={() => {
                                                    cancelCloseTimer();
                                                    setActiveMegaDropdown(item.key);
                                                }}
                                                className={`mega-nav-item ${isDropOpen || (isRouteActive && !activeMegaDropdown) ? "active" : ""}`}
                                                aria-expanded={isDropOpen}
                                            >
                                                <span>{item.label}</span>
                                                <ChevronDown className="mega-nav-chevron" strokeWidth={2.5} />
                                            </button>
                                        );
                                    })}
                                </motion.div>

                                {/* B. INTERACTIVE MEGA-DROPDOWN PANEL (PICTURE 2 PARITY) */}
                                <AnimatePresence mode="wait">
                                    {activeMegaData && (
                                        <motion.div
                                            key={activeMegaDropdown}
                                            initial={{ opacity: 0, y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -6 }}
                                            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                                            className="mega-dropdown-grid"
                                        >
                                            {activeMegaData.columns.map((col, idx) => (
                                                <div key={idx} className="mega-col-card">
                                                    {/* Header: Title + Badge */}
                                                    <div className="mega-col-heading">
                                                        <span>{col.title}</span>
                                                        {col.badge && (
                                                            <span className="mega-col-badge">{col.badge}</span>
                                                        )}
                                                    </div>

                                                    {/* Thumbnail Image */}
                                                    <Link
                                                        to={col.to}
                                                        onClick={() => {
                                                            cancelCloseTimer();
                                                            setMenuOpen(false);
                                                            setActiveMegaDropdown(null);
                                                        }}
                                                        className="mega-thumbnail-wrap group"
                                                    >
                                                        <img
                                                            src={col.image}
                                                            alt={col.title}
                                                            className="mega-thumbnail-img"
                                                            loading="lazy"
                                                        />
                                                    </Link>

                                                    {/* Links List */}
                                                    <div className="mega-links-list">
                                                        {col.links.map((link, lIdx) => (
                                                            <Link
                                                                key={lIdx}
                                                                to={link.to}
                                                                onClick={() => {
                                                                    cancelCloseTimer();
                                                                    setMenuOpen(false);
                                                                    setActiveMegaDropdown(null);
                                                                }}
                                                                className="mega-col-link group/link"
                                                            >
                                                                <ChevronRight className="mega-col-link-icon" strokeWidth={2.5} />
                                                                <span>{link.label}</span>
                                                            </Link>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}

                                            {/* 4th Column: AI SMART HUB CARD */}
                                            <div className="mega-col-card flex flex-col justify-start">
                                                <AISmartHubCard
                                                    onClose={() => {
                                                        cancelCloseTimer();
                                                        setMenuOpen(false);
                                                        setActiveMegaDropdown(null);
                                                    }}
                                                    onOpenSummarizer={onOpenSummarizer}
                                                    navigate={navigate}
                                                    isDark={isDark}
                                                />
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>


                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;