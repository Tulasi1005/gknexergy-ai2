/**
 * GK Nexergy Multilingual Voice & Speech Intelligence Engine
 * 
 * Provides:
 * 1. Web Speech Recognition (Speech-to-Text / Voice Typing) across 15+ languages (Telugu, Hindi, English, Tamil, Kannada, Spanish, etc.) with auto-recovery on browser silence dropouts.
 * 2. Instant Text-to-Speech (Voice Output / Read Aloud) with natural pacing, multi-browser Chromium GC fix, long-speech ticker, and smart non-conflicting voice selection.
 * 3. Real-time language script & transliteration detection (Telugu, Hindi, Tamil, Kannada, Bengali, etc.).
 * 4. High-performance translation bridge (preserves Markdown formatting, company names, links, and code).
 */

export const SUPPORTED_VOICE_LANGUAGES = [
  { code: "auto", bcp47: "en-IN", label: "Auto Detect", native: "Auto Detect", flag: "🌐" },
  { code: "en", bcp47: "en-IN", label: "English (India)", native: "English (IN)", flag: "🇮🇳" },
  { code: "te", bcp47: "te-IN", label: "Telugu", native: "తెలుగు", flag: "🇮🇳" },
  { code: "hi", bcp47: "hi-IN", label: "Hindi", native: "हिन्दी", flag: "🇮🇳" },
  { code: "en-US", bcp47: "en-US", label: "English (US)", native: "English (US)", flag: "🇺🇸" },
  { code: "ta", bcp47: "ta-IN", label: "Tamil", native: "தமிழ்", flag: "🇮🇳" },
  { code: "kn", bcp47: "kn-IN", label: "Kannada", native: "ಕನ್ನಡ", flag: "🇮🇳" },
  { code: "mr", bcp47: "mr-IN", label: "Marathi", native: "मराठी", flag: "🇮🇳" },
  { code: "bn", bcp47: "bn-IN", label: "Bengali", native: "বাংলা", flag: "🇮🇳" },
  { code: "es", bcp47: "es-ES", label: "Spanish", native: "Español", flag: "🇪🇸" },
  { code: "fr", bcp47: "fr-FR", label: "French", native: "Français", flag: "🇫🇷" },
  { code: "de", bcp47: "de-DE", label: "German", native: "Deutsch", flag: "🇩🇪" },
  { code: "ja", bcp47: "ja-JP", label: "Japanese", native: "日本語", flag: "🇯🇵" },
  { code: "ar", bcp47: "ar-SA", label: "Arabic", native: "العربية", flag: "🇸🇦" },
  { code: "zh-CN", bcp47: "zh-CN", label: "Chinese", native: "简体中文", flag: "🇨🇳" },
];

// Pre-warm voices list for Web Speech Synthesis
let cachedVoices = [];
export function updateVoicesList() {
  if (typeof window !== "undefined" && window.speechSynthesis) {
    try {
      const v = window.speechSynthesis.getVoices();
      if (v && v.length > 0) {
        cachedVoices = v;
      }
    } catch (e) {
      // ignore
    }
  }
  return cachedVoices;
}

if (typeof window !== "undefined" && window.speechSynthesis) {
  updateVoicesList();
  if (typeof window.speechSynthesis.addEventListener === "function") {
    window.speechSynthesis.addEventListener("voiceschanged", updateVoicesList);
  }
  if (window.speechSynthesis.onvoiceschanged !== undefined) {
    window.speechSynthesis.onvoiceschanged = updateVoicesList;
  }
}

// Translation memory cache to avoid redundant API hits
const translationCache = new Map();

/**
 * Check if Web Speech Recognition is supported in the current browser
 */
export function isSpeechRecognitionSupported() {
  if (typeof window === "undefined") return false;
  return Boolean(window.SpeechRecognition || window.webkitSpeechRecognition);
}

/**
 * Check if Speech Synthesis (TTS) is supported
 */
export function isSpeechSynthesisSupported() {
  if (typeof window === "undefined") return false;
  return Boolean(window.speechSynthesis && typeof window.SpeechSynthesisUtterance !== "undefined");
}

/**
 * Detect script language using Unicode ranges and transliterated romanized keywords
 */
