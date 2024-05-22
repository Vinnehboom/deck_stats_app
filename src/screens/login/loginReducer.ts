export type loginStateType = { identifier: string; password: string; passwordConfirmation: string };

export const loginFormReducer = (
  state: loginStateType,
  action: { type: "SET_IDENTIFIER" | "SET_PASSWORD" | "SET_PASSWORD_CONFIRMATION" | "CLEAR"; payload?: string }
): loginStateType => {
  switch (action.type) {
    case "SET_IDENTIFIER": {
      return typeof action.payload === "string" ? { ...state, identifier: action.payload } : { ...state };
    }
    case "SET_PASSWORD": {
      return typeof action.payload === "string" ? { ...state, password: action.payload } : { ...state };
    }

    case "SET_PASSWORD_CONFIRMATION": {
      return typeof action.payload === "string" ? { ...state, passwordConfirmation: action.payload } : { ...state };
    }
    case "CLEAR": {
      return { identifier: "", password: "", passwordConfirmation: "" };
    }
  }
};
