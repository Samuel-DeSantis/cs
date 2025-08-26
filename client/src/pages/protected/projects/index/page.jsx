import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import { createProject, getProjects } from '../../../../services/projects'
import Project from "./components/project"
import { formatDate } from '../../../../utils/dates'

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
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover"
import { Label } from '@/components/ui/label'
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import {
  Sheet,
  SheetClose,
  SheetFooter,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Textarea } from '@/components/ui/textarea'
import styles from "./styles.module.css"

const Projects = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [projects, setProjects] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [openSheet, setOpenSheet] = useState(false)
  const [form, setForm] = useState({
    name: "",
    description: "",
    client: "",
    location: "",
    status: "",
    startDate: null,
    endDate: null,
  })

  const [openStart, setOpenStart] = useState(false)
  const [openEnd, setOpenEnd] = useState(false)

  const loadProjects = async () => {
    try {
      const data = await getProjects()
      setProjects(data)
    } catch (err) {
      console.error(err)
      setError(err.message || 'Error loading projects')
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => { loadProjects() }, [])
  useEffect(() => {if (!openSheet) handleClear() }, [openSheet])

  const handleClear = () => setForm({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async e => {
    // e.preventDefault()
    try {
      await createProject({ ...form, users: [user?.id] })
    } catch (err) {
      console.error(err)
      setError(err.message || 'Error creating project')
    }
  }

  if (loading) return <p>Loading projects...</p>
  if (error) return <p style={{ color: 'red' }}>{ error }</p>

  return (
    <main className={ styles.container }>
      <div className='flex gap-6'>
        <h1 className="text-2xl pb-6 font-semibold text-balance">Your Projects</h1>
        <Button variant='outline' onClick={() => setOpenSheet(true)}>Create a new project</Button>
      </div>
      <Sheet open={ openSheet } onOpenChange={ setOpenSheet }>
        <SheetContent>
          <SheetHeader className='pt-8'>
            <SheetTitle className='text-xl'>Create Project</SheetTitle>
          </SheetHeader>
          <Separator/>
          <form onSubmit={ handleSubmit } className="flex flex-col h-full">
      <SheetDescription asChild>
        <div className="grid flex-1 auto-rows-min gap-6 px-4">
          <div className="grid gap-3">
            <CardTitle>Name (required)</CardTitle>
            <Input
              id='name'
              name='name'
              type='text'
              placeholder='---'
              value={ form.name }
              onChange={ handleChange }
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
            />
          </div>
          <div className="grid gap-3">
            <CardTitle>Status</CardTitle>
            <Select
              name="type"
              value={ form.status }
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
            <div className='flex justify-between'> {/* TODO: Fix date selectors */}
              <div className="grid gap-3">
                <CardTitle>Start Date</CardTitle>
                <Popover open={ openStart } onOpenChange={ setOpenStart }>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      id="date-picker"
                      className="w-32 justify-between font-normal"
                    >{ form.startDate ? formatDate(form.startDate) : "---" }
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={ form.startDate ? new Date(form.startDate) : undefined }
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
                      id="date-picker"
                      className="w-32 justify-between font-normal"
                    >{ form.endDate ? formatDate(form.endDate) : "---" }
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={ form.endDate ? new Date(form.endDate) : undefined }
                      captionLayout="dropdown"
                      onSelect={date => {
                        setForm(prev => ({ ...prev, endDate: new Date(date).toISOString() }))
                        setOpenEnd(false)
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
          </SheetDescription>
          <SheetFooter>
            <Button type='submit' onClick={() => handleClear}>Create project</Button>
            <SheetClose asChild>
              <Button variant='outline'>Close</Button>
            </SheetClose>
          </SheetFooter>
            </form>
        </SheetContent>
      </Sheet>
      {projects.length === 0 ? (
        <p>No projects found.</p>
      ) : (
        <div className={ styles.projects }>
          {projects.map(project => (
            <Project
              key={ project._id }
              project={ project }
              onDelete={ loadProjects }
            />
          ))}
        </div>
      )}
      {/* <div>
        <Link to="/project/new" tabIndex="-1">
          <Button variant='outline'>Create a new project</Button> {/* TODO: Update from NEW page to popover like equipment, circuts, etc. for consistency. 
        </Link>
      </div> */}
    </main>
  )
}

export default Projects