export function detectLanguage(text) {
  if (!text || typeof text !== "string") return "en";
  const str = text.trim();

  // 1. Script checks by dominant character count (avoids false detection on stray characters from previous language)
  const teluguCount = (str.match(/[\u0C00-\u0C7F]/g) || []).length;
  const devanagariCount = (str.match(/[\u0900-\u097F]/g) || []).length;
  const tamilCount = (str.match(/[\u0B80-\u0BFF]/g) || []).length;
  const kannadaCount = (str.match(/[\u0C80-\u0CFF]/g) || []).length;
  const bengaliCount = (str.match(/[\u0980-\u09FF]/g) || []).length;
  const arabicCount = (str.match(/[\u0600-\u06FF]/g) || []).length;
  const japaneseCount = (str.match(/[\u3040-\u30FF]/g) || []).length;
  const cjkCount = (str.match(/[\u4E00-\u9FFF]/g) || []).length;

  const scriptCounts = [
    { code: "te", count: teluguCount },
    { code: "hi", count: devanagariCount },
    { code: "ta", count: tamilCount },
    { code: "kn", count: kannadaCount },
    { code: "bn", count: bengaliCount },
    { code: "ar", count: arabicCount },
    { code: "ja", count: japaneseCount },
    { code: "zh-CN", count: cjkCount },
  ];

  scriptCounts.sort((a, b) => b.count - a.count);
  if (scriptCounts[0].count > 3) {
    return scriptCounts[0].code;
  }

  // 2. Transliteration / Romanized heuristics
  const lower = str.toLowerCase();
  
  // Telugu transliterations (Tanglish)
  const teluguKeywords = [
    "cheppu", "kavali", "unnavu", "gurinchi", "ekkada", "entha", "em chestaru", "eppudu",
    "elaga", "meeru", "bavundi", "chesaru", "telusa", "ivvandi", "chudali", "nerpistara",
    "namaskaram", "namaste", "dhanyavadamulu", "telugu", "em", "emi", "endi", "undha",
    "untara", "undi", "chesi", "cheyali", "chestaru", "matladali", "teliyali", "unnayi", "unnaya"
  ];
  if (teluguKeywords.some(kw => lower.includes(kw))) {
    return "te";
  }

  // Hindi transliterations (Hinglish)
  const hindiKeywords = [
    "kya", "batao", "chahiye", "kaise", "kahan", "kitna", "hoga", "karna", "aap",
    "samajh", "bataiye", "sikhate", "padhate", "dhanyawad", "shukriya", "hai", "hain",
    "bolo", "kaun", "kab"
  ];
  if (hindiKeywords.some(kw => lower.includes(kw))) {
    return "hi";
  }

  // Tamil transliterations
  const tamilKeywords = ["sollunga", "venum", "eppadi", "enge", "romba", "theriyuma", "panreenga", "vanakkam"];
  if (tamilKeywords.some(kw => lower.includes(kw))) {
    return "ta-latin";
  }

  // Check stored site language preference if available
  if (typeof localStorage !== "undefined") {
    const siteLang = localStorage.getItem("gk_selected_language");
    if (siteLang && siteLang !== "en") {
      return siteLang;
    }
  }

  return "en";
}

/**
 * Get BCP-47 locale tag for speech recognition or synthesis
 */
export function getLanguageLocale(langCode) {
  if (!langCode || langCode === "auto") {
    if (typeof localStorage !== "undefined") {
      const savedVoice = localStorage.getItem("gk_voice_language");
      if (savedVoice && savedVoice !== "auto") {
        return getLanguageLocale(savedVoice);
      }
      const siteLang = localStorage.getItem("gk_selected_language");
      if (siteLang && siteLang !== "en") {
        return getLanguageLocale(siteLang);
      }
    }
    if (typeof navigator !== "undefined" && navigator.language) {
      return navigator.language;
    }
    return "en-IN";
  }

  const match = SUPPORTED_VOICE_LANGUAGES.find(l => l.code === langCode);
  if (match && match.code !== "auto") return match.bcp47;

  // Check prefix mapping
  if (langCode.startsWith("te")) return "te-IN";
  if (langCode.startsWith("hi")) return "hi-IN";
  if (langCode.startsWith("ta")) return "ta-IN";
  if (langCode.startsWith("kn")) return "kn-IN";
  if (langCode.startsWith("mr")) return "mr-IN";
  if (langCode.startsWith("bn")) return "bn-IN";
  if (langCode.startsWith("es")) return "es-ES";
  if (langCode.startsWith("fr")) return "fr-FR";
  if (langCode.startsWith("de")) return "de-DE";
  if (langCode.startsWith("ja")) return "ja-JP";
  if (langCode.startsWith("ar")) return "ar-SA";
  if (langCode.startsWith("zh")) return "zh-CN";

  return "en-IN";
}

