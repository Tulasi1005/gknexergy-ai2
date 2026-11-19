import { useEffect, useRef, useState } from "react";

const CosmicCursor = () => {
    const canvasRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);
    const [isClicking, setIsClicking] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Only activate on devices with a mouse/trackpad
        if (typeof window === "undefined" || !window.matchMedia("(pointer: fine)").matches) {
            return;
        }

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");

        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };
        window.addEventListener("resize", handleResize);

        let mouseX = -100;
        let mouseY = -100;
        let ringX = -100;
        let ringY = -100;
        let targetRadius = 18;
        let currentRadius = 18;

        const particles = [];
        const MAX_PARTICLES = 45;

        const colors = [
            "rgba(56, 189, 248, ",  // electric cyan
            "rgba(96, 165, 250, ",  // sky blue
            "rgba(147, 197, 253, ", // bright blue
            "rgba(255, 255, 255, ", // white sparkle
            "rgba(192, 132, 252, ", // cosmic purple
        ];

        const handleMouseMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            if (!isVisible) setIsVisible(true);

            // Spawn 1-2 glowing stardust particles on move
            const count = Math.random() > 0.4 ? 2 : 1;
            for (let k = 0; k < count; k++) {
                if (particles.length < MAX_PARTICLES) {
                    const colorBase = colors[Math.floor(Math.random() * colors.length)];
                    particles.push({
                        x: mouseX + (Math.random() - 0.5) * 12,
                        y: mouseY + (Math.random() - 0.5) * 12,
                        vx: (Math.random() - 0.5) * 1.2,
                        vy: (Math.random() - 0.5) * 1.2 - 0.4,
                        size: Math.random() * 2.8 + 1.2,
                        alpha: 0.9,
                        colorBase,
                        decay: Math.random() * 0.025 + 0.02,
                    });
                }
            }

            // Check if cursor is hovering over interactive elements
            const target = e.target;
            const interactive = target && target.closest("a, button, [role='button'], input, .landing-vision-btn, .cursor-pointer, header, img");
            setIsHovered(!!interactive);
        };

        const handleMouseDown = () => setIsClicking(true);
        const handleMouseUp = () => setIsClicking(false);
        const handleMouseLeave = () => setIsVisible(false);
        const handleMouseEnter = () => setIsVisible(true);

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mouseup", handleMouseUp);
        document.addEventListener("mouseleave", handleMouseLeave);
        document.addEventListener("mouseenter", handleMouseEnter);

        let animationFrameId;

        const render = () => {
            ctx.clearRect(0, 0, width, height);

            // 1. Draw and update trailing stardust particles
            for (let i = particles.length - 1; i >= 0; i--) {
                const p = particles[i];
                p.x += p.vx;
                p.y += p.vy;
                p.alpha -= p.decay;

                if (p.alpha <= 0) {
                    particles.splice(i, 1);
                    continue;
                }

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `${p.colorBase}${p.alpha})`;
                ctx.shadowColor = "rgba(56, 189, 248, 0.9)";
                ctx.shadowBlur = 8;
                ctx.fill();
                ctx.shadowBlur = 0;
            }

            // 2. Smooth ring follower with LERP interpolation
            ringX += (mouseX - ringX) * 0.22;
            ringY += (mouseY - ringY) * 0.22;

            targetRadius = isHovered ? 28 : isClicking ? 12 : 18;
            currentRadius += (targetRadius - currentRadius) * 0.22;

            if (isVisible && mouseX > 0 && mouseY > 0) {
                // Outer interactive halo
                ctx.beginPath();
                ctx.arc(ringX, ringY, currentRadius, 0, Math.PI * 2);
                ctx.lineWidth = isHovered ? 2 : 1.5;
                ctx.strokeStyle = isHovered ? "rgba(56, 189, 248, 1)" : "rgba(56, 189, 248, 0.7)";
                ctx.shadowColor = "rgba(56, 189, 248, 0.85)";
                ctx.shadowBlur = isHovered ? 16 : 10;
                ctx.stroke();

                if (isHovered) {
                    ctx.fillStyle = "rgba(56, 189, 248, 0.16)";
                    ctx.fill();
                }
                ctx.shadowBlur = 0;

                // Inner bright cosmic spark dot
                ctx.beginPath();
                ctx.arc(mouseX, mouseY, isHovered ? 4.5 : 3.2, 0, Math.PI * 2);
                ctx.fillStyle = "#ffffff";
                ctx.shadowColor = "rgba(56, 189, 248, 1)";
                ctx.shadowBlur = 12;
                ctx.fill();
                ctx.shadowBlur = 0;
            }

            animationFrameId = requestAnimationFrame(render);
        };

        animationFrameId = requestAnimationFrame(render);

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mouseup", handleMouseUp);
            document.removeEventListener("mouseleave", handleMouseLeave);
            document.removeEventListener("mouseenter", handleMouseEnter);
            cancelAnimationFrame(animationFrameId);
        };
    }, [isHovered, isClicking, isVisible]);

    return (
        <canvas
            ref={canvasRef}
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 z-[9999] h-full w-full"
            style={{ mixBlendMode: "screen" }}
        />
    );
};

export default CosmicCursor;
