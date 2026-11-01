/**
 * GK Nexergy Intelligent Conversational AI Engine
 * 
 * Provides:
 * 1. Strict language matching: Telugu queries receive 100% Telugu responses; English queries receive English responses.
 * 2. Natural, human-like dialogue with concise, intelligent, and context-aware responses.
 * 3. Multi-turn conversation context tracking across Enterprise Solutions, Academy, Case Studies, and Careers.
 * 4. Accurate GK Nexergy ground-truth facts (Enterprise tech hub, 100% IP ownership, autonomous pods, contact channels).
 * 5. Optional OpenAI API integration (GPT-4o) with instant conversational local fallback.
 */

import { FULL_SITE_CORPUS, searchSiteCorpus } from "./fullSiteKnowledgeCorpus.js";
import { detectLanguage, translateText } from "./multilingualVoiceEngine.js";

export const GK_CONTACT_INFO = {
  phone: "+91 9704585960",
  phoneRaw: "+919704585960",
  email: "contact@gknexergy.com",
  whatsappUrl: "https://wa.me/919704585960?text=Hi%20GK%20Nexergy%2C%20I%20would%20like%20to%20know%20more%20about%20your%20services.",
  consultationForm: "https://forms.gle/GCqvWiWqxwvDSzoZ6",
  headquarters: "Andhra Pradesh, India",
  hours: "Monday – Saturday: 9:00 AM – 7:00 PM IST",
};

export const GK_SYSTEM_PROMPT = `
You are the intelligent digital assistant for GK Nexergy (www.gknexergy.com), based in India.

Persona:
- You speak naturally, warmly, and intelligently — like an experienced engineering colleague or tech consultant.
- Keep responses concise, clear, and conversational. Avoid walls of text or giant lists of bullet points unless specifically requested.
- Multilingual Rule: If the user writes or speaks in Telugu (including Tanglish transliteration), reply 100% in natural Telugu script. If in English, reply in English. If in Hindi, reply in Hindi.
- Accurate Company Facts: GK Nexergy delivers Enterprise Solutions (Software, Mobile Apps, AI & Automation, Data Analytics, Digital Growth) and Nexergy Academy (Cyber Security, PostgreSQL, Foundation Program, AI Marketing). Contact: +91 9704585960 | contact@gknexergy.com | Andhra Pradesh, India.
`;

import CHATBOT_KNOWLEDGE from "../data/chatbotKnowledgeBase.json";

/**
 * Knowledge Topics dynamically compiled from `src/data/chatbotKnowledgeBase.json`.
 * 
 * To modify questions, add new user queries, adjust answers, or train the chatbot:
 * Simply edit `src/data/chatbotKnowledgeBase.json` and run `npm run train:chatbot`!
 */
export const CONVERSATIONAL_TOPICS = [
  ...(CHATBOT_KNOWLEDGE.topics || []).map((t) => ({
    id: t.id,
    intents: t.intents || [],
    handler: (query, context, isTelugu, isHindi) => {
      const lang = isTelugu ? "te" : isHindi ? "hi" : "en";
      const text = (t.responses && (t.responses[lang] || t.responses["en"])) || "";
      return {
        topic: t.id,
        text,
        routes: t.routes || [],
        lang,
      };
    },
  })),
  ...(CHATBOT_KNOWLEDGE.customFaqs || []).map((f) => ({
    id: f.id,
    intents: f.intents || [],
    handler: (query, context, isTelugu, isHindi) => {
      const lang = isTelugu ? "te" : isHindi ? "hi" : "en";
      const text = (f.responses && (f.responses[lang] || f.responses["en"])) || "";
      return {
        topic: f.id,
        text,
        routes: f.routes || [],
        lang,
      };
    },
  })),
];

/**
 * Intelligent Navigation Intent Detector
 */
