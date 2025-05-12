import { useContext, useRef } from "react"
import logger from "../../../../../../server/utils/logger.js"

const Form = () => {

  // const {
  //   user,
  //   sign_in,
  //   sign_out,
  // } = useContext(UserContext)

  const usernameRef = useRef()
  const passwordRef = useRef()

  // const handleSubmit = async (e) => {
  //   e.preventDefault()

  //   const userForm = {
  //     username: usernameRef.current.value,
  //     password: passwordRef.current.value
  //   }

  //   logger.info("userForm", userForm)
    
  // }

  return (
    <form action="">
      <div>
        <label htmlFor="">Username</label>
        <input
          id='username'
          name='username'
          type="text"
          ref={ usernameRef }
        />
      </div>
      <div>
        <label htmlFor="">Password</label>
        <input
          id='password'
          name='password'
          type="password"
          ref={ passwordRef }
        />
      </div>
    </form>
  )
}
export default Form