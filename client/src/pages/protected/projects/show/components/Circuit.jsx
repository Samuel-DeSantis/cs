import { useState } from "react"
import { deleteCircuit } from "../../../../../services/circuits";

const Circuit = ({ circuit, project_id, onDelete, onEdit }) => {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleDelete = async () => {
    if (!window.confirm(`Delete circuit ${circuit.tag}?`)) return;

    setLoading(true);
    setError('');
    try {
      await deleteCircuit({
        project_id: project_id,
        circuit_id: circuit._id
      })
      if (onDelete) onDelete(); // refresh project/circuit list
    } catch (err) {
      console.error(err);
      setError('Failed to delete circuit.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <tr key={ circuit._id }>
      <td>{ circuit.circuit_number }</td>
      <td>{ circuit.designator }</td>
      <td>{ circuit.equipment }</td>
      <td>{ circuit.tag }</td>
      <td>{ circuit.circuit_id }</td>
      <td>{ circuit.drawing }</td>
      <td>{ circuit.length }</td>
      <td>{ circuit.conductors }</td>
      <td>{ circuit.size }</td>
      <td>{ circuit.type }</td>
      <td>{ circuit.sys_volts }</td>
      <td>{ circuit.insulation }</td>
      <td>{ circuit.from }</td>
      <td>{ circuit.to }</td>
      <td>{ circuit.via }</td>
      <td>{ circuit.comments }</td>
      <td>{ circuit.rev }</td>
      <td>
        <button onClick={() => onEdit?.(circuit)}>EDIT</button>
      </td>
      <td>
        <button onClick={ handleDelete } disabled={ loading }>
          {loading ? 'Deleting...' : 'DELETE'}
        </button>
        {error && <p style={{ color: 'red' }}>{ error }</p>}
      </td>
    </tr>
  )
}

export default Circuit