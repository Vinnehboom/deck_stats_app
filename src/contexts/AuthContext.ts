import { createContext } from "react";

import { User } from "../types";

type AuthContextValueType = {
  user: User | null;
  signOut(): void;
};

export const AuthContext = createContext<AuthContextValueType>({
  user: null,
  signOut: () => {
    throw {
      name: "NotImplementedError",
      message: `signOut() should be overridden by a useState setter or similar in the component that uses the Auth Provider.`,
    };
  },
});
