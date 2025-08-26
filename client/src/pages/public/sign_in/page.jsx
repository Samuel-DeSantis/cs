import { useRef, useState } from "react"
import { useNavigate, Link } from "react-router-dom"

import { signInUser } from "../../../services/auth"

import { Button } from '@/components/ui/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardAction
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

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
    <div className='flex justify-center items-center pt-36'>
      <Card className='w-full max-w-sm dark:bg-neutral-950 border-0'>
        <CardHeader>
          <CardTitle>Sign in to your account</CardTitle>
          <CardDescription>Please enter your email and password to sign in.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={ handleSubmit }>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor='email'>Email</Label>
                <Input
                  id='email'
                  name='email'
                  type='email'
                  placeholder='email@domain.com'
                  ref={ emailRef }
                  required
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor='email'>Password</Label>
                <Input
                  id='password'
                  name='password'
                  type='password'
                  placeholder='---'
                  ref={ passwordRef }
                  required
                />
              </div>
              <Button type='submit' className='grid gap-3 w-full'>Sign in</Button>
            </div>
          </form>
        </CardContent>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{'  '}
          <Link to='/sign_up'><Button variant='link'>Sign Up</Button></Link>
        </div>
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