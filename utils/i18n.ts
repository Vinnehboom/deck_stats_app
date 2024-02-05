import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import your language files here
import { en } from "../locales";

// Set up i18next
i18n.use(initReactI18next).init({
  lng: "en", // Set the default language here
  fallbackLng: "en", // Set the fallback language here
  interpolation: {
    escapeValue: false, // not needed for react!!
  },
  resources: {
    en: {
      translation: en, // Add your English translations here
    },
  },
});

export { i18n };
