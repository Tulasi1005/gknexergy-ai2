import { motion, useReducedMotion } from "framer-motion";

export const Reveal = ({ children, delay = 0, y = 28, className = "" }) => {
    const reduce = useReducedMotion();
    if (reduce) return <div className={className}>{children}</div>;
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, y }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
        >
            {children}
        </motion.div>
    );
};

export const MaskedLines = ({ lines, className = "", lineClassName = "", as: Tag = "h1" }) => {
    const reduce = useReducedMotion();
    const MotionTag = motion[Tag] || motion.h1;
    return (
        <MotionTag className={className}>
            {lines.map((line, i) => (
                <span key={i} className="block overflow-hidden pb-1">
                    <motion.span
                        className={`block ${lineClassName}`}
                        initial={reduce ? false : { y: "110%" }}
                        animate={reduce ? {} : { y: 0 }}
                        transition={{ duration: 0.9, delay: 0.12 * i + 0.15, ease: [0.22, 1, 0.36, 1] }}
                    >
                        {line}
                    </motion.span>
                </span>
            ))}
        </MotionTag>
    );
};

export default Reveal;
