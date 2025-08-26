import {
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react"
import { useParams } from "react-router-dom"

import { 
  createEquipment, 
  deleteEquipment,
  getEquipment,
  updateEquipment,
} from "../../../../../services/equipment"
import { equipmentConsts } from './components/consts'
import { Copy, Edit, Delete } from '../../../../components/library/icon/component'

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
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import styles from './styles.module.css'
// import exporter from '../../../../../utils/exporter'
import Exporter from '../../../../../utils/exporter' 

const Equipment = () => {
  const [form, setForm] = useState({})
  const [sort, setSort] = useState({ key: null, direction: 'asc' })
  const [filter, setFilter] = useState('')
  const [isEdit, setIsEdit] = useState(false)
  const [openSheet, setOpenSheet] = useState(false)

  const [equipment, setEquipment] = useState([])

  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const user_id = JSON.parse(localStorage.getItem('user')).id
  const { id: project_id } = useParams()

  const loadEquipment = useCallback(async() => {
    try {
      const data = await getEquipment(project_id)
      setEquipment(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [project_id])

  useEffect(() => loadEquipment, [loadEquipment])
  useEffect(() => {if (!openSheet) handleClear() }, [openSheet])

  const sortedData = useMemo(() => {
    return [...equipment].sort((a, b) => {
      const aValue = a[sort.key]
      const bValue = b[sort.key]

      if (aValue < bValue) return sort.direction === 'asc' ? -1 : 1
      if (aValue > bValue) return sort.direction === 'asc' ? 1 : -1
      return 0
    })
  }, [equipment, sort])

  const handleSort = key => {
    let direction = 'asc'
    if (sort.key === key && sort.direction === 'asc') {
      direction = 'desc'
    }
    setSort({ key, direction })
  }

  const filteredData = useMemo(() => {
    const columns = ['type', 'tag', 'location']
    return sortedData.filter(row => 
      columns.some(column => {
        const value = row[column]
        return value && value.toString().toLowerCase().includes(filter.toLowerCase())
      })
    )
  }, [sortedData, filter])

  const handleClear = () => {
    setForm({})
    setIsEdit(false)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleCopy = (record) => {
    setIsEdit(false)
    setForm({
      type: record.type,
      tag: record.tag,
      location: record.location
    })
  }

  const handleEdit = (record) => {
    setIsEdit(true)
    setForm(record)
  }

  const handleDelete = async record => {
    try {    
      await deleteEquipment({
        user: user_id,
        equipment: record
      })
      await loadEquipment()
    } catch (err) {
      setError(err.message)
    }
  }

  const handleSubmit = async e => {
    // e.preventDefault()

    try {
      if (isEdit) {
        // console.log({
        //   user: user_id,
        //   equipment: form
        // })
        await updateEquipment({
          user: user_id,
          equipment: form
        })
      } else {
        // console.log('Create: ',{
        //   user: user_id,
        //   equipment: {
        //     ...form,
        //     project: project_id,
        //     circuits: []
        //   }
        // })
        await createEquipment({
          user: user_id,
          equipment: {
            ...form,
            project: project_id,
            circuits: []
          }
        })
      }
      await loadEquipment()
      setForm({})
    } catch (err) {
      setError(err.message)
    }
  }

  const Export = async () => {
    let exporter = new Exporter('equipment.xlsx');
    exporter.addSheet(equipment, 'Equipment', ['_id', '__v'])
    await exporter.save()
  }

  if (loading) return <p>Loading...</p> // TODO: Replace with a skeleton table.
  if (error) return <p style={{ color: 'red' }}>{error}</p>

  return (
    <div className="flex flex-col align-middle justify-center m-auto p-4">
      <h1 className="text-2xl font-semibold text-balance mb-4">Equipment Schedule</h1>
      <div className="flex max-w-sm gap-4 mb-4">
        <div className="flex pb-2 gap-4">
          <Input
            type="text"
            placeholder="Search..."
            value={ filter }
            onChange={e => setFilter(e.target.value)}
          />
          <Button variant='outline' onClick={() => setOpenSheet(true)}>{ isEdit ? 'Edit' : 'Create' } equipment</Button>
          <Button variant='outline' onClick={ Export }>Export</Button>
        </div>
        <Sheet open={openSheet} onOpenChange={ setOpenSheet }>
          <SheetContent>
            <SheetHeader className='pt-8'>
              <SheetTitle className='text-xl'>{ isEdit ? 'Edit' : 'Create' } equipment</SheetTitle>
            </SheetHeader>
            <Separator/>
              <form onSubmit={ handleSubmit } className="flex flex-col h-full">
            <SheetDescription asChild>
              <div className="grid flex-1 auto-rows-min gap-6 px-4">
                <div className="grid gap-3">
                  <Label htmlFor='type'>Type</Label>
                  <Select
                    name="type"
                    value={ form.type || ''}
                    onValueChange={value => setForm(prev => ({ ...prev, type: value }))}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder='---'/>
                    </SelectTrigger>
                    <SelectContent>
                      { equipmentConsts.map((item, index) => (
                        <SelectItem key={ index } value={ item.value }>
                          { item.label }
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor='tag'>Tag</Label>
                  <Input
                    id='tag'
                    name='tag'
                    type='text'
                    value={ form.tag || ''}
                    placeholder='---'
                    onChange={ handleChange }
                    required
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor='location'>Location</Label>
                  <Input
                    id='location'
                    name='location'
                    type='text'
                    value={ form.location || ''}
                    placeholder='---'
                    onChange={ handleChange }
                    required
                  />
                </div>
              </div>
            </SheetDescription>
            <SheetFooter>
              <Button type='submit' onClick={() => handleClear}>{ isEdit ? 'Edit' : 'Create'} equipment</Button>
              <SheetClose asChild>
                <Button variant='outline'>Close</Button>
              </SheetClose>
            </SheetFooter>
              </form>
          </SheetContent>
        </Sheet>
      </div>
      <div className="max-h-[800px] overflow-y-auto rounded-md border max-w-5xl">
        <Table className='w-full'>
          <TableHeader>
            <TableRow>
              <TableHead></TableHead>
              <TableHead onClick={() => handleSort('type')}>Type { sort.key === 'type' ? (sort.direction === 'asc' ? '↑' : '↓') : '' }</TableHead>
              <TableHead onClick={() => handleSort('tag')}>Tag { sort.key === 'tag' ? (sort.direction === 'asc' ? '↑' : '↓') : '' }</TableHead>
              <TableHead onClick={() => handleSort('location')}>Location { sort.key === 'location' ? (sort.direction === 'asc' ? '↑' : '↓') : '' }</TableHead>
              <TableHead style={{ width: '20px' }}>Copy</TableHead>
              <TableHead style={{ width: '20px' }}>Edit</TableHead>
              <TableHead style={{ width: '20px' }}>Delete</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((record, index) => (
              <TableRow key={ index }>
                <TableCell>{ index+1 }</TableCell>
                <TableCell>{ record.type }</TableCell>
                <TableCell>{ record.tag }</TableCell>
                <TableCell>{ record.location }</TableCell>
                <TableCell onClick={() => {
                  setOpenSheet(true)
                  handleCopy(record)
                }}><Copy /></TableCell>
                <TableCell onClick={() => {
                  setOpenSheet(true)
                  handleEdit(record)
                }}><Edit /></TableCell>
                <TableCell>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <button><Delete /></button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete this item and remove your data from our servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete(record)}>Delete equipment</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default Equipment