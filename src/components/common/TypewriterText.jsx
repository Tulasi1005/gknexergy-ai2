import React, { useState, useEffect } from "react";

/**
 * TypewriterText - Animates text with a realistic typewriting and backspacing effect.
 * Perfect for cycling high-impact marketing keywords like SEO, AEO & GEO.
 */
export const TypewriterText = ({
    words = [
        "SEO, AEO & GEO",
        "ASO & Paid Ads Management",
        "Content, SEO & Social Media",
        "Advanced CRO & Retention",
        "Influencer Management & Scale"
    ],
    typingSpeed = 75,
    deletingSpeed = 35,
    pauseDuration = 2200,
    className = "",
    textClassName = "",
    cursorClassName = ""
}) => {
    const [wordIndex, setWordIndex] = useState(0);
    const [text, setText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentWord = words[wordIndex % words.length];

        let timer;
        if (!isDeleting && text === currentWord) {
            timer = setTimeout(() => setIsDeleting(true), pauseDuration);
        } else if (isDeleting && text === "") {
            setIsDeleting(false);
            setWordIndex((prev) => (prev + 1) % words.length);
        } else {
            const speed = isDeleting ? deletingSpeed : typingSpeed;
            timer = setTimeout(() => {
                setText((prev) =>
                    isDeleting
                        ? currentWord.substring(0, prev.length - 1)
                        : currentWord.substring(0, prev.length + 1)
                );
            }, speed);
        }

        return () => clearTimeout(timer);
    }, [text, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseDuration]);

    return (
        <span className={`inline-flex items-center font-black ${className}`}>
            <span className={`break-words ${textClassName}`}>{text}</span>
            <span
                className={`inline-block ml-1.5 w-[3.5px] h-[0.95em] rounded-[1px] animate-pulse align-middle shrink-0 ${
                    cursorClassName || "bg-current"
                }`}
                aria-hidden="true"
            />
        </span>
    );
};

export default TypewriterText;

