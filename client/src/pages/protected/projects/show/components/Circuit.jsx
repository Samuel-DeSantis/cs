import { useState } from "react"

import { deleteCircuit } from "../../../../../services/circuits";
import { gauge } from "../../../../../data/cable";
import Button from "../../../../components/library/button/component";

import Edit from "../../../../components/library/svgs/edit/component.jsx";
import Trash from '../../../../components/library/svgs/trash/component.jsx'
import Copy from "../../../../components/library/svgs/copy/component.jsx";

const Circuit = ({ circuit, project_id, onDelete, onEdit, onCopy }) => {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const units = {
    imperial: 'ft',
    metric: 'm'
  }

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
      <td>{ circuit.length } { units.imperial }</td>
      <td>{ circuit.conductors }</td>
      <td>{ gauge(circuit.size) }</td>
      <td>{ circuit.type }</td>
      <td>{ circuit.sys_volts } V</td>
      <td>{ circuit.insulation } V</td>
      <td>{ circuit.from }</td>
      <td>{ circuit.to }</td>
      <td>{ circuit.via }</td>
      <td>{ circuit.comments }</td>
      <td>{ circuit.rev }</td>
      <td>
        <div onClick={() => onCopy?.(circuit)}>
          <Copy />
        </div>
      </td>
      <td>
        <div onClick={() => onEdit?.(circuit)}>
          <Edit />
        </div>
      </td>
      <td>
          {loading ? 'Deleting...' : (
          <div onClick={ handleDelete }>
            <Trash />
          </div>)}
        {error && <p style={{ color: 'red' }}>{ error }</p>}
      </td>
    </tr>
  )
}

export default Circuit