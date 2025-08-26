import {
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react"
import { useParams } from "react-router-dom"

import { 
  createCircuit,
  deleteCircuit,
  getCircuits,
  updateCircuit,
} from '../../../../../services/circuits.js'
import { designatorConsts } from "./components/consts.js"
import { equipmentConsts } from "../equipment/components/consts.js"

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
// import {
//   Command,
//   CommandInput,
//   CommandList,
//   CommandItem,
//   CommandEmpty,
// } from "@/components/ui/command"
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

const Circuits = () => {
  const { id: project_id } = useParams()

  const [form, setForm] = useState({})
  const [sort, setSort] = useState({ key: null, direction: 'asc' })
  const [filter, setFilter] = useState('')
  const [isEdit, setIsEdit] = useState(false)
  const [openSheet, setOpenSheet] = useState(false)

  const [circuits, setCircuits] = useState([])
  const [equipment, setEquipment] = useState([])
  const [cables, setCables] = useState([])

  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const user_id = JSON.parse(localStorage.getItem('user')).id

  const units = {
    imperial: 'ft',
    metric: 'm'
  }

  const loadCircuit = useCallback(async() => {
    try {
      const data = await getCircuits(project_id)
      setCircuits(data.circuits)
      setEquipment(data.equipment)
      setCables(data.cables)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [project_id])

  useEffect(() => loadCircuit, [loadCircuit])
  useEffect(() => {if (!openSheet) handleClear() }, [openSheet])

  const sortedData = useMemo(() => {
    return [...circuits].sort((a, b) => {
      const aValue = a[sort.key] ?? ''
      const bValue = b[sort.key] ?? ''

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sort.direction === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue)
      }
      if (aValue < bValue) return sort.direction === 'asc' ? -1 : 1
      if (aValue > bValue) return sort.direction === 'asc' ? 1 : -1
      return 0
    })
  }, [circuits, sort])

  const handleSort = key => {
    let direction = 'asc'
    if (sort.key === key && sort.direction === 'asc') { direction = 'desc' }
    setSort({ key, direction })
  }

  const filteredData = useMemo(() => {
    const columns = ['circuit_number', 'designator', 'tag', 'drawing', 'length', 'from', 'to', 'comments', 'rev']
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
      designator: record.designator,
      tag: record.tag,
      drawing: record.drawing,
      length: record.length,
      from: record.from._id,
      to: record.to._id,
      comments: record.comments,
      rev: record.rev,
    })
  }

  const handleEdit = (record) => {
    setIsEdit(true)
    setForm(record)
  }

  const handleDelete = async record => {
    try {    
      await deleteCircuit({
        user: user_id,
        circuit: record
      })
      await loadCircuit()
    } catch (err) {
      setError(err.message)
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()

    try {
      if (isEdit) {
        console.log({
          user: user_id,
          circuit: form,
          circuit_number: `${form.designator}-${form.tag}`
        })
        await updateCircuit({
          user: user_id,
          circuit: form
        })
      } else {
        console.log({
          user: user_id,
          circuit: {
            ...form,
            circuit_number: `${form.designator}-${form.tag}`,
            project: project_id,
            cables: [],
          }
        })
        await createCircuit({
          user: user_id,
          circuit: {
            ...form,
            circuit_number: `${form.designator}-${form.tag}`,
            project: project_id,
            cables: [],
          }
        })
      }
      await loadCircuit()
      setForm({})
    } catch (err) {
      setError(err.message)
    }
  }

  if (loading) return <p>Loading...</p> // TODO: Replace with a skeleton table.
  if (error) return <p style={{ color: 'red' }}>{error}</p>

  return (
    <div className="flex flex-col align-middle justify-center m-auto p-4">
      <h1 className="text-2xl font-semibold text-balance mb-4">Circuits Schedule</h1>
      <div className="flex max-w-sm gap-4 mb-4">
        <div className="flex pb-2 gap-4">
          <Input
            type="text"
            placeholder="Search..."
            value={ filter }
            onChange={e => setFilter(e.target.value)}
          />
          <Button variant='outline' onClick={() => setOpenSheet(true)}>{ isEdit ? 'Edit' : 'Create' } circuit</Button>
          <Button variant='outline'>Export</Button>
        </div>
        <Sheet open={ openSheet } onOpenChange={ setOpenSheet }>
          <SheetContent>
            <SheetHeader className='pt-8'>
              <SheetTitle className='text-xl'>{ isEdit ? 'Edit' : 'Create' } circuit</SheetTitle>
            </SheetHeader>
            <Separator/>
              <form onSubmit={ handleSubmit } className="flex flex-col h-full">
            <SheetDescription asChild>
              <div className="grid flex-1 auto-rows-min gap-6 px-4">
                <div className="grid gap-3">
                  <Label htmlFor='designator'>Designator (required)</Label>
                  <Select
                    name="designator"
                    value={ form.designator || ''}
                    onValueChange={value => setForm(prev => ({ ...prev, designator: value }))}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder='---'/>
                    </SelectTrigger>
                    <SelectContent>
                      { designatorConsts.map((item, index) => (
                        <SelectItem key={ index } value={ item.value }>
                          { item.label }
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor='tag'>Tag (required)</Label>
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
                  <Label htmlFor='drawing'>Drawing</Label>
                  <Input
                    id='drawing'
                    name='drawing'
                    type='text'
                    value={ form.drawing || ''}
                    placeholder='---'
                    onChange={ handleChange }
                    required
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor='length'>Length</Label>
                  <Input
                    id='length'
                    name='length'
                    type='number'
                    value={ form.length || ''}
                    placeholder='---'
                    onChange={ handleChange }
                    required
                  />
                </div>
                {/* From */}
                
                {/* <div className="grid gap-3">
                  <Label htmlFor='from'>From</Label>
                  <Select
                    name="from"
                    value={ form.from || ''}
                    onValueChange={value => setForm(prev => ({ ...prev, from: value }))}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder='Type'/>
                    </SelectTrigger>
                    <SelectContent className='max-h-48 overflow-y-auto'>
                      { equipment
                          .filter(equip => equip._id !== form.to)
                          .map((equip, index) => (
                            <SelectItem key={ index } value={ equip._id }>
                              { equip.tag }
                            </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div> */}
                {/* To */}
                {/* <div className="grid gap-3">
                  <Label htmlFor='type'>Type</Label>
                  <Select
                    name="type"
                    value={ form.type || ''}
                    onValueChange={value => setForm(prev => ({ ...prev, type: value }))}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder='Type'/>
                    </SelectTrigger>
                    <SelectContent>
                      { circuitConsts.map((item, index) => (
                        <SelectItem key={ index } value={ item.value }>
                          { item.label }
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div> */}
                <div className="grid gap-3">
                  <Label htmlFor='location'>Comments</Label>
                  <Input
                    id='comments'
                    name='comments'
                    type='text'
                    value={ form.comments || ''}
                    placeholder='---'
                    onChange={ handleChange }
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor='location'>Rev</Label>
                  <Input
                    id='rev'
                    name='rev'
                    type='text'
                    value={ form.rev || ''}
                    placeholder='---'
                    onChange={ handleChange }
                  />
                </div>
              </div>
            </SheetDescription>
            <SheetFooter>
              <Button type='submit' onClick={() => handleClear}>{ isEdit ? 'Edit' : 'Create'} circuit</Button>
              <SheetClose asChild>
                <Button variant='outline'>Close</Button>
              </SheetClose>
            </SheetFooter>
              </form>
          </SheetContent>
        </Sheet>
      </div>
      <div className="overflow-hidden rounded-md border max-w-5xl">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead></TableHead>
              <TableHead onClick={() => handleSort('circuit_number')}>Circuit { sort.key === 'circuit_number' ? (sort.direction === 'asc' ? '↑' : '↓') : '' }</TableHead>
              <TableHead onClick={() => handleSort('designator')}>Designator { sort.key === 'designator' ? (sort.direction === 'asc' ? '↑' : '↓') : '' }</TableHead>
              <TableHead onClick={() => handleSort('tag')}>Tag { sort.key === 'tag' ? (sort.direction === 'asc' ? '↑' : '↓') : '' }</TableHead>
              <TableHead onClick={() => handleSort('drawing')}>Drawing { sort.key === 'drawing' ? (sort.direction === 'asc' ? '↑' : '↓') : '' }</TableHead>
              <TableHead onClick={() => handleSort('length')}>Length { sort.key === 'length' ? (sort.direction === 'asc' ? '↑' : '↓') : '' }</TableHead>
              <TableHead onClick={() => handleSort('from')}>From { sort.key === 'from' ? (sort.direction === 'asc' ? '↑' : '↓') : '' }</TableHead>
              <TableHead onClick={() => handleSort('to')}>To { sort.key === 'to' ? (sort.direction === 'asc' ? '↑' : '↓') : '' }</TableHead>
              <TableHead onClick={() => handleSort('comments')}>Comments { sort.key === 'comments' ? (sort.direction === 'asc' ? '↑' : '↓') : '' }</TableHead>
              <TableHead onClick={() => handleSort('rev')}>Rev { sort.key === 'rev' ? (sort.direction === 'asc' ? '↑' : '↓') : '' }</TableHead>
              <TableHead style={{ width: '20px' }}>Copy</TableHead>
              <TableHead style={{ width: '20px' }}>Edit</TableHead>
              <TableHead style={{ width: '20px' }}>Delete</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((record, index) => (
              <TableRow key={ index }>
                <TableCell>{ index + 1 }</TableCell>
                <TableCell>{ record.circuit_number }</TableCell>
                <TableCell>{ record.designator }</TableCell>
                <TableCell>{ record.tag }</TableCell>
                <TableCell>{ record.drawing }</TableCell>
                 {/* TODO: Update user preferences to select preferred units. */}
                <TableCell>{ record.length } { true ? units.imperial : units.metric }</TableCell>
                <TableCell>{ record.from.tag }</TableCell>
                <TableCell>{ record.to.tag }</TableCell>
                <TableCell>{ record.comments }</TableCell>
                <TableCell>{ record.rev }</TableCell>
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
    // <div className={ styles.container }>
    //   <div>
    //     <h2>{ isEdit ? 'Edit' : 'Create' } Circuit <Button onClick={ handleClear }>Clear</Button></h2>
    //     <form onSubmit={ handleSubmit } className={ styles.formWrapper }>
    //       <div style={{ display: 'flex', gap: '20px', maxWidth: '200px'}}>
    //         <Input
    //           label='Designator'
    //           id='designator'
    //           name='designator'
    //           type='select'
    //           style={{ maxWidth: '200px'}}
    //           options={[
    //             {value: 'P', label: 'P - Three Phase'},
    //             {value: 'S', label: 'S - Single Phase'},
    //             {value: 'C', label: 'C - Control'},
    //             {value: 'M', label: 'M - Medium Volt.'},
    //             {value: 'D', label: 'D - Digital'},
    //             {value: 'F', label: 'F - Fiber'},
    //             {value: 'G', label: 'G - Ground'},
    //           ]}
    //           value={ form.designator || ''}
    //           onChange={ handleChange }
    //           required
    //         />
    //         <Input
    //           label='Tag'
    //           id='tag'
    //           name='tag'
    //           placeholder='ELE-1234'
    //           style={{ maxWidth: '100px'}}
    //           type='text'
    //           // value={ form.tag || ''}
    //           onChange={ handleChange }
    //           required
    //         />
    //         <Input
    //           label='Drawing'
    //           id='drawing'
    //           name='drawing'
    //           placeholder='ELE-1234'
    //           style={{ maxWidth: '100px'}}
    //           type='text'
    //           value={ form.drawing || ''}
    //           onChange={ handleChange }
    //           required
    //         />
    //         <Input
    //           label='Length (ft)'
    //           id='length'
    //           name='length'
    //           placeholder='100'
    //           style={{ maxWidth: '75px'}}
    //           type='number'
    //           value={ form.length || ''}
    //           onChange={ handleChange }
    //         />
    //         <Input
    //           label='From'
    //           id='from'
    //           name='from'
    //           placeholder='100'
    //           style={{ maxWidth: '150px'}}
    //           type='select'
    //           options={
    //             equipment
    //               .filter(equip => equip._id !== form.to)
    //               .map(equip => ({ value: equip._id, label: equip.tag }))
    //             }
    //           value={ form.from || ''}
    //           onChange={ handleChange }
    //         />
    //         <Input
    //           label='To'
    //           id='to'
    //           name='to'
    //           placeholder='100'
    //           style={{ maxWidth: '150px'}}
    //           type='select'
    //           options={
    //             equipment
    //               .filter(equip => equip._id !== form.from)
    //               .map(equip => ({ value: equip._id, label: equip.tag }))
    //             }
    //           value={ form.to || ''}
    //           onChange={ handleChange }
    //         />
    //         <Input
    //           label='Comments'
    //           id='comments'
    //           name='comments'
    //           placeholder='100'
    //           style={{ maxWidth: '200px'}}
    //           type='text'
    //           value={ form.comments || ''}
    //           onChange={ handleChange }
    //         />
    //         <Input
    //           label='Rev'
    //           id='rev'
    //           name='rev'
    //           placeholder='100'
    //           style={{ maxWidth: '50px'}}
    //           type='text'
    //           value={ form.rev || ''}
    //           onChange={ handleChange }
    //         />
    //       </div>
    //       <div>
    //         <Button type='submit'>{ isEdit ? 'Edit' : 'Create'} circuits</Button>
    //       </div>
    //       {error && (
    //         <div>
    //           <Alert variant="error" onClose={() => setError('')}>{ error }</Alert>
    //         </div>
    //       )}
    //     </form>
    //   </div>
    //   <div style={{maxWidth: '400px'}}>
    //     <Input
    //       type="text"
    //       placeholder="Search..."
    //       value={ filter }
    //       onChange={(e) => setFilter(e.target.value)}
    //       // className={styles.filterInput}
    //     />
    //   </div>
    //   <div className={ styles.tableContainer }>
    //     <div className={ styles.tableWrapper }>
    //       <table className={ styles.table }>
    //         <thead>
    //           <tr>
    //             <th style={{width: '20px'}}>Index</th>
    //             <th onClick={() => handleSort('circuit_number')}>Circuit { sort.key === 'circuit_number' ? (sort.direction === 'asc' ? '↑' : '↓') : '' }</th>
    //             <th onClick={() => handleSort('designator')}>Designator { sort.key === 'designator' ? (sort.direction === 'asc' ? '↑' : '↓') : '' }</th>
    //             <th onClick={() => handleSort('tag')}>Tag { sort.key === 'tag' ? (sort.direction === 'asc' ? '↑' : '↓') : '' }</th>
    //             <th onClick={() => handleSort('drawing')}>Drawing { sort.key === 'drawing' ? (sort.direction === 'asc' ? '↑' : '↓') : '' }</th>
    //             <th onClick={() => handleSort('length')}>Length { sort.key === 'length' ? (sort.direction === 'asc' ? '↑' : '↓') : '' }</th>
    //             <th onClick={() => handleSort('from')}>From { sort.key === 'from' ? (sort.direction === 'asc' ? '↑' : '↓') : '' }</th>
    //             <th onClick={() => handleSort('to')}>To { sort.key === 'to' ? (sort.direction === 'asc' ? '↑' : '↓') : '' }</th>
    //             <th onClick={() => handleSort('comments')}>Comments { sort.key === 'comments' ? (sort.direction === 'asc' ? '↑' : '↓') : '' }</th>
    //             <th onClick={() => handleSort('rev')}>Rev { sort.key === 'rev' ? (sort.direction === 'asc' ? '↑' : '↓') : '' }</th>
    //             <th style={{width: '20px'}}>Copy</th>
    //             <th style={{width: '20px'}}>Edit</th>
    //             <th style={{width: '20px'}}>Delete</th>
    //           </tr>
    //         </thead>
    //         <tbody className={ styles.tbody }>
    //           {filteredData.map((record, index) => (
    //             <tr key={ index }>
    //               <td>{ index }</td>
    //               <td>{ record.circuit_number }</td>
    //               <td>{ record.designator }</td>
    //               <td>{ record.tag }</td>
    //               <td>{ record.drawing }</td>
    //               <td>{ record.length ? `${record.length}'` : '-' }</td>
    //               <td>{ 'asd' }</td>
    //               <td>{ 'asd' }</td>
    //               <td>{ record.comments }</td>
    //               <td>{ record.rev }</td>
    //               <td onClick={() => handleCopy(record)}><Copy /></td>
    //               <td onClick={() => handleEdit(record)}><Edit /></td>
    //               <td onClick={() => handleDelete(record)}><Trash /></td>
    //             </tr>
    //           ))}
    //         </tbody>
    //       </table>
    //     </div>
    //   </div>
    // </div>
  )
}

export default Circuits