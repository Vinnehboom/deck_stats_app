import { createContext } from "react"

const AuthContext = createContext({
  user: undefined,
  signOut: () => {},
})

export default AuthContext