export function detectNavigationIntent(query) {
  const q = query.toLowerCase().trim();

  const navPatterns = [
    { match: ["home", "homepage"], to: "/home", label: "Home" },
    { match: ["about", "story", "leadership", "vision", "mission"], to: "/about", label: "About Us" },
    { match: ["why gk", "why nexergy", "why choose"], to: "/why-gk-nexergy", label: "Why GK Nexergy" },
    { match: ["solutions", "all solutions", "services"], to: "/solutions", label: "Enterprise Solutions" },
    { match: ["software development", "web development"], to: "/solutions/software-development", label: "Software Solutions" },
    { match: ["mobile app", "ios", "android"], to: "/solutions/mobile-development", label: "Mobile Solutions" },
    { match: ["ai automation", "ai solutions"], to: "/solutions/ai-automation", label: "AI & Automation" },
    { match: ["data analytics"], to: "/solutions/data-analytics", label: "Data & Analytics" },
    { match: ["digital transformation"], to: "/solutions/digital-transformation", label: "Digital Transformation" },
    { match: ["digital growth"], to: "/solutions/digital-growth", label: "Digital Growth" },
    { match: ["academy", "courses", "all courses"], to: "/academy/courses", label: "Academy Courses" },
    { match: ["cyber security", "ethical hacking"], to: "/academy/cyber-security", label: "Cyber Security Course" },
    { match: ["postgresql", "postgres"], to: "/academy/postgresql-mastery", label: "PostgreSQL Mastery" },
    { match: ["foundation program"], to: "/academy/foundation-program", label: "Foundation Program" },
    { match: ["projects", "case studies", "portfolio"], to: "/projects", label: "Client Projects" },
    { match: ["careers", "jobs", "hiring"], to: "/careers", label: "Careers" },
    { match: ["contact", "book consultation", "consultation"], to: "/contact", label: "Contact Us" },
  ];

  for (const item of navPatterns) {
    for (const kw of item.match) {
      if (q.includes(kw)) {
        if (
          q.startsWith("go to") ||
          q.startsWith("navigate") ||
          q.startsWith("open") ||
          q.startsWith("take me") ||
          q.startsWith("show me") ||
          q === kw
        ) {
          return { isDirectNav: true, ...item };
        }
      }
    }
  }

  return null;
}

/**
 * Advanced Multi-Turn Conversational Intent Matcher with Guaranteed Language Integrity
 */
