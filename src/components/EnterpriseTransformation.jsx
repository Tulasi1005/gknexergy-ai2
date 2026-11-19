import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    ArrowRight,
    ChevronRight,
    Cpu,
    Database,
    Zap,
    TrendingUp,
    CheckCircle2,
    Bot
} from "lucide-react";
import { Reveal } from "./Reveal";
import "./EnterpriseTransformation.css";

const PIPELINE_PHASES = [
    {
        id: "data",
        stepNum: "01",
        tabLabel: "DATA",
        icon: Database,
        pipelineLabel: "DATA",
        phaseSubtitle: "DATA INGESTION & LAKES",
        badgeCategory: "PIPELINE THROUGHPUT",
        badgeName: "Sub-Second Ingest",
        badgeClass: "blue",
        iconBgClass: "bg-blue-500",
        title: "Unified Enterprise Data Layer",
        description: "Unify fragmented enterprise systems, business databases, and documents into high-speed unified data architectures with zero silos.",
        tags: [
            "Unified Data Layer",
            "Real-Time Integration",
            "Data Governance",
            "Zero Data Silos"
        ],
        footerLeft: "Enterprise Grade • Sub-Second Latency",
        footerLink: "/solutions/software-development",
    },
    {
        id: "ai",
        stepNum: "02",
        tabLabel: "AI",
        icon: Cpu,
        pipelineLabel: "AI",
        phaseSubtitle: "INTELLIGENT MODEL LAYER",
        badgeCategory: "MODEL INFERENCE",
        badgeName: "Domain Fine-Tuning",
        badgeClass: "blue",
        iconBgClass: "bg-indigo-500",
        title: "Custom AI Reasoning Engines",
        description: "Deploy custom intelligence engines, automated reasoning workflows, and instant semantic search built securely into your core software.",
        tags: [
            "Custom AI Engines",
            "Private Knowledge Search",
            "Automated Workflows",
            "Zero Data Leakage"
        ],
        footerLeft: "Enterprise Grade • High-Performance AI Compute",
        footerLink: "/solutions/ai-automation",
    },
    {
        id: "workflow",
        stepNum: "03",
        tabLabel: "WORKFLOW",
        icon: Zap,
        pipelineLabel: "WORKFLOW",
        phaseSubtitle: "WORKFLOW AUTOMATION",
        badgeCategory: "PROCESS ACCELERATION",
        badgeName: "Autonomous Ops",
        badgeClass: "blue",
        iconBgClass: "bg-cyan",
        title: "Intelligent Process Execution",
        description: "Automate complex business handoffs, customer operations, and intelligent document processing end-to-end.",
        tags: [
            "Document Processing",
            "System Integration",
            "AI Smart Assistants",
            "Zero Redundancy"
        ],
        footerLeft: "Enterprise Grade • Autonomous Pods",
        footerLink: "/solutions/ai-automation",
    },
    {
        id: "business",
        stepNum: "04",
        tabLabel: "BUSINESS",
        icon: TrendingUp,
        pipelineLabel: "BUSINESS",
        phaseSubtitle: "COMPOUNDING OUTCOMES",
        badgeCategory: "REVENUE SCALE",
        badgeName: "Compounding Growth",
        badgeClass: "blue",
        iconBgClass: "bg-emerald",
        title: "Compounding Business Velocity",
        description: "Turn automated intelligence into high-margin operational leverage, accelerated time-to-market, and measurable revenue expansion.",
        tags: [
            "Predictive Insights",
            "Executive Dashboards",
            "Performance Alerts",
            "Continuous ROI"
        ],
        footerLeft: "Enterprise Grade • 99.99% Reliability",
        footerLink: "/solutions",
    }
];