/**
 * Translate text between languages with caching and formatting preservation
 */
export async function translateText(text, targetLang = "en", sourceLang = "auto") {
  if (!text || typeof text !== "string") return { translatedText: text, sourceLang };
  const cleanText = text.trim();
  if (!cleanText) return { translatedText: "", sourceLang };

  // Normalize language codes
  const normalizedTarget = targetLang.replace(/-latin$/, "").replace(/_/, "-");
  const normalizedSource = sourceLang.replace(/-latin$/, "").replace(/_/, "-");

  if (normalizedTarget === normalizedSource || (normalizedSource === "en" && normalizedTarget === "en")) {
    return { translatedText: cleanText, sourceLang: "en" };
  }

  const cacheKey = `${normalizedSource}_${normalizedTarget}_${cleanText}`;
  if (translationCache.has(cacheKey)) {
    return translationCache.get(cacheKey);
  }

  try {
    const fromPair = normalizedSource === "auto" ? "autodetect" : (normalizedSource === "zh-CN" ? "zh" : normalizedSource);
    const toPair = normalizedTarget === "zh-CN" ? "zh" : normalizedTarget;

    // Strategy: MyMemory High Speed Translation API
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(cleanText)}&langpair=${fromPair}|${toPair}`;
    const response = await fetch(url, {
      method: "GET",
      headers: { "Accept": "application/json" },
    });

    if (response.ok) {
      const data = await response.json();
      if (data?.responseData?.translatedText) {
        let resultText = data.responseData.translatedText;
        
        // Decode HTML entities if any
        resultText = resultText
          .replace(/&quot;/g, '"')
          .replace(/&#39;/g, "'")
          .replace(/&amp;/g, '&')
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>');

        const payload = {
          translatedText: resultText,
          sourceLang: data.responseDetails?.detectedSourceLanguage || normalizedSource,
        };
        translationCache.set(cacheKey, payload);
        return payload;
      }
    }
  } catch (err) {
    console.warn("Translation service unavailable, keeping original text:", err);
  }

  // Graceful fallback to original text
  return { translatedText: cleanText, sourceLang: normalizedSource };
}

/**
 * Text to Speech (Voice Output / Read Aloud)
 * Fixed for Chromium GC bug & long text playback
 */
// Persistent global holder to prevent Chromium Garbage Collection during speech
if (typeof window !== "undefined") {
  window.__gkSpeechUtterances = window.__gkSpeechUtterances || [];
}

let speechKeepAliveTimer = null;

// Audio player instance for cloud TTS fallback
let activeAudio = null;
let currentAudioQueue = [];
let isAudioQueuePlaying = false;

export function stopSpeaking() {
  // Stop audio queue
  currentAudioQueue = [];
  isAudioQueuePlaying = false;
  if (activeAudio) {
    try {
      activeAudio.pause();
      activeAudio.currentTime = 0;
      activeAudio.src = "";
    } catch (e) {}
    activeAudio = null;
  }

  // Stop browser speech synthesis
  if (speechKeepAliveTimer) {
    clearInterval(speechKeepAliveTimer);
    speechKeepAliveTimer = null;
  }
  if (typeof window !== "undefined" && window.speechSynthesis) {
    try {
      window.speechSynthesis.cancel();
    } catch (e) {
      // ignore
    }
    if (window.__gkSpeechUtterances) {
      window.__gkSpeechUtterances.length = 0;
    }
  }
}

/**
 * Check if browser has a native voice installed for a given locale
 */
export function hasNativeVoiceFor(langCode) {
  if (typeof window === "undefined" || !window.speechSynthesis) return false;
  let voices = window.speechSynthesis.getVoices();
  if (!voices || voices.length === 0) voices = cachedVoices;
  if (!voices || voices.length === 0) return false;

  const clean = langCode.toLowerCase().replace("_", "-");
  const prefix = clean.split("-")[0];

  const langPatterns = {
    te: ["telugu", "తెలుగు", "te-in", "te_in"],
    hi: ["hindi", "हिन्दी", "हिंदी", "hi-in", "hi_in"],
    ta: ["tamil", "தமிழ்", "ta-in", "ta_in"],
    kn: ["kannada", "ಕನ್ನಡ", "kn-in", "kn_in"],
    mr: ["marathi", "मराठी", "mr-in", "mr_in"],
    bn: ["bengali", "বাংলা", "bn-in", "bn_in"],
    es: ["spanish", "español", "es-es", "es-mx"],
    fr: ["french", "français", "fr-fr", "fr-ca"],
    de: ["german", "deutsch", "de-de"],
    ja: ["japanese", "日本語", "ja-jp"],
    ar: ["arabic", "العربية", "ar-sa"],
    zh: ["chinese", "中文", "zh-cn"],
  };

  const keywords = langPatterns[prefix] || [prefix];

  return voices.some((v) => {
    const vLang = v.lang.toLowerCase().replace("_", "-");
    const vName = v.name.toLowerCase();
    return (
      vLang === clean ||
      vLang.startsWith(prefix) ||
      keywords.some((kw) => vLang.includes(kw) || vName.includes(kw) || v.name.includes(kw))
    );
  });
}

/**
 * Find the most suitable voice for given locale
 */
function findBestVoice(locale) {
  if (typeof window === "undefined" || !window.speechSynthesis) return null;
  
  let voices = window.speechSynthesis.getVoices();
  if (!voices || voices.length === 0) {
    voices = cachedVoices;
  }
  if (!voices || voices.length === 0) return null;

  const cleanLocale = locale.replace("_", "-").toLowerCase();
  const prefix = cleanLocale.split("-")[0];

  const langPatterns = {
    te: ["telugu", "తెలుగు", "te-in", "te_in"],
    hi: ["hindi", "हिन्दी", "हिंदी", "hi-in", "hi_in"],
    ta: ["tamil", "தமிழ்", "ta-in", "ta_in"],
    kn: ["kannada", "ಕನ್ನಡ", "kn-in", "kn_in"],
    mr: ["marathi", "मराठी", "mr-in", "mr_in"],
    bn: ["bengali", "বাংলা", "bn-in", "bn_in"],
    es: ["spanish", "español", "es-es", "es-mx"],
    fr: ["french", "français", "fr-fr", "fr-ca"],
    de: ["german", "deutsch", "de-de"],
    ja: ["japanese", "日本語", "ja-jp"],
    ar: ["arabic", "العربية", "ar-sa"],
    zh: ["chinese", "中文", "zh-cn"],
  };

  const keywords = langPatterns[prefix] || [prefix];

  // 1. Exact locale match (e.g. te-IN, hi-IN, en-IN, es-ES)
  let voice = voices.find(v => v.lang.replace("_", "-").toLowerCase() === cleanLocale);
  if (voice) return voice;

  // 2. Language prefix match (e.g. te, hi, en, ta)
  voice = voices.find(v => v.lang.toLowerCase().startsWith(prefix));
  if (voice) return voice;

  // 3. Named language match or native script keyword (e.g. "Google हिन्दी", "Microsoft Swara Online Natural Hindi")
  voice = voices.find(v => {
    const vLang = v.lang.toLowerCase();
    const vName = v.name.toLowerCase();
    return keywords.some(kw => vLang.includes(kw) || vName.includes(kw) || v.name.includes(kw));
  });
  if (voice) return voice;

  // 4. CRITICAL: For non-English languages, NEVER fall back to an English voice!
  // Returning null allows speakWebSpeech to set utterance.lang = locale directly,
  // prompting the browser's speech synthesis engine to use its natural voice for that locale!
  if (prefix !== "en") {
    return null;
  }

  // 5. English fallbacks only when the requested language IS English:
  const indianVoice = voices.find(v => {
    const lang = v.lang.toLowerCase();
    const name = v.name.toLowerCase();
    return lang.includes("en-in") || name.includes("india") || name.includes("heera") || name.includes("neerja") || name.includes("ravi");
  });
  if (indianVoice) return indianVoice;

  voice = voices.find(v => v.lang.toLowerCase().includes("en-in") || v.lang.toLowerCase().includes("en-us") || v.lang.toLowerCase().includes("en-gb"));
  return voice || voices[0] || null;
}

/**
 * Play multi-chunk Google TTS Audio stream (supports native Telugu, Hindi, Tamil, Kannada, Bengali, etc.)
 */
function playGoogleTTSStream(text, langCode, { onStart, onEnd, onError }) {
  // Split into manageable sentence chunks (<= 120 chars) for Google TTS URL length limit
  const sentences = text
    .split(/(?<=[.?!।,।\n])\s+/)
    .map(s => s.trim())
    .filter(Boolean);

  if (sentences.length === 0) {
    onEnd?.();
    return false;
  }

  const chunks = [];
  for (const s of sentences) {
    if (s.length <= 120) {
      chunks.push(s);
    } else {
      // Split large sentence by words
      const words = s.split(" ");
      let curr = "";
      for (const w of words) {
        if ((curr + " " + w).length <= 120) {
          curr = curr ? curr + " " + w : w;
        } else {
          if (curr) chunks.push(curr);
          curr = w;
        }
      }
      if (curr) chunks.push(curr);
    }
  }

  currentAudioQueue = chunks;
  isAudioQueuePlaying = true;
  let chunkIndex = 0;
  let hasStarted = false;

  const playNextChunk = () => {
    if (!isAudioQueuePlaying || chunkIndex >= currentAudioQueue.length) {
      isAudioQueuePlaying = false;
      onEnd?.();
      return;
    }

    const chunk = currentAudioQueue[chunkIndex];
    chunkIndex++;

    const ttsLang = langCode === "auto" ? "en" : langCode.split("-")[0];
    const proxyUrl = `/api/tts?tl=${encodeURIComponent(ttsLang)}&q=${encodeURIComponent(chunk)}`;
    const directUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=${encodeURIComponent(ttsLang)}&client=tw-ob&q=${encodeURIComponent(chunk)}`;

    const audio = new Audio();
    activeAudio = audio;

    audio.onplay = () => {
      if (!hasStarted) {
        hasStarted = true;
        onStart?.();
      }
    };

    audio.onended = () => {
      playNextChunk();
    };

    audio.onerror = () => {
      // Fallback to direct URL if proxy was used and failed
      if (audio.src && audio.src.includes('/api/tts')) {
        audio.src = directUrl;
        audio.play().catch(() => playNextChunk());
      } else {
        playNextChunk();
      }
    };

    audio.src = proxyUrl;
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        console.warn("Audio play rejected, falling back to Web Speech:", err);
        speakWebSpeech(chunk, ttsLang, {
          onStart: () => {
            if (!hasStarted) {
              hasStarted = true;
              onStart?.();
            }
          },
          onEnd: () => playNextChunk(),
          onError: () => playNextChunk(),
        });
      });
    }
  };

  playNextChunk();
  return true;
}