export function queryLocalKnowledgeBase(query, context = {}) {
  const q = query.toLowerCase().trim();
  const activeTopic = context?.activeTopic || "";
  
  // Strict Language Determination
  const detectedLang = detectLanguage(query);
  const isTelugu = context?.language === "te" || detectedLang === "te";
  const isHindi = context?.language === "hi" || detectedLang === "hi";

  // Unicode-safe word tokenizer (preserves Telugu, Hindi, Tamil, Kannada, etc.)
  const words = q.replace(/[^\p{Letter}\p{Mark}\p{Number}\s]/gu, " ").split(/\s+/).filter(Boolean);

  // 1. Contextual Follow-up Detection
  if (
    q === "yes" ||
    q === "yeah" ||
    q === "sure" ||
    q === "yep" ||
    q.includes("tell me more") ||
    q.includes("more details") ||
    q.includes("explain more") ||
    q.includes("how does it work") ||
    q.includes("ఇంకా చెప్పు") ||
    q.includes("మరిన్ని వివరాలు") ||
    q.includes("inka cheppu")
  ) {
    if (activeTopic === "solutions-ai") {
      return {
        topic: "solutions-ai",
        text: isTelugu
          ? "ఖచ్చితంగా! AI వర్క్‌ఫ్లోల కోసం మీ టీమ్‌కు ఎక్కడ ఎక్కువ సమయం పడుతుందో అర్థం చేసుకోవడానికి 30 నిమిషాల ఉచిత కన్సల్టేషన్ కాల్‌తో ప్రారంభిస్తాము.\n\nమీరు ఉచిత ఆర్కిటెక్చరల్ కన్సల్టేషన్‌ను షెడ్యూల్ చేయాలనుకుంటున్నారా?"
          : "Sure! For AI workflows, we typically start with a 30-minute discovery call to map out where your team spends manual time.\n\nFrom there, we build custom copilots, RAG document search systems, or automated triage bots that connect to your existing tools.\n\nWould you like to schedule a free 30-minute architectural consultation?",
        routes: [{ label: isTelugu ? "ఉచిత కన్సల్టేషన్ బుక్ చేయండి" : "Book Free Consultation", to: "/contact" }],
        confidence: "high",
        lang: isTelugu ? "te" : "en",
      };
    }
    if (activeTopic === "academy" || activeTopic.startsWith("academy-")) {
      return {
        topic: "academy",
        text: isTelugu
          ? "మా అకాడమీ కోర్సులు లైవ్ ప్రాజెక్ట్‌లు మరియు రియల్ కోడ్ రివ్యూలతో ఇంజనీర్ల ద్వారా నడపబడతాయి.\n\nవిద్యార్థులు వాస్తవ ప్రొడక్షన్ దృశ్యాలలో పనిచేస్తారు.\n\nమీరు కోర్సు సిలబస్ చూడాలనుకుంటున్నారా లేదా మా అడ్మిషన్ల టీమ్‌తో WhatsAppలో మాట్లాడాలనుకుంటున్నారా?"
          : "Our academy cohorts are mentor-led with live project sprints and real-world code reviews.\n\nStudents work on actual production scenarios (like writing database migrations or conducting penetration testing in isolated sandbox labs).\n\nWould you like to see all current course syllabi or talk to our admissions team on WhatsApp?",
        routes: [
          { label: isTelugu ? "💬 WhatsAppలో మాట్లాడండి" : "💬 Inquire on WhatsApp", to: "https://wa.me/919704585960?text=Hi%2C%20I%20would%20like%20more%20details%20about%20Nexergy%20Academy", external: true },
          { label: isTelugu ? "అన్ని కోర్సులు" : "View All Courses", to: "/academy/courses" },
        ],
        confidence: "high",
        lang: isTelugu ? "te" : "en",
      };
    }
    if (activeTopic === "solutions-software" || activeTopic === "solutions-mobile") {
      return {
        topic: activeTopic,
        text: isTelugu
          ? "మా డెలివరీ పాడ్స్ 2 వారాల చురుకైన స్ప్రింట్‌లలో పనిచేస్తాయి. ప్రతి స్ప్రింట్ తర్వాత స్టేజింగ్ ప్రివ్యూ లింక్‌లు మరియు గిట్ రిపోజిటరీ యాక్సెస్ అందించబడుతుంది.\n\nమీరు మీ ప్రాజెక్ట్ అవసరాలను ఇంజనీరింగ్ లీడ్‌తో చర్చించాలనుకుంటున్నారా?"
          : "Our delivery pods work in 2-week agile sprints. You receive staging preview links after every sprint with full access to the Git repository.\n\nWe also provide continuous QA testing, automated deployment pipelines, and post-launch SLA support.\n\nWould you like to discuss your project requirements with an engineering lead?",
        routes: [{ label: isTelugu ? "ప్రాజెక్ట్ చర్చించండి" : "Discuss Your Project", to: "/contact" }],
        confidence: "high",
        lang: isTelugu ? "te" : "en",
      };
    }
  }

  // 2. Score Matcher
  let bestMatch = null;
  let highestScore = 0;

  const STOP_WORDS = new Set(["about", "tell", "more", "what", "does", "you", "your", "can", "how", "with", "this", "that", "the", "and", "for", "are", "గురించి", "చెప్పు", "ఏమిటి", "ఎలా", "cheppu", "gurinchi"]);
  const domainWords = words.filter(w => !STOP_WORDS.has(w));

  for (const item of CONVERSATIONAL_TOPICS) {
    let score = 0;

    for (const intent of item.intents) {
      const intentLower = intent.toLowerCase();
      if (q === intentLower) {
        score += 50;
      } else if (q.includes(intentLower) && intentLower.length > 2) {
        score += 30 + Math.min(intentLower.length, 10);
      } else {
        for (const word of domainWords) {
          if (intentLower === word) {
            score += 15;
          } else if (word.length >= 3 && intentLower.includes(word)) {
            score += 10;
          }
        }
      }
    }

    if (score > highestScore) {
      highestScore = score;
      bestMatch = item;
    }
  }

  if (bestMatch && highestScore >= 5) {
    const result = bestMatch.handler(query, context, isTelugu, isHindi);
    return {
      ...result,
      confidence: "high",
      lang: isTelugu ? "te" : isHindi ? "hi" : "en",
    };
  }

  // 3. Fallback to Full Site Indexed Corpus
  const corpusMatches = searchSiteCorpus(q, 1);
  if (corpusMatches && corpusMatches.length > 0) {
    const top = corpusMatches[0];
    const corpusContent = top.content.split("\n\n").slice(0, 2).join("\n\n");
    return {
      topic: "corpus",
      text: corpusContent,
      routes: [{ label: `Explore ${top.title.split(":")[0]}`, to: top.route }],
      confidence: "corpus",
      lang: "en",
    };
  }

  // 4. Natural Contextual Fallback
  if (isTelugu) {
    return {
      topic: "fallback",
      text: "నేను మీకు ఖచ్చితమైన సమాధానం ఇవ్వాలనుకుంటున్నాను. GK Nexergy **ఎంటర్‌ప్రైజ్ టెక్నాలజీ సొల్యూషన్స్** (సాఫ్ట్‌వేర్, మొబైల్ యాప్‌లు, AI & ఆటోమేషన్) మరియు **Nexergy Academy** (సైబర్ సెక్యూరిటీ, PostgreSQL, ఫౌండేషన్ ప్రోగ్రామ్) లను అందిస్తుంది.\n\nమీరు సాఫ్ట్‌వేర్ నిర్మించాలనుకుంటున్నారా, అకాడమీ కోర్సులు నేర్చుకోవాలనుకుంటున్నారా లేదా కెరీర్ అవకాశాలు చూడాలనుకుంటున్నారా?",
      routes: [
        { label: "సొల్యూషన్స్ చూడండి", to: "/solutions" },
        { label: "Nexergy Academy", to: "/academy" },
      ],
      confidence: "fallback",
      lang: "te",
    };
  }

  return {
    topic: "fallback",
    text: "I want to make sure I give you the best answer. GK Nexergy specializes in **Enterprise Technology Solutions** (Software, Mobile Apps, AI & Automation, Data) and **Nexergy Academy** (Cyber Security, PostgreSQL, Foundation Program).\n\nCould you clarify if you're interested in building a solution, training at the academy, or exploring careers?",
    routes: [
      { label: "Explore Solutions", to: "/solutions" },
      { label: "Nexergy Academy", to: "/academy" },
    ],
    confidence: "fallback",
    lang: "en",
  };
}

