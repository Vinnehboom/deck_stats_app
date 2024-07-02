import i18next from "i18next";
import { initReactI18next } from "react-i18next";

// Import your language files here
import { en, es, fr } from "../locales/";

// Set up i18next
i18next.use(initReactI18next).init({
  debug: true,
  fallbackLng: "en", // Set the fallback language here
  returnNull: false,
  interpolation: {
    escapeValue: false, // not needed for react!!
  },
  resources: {
    en: {
      translation: en,
    },
    es: {
      translation: es,
    },
    fr: {
      translation: fr,
    },
  },
});

export { i18next };