/**
 * Standard Web Speech Synthesis implementation
 */
function speakWebSpeech(speechText, langCode, { onStart, onEnd, onError }) {
  const locale = getLanguageLocale(langCode);
  const utterance = new SpeechSynthesisUtterance(speechText);
  
  const selectedVoice = findBestVoice(locale);
  if (selectedVoice) {
    utterance.voice = selectedVoice;
    // Set matching voice language tag so Chrome doesn't error out
    utterance.lang = selectedVoice.lang || locale;
  } else {
    utterance.lang = locale;
  }

  utterance.rate = 1.0;
  utterance.pitch = 1.0;

  // Prevent Garbage Collection in Chromium
  if (typeof window !== "undefined" && window.__gkSpeechUtterances) {
    window.__gkSpeechUtterances.push(utterance);
  }

  const cleanup = () => {
    if (speechKeepAliveTimer) {
      clearInterval(speechKeepAliveTimer);
      speechKeepAliveTimer = null;
    }
    if (typeof window !== "undefined" && window.__gkSpeechUtterances) {
      const idx = window.__gkSpeechUtterances.indexOf(utterance);
      if (idx !== -1) window.__gkSpeechUtterances.splice(idx, 1);
    }
  };

  utterance.onstart = () => {
    if (speechKeepAliveTimer) clearInterval(speechKeepAliveTimer);
    speechKeepAliveTimer = setInterval(() => {
      try {
        if (window.speechSynthesis && window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
          window.speechSynthesis.pause();
          window.speechSynthesis.resume();
        }
      } catch (e) {}
    }, 10000);

    onStart?.();
  };

  utterance.onend = () => {
    cleanup();
    onEnd?.();
  };

  utterance.onerror = (e) => {
    cleanup();
    if (e.error !== "canceled" && e.error !== "interrupted") {
      onError?.(e);
    } else {
      onEnd?.();
    }
  };

  try {
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
    }
  } catch (e) {}

  setTimeout(() => {
    try {
      window.speechSynthesis.speak(utterance);
    } catch (err) {
      cleanup();
      onError?.(err);
    }
  }, 40);

  return true;
}

