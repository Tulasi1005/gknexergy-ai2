import React, { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  Send,
  RotateCcw,
  ExternalLink,
  ChevronRight,
  Maximize2,
  Minimize2,
  ArrowDown,
  Sparkles,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Globe,
} from "lucide-react";
import { askGKChatbot } from "../../utils/aiKnowledgeEngine";
import {
  SpeechVoiceRecognizer,
  isSpeechRecognitionSupported,
  isSpeechSynthesisSupported,
  speakText,
  stopSpeaking,
  detectLanguage,
  translateText,
} from "../../utils/multilingualVoiceEngine";
import { getCurrentLanguage, SUPPORTED_LANGUAGES } from "../../utils/translator";

// Conversation starter pills (Multilingual)
const STARTER_SUGGESTIONS = [
  "What does GK Nexergy do?",
  "Which AI solutions do you provide?",
  "Nexergy Academy courses",
  "Talk about a project",
  "How can I contact the team?",
];

const STARTER_SUGGESTIONS_TE = [
  "GK Nexergy ఏమి చేస్తుంది?",
  "మీ AI సొల్యూషన్స్ ఏమిటి?",
  "Nexergy Academy కోర్సులు",
  "ప్రాజెక్ట్ ప్రారంభించండి",
  "టీమ్‌ను ఎలా సంప్రదించాలి?",
];

const STARTER_SUGGESTIONS_HI = [
  "GK Nexergy क्या करता है?",
  "आप कौन से AI समाधान प्रदान करते हैं?",
  "नेक्सर्जी एकेडमी के कोर्स",
  "प्रोजेक्ट के बारे में बात करें",
  "टीम से कैसे संपर्क करें?",
];

const getStarterSuggestionsForLang = (lang) => {
  if (lang === "te") return STARTER_SUGGESTIONS_TE;
  if (lang === "hi") return STARTER_SUGGESTIONS_HI;
  return STARTER_SUGGESTIONS;
};

// GK Nexergy Official Logo Avatar Mark
const AIAvatarMark = ({ size = 36, isResponding = false }) => (
  <div
    style={{
      width: `${size}px`,
      height: `${size}px`,
      borderRadius: "50%",
      backgroundColor: "#ffffff",
      border: "1px solid #e2e8f0",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
      flexShrink: 0,
      boxShadow: isResponding
        ? "0 0 10px rgba(56, 189, 248, 0.6), 0 0 3px rgba(37, 99, 235, 0.8)"
        : "0 1px 4px rgba(0, 0, 0, 0.05)",
      transition: "box-shadow 0.3s ease",
    }}
  >
    <img
      src="/images/gk-avatar-badge.png"
      alt="GK Nexergy Logo"
      style={{ width: "100%", height: "100%", objectFit: "contain", padding: "2px" }}
      className={isResponding ? "animate-pulse" : ""}
    />
  </div>
);

// Format markdown (bolding in sky blue #0284c7 in light mode)
const formatMarkdown = (text, isDark, isUser) => {
  if (!text) return "";
  let formatted = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Bold **text** -> vibrant sky blue highlight in assistant messages
  formatted = formatted.replace(
    /\*\*(.*?)\*\*/g,
    `<strong style="font-weight: 600; color: ${isUser ? "#ffffff" : isDark ? "#60a5fa" : "#0284c7"};">$1</strong>`
  );

  // Italic *text*
  formatted = formatted.replace(
    /\*(.*?)\*/g,
    `<em style="font-style: italic; opacity: 0.9;">$1</em>`
  );

  return formatted;
};

