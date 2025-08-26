import { useEffect, useState } from "react"
import { getUser, updateUser } from "../../../services/auth"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardAction
} from '@/components/ui/card'
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import styles from './styles.module.css'

const Profile = () => {
  const user_id = JSON.parse(localStorage.getItem('user')).id
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    organization: "",
    role: "",
    location: ""
  })
  const [loading, setLoading] = useState(true)
  const [isDisabled, setIsDisabled] = useState(true)

  useEffect(() => {
    const loadUser = async () => {
      try {
        const data = await getUser()
        setForm({
          name: data.name,
          username: data.username,
          email: data.email,
          phone: data.phone,
          organization: data.organization,
          role: data.role,
          location: data.location
        })
      } catch (err) {
        setError(err.message || 'Error loading projects')
      } finally {
      setLoading(false)
      }
    }
    loadUser()
  }, [])

  const handleChange = e => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async e => {
    e.preventDefault() // TODO: To update user info
    console.log({ user_id, ...form})
    await updateUser({ ...form })
  }

  if (loading) return <p>Loading projects...</p>
  if (error) return <p style={{ color: 'red' }}>{ error }</p>

  return (
    <div className="flex flex-col items-start justify-center w-full max-w-2xl p-6 mx-auto space-y-4 pb-36">
      <div className="grid gap-3">
        <h1 className="text-2xl font-semibold text-balance">Welcome, { form.name }!</h1>
        <p className="text-muted-foreground text-sm">View your profile information below.</p>
      </div>
      <Card className='w-full justify-center dark:bg-neutral-950'>
        <CardHeader>
          <div className="flex items-center gap-4">
            <CardTitle className='text-2xl'>Profile Details</CardTitle>
            {isDisabled && (
              <Button variant='outline' onClick={() => (
                setIsDisabled(prev => !prev)
              )}>Update info</Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={ handleSubmit } className="flex flex-col gap-6">
            <div className="grid gap-3">
              <CardTitle>Name</CardTitle>
              <Input
                id='name'
                name='name'
                type='text'
                value={ form.name }
                onChange={ handleChange }
                disabled={ isDisabled }
              />
            </div>
            <div className="grid gap-3">
              <CardTitle>Username</CardTitle>
              <Input
                id='username'
                name='username'
                type='text'
                value={ form.username }
                onChange={ handleChange }
                disabled={ isDisabled }
              />
            </div>
            <div className="grid gap-3">
              <CardTitle>Email</CardTitle>
              <Input
                id='email'
                name='email'
                type='email'
                value={ form.email }
                onChange={ handleChange }
                disabled
                readOnly
              />
            </div>
            <div className="grid gap-3">
              <CardTitle>Phone</CardTitle>
              <Input
                id='phone'
                name='phone'
                type='tel'
                placeholder='---'
                value={ form.phone }
                onChange={ handleChange }
                disabled={ isDisabled }
              />
            </div>
            <div className="grid gap-3">
              <CardTitle>Organization</CardTitle>
              <Input
                id='organization'
                name='organization'
                type='text'
                placeholder='---'
                value={ form.organization }
                onChange={ handleChange }
                disabled={ isDisabled }
              />
            </div>
            <div className="grid gap-3">
              <CardTitle>Role</CardTitle>
              <Select
                name="type"
                value={ form.role }
                disabled={ isDisabled }
                onValueChange={value => setForm(prev => ({ ...prev, role: value }))}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder='Type'/>
                </SelectTrigger>
                <SelectContent>
                  {['admin', 'engineer', 'technician'].map((role, index) => (
                    <SelectItem key={ index } value={ role }>{ role }</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-3">
              <CardTitle>Location</CardTitle>
              <Input
                id='location'
                name='location'
                type='text'
                placeholder='---'
                value={ form.location }
                onChange={ handleChange }
                disabled={ isDisabled }
              />
            </div>
            {!isDisabled && (
              <Button type='submit'>Update</Button>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default Profile