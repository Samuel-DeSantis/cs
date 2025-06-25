import { useState, useEffect, useContext, useCallback } from 'react'
import { useParams } from 'react-router-dom'

import { getEquipment, createEquipment, updateEquipment, deleteEquipment } from '../../../../../services/equipment.js'

import FormContext from '../../../../../context/forms/FormContext.jsx'
import Form from '../../../../components/library/form/component.jsx'
// import Table from '../../../../components/library/table/component.jsx'
import Table from '../../../../components/library/table/table.jsx'
import styles from './styles.module.css'
import { Copy, Edit, Trash } from '../../../../components/library/svgs/index.jsx'

const Equipment = () => {
  const user_id = JSON.parse(localStorage.getItem('user')).id
  const { id: project_id } = useParams()
  const exclude = ['_id', '__v', 'project', 'circuits']
  const { 
    form, setForm,
    toEdit, setToEdit,
    toCopy, setToCopy,
    toDelete, setToDelete,
    reload, triggerReload,
    clearForm
  } = useContext(FormContext)
  const [equipment, setEquipment] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  const loadEquipment = useCallback(async () => {
    try {
      const data = await getEquipment(project_id)
      setEquipment(data)
      setForm(clearForm(data[0] || {}))
      setToEdit(null)
      setToCopy(null)
      setToDelete(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [project_id])

  useEffect(() => { loadEquipment() }, [loadEquipment])

  useEffect(() => {
    if (toDelete) {
      console.log('Deleting equipment:', toDelete)
      deleteEquipment({
        user: user_id,
        equipment: toDelete
      })
        .then(() => {
          setToDelete(null)
          loadEquipment()
        })
        .catch(err => setError(err.message))
    }
  }, [toDelete])

  const handleSubmit = async () => {
    try {
      if (toEdit) {
        await updateEquipment({
          user: user_id,
          equipment: {
            ...toEdit,
            ...form
          }
        })
      } else {
        delete form.__v
        delete form._id
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
      return {}
    } catch (err) {
      return { error: err.message }
    }
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p style={{ color: 'red' }}>{error}</p>

  const default_options = {
    sortable: true,
    filterable: true,
    width: '150px'
  }

  const columns = [
    {
      key: 'tag',
      title: 'Tag',
      ...default_options
    },
    {
      key: 'type',
      title: 'Type',
      ...default_options
    },
    {
      key: 'location',
      title: 'Location',
      ...default_options
    },
    {
      key: 'copy',
      title: 'Copy',
      render: (_, record) => (
        <div onClick={(e) => {
          e.stopPropagation()
          setToCopy(record)
          setToEdit(null)
          setForm(clearForm(record))
        }}>
          <Copy />
        </div>
      )
    },
    {
      key: 'edit',
      title: 'Edit',
      render: (_, record) => (
        <div onClick={(e) => {
          e.stopPropagation()
          setToEdit(record)
          setToCopy(null)
          setForm(clearForm(record))
        }}>
          <Edit />
        </div>
      )
    },
    {
      key: 'delete',
      title: 'Delete',
      render: (_, record) => (
        <div onClick={(e) => {
          e.stopPropagation()
          const message = 'Are you sure you want to delete this record?'
          if (window.confirm(message)) setToDelete(record)
        }}>
          <Trash />
        </div>
      )
    }
  ]

  return (
    <div className={ styles.container }>
      <Form
        content={ equipment }
        exclude={ exclude }
        onSubmit={ handleSubmit }
      />
      <Table
        data={ equipment }
        columns={ columns }
        filterable={ true }
        sortable={ true }
        // maxHeight='50%'
      />

      {/* <Table
        data={{
          headers: ['Tag', 'Type', 'Location', 'Copy', 'Edit', 'Delete'],
          content: equipment
        }}
        exclude={ exclude }
        // onDelete={ loadEquipment }
      /> */}
    </div>
  )
}

export default Equipment
