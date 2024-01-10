import { User } from "../types"
import { createContext } from "react"

type AuthContextValueType = {
  user: User | null
  signOut(): void
}

const AuthContext = createContext<AuthContextValueType>({
  user: null,
  signOut: () => {
    throw {
      name: "NotImplementedError",
      message: `signOut() should be overridden by a useState setter or similar in the component that uses the Auth Provider.`,
    }
  },
})

export default AuthContext
