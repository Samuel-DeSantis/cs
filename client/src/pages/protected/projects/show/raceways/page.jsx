import {
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react"
import { useParams } from "react-router-dom"

import { 
  createRaceway,
  deleteRaceway,
  getRaceway,
  updateRaceway,
} from '../../../../../services/raceways.js'
// import { racewayConsts } from "./components/raceway"

// import Input from "../../../../components/library/input/component"
// import Button from "../../../../components/library/button/component"
// import Alert from "../../../../components/library/alert/component"
// import { Copy, Edit, Trash } from "../../../../components/library/svgs"
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
import { Copy, Edit, Delete } from '../../../../components/library/icon/component.jsx'
import styles from './styles.module.css'

const Raceways = () => {
  const [form, setForm] = useState({})
  const [sort, setSort] = useState({ key: null, direction: 'asc' })
  const [filter, setFilter] = useState('')
  const [isEdit, setIsEdit] = useState(false)
  const [openSheet, setOpenSheet] = useState(false)

  const [raceways, setRaceways] = useState([])

  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const user_id = JSON.parse(localStorage.getItem('user')).id
  const { id: project_id } = useParams()

  const loadRaceway = useCallback(async() => {
    try {
      const data = await getRaceway(project_id)
      setRaceways(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [project_id])

  useEffect(() => loadRaceway, [loadRaceway])

  const sortedData = useMemo(() => {
    return [...raceways].sort((a, b) => {
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
  }, [raceways, sort])

  const handleSort = key => {
    let direction = 'asc'
    if (sort.key === key && sort.direction === 'asc') {
      direction = 'desc'
    }
    setSort({ key, direction })
  }

  const filteredData = useMemo(() => {
    const columns = ['tag', 'kind', 'type', 'material', 'length', 'size', 'id', 'height', 'width']
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
    switch (record.kind) {
      case 'Conduit':
        setForm({
          tag: record.tag,
          length: record.length,
          kind: record.kind,
          type: record.type,
          material: record.material,
          size: record.size,
          id: record.id,
        })
        break
      case 'Tray':
        setForm({
          tag: record.tag,
          length: record.length,
          kind: record.kind,
          height: record.height,
          width: record.width,
          material: record.material,
        })
        break
      default:
        setForm({
          tag: record.tag,
          length: record.length,
          kind: 'Other',
        })
    }
  }

  const handleEdit = (record) => {
    setIsEdit(true)
    setForm(record)
  }

  const handleDelete = async record => {
    if (!window.confirm('Are you sure you want to delete this record?')) return
    try {    
      await deleteRaceway({
        user: user_id,
        raceways: record
      })
      await loadRaceway()
    } catch (err) {
      setError(err.message)
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()

    try {
      if (isEdit) {
        await updateRaceway({
          user: user_id,
          raceway: form
        })
      } else {
        await createRaceway({
          user: user_id,
          raceway: {
            ...form,
            project: project_id,
            cables: []
          }
        })
      }
      await loadRaceway()
      setForm({})
    } catch (err) {
      setError(err.message)
    }
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p style={{ color: 'red' }}>{error}</p>

  return (
    <div className="flex flex-col align-middle justify-center m-auto p-4">
      <h1 className="text-2xl font-semibold text-balance mb-4">Raceway Schedule</h1>
      <div className="flex max-w-sm gap-4 mb-4">
        <div className="flex pb-2 gap-4">
          <Input
            type="text"
            placeholder="Search..."
            value={ filter }
            onChange={e => setFilter(e.target.value)}
          />
          <Button variant='outline' onClick={() => setOpenSheet(true)}>{ isEdit ? 'Edit' : 'Create' } equipment</Button>
          <Button variant='outline'>Export</Button>
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
                {/* <div className="grid gap-3">
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
                </div> */}
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
                {/* <div className="grid gap-3">
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
                </div> */}
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
      <div className="overflow-hidden rounded-md border max-w-5xl">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead></TableHead>
              <TableHead onClick={() => handleSort('tag')}>Tag { sort.key === 'tag' ? (sort.direction === 'asc' ? '↑' : '↓') : '' }</TableHead>
              <TableHead onClick={() => handleSort('cables')}>Cables { sort.key === 'cables' ? (sort.direction === 'asc' ? '↑' : '↓') : '' }</TableHead>
              <TableHead onClick={() => handleSort('kind')}>Kind { sort.key === 'kind' ? (sort.direction === 'asc' ? '↑' : '↓') : '' }</TableHead>
              <TableHead onClick={() => handleSort('type')}>Type { sort.key === 'type' ? (sort.direction === 'asc' ? '↑' : '↓') : '' }</TableHead>
              <TableHead onClick={() => handleSort('material')}>Material { sort.key === 'material' ? (sort.direction === 'asc' ? '↑' : '↓') : '' }</TableHead>
              <TableHead onClick={() => handleSort('length')}>Length { sort.key === 'length' ? (sort.direction === 'asc' ? '↑' : '↓') : '' }</TableHead>
              <TableHead onClick={() => handleSort('size')}>Size { sort.key === 'size' ? (sort.direction === 'asc' ? '↑' : '↓') : '' }</TableHead>
              <TableHead onClick={() => handleSort('id')}>I.D. { sort.key === 'id' ? (sort.direction === 'asc' ? '↑' : '↓') : '' }</TableHead>
              <TableHead onClick={() => handleSort('height')}>Height { sort.key === 'height' ? (sort.direction === 'asc' ? '↑' : '↓') : '' }</TableHead>
              <TableHead onClick={() => handleSort('width')}>Width { sort.key === 'width' ? (sort.direction === 'asc' ? '↑' : '↓') : '' }</TableHead>
              <TableHead style={{ width: '20px' }}>Copy</TableHead>
              <TableHead style={{ width: '20px' }}>Edit</TableHead>
              <TableHead style={{ width: '20px' }}>Delete</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((record, index) => (
              <TableRow key={ index }>
                <TableCell>{ index + 1 }</TableCell>
                <TableCell>{ record.tag }</TableCell>
                <TableCell>{ record.cables.length }</TableCell>
                <TableCell>{ record.kind || '-' }</TableCell>
                <TableCell>{ record.type || '-' }</TableCell>
                <TableCell>{ record.material || '-' }</TableCell>
                <TableCell>{ record.length || '-' }</TableCell>
                <TableCell>{ record.size || '-' }</TableCell>
                <TableCell>{ record.id || '-' }</TableCell>
                <TableCell>{ record.height || '-' }</TableCell>
                <TableCell>{ record.width || '-' }</TableCell>
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

export default Raceways

{/* <div className={ styles.container }>
      <div>
        <h2>{ isEdit ? 'Edit' : 'Create' } Raceway</h2>
        <form onSubmit={ handleSubmit } className={ styles.formWrapper }>
          <div style={{ display: 'flex', gap: '20px', maxWidth: '200px'}}>
            <Input
              label='Tag'
              id='tag'
              name='tag'
              placeholder='1234...'
              type='text'
              value={ form.tag || ''}
              onChange={ handleChange }
              required
            />
            <Input
              label='Length (ft)'
              id='length'
              name='length'
              placeholder='100'
              type='number'
              value={ form.length || ''}
              onChange={ handleChange }
            />
            <Input
              label='Kind'
              id='kind'
              name='kind'
              type='select'
              options={[
                {value: 'Conduit', label: 'Conduit'},
                {value: 'Tray', label: 'Tray'},
                {value: 'Other', label: 'Other'},
              ]}
              value={ form.kind || ''}
              onChange={ handleChange }
              required
            />
          </div>
            {form.kind === 'Conduit' && (
              <div style={{ display: 'flex', gap: '20px', maxWidth: '200px'}}>
                <Input
                  label='Type'
                  id='type'
                  name='type'
                  type='select'
                  style={{ maxWidth: '150px' }}
                  options={[
                    {value: 'Sch. 40', label: 'Sch. 40'},
                    {value: 'Sch. 80', label: 'Sch. 80'},
                  ]}
                  value={form.type || ''}
                  onChange={ handleChange }
                  required
                />
                <Input
                  label='Material'
                  id='material'
                  name='material'
                  type='select'
                  style={{ maxWidth: '150px' }}
                  options={[
                    {value: 'PVC', label: 'PVC'},
                    {value: 'RMC', label: 'RMC'},
                    {value: 'HDPE', label: 'HDPE'},
                    {value: 'ENT', label: 'ENT'},
                    {value: 'LFMC', label: 'LFMC'},
                  ]}
                  value={form.material || ''}
                  onChange={ handleChange }
                  required
                />
                <Input
                  label='Size (in)'
                  id='size'
                  name='size'
                  placeholder='Room 101'
                  type='text'
                  style={{ maxWidth: '50px' }}
                  required
                  value={ form.size || ''}
                  onChange={ handleChange }
                />
                <Input
                  label='I.D. (in)'
                  id='id'
                  name='id'
                  placeholder='Room 101'
                  type='text'
                  style={{ maxWidth: '50px' }}
                  required
                  value={ form.id || ''}
                  onChange={ handleChange }
                />
              </div>
            )}
            {form.kind === 'Tray' && (
              <div style={{ display: 'flex', gap: '20px', maxWidth: '200px'}}>
                <Input
                  label='Height (in)'
                  id='height'
                  name='height'
                  type='text'
                  style={{ maxWidth: '75px' }}
                  value={form.height || ''}
                  onChange={ handleChange }
                  required
                />
                <Input
                  label='Width (in)'
                  id='width'
                  name='width'
                  type='select'
                  style={{ maxWidth: '150px' }}
                  options={[
                    {value: '10', label: '10'},
                    {value: '12', label: '12'},
                    {value: '16', label: '16'},
                    {value: '18', label: '18'},
                    {value: '20', label: '20'},
                    {value: '24', label: '24'},
                    {value: '30', label: '30'},
                  ]}
                  value={form.width || ''}
                  onChange={ handleChange }
                  required
                />
                <Input
                  label='Material'
                  id='material'
                  name='material'
                  type='select'
                  options={[
                    {value: 'Aluminum', label: 'Aluminum'},
                    {value: 'Steel', label: 'Steel'},
                    {value: 'Stainless Steel', label: 'Stainless Steel'},
                    {value: 'Fiberglass', label: 'Fiberglass'},
                  ]}
                  value={form.material || ''}
                  onChange={ handleChange }
                  required
                />
              </div>
          )}
          <div>
            <Button type='submit'>{ isEdit ? 'Edit' : 'Create'} raceways</Button>
            <Button onClick={ handleClear }>Clear</Button>
          </div>
          {error && (
            <div>
              <Alert variant="error" onClose={() => setError('')}>{ error }</Alert>
            </div>
          )}
        </form>
      </div>
      <div style={{maxWidth: '400px'}}>
        <Input
          type="text"
          placeholder="Search..."
          value={ filter }
          onChange={(e) => setFilter(e.target.value)}
          // className={styles.filterInput}
        />
      </div>
      <div className={ styles.tableContainer }>
        <div className={ styles.tableWrapper }>
          <table className={ styles.table }>
            <thead>
              <tr>
                <th style={{width: '20px'}}>Index</th>
                <th onClick={() => handleSort('tag')}>Tag { sort.key === 'tag' ? (sort.direction === 'asc' ? '↑' : '↓') : '' }</th>
                <th onClick={() => handleSort('cables')}>Cables { sort.key === 'cables' ? (sort.direction === 'asc' ? '↑' : '↓') : '' }</th>
                <th onClick={() => handleSort('kind')}>Kind { sort.key === 'kind' ? (sort.direction === 'asc' ? '↑' : '↓') : '' }</th>
                <th onClick={() => handleSort('type')}>Type { sort.key === 'type' ? (sort.direction === 'asc' ? '↑' : '↓') : '' }</th>
                <th onClick={() => handleSort('material')}>Material { sort.key === 'material' ? (sort.direction === 'asc' ? '↑' : '↓') : '' }</th>
                <th onClick={() => handleSort('length')}>Length { sort.key === 'length' ? (sort.direction === 'asc' ? '↑' : '↓') : '' }</th>
                <th onClick={() => handleSort('size')}>Size { sort.key === 'size' ? (sort.direction === 'asc' ? '↑' : '↓') : '' }</th>
                <th onClick={() => handleSort('id')}>I.D. { sort.key === 'id' ? (sort.direction === 'asc' ? '↑' : '↓') : '' }</th>
                <th onClick={() => handleSort('height')}>Height { sort.key === 'height' ? (sort.direction === 'asc' ? '↑' : '↓') : '' }</th>
                <th onClick={() => handleSort('width')}>Width { sort.key === 'width' ? (sort.direction === 'asc' ? '↑' : '↓') : '' }</th>
                <th style={{width: '20px'}}>Copy</th>
                <th style={{width: '20px'}}>Edit</th>
                <th style={{width: '20px'}}>Delete</th>
              </tr>
            </thead>
            <tbody className={ styles.tbody }>
              {filteredData.map((record, index) => (
                <tr key={ index }>
                  <td>{ index }</td>
                  <td>{ record.tag }</td>
                  <td>{ record.cables.length }</td>
                  <td>{ record.kind ? record.kind : '-' }</td>
                  <td>{ record.type ? record.type : '-' }</td>
                  <td>{ record.material ? record.material : '-' }</td>
                  <td>{ record.length ? `${record.length}'` : '-' }</td>
                  <td>{ record.size ? `${record.size}"` : '-' }</td>
                  <td>{ record.id ? `${record.id}"` : '-' }</td>
                  <td>{ record.height ? `${record.height}"` : '-' }</td>
                  <td>{ record.width ? `${record.width}"` : '-' }</td>
                  <td onClick={() => handleCopy(record)}>{/*<Copy /></td>*/}
    //               <td onClick={() => handleEdit(record)}>{/*<Edit />*/}</td>
    //               <td onClick={() => handleDelete(record)}>{/*<Trash />*/}</td>
    //             </tr>
    //           ))}
    //         </tbody>
    //       </table>
    //     </div>
    //   </div>
    // </div> */}