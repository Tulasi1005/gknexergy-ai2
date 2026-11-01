# 🤖 GK Nexergy AI Chatbot — Questions & Training Guide

Welcome to the **GK Nexergy AI Chatbot Training & Knowledge System**. This document provides full instructions on how to view, modify, add user questions and answers, and retrain the chatbot in seconds.

---

## 📁 1. Where are the Chatbot Questions Stored?

All chatbot questions (user intents), bot responses, quick action navigation links, and FAQs are stored in a single, human-readable JSON document:

👉 **[`src/data/chatbotKnowledgeBase.json`](file:///c:/Users/ravir/Downloads/GK_Nexergy_Website_HTP-main-tulasi/GK_Nexergy_Website_HTP-main/GK_Nexergy_Website_HTP-main-last/src/data/chatbotKnowledgeBase.json)**

---

## 🏗️ 2. Structure of the Knowledge Document

The document is divided into two primary sections:

1. **`topics`**: The core operational domains of GK Nexergy:
   - Greetings & Introductions (`greetings`)
   - Company Overview & Mission (`company`)
   - AI & Process Automation (`solutions-ai`)
   - Software & Web Development (`solutions-software`)
   - Mobile Applications (`solutions-mobile`)
   - Data & Analytics (`solutions-data`)
   - General Services (`solutions-general`)
   - Nexergy Academy Overview (`academy`)
   - Cyber Security & Ethical Hacking Course (`academy-cyber`)
   - PostgreSQL & Database Mastery Course (`academy-postgres`)
   - Pricing Plans & Engagement Tiers (`pricing-plans`)
   - Academy Fees & Duration (`academy-fees`)
   - Case Studies & Delivered Projects (`projects`)
   - Careers & Job Openings (`careers`)
   - Contact & Live Support (`contact`)
   - Why GK Nexergy & Advantages (`why-us`)

2. **`customFaqs`**: Custom question-and-answer pairs you can freely add or edit (e.g., Code Ownership, Project Timelines, Office Locations).

---

## ✏️ 3. How to Modify Questions and Answers

### A. Modifying Questions (Intents) for an Existing Topic

Locate the topic in [`src/data/chatbotKnowledgeBase.json`](file:///c:/Users/ravir/Downloads/GK_Nexergy_Website_HTP-main-tulasi/GK_Nexergy_Website_HTP-main/GK_Nexergy_Website_HTP-main-last/src/data/chatbotKnowledgeBase.json) and add any new question variations to the `intents` list:

```json
{
  "id": "pricing-plans",
  "title": "Pricing Plans & Engagement Tiers",
  "intents": [
    "pricing plan",
    "pricing plans",
    "starter plan",
    "growth plan",
    "how much does software cost",
    "what is the price of mobile app development",  <-- ADD YOUR NEW QUESTION HERE
    "pod cost"
  ],
  "responses": {
    "en": "GK Nexergy offers 3 transparent engineering engagement tiers: Starter ($1,499/mo), Growth ($3,499/mo), and Premium ($6,999/mo)...",
    "te": "GK Nexergy 3 పారదర్శక నిశ్చితార్థ ప్రణాళికలను అందిస్తుంది...",
    "hi": "GK Nexergy 3 इंजीनियरिंग प्लान प्रदान करती है..."
  },
  "routes": [
    { "label": "💳 View Pricing Plans", "to": "/pricing" }
  ]
}
```

### B. Adding a Brand New Question / FAQ

To add a new question that the bot should answer, simply add a new entry to the `customFaqs` array in [`src/data/chatbotKnowledgeBase.json`](file:///c:/Users/ravir/Downloads/GK_Nexergy_Website_HTP-main-tulasi/GK_Nexergy_Website_HTP-main/GK_Nexergy_Website_HTP-main-last/src/data/chatbotKnowledgeBase.json):

```json
{
  "id": "faq-internship-certificate",
  "question": "Do you provide certificates for academy courses and internships?",
  "intents": [
    "do you give certificates",
    "course certificate",
    "internship certificate",
    "certificate provided",
    "certificate undo leda"
  ],
  "responses": {
    "en": "Yes! All Nexergy Academy graduates receive an **Industry Recognized Verification Certificate** along with GitHub-verified code portfolio assessments.",
    "te": "అవును! Nexergy Academy గ్రాడ్యుయేట్లు అందరూ ధృవీకరించబడిన ఇండస్ట్రీ సర్టిఫికేట్‌ను అందుకుంటారు.",
    "hi": "हाँ! हमारे सभी कोर्सेज के पूरा होने पर इंडस्ट्री-मान्यता प्राप्त सर्टिफिकेट दिया जाता है।"
  },
  "routes": [
    { "label": "Explore Academy Courses", "to": "/academy/courses" }
  ]
}
```

---

## 🚀 4. How to "Train" and Verify the Chatbot

Whenever you make changes to [`src/data/chatbotKnowledgeBase.json`](file:///c:/Users/ravir/Downloads/GK_Nexergy_Website_HTP-main-tulasi/GK_Nexergy_Website_HTP-main/GK_Nexergy_Website_HTP-main-last/src/data/chatbotKnowledgeBase.json), you can verify and retrain the chatbot with one simple command:

### Run Training Command:
```bash
npm run train:chatbot
```

### What This Does:
1. **Schema Check**: Validates that all IDs, question intents, and responses are formatted correctly with zero syntax errors.
2. **Intent Indexing**: Compiles and indexes all question intents into the NLP scoring engine.
3. **Benchmark Test**: Executes automated test queries in English and Telugu to verify that queries match the intended topics with high confidence.

### Real-Time Live Development:
- When running `npm run dev`, **Hot Module Replacement (HMR)** updates the chatbot immediately without requiring you to restart the server or refresh the browser.

---

## 🧠 5. How the Chatbot Matching Engine Works

The GK Nexergy Chatbot uses a tiered hybrid intelligence pipeline:

1. **Intent Keyword Matcher**:
   - Exact query matches get top priority (`+50 points`).
   - Phrase substring matches get secondary priority (`+30+ points`).
   - Significant domain keywords get weighted bonuses (`+10–15 points`).
2. **Direct Navigation Router**:
   - Commands like *"Go to Pricing"* or *"Open Cyber Security"* trigger instant seamless routing.
3. **Full Site Corpus Search (RAG Fallback)**:
   - If a query is very specific or novel, the engine scans the full site knowledge corpus across all service descriptions, curriculum modules, and case studies.
4. **Multilingual Speech & Text Translation**:
   - If a user asks a question in Telugu, the chatbot replies in Telugu.
   - If a user asks in English, the chatbot replies in English.
   - If in Hindi, it replies in Hindi.

---

## 💡 Best Practices for Adding Questions

1. **Include Varied Phrasings**:
   Users ask questions in different ways. Add questions using verbs, nouns, and slang:
   - *"how much does software cost"*
   - *"software development pricing"*
   - *"software fee"*
   - *"cost of making an app"*

2. **Add Telugu / Tanglish Phrasings**:
   - *"fee entha"*
   - *"meeru em chestaru"*
   - *"company details cheppu"*

3. **Keep English as Default**:
   - Always ensure `responses.en` is populated. `responses.te` and `responses.hi` are optional but recommended for full multilingual fidelity.

---

## 📞 Need Assistance?
If you have questions about extending the chatbot or integrating external LLM APIs, contact the GK Nexergy Engineering Team at **contact@gknexergy.com** or **+91 9704585960**.
