import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"

import { signInUser } from "../../../services/auth"

import Input from "../../components/library/input/component"
import Card from "../../components/library/card/component"
import Button from "../../components/library/button/component"

import styles from './styles.module.css'
import Alert from "../../components/library/alert/component"

const SignIn = () => {

  const navigate = useNavigate()

  const emailRef = useRef()
  const passwordRef = useRef()
  const [error, setError] = useState('')

  const handleSubmit = async e => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    try {
      const data = await signInUser(email, password)//res.json();

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      navigate('/projects');
    } catch (err) {
      console.error(err);
      setError('Invalid email or password');
    }
  };

  return (
    <div className={ styles.container }>
      <Card>
        <h2>Login to your account</h2>
        <form onSubmit={ handleSubmit }>
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
          <Button type='submit'>Sign in</Button>
          {/* {error && <p style={{ color: 'red' }}>{error}</p>} */}
        </form>
        {error && (
          <div style={{ marginTop: '1rem' }}>
            <Alert variant='error' onClose={() => setError('')}>{error}</Alert>
          </div>
        )}
      </Card>
    </div>
  )
}
export default SignIn

        {/* <div>
          <label htmlFor="email">Email</label>
          <input
            id='email'
            name='email'
            type="text"
            ref={ emailRef }
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id='password'
            name='password'
            type="password"
            ref={ passwordRef }
            required
          />
        </div> */}