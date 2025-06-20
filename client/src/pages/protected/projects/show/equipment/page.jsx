import { useCallback, useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import { getEquipment } from "../../../../../services/equipment"
import Table from "../../../../components/library/table/table"

const std_headers = ['Copy', 'Edit', 'Delete']

const Equipment = () => {
  const { id } = useParams()
  const project_id =  id 
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [equipment, setEquipment] = useState(null)
  const [toEdit, setToEdit] = useState(null)
  const [toCopy, setToCopy] = useState(null)

  const loadEquipment = useCallback(async () => {
    try {
      const data = await getEquipment(project_id)
      setEquipment(data)
      setToEdit(null)
      setToCopy(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [project_id])

  useEffect(() => {
    loadEquipment()
  }, [loadEquipment])

  if (loading) return <p>Loading projects...</p>
  if (error) return <p style={{ color: 'red' }}>{ error }</p>

  return (
    <>
      <div>Form</div>
      <Table 
        data={{
          headers: ['Tag', 'Type', 'Location', ...std_headers],
          content: equipment
        }}
        exclude={ ['_id', '__v', 'project', 'circuits'] }
      />
    </>
  )
}

export default Equipment