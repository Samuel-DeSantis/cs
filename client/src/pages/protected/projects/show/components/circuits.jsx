import Circuit from './circuit'
import Button from '../../../../components/library/button/component'

import styles from './styles.module.css'
import exporter from '../../../../../utils/exporter'

const CircuitList = ({ circuits, project_id, onDeleteCircuit, onEditCircuit }) => {
  return (
    <div className={ styles.container }>
      <div style={{ display: 'flex'}}>
        <h2>Circuit List</h2>
        <div style={{ alignContent: 'center', paddingLeft: '10px'}}>
          <Button onClick={() => exporter(circuits)}>Export</Button>
        </div>
      </div>
      {circuits.length === 0 ? (
        <p>No circuits found.</p>
      ) : (
        <div className={ styles.tableWrapper }>
          <table className={ styles.table }>
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
        </div>
      )}
    </div>
  )
}
export default CircuitList