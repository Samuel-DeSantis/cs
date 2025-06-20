import { useCallback, useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import { getRaceways } from "../../../../../services/raceways"
import Table from "../../../../components/library/table/table"

const headers = ['Tag', 'Length', 'Cables', 'Size', 'Kind', 'Type', 'Material', 'ID']
const std_headers = ['Copy', 'Edit', 'Delete']

const Raceways = () => {
  const { id } = useParams()
  const project_id =  id
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [raceways, setRaceways] = useState(null)
  const [toEdit, setToEdit] = useState(null)
  const [toCopy, setToCopy] = useState(null)

  const formatRaceways = (records = []) => {
    return records.map(record => ({
      ...record,
      cables: record.cables.length
    }))
  }

  const loadRaceways = useCallback(async () => {
    try {
      const data = await getRaceways(project_id)
      setRaceways(data)
      setToEdit(null)
      setToCopy(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [project_id])

  useEffect(() => {
    loadRaceways()
  }, [loadRaceways])

  if (loading) return <p>Loading raceways...</p>
  if (error) return <p style={{ color: 'red' }}>{ error }</p>

  return (
    <>
      <div>Form</div>
      <Table 
        data={{
          headers: [...headers, ...std_headers],
          content: formatRaceways(raceways)
        }}
        exclude={ ['_id', '__v', 'project', 'createdAt', 'updatedAt'] }
      />
    </>
  )
}

export default Raceways