// Table Component
import React, { useState, useMemo } from 'react'
import styles from './table.module.css'
import { Copy } from '../svgs'

const Table = ({ 
  data = [], 
  columns = [], 
  sortable = true, 
  filterable = false,
  maxHeight = '600px',
  onRowClick,
  loading = false,
  emptyMessage = "No data available"
}) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' })
  const [filterText, setFilterText] = useState('')

  // Sorting logic
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return data
    
    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key]
      const bValue = b[sortConfig.key]
      
      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1
      return 0
    })
  }, [data, sortConfig])

  // Filtering logic
  const filteredData = useMemo(() => {
    if (!filterText) return sortedData
    
    return sortedData.filter(row =>
      columns.some(column => {
        const value = row[column.key]
        return value && value.toString().toLowerCase().includes(filterText.toLowerCase())
      })
    )
  }, [sortedData, filterText, columns])

  const handleSort = (key) => {
    if (!sortable) return
    
    let direction = 'asc'
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc'
    }
    setSortConfig({ key, direction })
  }

  if (loading) {
    return (
      <div className={styles.tableContainer}>
        <div className={styles.loading}>Loading...</div>
      </div>
    )
  }

  return (
    <div className={ styles.wrapper }>
      {filterable && (
        <>
          <h2>Equipment</h2>
          <input
            type="text"
            placeholder="Search..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            className={styles.filterInput}
          />
        </>

      )}
      
      <div className={ styles.tableContainer }>
        <div 
          className={ styles.tableWrapper }
          style={{ maxHeight }}
        >
          <table className={ styles.table }>
            <thead className={ styles.header }>
              <tr>
                {columns.map(column => (
                  <th
                    key={ column.key }
                    className={`${styles.headerCell} ${sortable ? styles.sortable : ''}`}
                    onClick={() => column.sortable && handleSort(column.key)}
                  >
                    <div className={ styles.headerContent }>
                      { column.title }
                      {sortable && column.sortable && sortConfig.key === column.key && (
                        <span className={styles.sortIcon}>
                          { sortConfig.direction === 'asc' ? '↑' : '↓' }
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan={ columns.length } className={styles.emptyCell}>
                    { emptyMessage }
                  </td>
                </tr>
              ) : (
                filteredData.map((row, index) => (
                  <tr
                    key={row.id || index}
                    className={`${styles.row} ${onRowClick ? styles.clickableRow : ''}`}
                    onClick={() => onRowClick && onRowClick(row)}
                  >
                    {columns.map(column => (
                      <td
                        key={ column.key }
                        className={ styles.cell }
                        style={{ width: column.width || 'auto' }}
                      >
                        {column.render ? column.render(row[column.key], row) : row[column.key]}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Table