export const AIChatbot = ({ theme = "light" }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [activeTopic, setActiveTopic] = useState("general");
  const [hasNewMessageBelow, setHasNewMessageBelow] = useState(false);
  const [chipsScrollPercent, setChipsScrollPercent] = useState(0);

  // Voice Assistant States (Voice message input & readout)
  const [isListening, setIsListening] = useState(false);
  const [voiceOutputEnabled, setVoiceOutputEnabled] = useState(true);
  const [currentlySpeakingId, setCurrentlySpeakingId] = useState(null);
  const recognizerRef = useRef(null);
  const speechTranscriptRef = useRef("");



  const chatFeedRef = useRef(null);
  const inputRef = useRef(null);
  const chipsContainerRef = useRef(null);
  const sliderTrackRef = useRef(null);
  const userScrolledUpRef = useRef(false);
  const isDraggingChipsRef = useRef(false);
  const chipsDragStartXRef = useRef(0);
  const chipsDragScrollLeftRef = useRef(0);
  const chipsHasDraggedRef = useRef(false);
  const chatbotWindowRef = useRef(null);
  const chatbotToggleRef = useRef(null);
  const isDark = theme === "dark";

  // Warm, friendly welcome messages (Multilingual - No emojis)
  const getWelcomeText = (lang) => {
    if (lang === "te") {
      return `నమస్కారం! GK Nexergy కి స్వాగతం!
నేను మీ **స్నేహపూర్వక AI గైడ్**ని.

మా ఎంటర్‌ప్రైజ్ సాఫ్ట్‌వేర్ సొల్యూషన్స్, కస్టమ్ AI ఆటోమేషన్ లేదా Nexergy Academy ట్రైనింగ్ ప్రోగ్రామ్‌ల గురించి తెలుసుకోవడానికి నేను మీకు సహాయం చేయగలను.

మీరు ఈరోజు దేని గురించి తెలుసుకోవాలనుకుంటున్నారు?`;
    }
    if (lang === "hi") {
      return `नमस्ते! GK Nexergy में आपका स्वागत है!
मैं आपका **AI सहायक** हूँ।

हमारे एंटरप्राइज सॉफ्टवेयर, AI ऑटोमेशन, या Nexergy Academy ट्रेनिंग के बारे में जानने के लिए मैं आपकी पूरी मदद करूँगा।

आज आप क्या जानना चाहते हैं?`;
    }
    return `Hello! Welcome to GK Nexergy!
I'm your **friendly AI guide**.

Whether you're curious about our enterprise software, custom AI automation, or high-impact Nexergy Academy training — I'm here to help you every step of the way.

What would you like to explore today?`;
  };

  const initialWelcomeText = getWelcomeText("en");

  const [currentLang, setCurrentLang] = useState(() => getCurrentLanguage() || "en");

  const [messages, setMessages] = useState(() => {
    const saved = sessionStorage.getItem("gk_chat_classic_v2");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0 && (parsed[0].text?.includes("GK Nexergy") || parsed[0].text?.includes("స్వాగతం"))) {
          return parsed;
        }
      } catch (e) {
        // ignore
      }
    }
    const initialLang = getCurrentLanguage() || "en";
    return [
      {
        id: "welcome-1",
        sender: "bot",
        text: getWelcomeText(initialLang),
        time: "Just now",
        routes: [],
        suggestions: getStarterSuggestionsForLang(initialLang),
      },
    ];
  });

  const [currentSuggestions, setCurrentSuggestions] = useState(() => {
    const saved = sessionStorage.getItem("gk_chat_classic_v2");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const lastBotMsg = [...parsed].reverse().find((m) => m.sender === "bot" && m.suggestions && m.suggestions.length > 0);
          if (lastBotMsg) return lastBotMsg.suggestions;
        }
      } catch (e) {}
    }
    const initialLang = getCurrentLanguage() || "en";
    return getStarterSuggestionsForLang(initialLang);
  });

  // Synchronize language reactively whenever global language changes or storage updates
  useEffect(() => {
    const handleLangChange = (e) => {
      const code = e?.detail || getCurrentLanguage() || "en";
      setCurrentLang(code);
      if (recognizerRef.current) {
        recognizerRef.current.setLanguage(code);
      }
      stopSpeaking();
      setCurrentlySpeakingId(null);
      setMessages((prev) => {
        if (prev.length === 1 && prev[0].id.startsWith("welcome")) {
          const starters = getStarterSuggestionsForLang(code);
          setCurrentSuggestions(starters);
          return [
            {
              id: prev[0].id,
              sender: "bot",
              text: getWelcomeText(code),
              time: "Just now",
              routes: [],
              suggestions: starters,
            },
          ];
        }
        return prev;
      });
    };

    window.addEventListener("gk-language-changed", handleLangChange);
    window.addEventListener("storage", handleLangChange);
    return () => {
      window.removeEventListener("gk-language-changed", handleLangChange);
      window.removeEventListener("storage", handleLangChange);
    };
  }, []);

  // Reset chips scroll to beginning when suggestions update
  useEffect(() => {
    if (chipsContainerRef.current) {
      chipsContainerRef.current.scrollTo({ left: 0, behavior: "smooth" });
      setChipsScrollPercent(0);
    }
  }, [currentSuggestions]);

  // Update language whenever chatbot opens
  useEffect(() => {
    if (isOpen) {
      const active = getCurrentLanguage() || "en";
      setCurrentLang(active);
      if (recognizerRef.current) {
        recognizerRef.current.setLanguage(active);
      }
    }
  }, [isOpen]);

  // Save conversation history to sessionStorage
  useEffect(() => {
    try {
      sessionStorage.setItem("gk_chat_classic_v2", JSON.stringify(messages));
    } catch (e) {
      // ignore
    }
  }, [messages]);

  // Smoothly scroll feed to bottom
  const scrollToBottom = useCallback((behavior = "smooth") => {
    const feed = chatFeedRef.current;
    if (feed) {
      feed.scrollTo({
        top: feed.scrollHeight,
        behavior,
      });
      userScrolledUpRef.current = false;
      setHasNewMessageBelow(false);
    }
  }, []);

  // Track scroll position in feed
  const handleFeedScroll = useCallback(() => {
    const feed = chatFeedRef.current;
    if (!feed) return;
    const distanceToBottom = feed.scrollHeight - feed.scrollTop - feed.clientHeight;
    if (distanceToBottom > 60) {
      userScrolledUpRef.current = true;
    } else {
      userScrolledUpRef.current = false;
      setHasNewMessageBelow(false);
    }
  }, []);

  // Track chips scroll
  const handleChipsScroll = () => {
    const el = chipsContainerRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll > 0) {
      const pct = Math.max(0, Math.min(100, (el.scrollLeft / maxScroll) * 100));
      setChipsScrollPercent(pct);
    } else {
      setChipsScrollPercent(0);
    }
  };

  const scrollChips = (dir) => {
    const el = chipsContainerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 180, behavior: "smooth" });
  };

  // Slider track interactive scrubbing / clicking
  const handleTrackPointerDown = (e) => {
    const track = sliderTrackRef.current;
    const container = chipsContainerRef.current;
    if (!track || !container) return;

    const updateScroll = (clientX) => {
      const rect = track.getBoundingClientRect();
      const clickX = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const maxScroll = container.scrollWidth - container.clientWidth;
      if (maxScroll <= 0) return;
      const ratio = clickX / rect.width;
      container.scrollLeft = ratio * maxScroll;
    };

    updateScroll(e.clientX ?? e.touches?.[0]?.clientX ?? 0);

    const onPointerMove = (ev) => {
      const clientX = ev.clientX ?? ev.touches?.[0]?.clientX;
      if (clientX !== undefined) {
        updateScroll(clientX);
      }
    };

    const onPointerUp = () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("touchmove", onPointerMove);
      window.removeEventListener("touchend", onPointerUp);
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("touchmove", onPointerMove, { passive: true });
    window.addEventListener("touchend", onPointerUp);
  };

  // Drag-to-scroll on the suggestion chips container directly
  const handleChipsMouseDown = (e) => {
    if (!chipsContainerRef.current) return;
    isDraggingChipsRef.current = true;
    chipsHasDraggedRef.current = false;
    chipsDragStartXRef.current = e.pageX - chipsContainerRef.current.offsetLeft;
    chipsDragScrollLeftRef.current = chipsContainerRef.current.scrollLeft;
  };

  const handleChipsMouseMove = (e) => {
    if (!isDraggingChipsRef.current || !chipsContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - chipsContainerRef.current.offsetLeft;
    const walk = (x - chipsDragStartXRef.current) * 1.5;
    chipsContainerRef.current.scrollLeft = chipsDragScrollLeftRef.current - walk;
  };

  const handleChipsMouseUp = () => {
    isDraggingChipsRef.current = false;
  };

  // Speak a specific message aloud using multilingual voice engine
  const speakMessage = useCallback(async (msg) => {
    if (!msg || !msg.text) return;
    if (currentlySpeakingId === msg.id) {
      stopSpeaking();
      setCurrentlySpeakingId(null);
      return;
    }

    stopSpeaking();

    // 1. Read visible text from the message element in the DOM (captures live Google Translate on screen)
    const domEl = document.getElementById(`ai-msg-body-${msg.id}`);
    const visibleText = domEl?.innerText?.trim() || "";
    let textToSpeak = visibleText || msg.text || "";

    const activeLanguage = getCurrentLanguage() || currentLang || "en";

    // 2. Detect language: if text has native script (Devanagari/Hindi, Telugu, Tamil, etc.), honor it!
    const msgScriptLang = detectLanguage(textToSpeak);
    let targetLang = (msgScriptLang && msgScriptLang !== "en") ? msgScriptLang : activeLanguage;

    // 3. If text is still English but user selected a non-English language, translate it
    if (targetLang !== "en" && msgScriptLang === "en") {
      try {
        const { translatedText } = await translateText(textToSpeak, targetLang, "en");
        if (translatedText && translatedText.trim()) {
          textToSpeak = translatedText;
        }
      } catch (e) {
        // fallback to original text
      }
    }

    speakText(textToSpeak, targetLang, {
      onStart: () => {
        setCurrentlySpeakingId(msg.id);
      },
      onEnd: () => {
        setCurrentlySpeakingId((curr) => (curr === msg.id ? null : curr));
      },
      onError: () => {
        setCurrentlySpeakingId(null);
      },
    });
  }, [currentlySpeakingId, currentLang]);

  const toggleVoiceOutput = useCallback(() => {
    if (currentlySpeakingId) {
      stopSpeaking();
      setCurrentlySpeakingId(null);
    }
    setVoiceOutputEnabled((prev) => !prev);
  }, [currentlySpeakingId]);

  // Voice Assistant Speech Recognition (Speech-to-Text for sending voice message)
  const toggleVoiceInput = useCallback(() => {
    if (isListening) {
      if (recognizerRef.current) {
        recognizerRef.current.stop();
      }
      setIsListening(false);
      setTimeout(() => inputRef.current?.focus(), 80);
      return;
    }

    if (currentlySpeakingId) {
      stopSpeaking();
      setCurrentlySpeakingId(null);
    }

    if (!isSpeechRecognitionSupported()) {
      alert("Voice input is not supported in this browser. Please use Google Chrome, Microsoft Edge, or Safari.");
      return;
    }

    const activeLanguage = getCurrentLanguage() || currentLang || "auto";

    if (!recognizerRef.current) {
      recognizerRef.current = new SpeechVoiceRecognizer({
        onStart: () => {
          setIsListening(true);
        },
        onResult: ({ transcript }) => {
          if (transcript) {
            speechTranscriptRef.current = transcript;
            setChatInput(transcript);
          }
        },
        onEnd: () => {
          setIsListening(false);
        },
        onError: (err) => {
          console.warn("Speech recognition error:", err);
          setIsListening(false);
        },
        selectedLang: activeLanguage,
      });
    } else {
      recognizerRef.current.setLanguage(activeLanguage);
    }

    speechTranscriptRef.current = "";
    recognizerRef.current.start();
  }, [isListening, currentlySpeakingId, currentLang]);

  // Clean up speech recognition & speech synthesis on modal close or unmount
  useEffect(() => {
    if (!isOpen) {
      if (isListening && recognizerRef.current) {
        recognizerRef.current.stop();
        setIsListening(false);
      }
      stopSpeaking();
      setCurrentlySpeakingId(null);
    }
  }, [isOpen, isListening]);

  useEffect(() => {
    return () => {
      if (recognizerRef.current) {
        recognizerRef.current.stop();
      }
      stopSpeaking();
    };
  }, []);



  // Keep feed scrolled to latest message
  useEffect(() => {
    if (!isOpen) return;
    const timer = setTimeout(() => {
      scrollToBottom("smooth");
    }, 50);
    return () => clearTimeout(timer);
  }, [messages, isTyping, isOpen, scrollToBottom]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
    }
  }, [isOpen]);

  // Handle Send logic
  const handleSend = useCallback(async (customText = null) => {
    const query = (customText !== null ? customText : chatInput).trim();
    if (!query) return;

    if (currentlySpeakingId) {
      stopSpeaking();
      setCurrentlySpeakingId(null);
    }

    if (isListening && recognizerRef.current) {
      recognizerRef.current.stop();
      setIsListening(false);
    }

    const userMsg = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: query,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setChatInput("");
    setIsTyping(true);

    setTimeout(() => {
      scrollToBottom("smooth");
    }, 20);

    try {
      const activeLanguage = currentLang || getCurrentLanguage() || "en";
      const response = await askGKChatbot(query, "", {
        activeTopic,
        history: messages,
        language: activeLanguage,
      });

      setIsTyping(false);
      if (!response) return;

      if (response.topic) {
        setActiveTopic(response.topic);
      }

      const activeLang = response.lang || activeLanguage;
      const responseSuggestions = (response.suggestions && response.suggestions.length > 0)
        ? response.suggestions
        : getStarterSuggestionsForLang(activeLang);

      const botMsg = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: response.text,
        routes: response.routes || [],
        suggestions: responseSuggestions,
        source: response.source,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, botMsg]);
      setCurrentSuggestions(responseSuggestions);

      // Read response aloud if voice output is enabled
      if (voiceOutputEnabled) {
        const speakLang = response.lang || activeLanguage;
        speakText(response.text, speakLang, {
          onStart: () => setCurrentlySpeakingId(botMsg.id),
          onEnd: () => setCurrentlySpeakingId((c) => (c === botMsg.id ? null : c)),
          onError: () => setCurrentlySpeakingId(null),
        });
      }

      setTimeout(() => {
        scrollToBottom("smooth");
      }, 50);
    } catch (err) {
      setIsTyping(false);
      const activeLanguage = currentLang || getCurrentLanguage() || "en";
      let fallbackText = "I'm here to help! You can ask anything about GK Nexergy software solutions, academy courses, delivered projects, or connect directly with our engineering team.";
      if (activeLanguage !== "en") {
        try {
          const { translatedText } = await translateText(fallbackText, activeLanguage, "en");
          if (translatedText) fallbackText = translatedText;
        } catch (e) {}
      }
      const fallbackSuggestions = getStarterSuggestionsForLang(activeLanguage);
      const fallbackMsg = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: fallbackText,
        routes: [{ label: "Contact Us", to: "/contact" }],
        suggestions: fallbackSuggestions,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
      setCurrentSuggestions(fallbackSuggestions);

      if (voiceOutputEnabled) {
        speakText(fallbackMsg.text, activeLanguage, {
          onStart: () => setCurrentlySpeakingId(fallbackMsg.id),
          onEnd: () => setCurrentlySpeakingId((c) => (c === fallbackMsg.id ? null : c)),
          onError: () => setCurrentlySpeakingId(null),
        });
      }
    }
  }, [chatInput, activeTopic, messages, scrollToBottom, voiceOutputEnabled, currentlySpeakingId, isListening, currentLang]);

  // Key down event
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const hasManuallyClosedRef = useRef(false);

  // Auto-open chatbot directly 10 seconds after opening the website
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasManuallyClosedRef.current) {
        setIsOpen(true);
        setTimeout(() => {
          inputRef.current?.focus();
        }, 200);
      }
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  // Global event listener for opening chatbot from anywhere
  useEffect(() => {
    const handleGlobalOpen = () => {
      setIsOpen(true);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 200);
    };
    window.addEventListener("open-gk-chatbot", handleGlobalOpen);
    return () => window.removeEventListener("open-gk-chatbot", handleGlobalOpen);
  }, []);

  // Close chatbot when clicking outside the chat window or pressing Escape
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event) => {
      // If click was inside the chatbot window or on the floating toggle button, do not close
      if (
        chatbotWindowRef.current &&
        chatbotWindowRef.current.contains(event.target)
      ) {
        return;
      }
      if (
        chatbotToggleRef.current &&
        chatbotToggleRef.current.contains(event.target)
      ) {
        return;
      }

      setIsOpen(false);
      hasManuallyClosedRef.current = true;
      stopSpeaking();
    };

    const handleKeyDownEscape = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        hasManuallyClosedRef.current = true;
        stopSpeaking();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside, { passive: true });
    document.addEventListener("keydown", handleKeyDownEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDownEscape);
    };
  }, [isOpen, stopSpeaking]);

  const handleClearHistory = () => {
    stopSpeaking();
    setCurrentlySpeakingId(null);
    sessionStorage.removeItem("gk_chat_classic_v2");
    setActiveTopic("general");
    const starters = getStarterSuggestionsForLang(currentLang);
    setCurrentSuggestions(starters);
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: "bot",
        text: getWelcomeText(currentLang),
        time: "Just now",
        routes: [],
        suggestions: starters,
      },
    ]);
  };

  const fontStack = "'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

  const chatbotJSX = (
    <div style={{ fontFamily: fontStack }}>
      {/* ========================================================= */}
      {/* 1. FLOATING CHAT TRIGGER BUTTON                            */}
      {/* ========================================================= */}
      <motion.div
        ref={chatbotToggleRef}
        initial={{ scale: 0.9, opacity: 0, y: 10 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="select-none"
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          zIndex: 99999999,
          fontFamily: fontStack,
        }}
      >
        <button
          data-testid="floating-chatbot-toggle"
          onClick={() => {
            setIsOpen((prev) => {
              if (prev) {
                hasManuallyClosedRef.current = true;
              }
              return !prev;
            });
          }}
          aria-label={isOpen ? "Close Ask GK" : "Ask GK"}
          className="group relative flex items-center transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95 select-none"
          style={{
            background: isOpen
              ? isDark
                ? "#0f172a"
                : "#ffffff"
              : isDark
                ? "linear-gradient(135deg, #1d4ed8 0%, #0284c7 100%)"
                : "linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)",
            color: isOpen ? (isDark ? "#f8fafc" : "#0284c7") : "#ffffff",
            border: isOpen
              ? isDark
                ? "1px solid rgba(255, 255, 255, 0.15)"
                : "1px solid rgba(2, 132, 199, 0.2)"
              : "none",
            boxShadow: isOpen
              ? isDark
                ? "0 10px 30px rgba(0, 0, 0, 0.7)"
                : "0 10px 30px rgba(2, 132, 199, 0.15)"
              : "0 12px 28px rgba(14, 165, 233, 0.45), 0 4px 10px rgba(14, 165, 233, 0.2)",
            borderRadius: "9999px",
            padding: isOpen ? "6px 14px" : "4px 13px 4px 5px",
            fontFamily: fontStack,
            height: "38px",
          }}
        >
          {isOpen ? (
            <div className="flex items-center gap-2 px-1">
              <X className={`h-4 w-4 ${isDark ? "text-slate-100" : "text-sky-700"}`} />
              <span style={{ fontSize: "13px", fontWeight: 700 }}>Close</span>
            </div>
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div
                style={{
                  position: "relative",
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  backgroundColor: "#f0f9ff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  overflow: "visible",
                }}
              >
                <img
                  src="/images/gk-avatar-badge.png"
                  alt="GK Nexergy Logo"
                  style={{
                    width: "82%",
                    height: "82%",
                    objectFit: "contain",
                    borderRadius: "50%",
                  }}
                  className="group-hover:scale-105 transition-transform duration-200"
                />
                <span
                  style={{
                    position: "absolute",
                    top: "-1px",
                    right: "-1px",
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    backgroundColor: "#10b981",
                    border: "2px solid #0ea5e9",
                  }}
                />
              </div>
              <span
                style={{
                  color: "#ffffff",
                  fontWeight: 700,
                  fontSize: "14px",
                  letterSpacing: "-0.01em",
                  whiteSpace: "nowrap",
                }}
              >
                Ask GK
              </span>
            </div>
          )}
        </button>
      </motion.div>

      {/* ========================================================= */}
      {/* 2. FLOATING CHAT PANEL (Exact Classic Reference Style)     */}
      {/* ========================================================= */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={chatbotWindowRef}
            initial={{ opacity: 0, y: 14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            data-testid="ai-chatbot-window"
            data-lenis-prevent="true"
            role="dialog"
            aria-label="Ask GK"
            className="flex flex-col overflow-hidden shadow-2xl select-none"
            style={{
              position: "fixed",
              bottom: "74px",
              right: "16px",
              zIndex: 99999998,
              width: isExpanded ? "min(640px, calc(100vw - 24px))" : "min(380px, calc(100vw - 24px))",
              height: isExpanded ? "min(660px, calc(100vh - 90px))" : "min(560px, calc(100vh - 90px))",
              borderRadius: "16px",
              backgroundColor: isDark ? "#090e18" : "#f0f4f9",
              border: isDark ? "1px solid rgba(255, 255, 255, 0.12)" : "1px solid #dbe4f0",
              boxShadow: isDark
                ? "0 25px 60px -10px rgba(0, 0, 0, 0.85), 0 0 1px 1px rgba(255, 255, 255, 0.08)"
                : "0 20px 50px -10px rgba(15, 23, 42, 0.16), 0 0 1px 1px rgba(0, 0, 0, 0.04)",
              color: isDark ? "#f8fafc" : "#0f172a",
              fontFamily: fontStack,
            }}
          >
            {/* --- HEADER --- */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "8px",
                padding: "10px 12px",
                backgroundColor: isDark ? "#0c1322" : "#ffffff",
                borderBottom: isDark ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid #e5eaf2",
                flexShrink: 0,
                minWidth: 0,
              }}
            >
              {/* Left Title & Status */}
              <div style={{ display: "flex", alignItems: "center", gap: "8px", minWidth: 0, flex: "1 1 auto", overflow: "hidden" }}>
                <AIAvatarMark size={32} isResponding={isTyping} />
                <div style={{ display: "flex", flexDirection: "column", minWidth: 0, overflow: "hidden" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "5px", minWidth: 0 }}>
                    <span
                      style={{
                        fontSize: "13.5px",
                        fontWeight: 700,
                        color: isDark ? "#ffffff" : "#0f172a",
                        letterSpacing: "-0.01em",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      Ask GK
                    </span>
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "3px",
                        color: "#10b981",
                        fontSize: "11px",
                        fontWeight: 600,
                        flexShrink: 0,
                        whiteSpace: "nowrap",
                      }}
                    >
                      <span style={{ width: "5px", height: "5px", borderRadius: "50%", backgroundColor: "#10b981" }} />
                      Online
                    </span>
                    {currentLang !== "en" && (
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "3px",
                          fontSize: "10.5px",
                          fontWeight: 600,
                          padding: "1px 7px",
                          borderRadius: "9999px",
                          backgroundColor: isDark ? "rgba(56, 189, 248, 0.15)" : "#e0f2fe",
                          color: isDark ? "#38bdf8" : "#0284c7",
                          border: isDark ? "1px solid rgba(56, 189, 248, 0.3)" : "1px solid #bae6fd",
                          flexShrink: 0,
                        }}
                        title={`Active Voice & Chat Language: ${SUPPORTED_LANGUAGES.find((l) => l.code === currentLang)?.label || currentLang}`}
                      >
                        <Globe style={{ width: "12px", height: "12px", opacity: 0.85 }} />
                        <span>{SUPPORTED_LANGUAGES.find((l) => l.code === currentLang)?.native || currentLang}</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Header Controls */}
              <div style={{ display: "flex", alignItems: "center", gap: "6px", flexShrink: 0 }}>

                {/* Voice Output Toggle */}
                <button
                  data-testid="ai-voice-toggle-btn"
                  onClick={toggleVoiceOutput}
                  title={voiceOutputEnabled ? "Voice response enabled (click to mute)" : "Voice response muted (click to unmute)"}
                  aria-label={voiceOutputEnabled ? "Mute voice assistant" : "Unmute voice assistant"}
                  style={{
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    color: voiceOutputEnabled
                      ? (currentlySpeakingId ? "#38bdf8" : isDark ? "#60a5fa" : "#0284c7")
                      : (isDark ? "#64748b" : "#94a3b8"),
                    padding: "4px",
                    display: "flex",
                    alignItems: "center",
                    borderRadius: "6px",
                    transition: "color 0.15s ease",
                  }}
                >
                  {voiceOutputEnabled ? (
                    <Volume2 style={{ width: "16px", height: "16px", strokeWidth: 1.8 }} className={currentlySpeakingId ? "animate-pulse" : ""} />
                  ) : (
                    <VolumeX style={{ width: "16px", height: "16px", strokeWidth: 1.8 }} />
                  )}
                </button>

                <button
                  data-testid="ai-clear-btn"
                  onClick={handleClearHistory}
                  title="Refresh conversation"
                  aria-label="Refresh conversation"
                  style={{ background: "transparent", border: "none", cursor: "pointer", color: "inherit", padding: "4px", display: "flex", alignItems: "center" }}
                >
                  <RotateCcw style={{ width: "15px", height: "15px", strokeWidth: 1.75 }} />
                </button>

                <button
                  onClick={() => setIsExpanded((prev) => !prev)}
                  title={isExpanded ? "Collapse width" : "Expand width"}
                  aria-label={isExpanded ? "Collapse width" : "Expand width"}
                  style={{ background: "transparent", border: "none", cursor: "pointer", color: "inherit", padding: "4px", display: "flex", alignItems: "center" }}
                  className="hidden sm:flex"
                >
                  {isExpanded ? <Minimize2 style={{ width: "15px", height: "15px", strokeWidth: 1.75 }} /> : <Maximize2 style={{ width: "15px", height: "15px", strokeWidth: 1.75 }} />}
                </button>

                <button
                  data-testid="ai-close-btn"
                  onClick={() => {
                    hasManuallyClosedRef.current = true;
                    setIsOpen(false);
                  }}
                  title="Close assistant"
                  aria-label="Close assistant"
                  style={{ background: "transparent", border: "none", cursor: "pointer", color: "inherit", padding: "4px", display: "flex", alignItems: "center" }}
                >
                  <X style={{ width: "15px", height: "15px", strokeWidth: 1.75 }} />
                </button>
              </div>
            </div>

            {/* --- CONVERSATION FEED --- */}
            <div style={{ position: "relative", flex: 1, display: "flex", flexDirection: "column", minHeight: 0, overflow: "hidden" }}>
              <div
                ref={chatFeedRef}
                className="gk-chat-feed-scroll"
                onScroll={handleFeedScroll}
                onWheel={(e) => e.stopPropagation()}
                data-lenis-prevent="true"
                style={{
                  flex: 1,
                  overflowY: "auto",
                  padding: "16px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "14px",
                  maxHeight: "100%",
                  overscrollBehavior: "contain",
                  touchAction: "pan-y",
                  scrollBehavior: "smooth",
                }}
              >
                {messages.map((msg) => {
                  const isUser = msg.sender === "user";

                  return (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.18 }}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: isUser ? "flex-end" : "flex-start",
                        width: "100%",
                      }}
                    >
                      {/* Message Bubble Card */}
                      <div
                        style={{
                          maxWidth: "92%",
                          backgroundColor: isUser ? undefined : isDark ? "#111a2e" : "#ffffff",
                          background: isUser
                            ? isDark
                              ? "linear-gradient(135deg, #1d4ed8 0%, #0284c7 100%)"
                              : "linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)"
                            : undefined,
                          color: isUser ? "#ffffff" : isDark ? "#e2e8f0" : "#334155",
                          borderRadius: isUser ? "16px 16px 4px 16px" : "16px",
                          border: isUser ? "none" : isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid #e2e8f0",
                          padding: isUser ? "10px 14px" : "16px 18px",
                          boxShadow: isUser
                            ? "0 2px 8px rgba(14, 165, 233, 0.28)"
                            : "0 2px 8px rgba(0, 0, 0, 0.03)",
                          fontSize: isUser ? "13px" : "13.5px",
                          lineHeight: 1.6,
                          letterSpacing: "-0.01em",
                        }}
                      >
                        {/* Text Content */}
                        <div
                          id={`ai-msg-body-${msg.id}`}
                          data-testid={`ai-msg-body-${msg.id}`}
                          style={{ display: "flex", flexDirection: "column", gap: "10px", whiteSpace: "pre-line" }}
                        >
                          {msg.text.split("\n\n").map((paragraph, pIdx) => {
                            if (paragraph.includes("- ") || paragraph.includes("• ") || paragraph.includes("1. ")) {
                              const lines = paragraph.split("\n");
                              return (
                                <div key={pIdx} style={{ display: "flex", flexDirection: "column", gap: "4px", margin: "4px 0" }}>
                                  {lines.map((line, lIdx) => {
                                    const isBullet = line.trim().startsWith("- ") || line.trim().startsWith("• ");
                                    const isNumbered = /^\d+\.\s/.test(line.trim());
                                    const cleanText = line.replace(/^[-•]\s*/, "").replace(/^\d+\.\s*/, "");

                                    return (
                                      <div key={lIdx} style={{ display: "flex", alignItems: "flex-start", gap: "6px" }}>
                                        {isBullet && (
                                          <span style={{ fontWeight: 700, fontSize: "13px", color: isUser ? "#ffffff" : isDark ? "#38bdf8" : "#0284c7", flexShrink: 0 }}>•</span>
                                        )}
                                        {isNumbered && (
                                          <span style={{ fontWeight: 700, fontSize: "11px", color: isUser ? "#ffffff" : isDark ? "#38bdf8" : "#0284c7", flexShrink: 0 }}>
                                            {line.match(/^\d+\./)?.[0]}
                                          </span>
                                        )}
                                        <span dangerouslySetInnerHTML={{ __html: formatMarkdown(cleanText, isDark, isUser) }} />
                                      </div>
                                    );
                                  })}
                                </div>
                              );
                            }

                            return (
                              <p
                                key={pIdx}
                                style={{ margin: 0 }}
                                dangerouslySetInnerHTML={{ __html: formatMarkdown(paragraph, isDark, isUser) }}
                              />
                            );
                          })}
                        </div>

                        {/* Navigation Route Shortcuts */}
                        {msg.routes && msg.routes.length > 0 && (
                          <div style={{ marginTop: "12px", paddingTop: "8px", display: "flex", flexWrap: "wrap", gap: "6px" }}>
                            {msg.routes.slice(0, 3).map((route, rIdx) => (
                              <button
                                key={rIdx}
                                onClick={() => {
                                  if (route.external) {
                                    window.open(route.to, "_blank", "noopener,noreferrer");
                                  } else {
                                    setIsOpen(false);
                                    navigate(route.to);
                                  }
                                }}
                                style={{
                                  display: "inline-flex",
                                  alignItems: "center",
                                  gap: "4px",
                                  padding: "5px 10px",
                                  borderRadius: "8px",
                                  fontSize: "11.5px",
                                  fontWeight: 600,
                                  cursor: "pointer",
                                  border: isDark ? "1px solid rgba(59, 130, 246, 0.4)" : "1px solid #bae6fd",
                                  backgroundColor: isDark ? "rgba(30, 58, 138, 0.6)" : "#f0f9ff",
                                  color: isDark ? "#93c5fd" : "#0284c7",
                                  transition: "all 0.15s ease",
                                }}
                              >
                                <span>{route.label}</span>
                                {route.external ? (
                                  <ExternalLink style={{ width: "13px", height: "13px", opacity: 0.8 }} />
                                ) : (
                                  <ChevronRight style={{ width: "13px", height: "13px", opacity: 0.8 }} />
                                )}
                              </button>
                            ))}
                          </div>
                        )}

                        {/* Dynamic Contextual Suggestion Pills */}
                        {msg.suggestions && msg.suggestions.length > 0 && (
                          <div
                            style={{
                              marginTop: "10px",
                              paddingTop: "8px",
                              borderTop: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.06)",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "5px",
                                marginBottom: "6px",
                                fontSize: "11px",
                                fontWeight: 600,
                                color: isDark ? "#94a3b8" : "#64748b",
                              }}
                            >
                              <Sparkles style={{ width: "12px", height: "12px", color: isDark ? "#38bdf8" : "#0284c7" }} />
                              <span>
                                {currentLang === "te"
                                  ? "సూచించబడిన ప్రశ్నలు:"
                                  : currentLang === "hi"
                                  ? "सुझाए गए प्रश्न:"
                                  : "Suggested questions:"}
                              </span>
                            </div>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                              {msg.suggestions.map((sug, sIdx) => (
                                <button
                                  key={sIdx}
                                  onClick={() => handleSend(sug)}
                                  style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "4px",
                                    padding: "5px 10px",
                                    borderRadius: "8px",
                                    fontSize: "11.5px",
                                    fontWeight: 500,
                                    cursor: "pointer",
                                    border: isDark ? "1px solid #2a3d5e" : "1px solid #bae6fd",
                                    backgroundColor: isDark ? "#162238" : "#f0f9ff",
                                    color: isDark ? "#93c5fd" : "#0284c7",
                                    transition: "all 0.15s ease",
                                    textAlign: "left",
                                  }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = isDark ? "#1e3a8a" : "#e0f2fe";
                                    e.currentTarget.style.borderColor = isDark ? "#60a5fa" : "#0284c7";
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = isDark ? "#162238" : "#f0f9ff";
                                    e.currentTarget.style.borderColor = isDark ? "#2a3d5e" : "#bae6fd";
                                  }}
                                >
                                  <span>{sug}</span>
                                  <ChevronRight style={{ width: "12px", height: "12px", opacity: 0.7 }} />
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Timestamp & Voice Readout Action */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          gap: "8px",
                          marginTop: "5px",
                          paddingLeft: "4px",
                          paddingRight: "4px",
                          width: "100%",
                          maxWidth: "92%",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "11px",
                            fontFamily: "'Manrope', sans-serif",
                            color: isDark ? "#64748b" : "#94a3b8",
                          }}
                        >
                          {msg.time}
                        </span>

                        {!isUser && (
                          <button
                            type="button"
                            onClick={() => speakMessage(msg)}
                            data-testid={`ai-speak-btn-${msg.id}`}
                            title={currentlySpeakingId === msg.id ? "Stop voice readout" : "Listen to response in natural voice"}
                            aria-label={currentlySpeakingId === msg.id ? "Stop voice readout" : "Listen to response in natural voice"}
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "4px",
                              padding: "2px 8px",
                              borderRadius: "6px",
                              fontSize: "11px",
                              fontWeight: 600,
                              cursor: "pointer",
                              border: currentlySpeakingId === msg.id
                                ? (isDark ? "1px solid #38bdf8" : "1px solid #0284c7")
                                : (isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid #e2e8f0"),
                              backgroundColor: currentlySpeakingId === msg.id
                                ? (isDark ? "rgba(56, 189, 248, 0.2)" : "#e0f2fe")
                                : (isDark ? "rgba(255,255,255,0.04)" : "#f8fafc"),
                              color: currentlySpeakingId === msg.id
                                ? (isDark ? "#38bdf8" : "#0284c7")
                                : (isDark ? "#94a3b8" : "#64748b"),
                              transition: "all 0.15s ease",
                            }}
                          >
                            {currentlySpeakingId === msg.id ? (
                              <>
                                <VolumeX style={{ width: "12px", height: "12px" }} className="animate-pulse" />
                                <span>Stop</span>
                              </>
                            ) : (
                              <>
                                <Volume2 style={{ width: "12px", height: "12px" }} />
                                <span>Listen</span>
                              </>
                            )}
                          </button>
                        )}
                      </div>
                    </motion.div>
                  );
                })}

                {/* Typing Indicator */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 3 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ display: "flex", alignItems: "center", gap: "6px" }}
                  >
                    <AIAvatarMark size={24} isResponding={true} />
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                        padding: "8px 12px",
                        borderRadius: "14px",
                        backgroundColor: isDark ? "#111a2e" : "#ffffff",
                        border: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid #e2e8f0",
                      }}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Floating "↓ New message" Indicator */}
              <AnimatePresence>
                {hasNewMessageBelow && (
                  <motion.button
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.95 }}
                    onClick={() => scrollToBottom("smooth")}
                    style={{
                      position: "absolute",
                      bottom: "12px",
                      right: "16px",
                      zIndex: 20,
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      padding: "5px 10px",
                      borderRadius: "9999px",
                      fontSize: "11px",
                      fontWeight: 600,
                      cursor: "pointer",
                      backgroundColor: isDark ? "#1e293b" : "#ffffff",
                      color: isDark ? "#38bdf8" : "#2563eb",
                      border: isDark ? "1px solid rgba(56, 189, 248, 0.4)" : "1px solid rgba(37, 99, 235, 0.3)",
                      boxShadow: "0 4px 14px rgba(0,0,0,0.15)",
                    }}
                  >
                    <ArrowDown style={{ width: "12px", height: "12px" }} />
                    <span>New message</span>
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            {/* --- CONTEXTUAL SUGGESTION CHIPS SLIDER (Updated after every question) --- */}
            {!isTyping && currentSuggestions && currentSuggestions.length > 0 && (
              <div style={{ padding: "6px 12px 10px 12px", flexShrink: 0 }}>
                <div
                  ref={chipsContainerRef}
                  onScroll={handleChipsScroll}
                  onMouseDown={handleChipsMouseDown}
                  onMouseMove={handleChipsMouseMove}
                  onMouseUp={handleChipsMouseUp}
                  onMouseLeave={handleChipsMouseUp}
                  onWheel={(e) => {
                    if (e.deltaY !== 0 || e.deltaX !== 0) {
                      e.stopPropagation();
                      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
                      chipsContainerRef.current.scrollLeft += delta;
                    }
                  }}
                  style={{
                    display: "flex",
                    gap: "8px",
                    overflowX: "auto",
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                    scrollBehavior: "smooth",
                    cursor: "grab",
                    userSelect: "none",
                    WebkitOverflowScrolling: "touch",
                  }}
                  className="no-scrollbar"
                >
                  {currentSuggestions.map((suggestion, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        if (chipsHasDraggedRef.current) return;
                        handleSend(suggestion);
                      }}
                      style={{
                        flexShrink: 0,
                        padding: "8px 14px",
                        borderRadius: "10px",
                        fontSize: "12px",
                        fontWeight: 500,
                        cursor: "pointer",
                        whiteSpace: "nowrap",
                        backgroundColor: isDark ? "#162238" : "#e0f2fe",
                        color: isDark ? "#93c5fd" : "#0369a1",
                        border: isDark ? "1px solid #2a3d5e" : "1px solid #bae6fd",
                        transition: "all 0.15s ease",
                        fontFamily: fontStack,
                      }}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>

                {/* Horizontal Scroll Track Slider */}
                <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "8px", padding: "0 2px" }}>
                  <button
                    type="button"
                    onClick={() => scrollChips(-1)}
                    aria-label="Scroll left"
                    title="Scroll left"
                    style={{
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      color: isDark ? "#94a3b8" : "#64748b",
                      fontSize: "10px",
                      padding: "2px 4px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "4px",
                      userSelect: "none",
                    }}
                  >
                    ◀
                  </button>

                  {/* Interactive Track & Draggable Thumb */}
                  <div
                    ref={sliderTrackRef}
                    onPointerDown={handleTrackPointerDown}
                    style={{
                      flex: 1,
                      height: "6px",
                      backgroundColor: isDark ? "#1e293b" : "#cbd5e1",
                      borderRadius: "9999px",
                      overflow: "hidden",
                      position: "relative",
                      cursor: "pointer",
                      touchAction: "none",
                    }}
                    title="Click or drag to scroll suggestions"
                  >
                    <div
                      style={{
                        height: "100%",
                        backgroundColor: isDark ? "#64748b" : "#38bdf8",
                        borderRadius: "9999px",
                        width: "42%",
                        marginLeft: `${Math.min(58, (chipsScrollPercent / 100) * 58)}%`,
                        transition: "margin 0.08s ease-out",
                        cursor: "grab",
                        pointerEvents: "none",
                      }}
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => scrollChips(1)}
                    aria-label="Scroll right"
                    title="Scroll right"
                    style={{
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      color: isDark ? "#94a3b8" : "#64748b",
                      fontSize: "10px",
                      padding: "2px 4px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "4px",
                      userSelect: "none",
                    }}
                  >
                    ▶
                  </button>
                </div>
              </div>
            )}

            {/* --- INPUT BAR --- */}
            <div
              style={{
                padding: "8px 10px 12px 10px",
                backgroundColor: isDark ? "#090e18" : "#f0f4f9",
                flexShrink: 0,
              }}
            >
              {/* Voice Recording Active Banner */}
              {isListening && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "4px 10px",
                    marginBottom: "6px",
                    borderRadius: "8px",
                    backgroundColor: isDark ? "rgba(239, 68, 68, 0.18)" : "#fee2e2",
                    border: isDark ? "1px solid rgba(239, 68, 68, 0.35)" : "1px solid #fca5a5",
                    fontSize: "11px",
                    fontWeight: 600,
                    color: isDark ? "#fca5a5" : "#b91c1c",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <span
                      style={{
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        backgroundColor: "#ef4444",
                      }}
                      className="animate-ping"
                    />
                    <span>Listening... speak your voice message</span>
                  </div>
                  <span style={{ fontSize: "10px", opacity: 0.8 }}>Click mic to stop</span>
                </div>
              )}

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                style={{ display: "flex", alignItems: "center", gap: "6px" }}
              >
                {/* Voice Assistant Microphone Button */}
                <button
                  type="button"
                  onClick={toggleVoiceInput}
                  data-testid="ai-mic-btn"
                  aria-label={isListening ? "Stop voice recording" : "Voice message input"}
                  title={isListening ? "Listening... click to stop" : "Voice assistant - speak to send voice message"}
                  style={{
                    width: "38px",
                    height: "38px",
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    cursor: "pointer",
                    backgroundColor: isListening
                      ? "#ef4444"
                      : isDark
                        ? "#111a2e"
                        : "#ffffff",
                    borderColor: isListening
                      ? "#ef4444"
                      : isDark
                        ? "rgba(255,255,255,0.1)"
                        : "#bae6fd",
                    borderWidth: "1.5px",
                    borderStyle: "solid",
                    color: isListening ? "#ffffff" : isDark ? "#93c5fd" : "#0284c7",
                    boxShadow: isListening ? "0 0 14px rgba(239, 68, 68, 0.6)" : "none",
                    transition: "all 0.15s ease",
                  }}
                  className={isListening ? "animate-pulse" : ""}
                >
                  {isListening ? (
                    <MicOff style={{ width: "16px", height: "16px" }} />
                  ) : (
                    <Mic style={{ width: "16px", height: "16px" }} />
                  )}
                </button>

                {/* Main Text Input Field with light sky blue border */}
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    borderRadius: "10px",
                    padding: "7px 12px",
                    backgroundColor: isDark ? "#111a2e" : "#ffffff",
                    border: isListening
                      ? "2px solid #ef4444"
                      : isDark
                        ? "2px solid rgba(96, 165, 250, 0.4)"
                        : "2px solid #bae6fd",
                    transition: "border-color 0.2s ease",
                    minWidth: 0,
                  }}
                >
                  <input
                    ref={inputRef}
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={isListening ? "Listening... speak now" : "Ask GK Nexergy anything..."}
                    data-testid="ai-chat-input"
                    style={{
                      width: "100%",
                      border: "none",
                      outline: "none",
                      background: "transparent",
                      fontSize: "13px",
                      color: isDark ? "#ffffff" : "#0f172a",
                      fontFamily: fontStack,
                    }}
                  />
                </div>

                {/* Send Button */}
                <button
                  type="submit"
                  disabled={!chatInput.trim() || isTyping}
                  data-testid="ai-send-btn"
                  aria-label="Send message"
                  style={{
                    width: "38px",
                    height: "38px",
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    cursor: chatInput.trim() && !isTyping ? "pointer" : "not-allowed",
                    backgroundColor: chatInput.trim() && !isTyping ? (isDark ? "#2563eb" : "#0284c7") : isDark ? "#111a2e" : "#ffffff",
                    borderColor: chatInput.trim() && !isTyping ? (isDark ? "#2563eb" : "#0284c7") : isDark ? "rgba(255,255,255,0.1)" : "#dbe4f0",
                    borderWidth: "1.5px",
                    borderStyle: "solid",
                    color: chatInput.trim() && !isTyping ? "#ffffff" : "#94a3b8",
                    transition: "all 0.15s ease",
                  }}
                >
                  <Send style={{ width: "15px", height: "15px" }} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return createPortal(chatbotJSX, document.body);
};

export default AIChatbot;
