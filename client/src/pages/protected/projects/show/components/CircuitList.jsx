import Circuit from './Circuit'

const CircuitList = ({ circuits, project_id, onDeleteCircuit, onEditCircuit }) => {
  return (
    <div>
      <div>Circuit List</div>
      {circuits.length === 0 ? (
        <p>No circuits found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Circuit</th>
              <th>Designator</th>
              <th>Equipment</th>
              <th>Tag</th>
              <th>ID</th>
              <th>Drawing</th>
              <th>Length</th>
              <th>Conductors</th>
              <th>Size</th>
              <th>Type</th>
              <th>Sys. Volts</th>
              <th>Insulation</th>
              <th>From</th>
              <th>To</th>
              <th>Via</th>
              <th>Comments</th>
              <th>Rev</th>
              <th>UPDATE</th>
              <th>DELETE</th>
            </tr>
          </thead>
          <tbody>
            {circuits.map(circuit =>
              <Circuit
                key={ circuit._id }
                circuit={ circuit }
                project_id={ project_id }
                onDelete={ onDeleteCircuit }
                onEdit={ onEditCircuit}
              />
            )}
          </tbody>
        </table>
      )}
    </div>
  )
}
export default CircuitList