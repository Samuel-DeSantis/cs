import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { signUpUser } from "../../../services/auth"

import Input from "../../components/library/input/component"
import Card from "../../components/library/card/component"
import Button from "../../components/library/button/component"

import styles from './styles.module.css'

const SignUp = () => {

  const usernameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()

  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    const payload = {
      username: usernameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      const data = await signUpUser(payload) //res.json();

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setMessage("Signup successful!");
      navigate('/projects')
    } catch (err) {
      setError("Server error. Please try again later.", err);
    }
  };

  return (
    <div className={ styles.container }>
      <Card>
        <h2>Create account</h2>
        <form onSubmit={ handleSubmit } className="">
          <Input
            label='Username'
            id='username'
            name='username'
            placeholder='johndoe'
            type='text'
            ref={ usernameRef }
            required
          />
          <Input
            label='Email'
            id='email'
            name='email'
            placeholder='email@domain.com'
            type='text'
            ref={ emailRef }
            required
          />
          <Input
            label='Password'
            id='password'
            name='password'
            placeholder='********'
            type='password'
            ref={ passwordRef }
            required
          />
          <Button type='submit'>Create my account</Button>
          {message && <p style={{ color: "green" }}>{ message }</p>}
          {error && <p style={{ color: "red" }}>{ error }</p>}
        </form>
      </Card>
    </div>
  )
}

export default SignUp


        // <div>
        //   <label htmlFor="">Name</label>
        //   <input
        //     id='name'
        //     name='name'
        //     type="text"
        //     ref={ nameRef }
        //   />
        // </div>
        // <div>
        //   <label htmlFor="">Username</label>
        //   <input
        //     id='username'
        //     name='username'
        //     type="text"
        //     ref={ usernameRef }
        //   />
        // </div>
        // <div>
        //   <label htmlFor="">Password</label>
        //   <input
        //     id='password'
        //     name='password'
        //     type="password"
        //     ref={ passwordRef }
        //   />
        // </div>
        // <div>
        //   <label htmlFor="">Email</label>
        //   <input
        //     id='email'
        //     name='email'
        //     type="email"
        //     ref={ emailRef }
        //   />
        // </div>
        // <div>
        //   <label htmlFor="">Organization</label>
        //   <input
        //     id='organization'
        //     name='organization'
        //     type="organization"
        //     ref={ organizationRef }
        //   />
        // </div>
        // <div>
        //   <label htmlFor="">Role</label>
        //   <select
        //     id='role'
        //     name='role'
        //     ref={ roleRef }
        //   >
        //     <option value="engineer">Engineer</option>
        //     <option value="admin">Admin</option>
        //     <option value="technician">Technician</option>
        //   </select>
        // </div>
        // <div>
        //   <label htmlFor="">Phone</label>
        //   <input
        //     id='phone'
        //     name='phone'
        //     type="tel"
        //     ref={ phoneRef }
        //   />
        // </div>
      
        // <div>
        //   <label htmlFor="">Location</label>
        //   <input
        //     id='location'
        //     name='location'
        //     type="text"
        //     ref={ locationRef }
        //   />
        // </div>