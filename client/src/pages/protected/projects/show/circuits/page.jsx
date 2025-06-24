const Circuits = () => {
  return <div>Circuits</div>
}
export default Circuits

// import { useCallback, useEffect, useState } from "react"
// import { useParams } from "react-router-dom"

// import { getCircuits } from "../../../../../services/circuits"
// import Table from "../../../../components/library/table/table"

// const headers = [
//   'Circuit Number', 'Designator',
//   'Tag', 'Drawing', 'Length',
//   'Cable', 'From', 'To', 'Via',
//   'Comments', 'Rev'
// ]
// const std_headers = ['Copy', 'Edit', 'Delete']

// const Circuits = () => {
//   const { id } = useParams()
//   const project_id =  id
//   const [error, setError] = useState('')
//   const [loading, setLoading] = useState(true)
//   const [circuits, setCircuits] = useState(null)
//   const [toEdit, setToEdit] = useState(null)
//   const [toCopy, setToCopy] = useState(null)

//   const formatCircuits = (records = []) => {
//     return records.map(record => ({
//       circuit_number: record.circuit_number,
//       designator: record.designator,
//       tag: record.tag,
//       drawing: record.drawing,
//       length: record.length,
//       cable: `${record.cable.count}-${record.cable.type.conductors} ${record.cable.type.ground ? 'w/GND' : ''}`,
//       from: record.from?.tag || '',
//       to: record.to?.tag || '',
//       via: record.via.map(v => v.tag).join(', '),
//       comments: record.comments,
//       rev: record.rev
//     }))
//   }

//   const loadCircuits = useCallback(async () => {
//     try {
//       const data = await getCircuits(project_id)
//       setCircuits(data)
//       setToEdit(null)
//       setToCopy(null)
//     } catch (err) {
//       setError(err.message)
//     } finally {
//       setLoading(false)
//     }
//   }, [project_id])

//   useEffect(() => {
//     loadCircuits()
//   }, [loadCircuits])

//   if (loading) return <p>Loading circuits...</p>
//   if (error) return <p style={{ color: 'red' }}>{ error }</p>

//   return (
//     <>
//       <div>Form</div>
//       <Table 
//         data={{
//           headers: [...headers, ...std_headers],
//           content: formatCircuits(circuits)
//         }}
//         exclude={ ['_id', '__v', 'createdAt', 'updatedAt'] }
//       />
//     </>
//   )
// }

// export default Circuits