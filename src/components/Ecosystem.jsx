import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { ECOSYSTEM_NODES } from "../data/site";

const Ecosystem = ({ activeIndex = 0, onSelectNode }) => {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [tooltipState, setTooltipState] = useState({
        placement: "right",
        shiftX: 0,
        shiftY: 0,
        arrowX: "50%",
        arrowY: "50%",
        width: 240,
    });
    const containerRef = useRef(null);
    const reduce = useReducedMotion();
    const navigate = useNavigate();
    const radius = 38.5; // percent - harmonious orbital clearance across all devices

    const handleNodeHover = (e, i) => {
        if (containerRef.current && e.currentTarget) {
            const containerRect = containerRef.current.getBoundingClientRect();
            const nodeRect = e.currentTarget.getBoundingClientRect();
            const nodeCenterX = nodeRect.left + nodeRect.width / 2;
            const nodeCenterY = nodeRect.top + nodeRect.height / 2;
            const screenW = window.innerWidth;
            const screenH = window.innerHeight;

            const navbar = document.querySelector('header[data-testid="main-navbar"]') || document.querySelector('header');
            const navbarBottom = navbar ? navbar.getBoundingClientRect().bottom : 70;
            
            const spaceAbove = nodeRect.top - navbarBottom;
            const spaceBelow = screenH - nodeRect.bottom;
            const spaceRight = screenW - nodeRect.right;

            const node = ECOSYSTEM_NODES[i];

            // 1. Determine optimal placement:
            // - "Digital Growth" ("At this side I need down"): opens DOWN (bottom)
            // - "Nexergy Academy" ("In this tool tip should be on right"): opens RIGHT
            // - Other nodes: open DOWN (bottom) to avoid top navbar collision & prevent obscuring center globe
            let placement = "bottom";
            if (node?.label === "Digital Growth") {
                // User explicitly requested: "At this side I need down"
                placement = "bottom";
            } else if (node?.label === "Nexergy Academy") {
                // User explicitly requested: "In this tool tip should be on right"
                placement = "right";
            } else {
                placement = "bottom";
            }

            // 2. Horizontal and vertical clamping based on placement
            let shiftX = 0;
            let shiftY = 0;
            let arrowX = "50%";
            let arrowY = "50%";
            let tooltipWidth = 280;

            if (placement === "right") {
                const pad = screenW <= 320 ? 8 : 12;
                const maxAllowedWidth = Math.max(160, screenW - nodeRect.right - pad - 14);
                tooltipWidth = Math.min(screenW <= 360 ? 210 : screenW <= 640 ? 240 : 280, maxAllowedWidth);

                const estimatedHalfH = screenW <= 360 ? 55 : 65;
                const idealTop = nodeCenterY - estimatedHalfH;
                const idealBottom = nodeCenterY + estimatedHalfH;

                if (idealTop < navbarBottom + 8) {
                    shiftY = (navbarBottom + 8) - idealTop;
                } else if (idealBottom > screenH - 8) {
                    shiftY = (screenH - 8) - idealBottom;
                }

                const rawArrowY = estimatedHalfH - shiftY;
                arrowY = Math.max(16, Math.min(estimatedHalfH * 2 - 16, rawArrowY)) + "px";
            } else if (placement === "left") {
                const pad = screenW <= 320 ? 8 : 12;
                const maxAllowedWidth = Math.max(160, nodeRect.left - pad - 14);
                tooltipWidth = Math.min(screenW <= 360 ? 210 : screenW <= 640 ? 240 : 280, maxAllowedWidth);

                const estimatedHalfH = screenW <= 360 ? 55 : 65;
                const idealTop = nodeCenterY - estimatedHalfH;
                const idealBottom = nodeCenterY + estimatedHalfH;

                if (idealTop < navbarBottom + 8) {
                    shiftY = (navbarBottom + 8) - idealTop;
                } else if (idealBottom > screenH - 8) {
                    shiftY = (screenH - 8) - idealBottom;
                }

                const rawArrowY = estimatedHalfH - shiftY;
                arrowY = Math.max(16, Math.min(estimatedHalfH * 2 - 16, rawArrowY)) + "px";
            } else {
                // top or bottom placement
                const pad = screenW <= 320 ? 8 : 12;
                if (screenW <= 320) {
                    tooltipWidth = Math.min(220, screenW - pad * 2);
                } else if (screenW <= 480) {
                    tooltipWidth = Math.min(240, screenW - pad * 2);
                } else if (screenW <= 768) {
                    tooltipWidth = 250;
                }

                const halfW = tooltipWidth / 2;
                const idealLeft = nodeCenterX - halfW;
                const idealRight = nodeCenterX + halfW;

                if (idealLeft < pad) {
                    shiftX = pad - idealLeft;
                } else if (idealRight > screenW - pad) {
                    shiftX = (screenW - pad) - idealRight;
                }

                const rawArrowPos = halfW - shiftX;
                arrowX = Math.max(16, Math.min(tooltipWidth - 16, rawArrowPos)) + "px";
            }

            setTooltipState({
                placement,
                shiftX,
                shiftY,
                arrowX,
                arrowY,
                width: tooltipWidth,
            });
        }
        setHoveredIndex(i);
        onSelectNode && onSelectNode(i);
    };

    const handleNodeClick = (e, node, i) => {
        e.stopPropagation();
        handleNodeHover(e, i);
        if (node?.to) {
            navigate(node.to);
        }
    };

    return (
        <div
            ref={containerRef}
            className="relative aspect-square w-full max-w-[240px] sm:max-w-[360px] lg:max-w-[440px] xl:max-w-[465px] mx-auto lg:ml-auto lg:mr-0 py-2 overflow-visible"
            data-testid="hero-ecosystem"
        >
            {/* orbital rings */}
            <div className="absolute inset-[11.5%] rounded-full border border-brand/20 dark:border-electric/20 pointer-events-none" />
            <div className="absolute inset-[23%] rounded-full border border-dashed border-brand/15 dark:border-electric/15 pointer-events-none" />
            <div className="absolute inset-[35%] rounded-full border border-brand/10 dark:border-electric/10 pointer-events-none" />

            {/* connecting lines */}
            <svg className="absolute inset-0 h-full w-full pointer-events-none" viewBox="0 0 100 100" aria-hidden="true">
                {ECOSYSTEM_NODES.map((_, i) => {
                    const angle = (i / ECOSYSTEM_NODES.length) * 2 * Math.PI - Math.PI / 2;
                    const x = 50 + radius * Math.cos(angle);
                    const y = 50 + radius * Math.sin(angle);
                    return (
                        <line
                            key={i}
                            x1="50" y1="50" x2={x} y2={y}
                            stroke="currentColor"
                            strokeWidth="0.25"
                            className="text-brand/30 dark:text-electric/30 transition-colors"
                        />
                    );
                })}
            </svg>

            {/* center emblem */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10" style={{ zIndex: 10 }}>
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="ecosystem-center-circle"
                >
                    <img
                        src="/images/globe1.gif"
                        alt="GK Nexergy Technology Ecosystem & AI Solutions"
                        className="ecosystem-center-img"
                    />
                </motion.div>
            </div>

            {/* rotating node layer */}
            <motion.div
                className="absolute inset-0 z-20 pointer-events-none"
                style={{ zIndex: 20 }}
                animate={reduce ? {} : { rotate: 360 }}
                transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
            >
                {ECOSYSTEM_NODES.map((node, i) => {
                    const angle = (i / ECOSYSTEM_NODES.length) * 2 * Math.PI - Math.PI / 2;
                    const x = 50 + radius * Math.cos(angle);
                    const y = 50 + radius * Math.sin(angle);
                    const Icon = node.icon;
                    const isActive = i === activeIndex;
                    return (
                        <div
                            key={node.label}
                            className="absolute pointer-events-auto cursor-pointer"
                            style={{
                                left: `${x}%`,
                                top: `${y}%`,
                                transform: "translate(-50%, -50%)",
                                zIndex: hoveredIndex === i ? 35 : (isActive ? 25 : 20),
                            }}
                            onClick={(e) => {
                                handleNodeClick(e, node, i);
                            }}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                    e.preventDefault();
                                    handleNodeClick(e, node, i);
                                }
                            }}
                            onMouseEnter={(e) => {
                                handleNodeHover(e, i);
                            }}
                            onMouseLeave={() => setHoveredIndex(null)}
                            onFocus={(e) => {
                                handleNodeHover(e, i);
                            }}
                            onBlur={() => setHoveredIndex(null)}
                            role="button"
                            tabIndex={0}
                            aria-label={node.seoTitle || `Explore ${node.label}`}
                            title={node.seoTitle || node.label}
                            data-seo-keyword={node.keywords || node.label}
                        >
                            <motion.div
                                animate={reduce ? {} : { rotate: -360 }}
                                transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
                                className="relative flex flex-col items-center"
                            >
                                <div className="ecosystem-node-stack">
                                    <div className={`relative ecosystem-node-box ${isActive ? "ecosystem-node-box-active" : ""}`}>
                                        <Icon className={`ecosystem-node-icon ${isActive ? "ecosystem-node-icon-active" : ""}`} strokeWidth={2.2} />
                                        {isActive && (
                                            <span className="absolute -inset-1 rounded-[14px] border-2 border-brand dark:border-electric animate-ping opacity-60 pointer-events-none" />
                                        )}
                                    </div>
                                    <span className={`ecosystem-node-pill ${isActive ? "ecosystem-node-pill-active" : ""}`}>
                                        {node.label}
                                    </span>
                                </div>

                                {/* Rich Responsive Interactive Floating Tooltip */}
                                <AnimatePresence>
                                    {hoveredIndex === i && (
                                        <div
                                            className={`ecosystem-tooltip-wrapper ecosystem-tooltip-wrapper-${tooltipState.placement}`}
                                            style={{
                                                zIndex: 40,
                                                "--tooltip-left": `calc(50% + ${tooltipState.shiftX}px)`,
                                                "--tooltip-shift-y": `${tooltipState.shiftY}px`,
                                                "--tooltip-width": `${tooltipState.width}px`,
                                                "--tooltip-arrow-left": tooltipState.arrowX,
                                                "--tooltip-arrow-top": tooltipState.arrowY,
                                            }}
                                        >
                                            <motion.div
                                                initial={{
                                                    opacity: 0,
                                                    x: tooltipState.placement === "right" ? -8 : tooltipState.placement === "left" ? 8 : 0,
                                                    y: tooltipState.placement === "top" ? 6 : tooltipState.placement === "bottom" ? -6 : 0,
                                                    scale: 0.94,
                                                }}
                                                animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                                                exit={{
                                                    opacity: 0,
                                                    x: tooltipState.placement === "right" ? -6 : tooltipState.placement === "left" ? 6 : 0,
                                                    y: tooltipState.placement === "top" ? 4 : tooltipState.placement === "bottom" ? -4 : 0,
                                                    scale: 0.96,
                                                }}
                                                transition={{ duration: 0.18, ease: "easeOut" }}
                                            >
                                                <div
                                                    className={`ecosystem-tooltip-card ${isActive ? "ecosystem-tooltip-card-active" : ""}`}
                                                    onClick={(e) => handleNodeClick(e, node, i)}
                                                >
                                                    {/* Node Name */}
                                                    <div className="ecosystem-tooltip-title">
                                                        {node.label}
                                                    </div>

                                                    {/* Description */}
                                                    <p className="ecosystem-tooltip-desc">
                                                        {node.desc}
                                                    </p>

                                                    {/* Small Triangle Arrow */}
                                                    <div className="ecosystem-tooltip-arrow" />
                                                </div>
                                            </motion.div>
                                        </div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        </div>
                    );
                })}
            </motion.div>
        </div>
    );
};

export default Ecosystem;