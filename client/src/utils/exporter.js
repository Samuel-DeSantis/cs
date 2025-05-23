import ExcelJS from 'exceljs'
import { saveAs } from 'file-saver'

const exporter = async (circuits) => {
  const workbook = new ExcelJS.Workbook()
  const worksheet = workbook.addWorksheet('Circuit Schedule')

  worksheet.columns = [
    { header: 'Circuit', key: 'circuit_number' },
    { header: 'Designator', key: 'designator' },
    { header: 'Equipment', key: 'equipment' },
    { header: 'Tag', key: 'tag' },
    { header: 'ID', key: 'circuit_id' },
    { header: 'Drawing', key: 'drawing' },
    { header: 'Length', key: 'length' },
    { header: 'Conductors', key: 'conductors' },
    { header: 'Size', key: 'size' },
    { header: 'Type', key: 'type' },
    { header: 'Sys. Volts', key: 'sys_volts' },
    { header: 'Insulation', key: 'insulation' },
    { header: 'From', key: 'from' },
    { header: 'To', key: 'to' },
    { header: 'Via', key: 'via' },
    { header: 'Comments', key: 'comments' },
    { header: 'Rev', key: 'rev' }
  ];

  circuits.forEach(circuit => worksheet.addRow(circuit) )
  
  const buffer = await workbook.xlsx.writeBuffer()
  const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
  saveAs(blob, 'circuit_schedule.xlsx')
}

export default exporter