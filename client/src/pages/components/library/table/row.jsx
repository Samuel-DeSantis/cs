import { useContext } from 'react'

import FormContext from '../../../../context/forms/FormContext.jsx'

import { Copy, Edit, Trash } from '../svgs/index.jsx'
import styles from './styles.module.css'

const Row = ({ keys, record }) => {

  const {
    setToEdit,
    setToCopy,
    setToDelete
  } = useContext(FormContext)

  const handleCopy = () => {
    setToCopy?.(record)
    setToEdit?.(null)
  }

  const handleEdit = () => {
    setToEdit?.(record)
    setToCopy?.(null)
  }

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this record?')) return
    setToDelete?.(record)
  }

  return (
    <tr>
      {keys.map(key => 
        <td
          key={ key }
          className={ styles.cell }
        >{ record[key] }</td>
      )}
      <td><div onClick={ handleCopy }><Copy /></div></td>
      <td><div onClick={ handleEdit }><Edit /></div></td>
      <td><div onClick={ handleDelete }><Trash /></div></td>
    </tr>
  )
}

export default Row