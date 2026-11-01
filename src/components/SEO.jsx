import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const SITE_URL = "https://gknexergy.com";
export const DEFAULT_OG_IMAGE = "https://gknexergy.com/images/gklogo.png";
export const DEFAULT_KEYWORDS = [
    "AI Solutions for Businesses",
    "AI Automation Services",
    "Custom Software Development",
    "Digital Transformation Services",
    "Business Process Automation",
    "IT Consulting Services",
    "Enterprise Software Solutions",
    "Data Analytics Solutions",
    "Web and Mobile App Development",
    "Technology Solutions in India",
    "Software Development Company in Hyderabad"
];

const SEO = ({
    title = "GK Nexergy | Custom Software Development & AI Solutions",
    description = "GK Nexergy is a leading software development company in Hyderabad providing AI solutions for businesses, custom software development, digital transformation, and IT consulting services across India.",
    keywords = DEFAULT_KEYWORDS,
    canonical,
    ogType = "website",
    ogImage = DEFAULT_OG_IMAGE,
    schema = null,
    breadcrumbs = null,
    noindex = false
}) => {
    const location = useLocation();

    useEffect(() => {
        // 1. Title
        document.title = title;

        // Helper to set or create <meta> tags
        const setMeta = (attr, key, content) => {
            if (!content) return;
            let el = document.head.querySelector(`meta[${attr}="${key}"]`);
            if (!el) {
                el = document.createElement("meta");
                el.setAttribute(attr, key);
                document.head.appendChild(el);
            }
            el.setAttribute("content", content);
        };

        // Helper to set or create <link> tags
        const setLink = (rel, href) => {
            if (!href) return;
            let el = document.head.querySelector(`link[rel="${rel}"]`);
            if (!el) {
                el = document.createElement("link");
                el.setAttribute("rel", rel);
                document.head.appendChild(el);
            }
            el.setAttribute("href", href);
        };

        // 2. Canonical URL computation
        const cleanPath = (canonical || location.pathname || "").split("?")[0].split("#")[0];
        const normalizedPath = cleanPath === "/landing" ? "/" : cleanPath;
        const currentCanonicalUrl = `${SITE_URL}${normalizedPath === "/" ? "" : normalizedPath}`;
        setLink("canonical", currentCanonicalUrl);

        // 3. Core Meta Tags
        const keywordsStr = Array.isArray(keywords) ? keywords.join(", ") : (keywords || DEFAULT_KEYWORDS.join(", "));
        setMeta("name", "description", description);
        setMeta("name", "keywords", keywordsStr);
        setMeta("name", "author", "GK Nexergy Technologies Private Limited");
        setMeta(
            "name",
            "robots",
            noindex
                ? "noindex, nofollow"
                : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        );

        // 4. Open Graph Tags
        const fullOgImage = ogImage.startsWith("http") ? ogImage : `${SITE_URL}${ogImage}`;
        setMeta("property", "og:title", title);
        setMeta("property", "og:description", description);
        setMeta("property", "og:url", currentCanonicalUrl);
        setMeta("property", "og:type", ogType);
        setMeta("property", "og:image", fullOgImage);
        setMeta("property", "og:site_name", "GK Nexergy");
        setMeta("property", "og:locale", "en_IN");

        // 5. Twitter Card Tags
        setMeta("name", "twitter:card", "summary_large_image");
        setMeta("name", "twitter:site", "@gknexergy");
        setMeta("name", "twitter:title", title);
        setMeta("name", "twitter:description", description);
        setMeta("name", "twitter:image", fullOgImage);

        // 6. Structured Data (JSON-LD) Dynamic Injection
        let scriptTag = document.getElementById("gk-dynamic-jsonld");
        if (!scriptTag) {
            scriptTag = document.createElement("script");
            scriptTag.id = "gk-dynamic-jsonld";
            scriptTag.type = "application/ld+json";
            document.head.appendChild(scriptTag);
        }

        // Build Breadcrumbs Schema
        const pathSegments = location.pathname.split("/").filter(Boolean);
        const breadcrumbElements = [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": `${SITE_URL}/home`
            }
        ];

        let accumulatedPath = "";
        pathSegments.forEach((seg, idx) => {
            accumulatedPath += `/${seg}`;
            const formattedName = seg
                .split("-")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ");
            breadcrumbElements.push({
                "@type": "ListItem",
                "position": idx + 2,
                "name": formattedName,
                "item": `${SITE_URL}${accumulatedPath}`
            });
        });

        const activeBreadcrumbs = breadcrumbs
            ? {
                  "@type": "BreadcrumbList",
                  "@id": `${currentCanonicalUrl}#breadcrumb`,
                  "itemListElement": breadcrumbs.map((b, i) => ({
                      "@type": "ListItem",
                      "position": i + 1,
                      "name": b.name,
                      "item": b.url.startsWith("http") ? b.url : `${SITE_URL}${b.url}`
                  }))
              }
            : {
                  "@type": "BreadcrumbList",
                  "@id": `${currentCanonicalUrl}#breadcrumb`,
                  "itemListElement": breadcrumbElements
              };

        const graphObjects = [
            {
                "@type": "Organization",
                "@id": `${SITE_URL}/#organization`,
                "name": "GK Nexergy",
                "legalName": "GK Nexergy Technologies Private Limited",
                "url": SITE_URL,
                "logo": {
                    "@type": "ImageObject",
                    "url": `${SITE_URL}/images/gklogo.png`,
                    "caption": "GK Nexergy Technologies"
                },
                "description": "GK Nexergy is a leading software development company in Hyderabad providing AI solutions for businesses, custom software development, digital transformation, and IT consulting services in India.",
                "email": "contact@gknexergy.com",
                "telephone": "+91-9704585960",
                "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Hyderabad",
                    "addressRegion": "Telangana",
                    "addressCountry": "IN"
                },
                "sameAs": [
                    "https://linkedin.com",
                    "https://twitter.com",
                    "https://youtube.com",
                    "https://github.com"
                ]
            },
            {
                "@type": "WebSite",
                "@id": `${SITE_URL}/#website`,
                "url": SITE_URL,
                "name": "GK Nexergy",
                "publisher": {
                    "@id": `${SITE_URL}/#organization`
                },
                "inLanguage": "en"
            },
            activeBreadcrumbs
        ];

        // Merge any custom schema provided (e.g. Service, Course, FAQPage)
        if (schema) {
            if (Array.isArray(schema)) {
                graphObjects.push(...schema);
            } else {
                graphObjects.push(schema);
            }
        }

        const jsonLdPayload = {
            "@context": "https://schema.org",
            "@graph": graphObjects
        };

        scriptTag.textContent = JSON.stringify(jsonLdPayload);
    }, [title, description, keywords, canonical, ogType, ogImage, schema, breadcrumbs, noindex, location.pathname]);

    return null;
};

export default SEO;
