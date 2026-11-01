/**
 * Global Real-Time Whole Page Translation Utility
 * Translates every single term, header, paragraph, card, and button on the entire website.
 */

export const SUPPORTED_LANGUAGES = [
  { code: 'en', label: 'English', native: 'English', flag: '🇺🇸', name: 'English' },
  { code: 'te', label: 'Telugu', native: 'తెలుగు', flag: '🇮🇳', name: 'Telugu' },
  { code: 'hi', label: 'Hindi', native: 'हिन्दी', flag: '🇮🇳', name: 'Hindi' },
  { code: 'ta', label: 'Tamil', native: 'தமிழ்', flag: '🇮🇳', name: 'Tamil' },
  { code: 'kn', label: 'Kannada', native: 'ಕನ್ನಡ', flag: '🇮🇳', name: 'Kannada' },
  { code: 'mr', label: 'Marathi', native: 'मराठी', flag: '🇮🇳', name: 'Marathi' },
  { code: 'bn', label: 'Bengali', native: 'বাংলা', flag: '🇮🇳', name: 'Bengali' },
  { code: 'es', label: 'Spanish', native: 'Español', flag: '🇪🇸', name: 'Spanish' },
  { code: 'fr', label: 'French', native: 'Français', flag: '🇫🇷', name: 'French' },
  { code: 'de', label: 'German', native: 'Deutsch', flag: '🇩🇪', name: 'German' },
  { code: 'ja', label: 'Japanese', native: '日本語', flag: '🇯🇵', name: 'Japanese' },
  { code: 'ar', label: 'Arabic', native: 'العربية', flag: '🇸🇦', name: 'Arabic' },
  { code: 'zh-CN', label: 'Chinese', native: '简体中文', flag: '🇨🇳', name: 'Chinese' },
];

export const getCurrentLanguage = () => {
  if (typeof window === 'undefined') return 'en';
  try {
    const stored = localStorage.getItem('gk_selected_language');
    if (stored) return stored;
    const cookieMatch = document.cookie.match(/googtrans=\/[^/]+\/([^;]+)/);
    if (cookieMatch && cookieMatch[1]) return cookieMatch[1];
  } catch (e) {}
  return 'en';
};

export const setGlobalPageLanguage = (langCode) => {
  try {
    const code = langCode || 'en';
    localStorage.setItem('gk_selected_language', code);

    // Dispatch reactive language change event for immediate component updates (TTS, Summarizer, Chatbot)
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('gk-language-changed', { detail: code }));
    }

    // 1. Set Google Translate Cookie for whole-page conversion
    const domain = window.location.hostname;
    if (code === 'en') {
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${domain};`;
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${domain};`;
      document.cookie = 'googtrans=/en/en; path=/;';
    } else {
      document.cookie = `googtrans=/en/${code}; path=/;`;
      document.cookie = `googtrans=/en/${code}; path=/; domain=${domain};`;
      document.cookie = `googtrans=/en/${code}; path=/; domain=.${domain};`;
    }

    // 2. Trigger active Google Translate Select dropdown if loaded
    const select = document.querySelector('.goog-te-combo');
    if (select) {
      select.value = code;
      select.dispatchEvent(new Event('change'));
    } else {
      // If translate widget not yet hooked, reload to apply cookie immediately
      window.location.reload();
    }
  } catch (err) {
    console.error('Error changing global page language:', err);
  }
};

export const DEMO_PHRASES = [
  "GK Nexergy brings technology, learning and enterprise solutions together through one connected ecosystem.",
  "Train. Build. Transform. Empowering talent and businesses for the digital future.",
  "Custom software engineering, cloud platforms, predictive AI automation, and academy programs for global enterprises."
];

