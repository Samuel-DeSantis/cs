import Circuit from './circuit'
import exporter from '../../../../../utils/exporter'

import Button from '../../../../components/library/button/component'
import styles from './styles.module.css'

const headers = [ 'Circuit', 'Designator', 'Equipment', 'Tag', 'ID', 'Drawing', 'Length', 'Conductors', 'Size', 'Type', 'Sys. Volts', 'Insulation', 'From', 'To', 'Via', 'Comments', 'Rev', 'Copy', 'Edit', 'Delete']

const CircuitList = ({ circuits, project_id, onDeleteCircuit, onEditCircuit, onCopyCircuit }) => {

  const sortedCircuits = circuits.sort((circuit1, circuit2) => {
    if (circuit1['circuit_number'] < circuit2['circuit_number']) return -1;
  })
  console.log('CircuitList', sortedCircuits)

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
                {headers.map((header, index) => (
                  <th key={ index }>{ header }</th>
                ))}
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
                  onCopy={ onCopyCircuit}
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