export const EnterpriseTransformation = () => {
    // Default to phase 03: WORKFLOW matching the reference screenshot exactly
    const [activeIdx, setActiveIdx] = useState(2);
    const activePhase = PIPELINE_PHASES[activeIdx];
    const ActivePhaseIcon = activePhase.icon;

    return (
        <section
            id="enterprise-transformation"
            className="et-section"
            data-testid="enterprise-transformation-section"
        >
            {/* Tech Blueprint Grid & Ambient Glows */}
            <div className="et-bg-grid" />
            <div className="et-glow-left" />
            <div className="et-glow-right" />

            <div className="et-container">
                <div className="et-layout-grid">
                    
                    {/* ========================================================
                        LEFT COLUMN: Headlines, Description, 2x2 Grid & CTAs
                        ======================================================== */}
                    <div className="et-left-col">
                        
                        {/* Top Pill Status Badge */}
                        <Reveal delay={0.05}>
                            <div className="et-status-pill">
                                <span className="et-pulse-dot">
                                    <span className="et-pulse-dot-ring" />
                                    <span className="et-pulse-dot-core" />
                                </span>
                                <span className="et-status-text">
                                    AI + DIGITAL BUSINESS TRANSFORMATION
                                </span>
                            </div>
                        </Reveal>

                        {/* Main Heading with Animated Terminal Cursor */}
                        <Reveal delay={0.15}>
                            <h2 className="et-heading">
                                <span>Transform Your</span>
                                <br />
                                <span>Business With</span>
                                <br />
                                <span className="et-heading-accent">
                                    Custom Enterprise Software.
                                    <span className="et-cursor" />
                                </span>
                            </h2>
                        </Reveal>

                        {/* Description Paragraph */}
                        <Reveal delay={0.25}>
                            <p className="et-description">
                                GK Nexergy engineers intelligent AI models, high-performance web systems, and automated enterprise workflows that turn data into measurable revenue and compounding operational scale.
                            </p>
                        </Reveal>

                        {/* 2x2 Feature Cards Grid */}
                        <Reveal delay={0.35} className="w-full">
                            <div className="et-features-grid">
                                
                                {/* Feature 1 */}
                                <div className="et-feature-card">
                                    <div className="et-feature-icon-box">
                                        <Bot size={18} strokeWidth={2.2} />
                                    </div>
                                    <span className="et-feature-title">
                                        Autonomous AI Copilots
                                    </span>
                                </div>

                                {/* Feature 2 */}
                                <div className="et-feature-card">
                                    <div className="et-feature-icon-box">
                                        <Database size={18} strokeWidth={2.2} />
                                    </div>
                                    <span className="et-feature-title">
                                        Unified Data Architecture
                                    </span>
                                </div>

                                {/* Feature 3 */}
                                <div className="et-feature-card">
                                    <div className="et-feature-icon-box">
                                        <Zap size={18} strokeWidth={2.2} />
                                    </div>
                                    <span className="et-feature-title">
                                        End-to-End Automation
                                    </span>
                                </div>

                                {/* Feature 4 */}
                                <div className="et-feature-card">
                                    <div className="et-feature-icon-box">
                                        <TrendingUp size={18} strokeWidth={2.2} />
                                    </div>
                                    <span className="et-feature-title">
                                        Scalable Growth Pipelines
                                    </span>
                                </div>
                            </div>
                        </Reveal>

                        {/* CTA Buttons */}
                        <Reveal delay={0.45}>
                            <div className="et-actions-row">
                                <Link
                                    to="/solutions"
                                    data-testid="explore-solutions-btn"
                                    className="et-btn-primary"
                                >
                                    Explore Solutions
                                    <ArrowRight size={16} strokeWidth={2.2} />
                                </Link>

                                <Link
                                    to="/contact"
                                    data-testid="talk-expert-btn"
                                    className="et-btn-secondary"
                                >
                                    Talk to an Expert
                                    <ChevronRight size={16} strokeWidth={2.2} />
                                </Link>
                            </div>
                        </Reveal>
                    </div>

                    {/* ========================================================
                        RIGHT COLUMN: Transformation Architecture Interactive Card
                        ======================================================== */}
                    <div className="et-right-col">
                        <Reveal delay={0.2}>
                            <div className="et-card">
                                
                                {/* Card Top Header Bar */}
                                <div className="et-card-header">
                                    <div className="et-card-header-left">
                                        <span className="et-pulse-dot">
                                            <span className="et-pulse-dot-ring" />
                                            <span className="et-pulse-dot-core" />
                                        </span>
                                        <span className="et-card-header-title">
                                            TRANSFORMATION ARCHITECTURE
                                        </span>
                                        <span className="et-live-engine-badge">
                                            LIVE ENGINE
                                        </span>
                                    </div>
                                    
                                    <span className="et-card-step-counter">
                                        Step 0{activeIdx + 1} / 04
                                    </span>
                                </div>

                                {/* 4 Tabs Bar */}
                                <div className="et-tabs-bar">
                                    {PIPELINE_PHASES.map((phase, idx) => {
                                        const TabIcon = phase.icon;
                                        const isActive = idx === activeIdx;

                                        return (
                                            <button
                                                key={phase.id}
                                                onClick={() => setActiveIdx(idx)}
                                                type="button"
                                                className={`et-tab-btn ${isActive ? "active" : ""}`}
                                            >
                                                <div className="et-tab-icon-row">
                                                    <TabIcon size={13} />
                                                    <span className="et-tab-num">
                                                        {phase.stepNum}
                                                    </span>
                                                </div>
                                                <span className="et-tab-label">
                                                    {phase.tabLabel}
                                                </span>

                                                {/* Cyan Underline Bar on Active Tab */}
                                                {isActive && (
                                                    <motion.div
                                                        layoutId="etTabUnderline"
                                                        className="et-tab-underline"
                                                    />
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>

                                {/* Dark Enterprise Pipeline Strip (ENTERPRISE PIPELINE) */}
                                <div className="et-pipeline-strip">
                                    
                                    {/* Header inside pipeline strip */}
                                    <div className="et-pipeline-header">
                                        <span className="et-pipeline-title">
                                            <Zap size={13} />
                                            ENTERPRISE PIPELINE
                                        </span>
                                        <span className="et-pipeline-flow-tag">
                                            ACTIVE FLOW
                                        </span>
                                    </div>

                                    {/* Flow Steps with Connecting Line */}
                                    <div className="et-pipeline-track">
                                        
                                        {/* Background Connecting Line */}
                                        <div className="et-track-line-bg" />
                                        
                                        {/* Animated Glowing Active Progress Line */}
                                        <div 
                                            className="et-track-line-active"
                                            style={{
                                                width: `${(activeIdx / (PIPELINE_PHASES.length - 1)) * 82}%`
                                            }}
                                        />

                                        {PIPELINE_PHASES.map((phase, idx) => {
                                            const StepIcon = phase.icon;
                                            const isSelected = idx === activeIdx;
                                            const isPassed = idx < activeIdx;

                                            return (
                                                <div
                                                    key={phase.id}
                                                    onClick={() => setActiveIdx(idx)}
                                                    className="et-pipeline-node"
                                                >
                                                    <div
                                                        className={`et-node-box ${
                                                            isSelected ? "selected" : isPassed ? "passed" : ""
                                                        }`}
                                                    >
                                                        <StepIcon size={isSelected ? 18 : 14} strokeWidth={isSelected ? 2.5 : 2} />
                                                    </div>

                                                    <span
                                                        className={`et-node-label ${
                                                            isSelected ? "selected" : ""
                                                        }`}
                                                    >
                                                        {phase.pipelineLabel}
                                                    </span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Phase Detail Card (Lower Section) */}
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activePhase.id}
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -8 }}
                                        transition={{ duration: 0.2 }}
                                        className="et-detail-card"
                                    >
                                        {/* Phase Subtitle & Acceleration Badge */}
                                        <div className="et-detail-top-row">
                                            <span className="et-phase-subtitle">
                                                PHASE {activePhase.stepNum} • {activePhase.phaseSubtitle}
                                            </span>

                                            {activePhase.badgeName && (
                                                <div className="et-acceleration-box">
                                                    <span className={`et-acc-badge ${activePhase.badgeClass}`}>
                                                        {activePhase.badgeName}
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Icon & Title */}
                                        <div className="et-detail-title-row">
                                            <div className="et-detail-icon-box">
                                                <ActivePhaseIcon size={22} strokeWidth={2.2} />
                                            </div>
                                            <div>
                                                <h3 className="et-detail-title">
                                                    {activePhase.title}
                                                </h3>
                                                <p className="et-detail-desc">
                                                    {activePhase.description}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Checklist Pills */}
                                        <div className="et-check-pills-row">
                                            {activePhase.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="et-check-pill"
                                                >
                                                    <CheckCircle2 className="et-check-pill-icon" />
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Footer */}
                                        <div className="et-detail-footer">
                                            <span className="et-footer-meta">
                                                {activePhase.footerLeft}
                                            </span>

                                            <Link
                                                to={activePhase.footerLink}
                                                className="et-footer-link"
                                            >
                                                Explore Capability
                                                <ArrowRight size={14} strokeWidth={2.2} />
                                            </Link>
                                        </div>
                                    </motion.div>
                                </AnimatePresence>

                            </div>
                        </Reveal>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default EnterpriseTransformation;
