import Row from './row'

import { getKeys } from '../../../../utils/obj'
import styles from './styles.module.css'

const Table = ({ data, exclude = [], onDelete, onEdit, onCopy }) => {
  // data: { headers: [], content: []}
  const keys = getKeys(data.content, exclude)

  return (
    <div className={ styles.container }>
      <table className={ styles.wrapper }>
        <thead>
          <tr>
            {data.headers.map((header, index) => (
              <th key={ index }>{ header }</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.content.map(record =>
            <Row
              key={ record._id }
              keys={ keys }
              record={ record }
              onCopy={ onCopy }
              onEdit={ onEdit }
              onDelete={ onDelete }
            />
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Table