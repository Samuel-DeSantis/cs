import {
  useEffect,
  useState,
  useCallback
} from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import {
  deleteProject,
  getProject,
  updateProject
} from '../../../../services/projects'
import { formatDate } from '../../../../utils/dates'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from '@/components/ui/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardAction
} from '@/components/ui/card'
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover"
import { Separator } from '@/components/ui/separator'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { Textarea } from '@/components/ui/textarea'
import styles from './styles.module.css'

const Project = () => {
  const { id } = useParams()
  const navigate = useNavigate()

// TODO: fetch users from backend
  const [users, setUsers] = useState([
    { username: 'mscott', role: 'editor' },
    { username: 'dwight', role: 'viewer' },
    { username: 'jim', role: 'editor' },
    { username: 'pam', role: 'viewer' },
  ])

  const blankForm = {
    name: null,
    description: null,
    client: null,
    location: null,
    status: null,
    startDate: null,
    endDate: null,
  }

  const [form, setForm] = useState(blankForm)
  const [isDisabled, setIsDisabled] = useState(true)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [openStart, setOpenStart] = useState(false)
  const [openEnd, setOpenEnd] = useState(false)

  const loadProject = useCallback(async () => {
    try {
      const data = await getProject(id)
      setForm(...blankForm, ...data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {loadProject()}, [loadProject])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async () => updateProject(form)

  const handleDelete = async () => {
    deleteProject({project_id: id})
    navigate('/projects')
  }
  
  if (loading) return <div>Loading project...</div>
  
  return (
    <div className="flex flex-col items-start justify-center w-full max-w-2xl p-6 mx-auto space-y-4 mb-24">
      <Card className='w-full justify-center dark:bg-neutral-950'>
        <CardHeader>
          <div className="flex items-center gap-4">
            <CardTitle className='text-2xl'>Project Details</CardTitle>
            {isDisabled && (
              <Button variant='outline' onClick={() => setIsDisabled(prev => !prev)}>Update info</Button>
            )}
            { !isDisabled && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">Delete</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete this project and remove your data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction className='bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60' asChild>
                        <Button onClick={() => handleDelete()}>Delete my project</Button>
                      </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog> 
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
                placeholder='---'
                value={ form.name }
                onChange={ handleChange }
                disabled={ isDisabled }
              />  
            </div>
            <div className="grid gap-3">
              <CardTitle>Description</CardTitle>
              <Textarea
                className='dark:bg-neutral-950'
                id='description'
                name='description'
                type='text'
                placeholder='---'
                value={ form.description }
                onChange={ handleChange }
                disabled={ isDisabled }
              />
            </div>
            <div className="grid gap-3">
              <CardTitle>Client</CardTitle>
              <Input
                id='client'
                name='client'
                type='text'
                placeholder='---'
                value={ form.client }
                onChange={ handleChange }
                disabled={ isDisabled }
              />
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
            <div className="grid gap-3">
              <CardTitle>Status</CardTitle>
              <Select
                name="type"
                value={ form.status }
                disabled={ isDisabled }
                onValueChange={value => setForm(prev => ({ ...prev, status: value }))}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder='---'/>
                </SelectTrigger>
                <SelectContent>
                  {['planning', 'in-progress', 'complete'].map((status, index) => (
                    <SelectItem key={ index } value={ status }>{ status }</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className='flex gap-8'>
              <div className="grid gap-3">
                <CardTitle>Start Date</CardTitle>
                <Popover open={ openStart } onOpenChange={ setOpenStart }>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      disabled={ isDisabled }
                      id="date-picker"
                      className="w-32 justify-between font-normal"
                    >{ form.startDate ? formatDate(form.startDate) : "Select date" }
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={ form.startDate ? new Date(form.endDate) : undefined }
                      captionLayout="dropdown"
                      onSelect={date => {
                        setForm(prev => ({ ...prev, startDate: new Date(date).toISOString() }))
                        setOpenStart(false)
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="grid gap-3">
                <CardTitle>End Date</CardTitle>
                <Popover open={ openEnd } onOpenChange={ setOpenEnd }>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      disabled={ isDisabled }
                      id="date-picker"
                      className="w-32 justify-between font-normal"
                    >{ form.startDate ? formatDate(form.endDate) : "Select date" }
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={ form.endDate ? new Date(form.endDate) : undefined }
                      captionLayout="dropdown"
                      disabled={date => form.startDate ? date < new Date(form.startDate) : false }
                      onSelect={date => {
                        setForm(prev => ({ ...prev, endDate: new Date(date).toISOString() }))
                        setOpenEnd(false)
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <Card>
              <CardContent>
                <div className="grid gap-3">
                  <div className='flex items-center gap-8'>
                    <CardTitle>Users</CardTitle>
                    {!isDisabled && (
                      <Button
                        type="button"
                        onClick={() => setUsers([...users, { username: '', role: 'viewer' }])}
                        variant="outline"
                      >Add User
                      </Button>
                    )}
                  </div>
                  <Separator />
                  {users.map((user, idx) => (
                    <div key={idx} className="flex gap-2 items-center mb-2">
                      <Input
                        value={ user.username }
                        onChange={e => {
                          const updated = [...users];
                          updated[idx].username = e.target.value;
                          setUsers(updated);
                        }}
                        placeholder="Username"
                        className="w-40"
                        disabled={isDisabled}
                      />
                      <Select
                        value={user.role}
                        onValueChange={value => {
                          const updated = [...users];
                          updated[idx].role = value;
                          setUsers(updated);
                        }}
                        disabled={isDisabled}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue placeholder="Role" />
                        </SelectTrigger>
                        <SelectContent>
                          {['owner', 'editor', 'viewer'].map(role => (
                            <SelectItem key={role} value={role}>{role}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {!isDisabled && (
                        <Button
                          type="button"
                          variant="destructive"
                          onClick={() => setUsers(users.filter((_, i) => i !== idx))}
                          size="icon"
                        >✕</Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            {!isDisabled && (
              <Button type='submit'>Update</Button>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default Project

// import { useParams } from 'react-router-dom'
// import { useEffect, useState, useCallback } from 'react'

// import { getProject } from '../../../../services/projects' // Adjust the import path as necessary
// import Form from './components/form'
// import Circuits from './components/circuits'

// const ProjectPage = () => {
//   const { id } = useParams()
//   const [project, setProject] = useState(null)
//   const [error, setError] = useState('')
//   const [circuitToEdit, setCircuitToEdit] = useState(null)
//   const [circuitToCopy, setCircuitToCopy] = useState(null)

//   const loadProject = useCallback(async () => {
//     try {
//       const data = await getProject(id) // pass the id here
//       setProject(data)
//       console.log('Project data:', data)
//       setCircuitToEdit(null)
//       setCircuitToEdit(null)
//     } catch (err) {
//       setError(err.message)
//     }
//   }, [id])

//   useEffect(() => {
//     loadProject()
//   }, [loadProject])

//   if (error) return <p>Error: {error}</p>
//   if (!project) return <p>Loading...</p>

//   return (
//     <div style={{ paddingBottom: '150px' }}>
//       <div>
//         <h2>{ project.name }</h2>
//         {/* <p>Client: { project.client }</p>
//         <p>Location: { project.location }</p>
//         <p>{ project.description }</p>
//         <p>Start: { project.startDate }</p>
//         <p>End: { project.endDate }</p>
//         <div>Users:
//           {project.users.map((user) => (
//             <div key={user.id}>{user.name} ({user.email})</div>
//           ))}
//         </div> */}
//       </div>
//       <Form
//         project_id={ id }
//         onCreate={ loadProject }
//         circuitToEdit={ circuitToEdit }
//         circuitToCopy={ circuitToCopy }
//         setCircuitToEdit={ setCircuitToEdit }
//         setCircuitToCopy={ setCircuitToCopy}
//       />
//       <Circuits
//         circuits={ project.circuits }
//         project_id={ id }
//         onDeleteCircuit={ loadProject }
//         onEditCircuit={ setCircuitToEdit }
//         onCopyCircuit={ setCircuitToCopy }
//       />
//     </div>
//   )
// }

// export default ProjectPage
