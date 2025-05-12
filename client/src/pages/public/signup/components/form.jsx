import { useRef } from "react"

const Form = () => {

  const nameRef = useRef()
  const usernameRef = useRef()
  const passwordRef = useRef()
  const organizationRef = useRef()
  const emailRef = useRef()
  const roleRef = useRef()
  const phoneRef = useRef()
  const locationRef = useRef()

  return (
    <form action="">
      <div>
        <label htmlFor="">Name</label>
        <input
          id='name'
          name='name'
          type="text"
          ref={ nameRef }
        />
      </div>
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
      <div>
        <label htmlFor="">Email</label>
        <input
          id='email'
          name='email'
          type="email"
          ref={ emailRef }
        />
      </div>
      <div>
        <label htmlFor="">Organization</label>
        <input
          id='organization'
          name='organization'
          type="organization"
          ref={ organizationRef }
        />
      </div>
      <div>
        <label htmlFor="">Role</label>
        <select
          id='role'
          name='role'
          ref={ roleRef }
        >
          <option value="admin">Admin</option>
          <option value="engineer">Engineer</option>
          <option value="technician">Technician</option>
        </select>
      </div>
      <div>
        <label htmlFor="">Phone</label>
        <input
          id='phone'
          name='phone'
          type="tel"
          ref={ phoneRef }
        />
      </div>
      <div>
        <label htmlFor="">Location</label>
        <input
          id='location'
          name='location'
          type="text"
          ref={ locationRef }
        />
      </div>
    </form>
  )
}

export default Form