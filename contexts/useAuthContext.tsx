import AuthContext from "./AuthContext"
import { useContext } from "react"
import { useNavigation } from "@react-navigation/core"
import { StackNavigationProp } from "@react-navigation/stack"
import { RootStackParamList } from "../types/RouteParams"
import { showMessage } from "react-native-flash-message"
import { User } from "../types"

const useAuthContext = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()
  const { user, signOut } = useContext(AuthContext)
  if (user === null) {
    navigation.navigate("Login", undefined)
    showMessage({
      message: `Please login before continuing.`,
      type: "warning",
    })
    return { user: {} as User }
  } else {
    return { user: user, signOut: signOut }
  }
}

export { useAuthContext }
