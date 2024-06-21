import { createContext } from "react";

import { defaultLocale } from "../helpers/locales";

type TranslationContextType = {
  t: (key: string) => string;
  locale: string;
};

export const TranslationContext = createContext<TranslationContextType>({
  t: () => {
    throw {
      name: "NotImplementedError",
      message: `t() should be overridden by a useState setter or similar in the component that uses the Auth Provider.`,
    };
  },
  locale: defaultLocale,
});
