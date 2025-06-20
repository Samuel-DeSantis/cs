import { useState } from 'react'

import Button from '../button/component'
import Copy from '../svgs/copy/component'
import Edit from '../svgs/edit/component'
import Trash from '../svgs/trash/component'

const Row = ({ keys, record, project_id, onDelete, onEdit, onCopy }) => {

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this record?')) return

    setLoading(true)
    setError('')

    try {
      await deleteItem({
        project_id: project_id
      })
      if (onDelete) onDelete()
    } catch {
      console.error(err)
      setError('Failed to delete record.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <tr>
      {keys.map(key => <td key={ key }>{ record[key] }</td>)}
      <td>
        <div onClick={() => onCopy?.(record)}>
          <Copy />
        </div>
      </td>
      <td>
        <div onClick={() => onEdit?.(record)}>
          <Edit />
        </div>
      </td>
      <td>
        <div onClick={ handleDelete }>
          <Trash />
        </div>
      </td>
    </tr>
  )
}

export default Row