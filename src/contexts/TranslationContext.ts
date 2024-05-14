import { createContext } from "react";

type TranslationContextType = {
  t: (key: string) => string;
};

export const TranslationContext = createContext<TranslationContextType>({
  t: () => {
    throw {
      name: "NotImplementedError",
      message: `t() should be overridden by a useState setter or similar in the component that uses the Auth Provider.`,
    };
  },
});
