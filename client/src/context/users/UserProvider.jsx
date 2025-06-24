import { useState } from "react"
import UserContext from "./UserContext"

// TODO: This will all need reviewed

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(false)

  const sign_in = (data) => setUser(data)
  const sign_out = () => setUser(false)

  return (
    <UserContext.Provider value ={{user, sign_in, sign_out}}>
      { children }
    </UserContext.Provider>
  )
}

export default UserProvider