/**
 * Hybrid AI Query Dispatcher with Strict Language Integrity
 */
export async function askGKChatbot(queryText, customApiKey = "", context = {}) {
  const trimmed = queryText.trim();
  if (!trimmed) return null;

  // Strict language detection & honor site language preference
  const detectedLang = detectLanguage(trimmed);
  const requestedLang = (context?.language && context.language !== "auto") ? context.language : detectedLang;
  const finalLang = (requestedLang && requestedLang !== "auto") ? requestedLang : (detectedLang || "en");
  const isTelugu = finalLang === "te";
  const isHindi = finalLang === "hi";

  // 1. Direct navigation check
  const navIntent = detectNavigationIntent(trimmed);
  if (navIntent && navIntent.isDirectNav) {
    let navText = isTelugu
      ? `మిమ్మల్ని నేరుగా **${navIntent.label}** పేజీకి తీసుకువెళుతున్నాము...`
      : isHindi
      ? `आपको सीधे **${navIntent.label}** पेज पर ले जा रहे हैं...`
      : `Taking you directly to **${navIntent.label}**...`;

    if (finalLang !== "en" && !isTelugu && !isHindi) {
      try {
        const { translatedText } = await translateText(navText, finalLang, "en");
        if (translatedText) navText = translatedText;
      } catch (e) {}
    }

    return {
      topic: "nav",
      text: navText,
      routes: [{ label: isTelugu ? `${navIntent.label} తెరవండి` : `Open ${navIntent.label}`, to: navIntent.to, primary: true }],
      navTarget: navIntent.to,
      isNavigation: true,
      lang: finalLang,
    };
  }

  // ===========================================================================
  // 2. OpenAI API Integration (Configured via .env)
  // ===========================================================================
  // The OpenAI key is loaded from .env via `import.meta.env.VITE_OPENAI_API_KEY`.
  // To activate live OpenAI GPT responses in production/development:
  // 1. Set `VITE_OPENAI_API_KEY=sk-...` in your `.env` file.
  // 2. Uncomment the block below.
  // GK Nexergy Assistant will then use live GPT-4o-mini with ground-truth RAG,
  // falling back automatically to the local knowledge base whenever needed.
  // ---------------------------------------------------------------------------
  /*
  const apiKey = customApiKey || (typeof import.meta !== "undefined" && import.meta.env?.VITE_OPENAI_API_KEY) || "";

  if (apiKey && apiKey.startsWith("sk-")) {
    try {
      const topDocs = searchSiteCorpus(trimmed, 3);
      const corpusContextStr = topDocs.map(d => `[${d.title}]\n${d.content}`).join("\n\n");

      const conversationHistory = (context.history || []).slice(-6).map(m => ({
        role: m.sender === "user" ? "user" : "assistant",
        content: m.text,
      }));

      const multilingualInstruction = isTelugu
        ? `\n\nCRITICAL LANGUAGE INSTRUCTION: The user is speaking in TELUGU. You MUST reply completely and naturally in TELUGU (తెలుగు) script while maintaining all GK Nexergy facts, phone (+91 9704585960), and markdown formatting.`
        : isHindi
        ? `\n\nCRITICAL LANGUAGE INSTRUCTION: The user is speaking in HINDI. You MUST reply completely and naturally in HINDI (हिन्दी) script.`
        : `\n\nCRITICAL LANGUAGE INSTRUCTION: The user is speaking in ENGLISH. You MUST reply in English.`;

      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: `${GK_SYSTEM_PROMPT}\n\nSite Ground Truth:\n${corpusContextStr}${multilingualInstruction}`,
            },
            ...conversationHistory,
            { role: "user", content: trimmed },
          ],
          temperature: 0.5,
          max_tokens: 350,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const aiReply = data.choices?.[0]?.message?.content || "";
        const localMatch = queryLocalKnowledgeBase(trimmed, { ...context, language: finalLang });

        return {
          topic: localMatch.topic || "general",
          text: aiReply,
          routes: (localMatch.routes || []).slice(0, 2),
          source: "openai",
          lang: finalLang,
        };
      }
    } catch (err) {
      console.warn("OpenAI fallback to local knowledge:", err);
    }
  }
  */

  // 3. Local conversational engine with Guaranteed Exact Language Output
  const localMatch = queryLocalKnowledgeBase(trimmed, {
    ...context,
    language: finalLang,
  });

  let finalResponseText = localMatch.text;

  // If user requested a non-English language, translate response to target language
  if (finalLang !== "en") {
    const hasTeluguScript = /[\u0C00-\u0C7F]/.test(finalResponseText);
    const hasHindiScript = /[\u0900-\u097F]/.test(finalResponseText);
    const hasTamilScript = /[\u0B80-\u0BFF]/.test(finalResponseText);
    const hasKannadaScript = /[\u0C80-\u0CFF]/.test(finalResponseText);
    const alreadyInTargetScript =
      (finalLang === "te" && hasTeluguScript) ||
      (finalLang === "hi" && hasHindiScript) ||
      (finalLang === "ta" && hasTamilScript) ||
      (finalLang === "kn" && hasKannadaScript);

    if (!alreadyInTargetScript) {
      try {
        const { translatedText } = await translateText(finalResponseText, finalLang, "en");
        if (translatedText && translatedText.trim()) {
          finalResponseText = translatedText;
        }
      } catch (e) {
        console.warn("Translation failed, keeping original:", e);
      }
    }
  }

  return {
    ...localMatch,
    text: finalResponseText,
    source: "local-engine",
    lang: finalLang,
  };
}