export const DEMO_TRANSLATIONS = {
  te: {
    name: "Telugu (తెలుగు)",
    translations: [
      "జికె నెక్సర్గీ సాంకేతికత, అభ్యాసం మరియు ఎంటర్‌ప్రైజ్ పరిష్కారాలను ఒక అనుసంధానిత పర్యావరణ వ్యవస్థ ద్వారా అందిస్తుంది.",
      "శిక్షణ. నిర్మాణం. పరివర్తన. డిజిటల్ భవిష్యత్తు కోసం ప్రతిభను మరియు వ్యాపారాలను శక్తివంతం చేయడం.",
      "గ్లోబల్ ఎంటర్‌ప్రైజెస్ కోసం కస్టమ్ సాఫ్ట్‌వేర్ ఇంజనీరింగ్, క్లౌడ్ ప్లాట్‌ఫారమ్‌లు, ప్రిడిక్టివ్ AI ఆటోమేషన్ మరియు అకాడమీ ప్రోగ్రామ్‌లు."
    ]
  },
  hi: {
    name: "Hindi (हिन्दी)",
    translations: [
      "जीके नेक्सर्जी एक जुड़े हुए इकोसिस्टम के माध्यम से तकनीक, सीखने और उद्यम समाधानों को एक साथ लाता है।",
      "प्रशिक्षण। निर्माण। परिवर्तन। डिजिटल भविष्य के लिए प्रतिभा और व्यवसायों को सशक्त बनाना।",
      "वैश्विक उद्यमों के लिए कस्टम सॉफ्टवेयर इंजीनियरिंग, क्लाउड प्लेटफॉर्म, प्रेडिक्टिव एआई ऑटोमेशन और अकादमी कार्यक्रम।"
    ]
  },
  ta: {
    name: "Tamil (தமிழ்)",
    translations: [
      "ஜிகே நெக்ஸர்ஜி தொழில்நுட்பம், கற்றல் மற்றும் நிறுவன தீர்வுகளை ஒரு இணைக்கப்பட்ட சுற்றுச்சூழல் மூலம் ஒன்றாகக் கொண்டுவருகிறது.",
      "பயிற்சி. உருவாக்கம். மாற்றம். டிஜிட்டல் எதிர்காலத்திற்காக திறமைகளையும் வணிகங்களையும் மேம்படுத்துதல்.",
      "உலகளாவிய நிறுவனங்களுக்கான தனிப்பயன் மென்பொருள் பொறியியல், கிளவுட் தளங்கள், முன்கணிப்பு AI மற்றும் அகாடமி திட்டங்கள்."
    ]
  },
  kn: {
    name: "Kannada (ಕನ್ನಡ)",
    translations: [
      "ಜಿಕೆ ನೆಕ್ಸರ್ಜಿ ತಂತ್ರಜ್ಞಾನ, ಕಲಿಕೆ ಮತ್ತು ಎಂಟರ್‌ಪ್ರೈಸ್ ಪರಿಹಾರಗಳನ್ನು ಒಂದು ಸಂಯೋಜಿತ ಪರಿಸರ ವ್ಯವಸ್ಥೆಯ ಮೂಲಕ ಒಟ್ಟಿಗೆ ತರುತ್ತದೆ.",
      "ತರಬೇತಿ. ನಿರ್ಮಾಣ. ರೂಪಾಂತರ. ಡಿಜಿಟಲ್ ಭವಿಷ್ಯಕ್ಕಾಗಿ ಪ್ರತಿಭೆ ಮತ್ತು ವ್ಯವಹಾರಗಳನ್ನು ಸಶಕ್ತಗೊಳಿಸುವುದು.",
      "ಜಾಗತಿಕ ಉದ್ಯಮಗಳಿಗಾಗಿ ಕಸ್ಟಮ್ ಸಾಫ್ಟ್‌ವೇರ್ ಎಂಜಿನಿಯರಿಂಗ್, ಕ್ಲೌಡ್ ಪ್ಲಾಟ್‌ಫಾರ್ಮ್‌ಗಳು, ಮುನ್ಸೂಚಕ AI ಮತ್ತು ಅಕಾಡೆಮಿ ಕಾರ್ಯಕ್ರಮಗಳು."
    ]
  },
  mr: {
    name: "Marathi (मराठी)",
    translations: [
      "जीके नेक्सर्जी तंत्रज्ञान, शिक्षण आणि एंटरप्राइझ सोल्यूशन्स एका कनेक्ट केलेल्या इकोसिस्टमद्वारे एकत्र आणते.",
      "प्रशिक्षण. निर्मिती. परिवर्तन. डिजिटल भविष्यासाठी प्रतिभा आणि व्यवसायांना सक्षम करणे.",
      "ग्लोबल एंटरप्रायझेससाठी कस्टम सॉफ्टवेअर अभियांत्रिकी, क्लाउड प्लॅटफॉर्म, प्रेडिक्टिव्ह AI आणि अकादमी कार्यक्रम."
    ]
  },
  bn: {
    name: "Bengali (বাংলা)",
    translations: [
      "জিকে নেক্সার্গি একটি সংযুক্ত ইকোসিস্টেমের মাধ্যমে প্রযুক্তি, শিক্ষা এবং এন্টারপ্রাইজ সমাধানগুলিকে একত্রিত করে।",
      "প্রশিক্ষণ। নির্মাণ। রূপান্তর। ডিজিটাল ভবিষ্যতের জন্য প্রতিভা এবং ব্যবসায়িক প্রতিষ্ঠানগুলিকে ক্ষমতায়ন।",
      "গ্লোবাল এন্টারপ্রাইজগুলির জন্য কাস্টম সফটওয়্যার ইঞ্জিনিয়ারিং, ক্লাউড প্ল্যাটফর্ম, প্রেডিক্টিভ এআই এবং একাডেমি প্রোগ্রাম।"
    ]
  },
  es: {
    name: "Spanish (Español)",
    translations: [
      "GK Nexergy une la tecnología, el aprendizaje y las soluciones empresariales a través de un ecosistema conectado.",
      "Entrenar. Construir. Transformar. Empoderando el talento y las empresas para el futuro digital.",
      "Ingeniería de software a medida, plataformas en la nube, automatización con IA y programas de academia para empresas globales."
    ]
  },
  fr: {
    name: "French (Français)",
    translations: [
      "GK Nexergy rassemble la technologie, la formation et les solutions d'entreprise au sein d'un écosystème connecté.",
      "Former. Construire. Transformer. Donner aux talents et aux entreprises les moyens de réussir dans l'ère numérique.",
      "Ingénierie logicielle sur mesure, plates-formes cloud, automatisation par IA et programmes d'académie pour les entreprises mondiales."
    ]
  },
  de: {
    name: "German (Deutsch)",
    translations: [
      "GK Nexergy verbindet Technologie, Bildung und Unternehmenslösungen in einem vernetzten Ökosystem.",
      "Trainieren. Bauen. Transformieren. Stärkung von Talenten und Unternehmen für die digitale Zukunft.",
      "Individuelle Softwareentwicklung, Cloud-Plattformen, vorausschauende KI-Automatisierung und Akademieprogramme für globale Unternehmen."
    ]
  },
  ja: {
    name: "Japanese (日本語)",
    translations: [
      "GK Nexergyは、コネクテッド・エコシステムを通じてテクノロジー、学習、エンタープライズ・ソリューションを統合します。",
      "育成。構築。変革。デジタルの未来に向けて人材と企業を支援します。",
      "グローバル企業向けのカスタムソフトウェア開発、クラウドプラットフォーム、AI自動化、アカデミープログラム。"
    ]
  },
  ar: {
    name: "Arabic (العربية)",
    translations: [
      "تجمع جي كي نيكسرجي بين التكنولوجيا والتعليم والحلول المؤسسية من خلال منظومة متكاملة واحدة.",
      "تدريب. بناء. تحول. تمكين الكفاءات والشركات من أجل المستقبل الرقمي.",
      "هندسة برمجيات مخصصة، منصات سحابية، أتمتة الذكاء الاصطناعي وبرامج الأكاديمية للمؤسسات العالمية."
    ]
  },
  "zh-CN": {
    name: "Chinese (简体中文)",
    translations: [
      "GK Nexergy 通过一个互联的生态系统将技术、学习和企业解决方案汇集在一起。",
      "培训。构建。转型。赋能人才与企业迈向数字化未来。",
      "为全球企业量身定制的软件工程、云平台、预测性 AI 自动化和学院培训计划。"
    ]
  },
  en: {
    name: "English",
    translations: [
      "GK Nexergy brings technology, learning and enterprise solutions together through one connected ecosystem.",
      "Train. Build. Transform. Empowering talent and businesses for the digital future.",
      "Custom software engineering, cloud platforms, predictive AI automation, and academy programs for global enterprises."
    ]
  }
};

export const getInitialLanguage = () => {
  return localStorage.getItem('gk_selected_language') || 'en';
};

