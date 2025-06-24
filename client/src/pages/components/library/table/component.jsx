import Row from './row'

import { getKeys } from '../../../../utils/obj'
import styles from './styles.module.css'

const Table = ({ data, exclude = [] }) => {
  // data: { headers: [], content: []}
  const keys = getKeys(data.content, exclude)

  return (
    <div className={ styles.container }>
      <div className={ styles.wrapper }>
        <table className={ styles.table }>
          <thead>
            <tr>
              {data.headers.map((header, index) =>
                <th key={ index }>{ header }</th>
              )}
            </tr>
          </thead>
          <tbody>
            {data.content.map(record =>
              <Row
                key={ record._id }
                keys={ keys }
                record={ record }
              />
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Table