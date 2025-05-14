import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { signInUser } from "../../../../services/auth"

const Form = () => {

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
      setError('Something went wrong');
    }
  };

  return (
    <form onSubmit={ handleSubmit }>
      <div>
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
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit">Sign In</button>
    </form>
  )
}
export default Form