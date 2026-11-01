import React from "react";
import SEO from "../components/SEO";
import PageHero from "../components/PageHero";
import CTABand from "../components/CTABand";
import PricingPlans, { FAQS } from "../components/PricingPlans/PricingPlans";

const Pricing = () => {
    const faqSchema = {
        "@type": "FAQPage",
        "@id": "https://gknexergy.com/pricing#faq",
        "mainEntity": (FAQS || []).map((faq) => {
            const answerText = faq.lead
                ? `${faq.lead} ${faq.bullets ? faq.bullets.map((b) => `${b.title}: ${b.text}`).join(". ") : ""}`
                : faq.a || "";
            return {
                "@type": "Question",
                "name": faq.q,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": answerText
                }
            };
        })
    };

    return (
        <>
            <SEO
                title="Digital Marketing Packages & Retainer Pricing | GK Nexergy"
                description="Choose the right package for your business growth. Starter, Growth, and Premium digital marketing retainers covering social media management, 4K reels, on-site shoots, and Meta & Google ads across India."
                keywords={[
                    "Digital Marketing Retainers",
                    "Digital Growth Services",
                    "Meta Ads Management",
                    "Google Ads Services",
                    "GK Nexergy Pricing",
                    "Technology Solutions in India"
                ]}
                canonical="/pricing"
                schema={faqSchema}
            />
            <PageHero
                eyebrow="Digital Marketing Packages"
                titleLines={["Choose the Right Package", "For Your Business Growth."]}
                description="Choose between Starter, Growth, or Premium packages. Comprehensive social media management, high-converting reels, on-site shoots, and high-ROI Meta & Google ads."
                testId="pricing-hero"
            />

            <PricingPlans showHeader={false} showComparison={true} showFaqs={true} initialPlan="growth" />

            <CTABand
                title="Need a Custom Scope or Enterprise SLA?"
                text="Schedule a free 30-minute discovery session with our lead architects to structure a custom engagement plan tailored to your roadmap."
                primary={{ label: "Schedule Discovery Call", to: "/contact" }}
                secondary={{ label: "Explore Solutions", to: "/solutions" }}
            />
        </>
    );
};

export default Pricing;