/**
 * Universal Intelligent Multilingual Text to Speech
 * Automatically routes to Native Voices, High-Fidelity Indic Audio Stream, or Indian English synthesis.
 */
export function speakText(text, langCode = "en", { onStart, onEnd, onError } = {}) {
  stopSpeaking();

  // Strip Markdown, code snippets, bullets, raw URLs, emails, navigation markers (>>) for clean natural speech
  const speechText = text
    .replace(/```[\s\S]*?```/g, "")           // remove code blocks
    .replace(/`([^`]+)`/g, "$1")              // inline code
    .replace(/\[(.*?)\]\(.*?\)/g, "$1")       // remove markdown links, keep label
    .replace(/https?:\/\/\S+/gi, "")          // do NOT read raw URLs aloud
    .replace(/\(>>\)|>>/g, "")                // remove navigation arrow markers
    .replace(/[*_#~>|]/g, "")                 // remove formatting markers
    .replace(/^\s*[-*+•\d.]+\s+/gm, "")       // remove list bullets and numbers
    .replace(/\s+/g, " ")
    .trim();

  if (!speechText) return false;

  // Check text script vs requested language code
  const scriptLang = detectLanguage(speechText);
  const effectiveLang = (scriptLang && scriptLang !== "en")
    ? scriptLang
    : (langCode && langCode !== "auto" ? langCode : "en");
  const cleanLang = effectiveLang.split("-")[0];

  // For Indian languages (Telugu, Tamil, Kannada, Hindi, Marathi, Bengali) where standard
  // desktop browsers (like Windows Chrome) lack offline speech synthesis voice packs:
  const isIndicLang = ["te", "ta", "kn", "hi", "mr", "bn"].includes(cleanLang);

  if (isIndicLang) {
    // If the browser has an authentic native voice for this language (e.g. Edge Natural Swara for Hindi, or Google Hindi in Chrome),
    // and it's NOT an English voice:
    const nativeVoice = findBestVoice(getLanguageLocale(effectiveLang));
    if (nativeVoice && !nativeVoice.lang.toLowerCase().startsWith("en")) {
      return speakWebSpeech(speechText, effectiveLang, { onStart, onEnd, onError });
    }
    // Otherwise, stream crystal-clear native audio via our high-definition proxy / TTS stream!
    return playGoogleTTSStream(speechText, cleanLang, { onStart, onEnd, onError });
  }

  // For global languages with native browser voices (Spanish, French, German, Japanese, English):
  return speakWebSpeech(speechText, effectiveLang, { onStart, onEnd, onError });
}

/**
 * Speech Recognition (Voice Typing Controller)
 * Robust controller with auto-restart on silent dropouts and seamless language switching.
 */
export class SpeechVoiceRecognizer {
  constructor({ onStart, onResult, onError, onEnd, selectedLang = "auto" }) {
    this.onStart = onStart;
    this.onResult = onResult;
    this.onError = onError;
    this.onEnd = onEnd;
    this.selectedLang = selectedLang;
    this.recognition = null;
    this.isListening = false;
    this.manualStop = false;
    this.restartTimeout = null;
  }

  setLanguage(langCode) {
    this.selectedLang = langCode;
    if (this.isListening) {
      this.stop();
      setTimeout(() => this.start(), 150);
    }
  }

  start() {
    if (!isSpeechRecognitionSupported()) {
      this.onError?.("Speech recognition is not supported in this browser. Please use Google Chrome, Microsoft Edge, or Safari.");
      return;
    }

    if (this.restartTimeout) {
      clearTimeout(this.restartTimeout);
      this.restartTimeout = null;
    }

    // Clean up any existing recognition instance
    if (this.recognition) {
      try {
        this.recognition.onstart = null;
        this.recognition.onresult = null;
        this.recognition.onerror = null;
        this.recognition.onend = null;
        this.recognition.abort();
      } catch (e) {}
      this.recognition = null;
    }

    try {
      const SpeechRecognitionClass = window.SpeechRecognition || window.webkitSpeechRecognition;
      this.recognition = new SpeechRecognitionClass();
      this.recognition.continuous = true;
      this.recognition.interimResults = true;
      this.recognition.maxAlternatives = 1;
      this.manualStop = false;

      // Determine recognition language locale
      const bcp47 = getLanguageLocale(this.selectedLang);
      this.recognition.lang = bcp47;

      this.recognition.onstart = () => {
        this.isListening = true;
        this.onStart?.();
      };

      this.recognition.onresult = (event) => {
        let interimTranscript = "";
        let finalTranscript = "";

        for (let i = 0; i < event.results.length; ++i) {
          const res = event.results[i];
          if (res.isFinal) {
            finalTranscript += res[0].transcript + " ";
          } else {
            interimTranscript += res[0].transcript;
          }
        }

        const combined = (finalTranscript + interimTranscript).trim();

        this.onResult?.({
          finalTranscript: finalTranscript.trim(),
          interimTranscript: interimTranscript.trim(),
          transcript: combined,
          isFinal: Boolean(finalTranscript.trim()),
        });
      };

      this.recognition.onerror = (event) => {
        // "no-speech" or "aborted" can happen on pauses; keep alive if user hasn't stopped
        if (event.error === "no-speech" || event.error === "aborted") {
          return;
        }

        let errorMessage = "Microphone error. Please try again.";
        if (event.error === "not-allowed" || event.error === "permission-denied") {
          errorMessage = "Microphone permission denied. Please allow microphone access in your browser settings.";
          this.manualStop = true;
          this.isListening = false;
        } else if (event.error === "network") {
          errorMessage = "Network error connecting to speech recognition service.";
        }

        this.onError?.(errorMessage, event.error);
      };

      this.recognition.onend = () => {
        // If not stopped manually and supposed to be listening, automatically restart (browser timeout workaround)
        if (!this.manualStop && this.isListening) {
          this.restartTimeout = setTimeout(() => {
            if (!this.manualStop && this.isListening) {
              try {
                this.recognition?.start();
              } catch (e) {
                // if restarting fails, reset listening state
                this.isListening = false;
                this.onEnd?.();
              }
            }
          }, 100);
        } else {
          this.isListening = false;
          this.onEnd?.();
        }
      };

      this.recognition.start();
    } catch (err) {
      this.isListening = false;
      this.onError?.(err.message || "Failed to initialize speech recognition.");
    }
  }

  stop() {
    this.manualStop = true;
    if (this.restartTimeout) {
      clearTimeout(this.restartTimeout);
      this.restartTimeout = null;
    }
    if (this.recognition) {
      try {
        this.recognition.stop();
      } catch (e) {}
    }
    this.isListening = false;
    this.onEnd?.();
  }

  abort() {
    this.manualStop = true;
    if (this.restartTimeout) {
      clearTimeout(this.restartTimeout);
      this.restartTimeout = null;
    }
    if (this.recognition) {
      try {
        this.recognition.abort();
      } catch (e) {}
    }
    this.isListening = false;
    this.onEnd?.();
  }
}
