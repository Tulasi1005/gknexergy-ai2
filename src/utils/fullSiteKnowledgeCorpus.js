/**
 * GK Nexergy Complete Site Knowledge Corpus
 * 
 * Aggregates and indexes every single text, course, solution, project, career opening,
 * industry, contact channel, and company statement across the entire website.
 */

import { SOLUTIONS, COURSES, INDUSTRIES, NAV } from "../data/site.js";
import CHATBOT_KNOWLEDGE from "../data/chatbotKnowledgeBase.json";

export const FULL_SITE_CORPUS = [
  // 1. COMPANY & IDENTITY
  {
    id: "about-overview",
    title: "About GK Nexergy & Core Mission",
    route: "/about",
    category: "company",
    keywords: ["about", "story", "mission", "vision", "who are you", "what is gk nexergy", "founded"],
    content: `**GK Nexergy** is an enterprise technology engineering and talent acceleration company based in **Andhra Pradesh, India**.
Operating under the guiding principle of **"Train. Build. Transform."**, GK Nexergy unites two powerful ecosystems:
1. **Enterprise Solutions**: Engineering custom web platforms, native & cross-platform mobile apps, Generative AI workflows, and high-performance cloud architectures.
2. **Nexergy Academy**: Empowering developers, students, and professionals with hands-on skills in Cyber Security & Ethical Hacking, PostgreSQL databases, Python, Cloud, and AI Marketing.

Core Differentiators:
• 100% Client IP Ownership (clients own every line of code and architecture).
• Dedicated Autonomous Agile Delivery Pods.
• Fast discovery response within 10 minutes.
• Free 30-minute architectural consultation.`,
  },
  {
    id: "why-gk-nexergy",
    title: "Why GK Nexergy — Differentiators",
    route: "/why-gk-nexergy",
    category: "company",
    keywords: ["why gk", "why choose", "differentiators", "advantage", "ip ownership", "agile pods", "pricing"],
    content: `**Why Choose GK Nexergy**:
1. **100% IP & Data Ownership**: Zero vendor lock-in; you own the repository, designs, and database schemas.
2. **Dedicated Agile Pods**: Cross-functional units with full-stack engineers, architects, and QA specialists.
3. **Reasonable & Reliable Solutions**: Enterprise grade quality without agency overhead.
4. **End-to-End Modern Stack**: React, Next.js, Node.js, Python FastAPI, PostgreSQL, AWS/GCP, Docker, Kubernetes.
5. **Integrated Academy Talent Pipeline**: Direct access to trained engineering talent.`,
  },
  {
    id: "pricing-plans",
    title: "Pricing Plans & Engagement Models",
    route: "/pricing",
    category: "solutions",
    keywords: ["pricing", "price", "plan", "plans", "starter", "growth", "premium", "cost", "fee", "rate", "pod cost", "engagement", "quote", "budget"],
    content: `**GK Nexergy Digital Marketing Packages & Engagement Tiers**:
• **Starter Package**: Perfect for small businesses, local shops, and startups. Includes 8 Static Posts / Month (2 posts per week), 2 Reels / Month, Instagram & Facebook management, Meta Ads campaign setup, audience targeting, and monthly performance report.
• **Growth Package [Most Popular]**: Ideal for growing businesses, retail stores, and service providers. Includes 12 Static Posts / Month (3 posts per week), 4 Reels / Month, 2 On-Site Professional Video Shoot Visits / Month, Meta Ads (lead generation & remarketing), Google Business Profile Optimization, and WhatsApp Business setup.
• **Premium Package**: Built for established businesses, brands, real estate, and high-growth e-commerce. Includes 20+ Static Posts / Month (5+ posts per week), 8 Reels / Month + YouTube Shorts, 4 On-Site Professional Video Shoot Visits / Month, Meta & Google Ads Suite (Search, Display, YouTube), Local SEO, and bi-weekly strategic reporting.
• **100% Transparent Ad Spend**: Clients pay ad spend directly to Meta and Google (industry benchmarks: ₹5,000 to ₹5,00,000+/mo). GK Nexergy management fee is separate with zero ad spend markup.`,
  },
  {
    id: "vision-mission",
    title: "Vision & Strategic Mission",
    route: "/vision",
    category: "company",
    keywords: ["vision", "mission", "future", "roadmap", "goals", "strategy"],
    content: `**GK Nexergy Strategic Vision**:
Building India's premier tech innovation hub, bridging world-class enterprise software delivery with industry-aligned talent acceleration.`,
  },

  // 2. LIVE CONTACT & HQ
  {
    id: "contact-live",
    title: "Contact Information & Live Channels",
    route: "/contact",
    category: "contact",
    keywords: ["contact", "phone", "mobile", "whatsapp", "email", "address", "location", "office", "headquarters", "call", "reach"],
    content: `**Live Contact Channels for GK Nexergy**:
• **Direct Phone**: +91 9704585960
• **Instant WhatsApp**: https://wa.me/919704585960
• **Official Email**: contact@gknexergy.com
• **Headquarters**: Andhra Pradesh, India
• **Business Hours**: Monday to Saturday: 9:00 AM – 7:00 PM IST
• **Discovery Consultation**: Free 30-minute session; inquiries answered in 10 minutes.
• **Google Form**: https://forms.gle/GCqvWiWqxwvDSzoZ6`,
  },

  // 3. ALL SOLUTIONS (Iterated from site data)
  ...SOLUTIONS.map((s) => ({
    id: `solution-${s.slug}`,
    title: `Enterprise Solution: ${s.title}`,
    route: `/solutions/${s.slug}`,
    category: "solutions",
    keywords: [s.title.toLowerCase(), s.shortTitle.toLowerCase(), s.slug, ...s.features.map(f => f.toLowerCase()), "solution", "services", "engineering"],
    content: `**${s.title}** (${s.shortTitle}):
*"${s.tagline}"*
${s.description}

**Key Capabilities & Features:**
${s.features.map(f => `• ${f}`).join("\n")}

**Delivery Lifecycle Flow:** ${s.flow.join(" → ")}
**Action CTA:** ${s.cta}`,
  })),

  // 4. ALL ACADEMY COURSES (Iterated from site data)
  ...COURSES.map((c) => ({
    id: `course-${c.slug}`,
    title: `Nexergy Academy: ${c.title} (${c.subtitle})`,
    route: `/academy/${c.slug}`,
    category: "academy",
    keywords: [c.title.toLowerCase(), c.subtitle.toLowerCase(), c.slug, c.category.toLowerCase(), ...c.topics.map(t => t.toLowerCase()), "course", "curriculum", "syllabus", "training", "fees", "admission"],
    content: `**${c.title} — ${c.subtitle}** (${c.category}):
*"${c.tagline}"*
${c.description}

**Topics & Curriculum:**
${c.topics.map(t => `• ${t}`).join("\n")}

${c.outcomes ? `**Learning Outcomes:**\n${c.outcomes.map(o => `• ${o}`).join("\n")}` : ""}
${c.journey ? `**Learning Journey Steps:**\n${c.journey.map(j => `• ${j.step}: ${j.text}`).join("\n")}` : ""}

**Target Audience:** ${c.audience}`,
  })),

  // 5. ALL INDUSTRIES SERVED (Iterated from site data)
  ...INDUSTRIES.map((ind) => ({
    id: `industry-${ind.name.toLowerCase().replace(/\s+/g, "-")}`,
    title: `Industry Focus: ${ind.name} (${ind.category})`,
    route: "/industries",
    category: "industries",
    keywords: [ind.name.toLowerCase(), ind.category.toLowerCase(), ...ind.highlights.map(h => h.toLowerCase()), "industry", "sector", "domain"],
    content: `**${ind.name}** (${ind.category}):
${ind.text}
Key Highlights: ${ind.highlights.join(", ")}`,
  })),

  // 6. DELIVERED PROJECTS & CASE STUDIES
  {
    id: "project-hospital",
    title: "Case Study: AI Hospital Management Platform",
    route: "/projects",
    category: "projects",
    keywords: ["hospital", "healthcare", "ehr", "clinical", "patient triage", "medical", "case study", "project"],
    content: `**AI-Integrated Hospital Management Platform**:
• Clinical workflow automation, intelligent patient triage, EHR records, and automated billing.
• **Impact**: 40% reduction in patient wait times, 100% HIPAA-compliant audit trail.
• **Tech Stack**: React, Python FastAPI, PostgreSQL, HIPAA Cloud Architecture.`,
  },
  {
    id: "project-realestate",
    title: "Case Study: AI Real Estate Discovery & Lead Analytics",
    route: "/projects",
    category: "projects",
    keywords: ["real estate", "property", "mls", "valuation", "spatial analytics", "leads", "case study", "project"],
    content: `**AI Real Estate Discovery & Lead Analytics**:
• Automated valuation models (AVM), MLS ingest, spatial analytics, predictive buyer scoring.
• **Impact**: 3.2x increase in qualified buyer conversions.
• **Tech Stack**: Next.js, Node.js, Python ML, PostGIS, Mapbox.`,
  },
  {
    id: "project-ecommerce",
    title: "Case Study: NutriBest Global Health E-Commerce",
    route: "/projects",
    category: "projects",
    keywords: ["ecommerce", "nutribest", "store", "shop", "checkout", "subscriptions", "case study", "project"],
    content: `**NutriBest Health & Wellness Global E-Commerce**:
• High-throughput e-commerce storefront with sub-second page loads, multi-currency checkout, and recurring subscriptions.
• **Impact**: 99.98% uptime during peak promotional campaigns.
• **Tech Stack**: React, Node.js, PostgreSQL, Stripe/Razorpay, Redis.`,
  },

  // 7. CAREERS & HIRING
  {
    id: "careers-hiring",
    title: "Careers & Open Positions",
    route: "/careers",
    category: "careers",
    keywords: ["career", "careers", "job", "jobs", "hiring", "openings", "salary", "interview", "apply"],
    content: `**Careers at GK Nexergy** (Engineering Pods):
Active Openings:
• Full-Stack Developers (React, Next.js, Node.js / Python)
• AI & Machine Learning Engineers (LLMs, RAG, PyTorch)
• PostgreSQL Database Engineers & DBAs
• Cyber Security Analysts & Penetration Testers
• UI/UX & Interaction Designers

Benefits: Autonomous agile pods, 100% product ownership, competitive compensation, continuous learning allowance. Apply at /careers or contact HR at contact@gknexergy.com.`,
  },

  // 7. CUSTOM FAQS (From chatbotKnowledgeBase.json)
  ...(CHATBOT_KNOWLEDGE.customFaqs || []).map((faq) => ({
    id: faq.id,
    title: `FAQ: ${faq.question}`,
    route: (faq.routes && faq.routes[0]?.to) || "/about",
    category: "faq",
    keywords: [...(faq.intents || []), "faq", "question", "answer"],
    content: `**${faq.question}**\n\n${faq.responses?.en || ""}`,
  })),
];

/**
 * Full-Text & Semantic Knowledge Search across every single word of the site
 */
export function searchSiteCorpus(query, topK = 3) {
  const q = query.toLowerCase().trim();
  const tokens = q.replace(/[^\w\s]/gi, " ").split(/\s+/).filter((w) => w.length > 1);

  const scoredItems = FULL_SITE_CORPUS.map((item) => {
    let score = 0;
    const lowerContent = item.content.toLowerCase();
    const lowerTitle = item.title.toLowerCase();

    // Exact title match
    if (lowerTitle.includes(q)) score += 20;

    // Keyword / tag matches
    for (const kw of item.keywords) {
      if (q.includes(kw)) score += 8;
      for (const t of tokens) {
        if (kw === t) score += 4;
        else if (kw.includes(t) && t.length > 3) score += 2;
      }
    }

    // Content body token occurrences
    for (const t of tokens) {
      if (lowerContent.includes(t)) {
        score += 1.5;
      }
    }

    return { item, score };
  });

  scoredItems.sort((a, b) => b.score - a.score);
  return scoredItems.slice(0, topK).filter((s) => s.score > 0).map((s) => s.item);
}
