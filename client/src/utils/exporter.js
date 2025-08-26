import ExcelJS from 'exceljs'
import pkg from 'file-saver'
const { saveAs } = pkg

const equipment = [
    { _id: "6858754c65d8e54c1efc9655", tag: "XF1234", type: "XF", location: "Admin Building", circuits: [], project: "68509c0f16540875c06c0c19", __v: 0 },
    { _id: "6859f174e606b1eebef8dacd", tag: "XF2345", type: "XF", location: "Admin Building", circuits: [], project: "68509c0f16540875c06c0c19", __v: 0 },
    { _id: "6859ff8fb60f5ac8ebd41539", tag: "LVS1001", type: "LVS", location: "Warehouse", circuits: [], project: "68509c0f16540875c06c0c19", __v: 0 },
    { _id: "685a00e7b60f5ac8ebd41544", tag: "LVS1002", type: "LVS", location: "Warehouse", circuits: [], project: "68509c0f16540875c06c0c19", __v: 0 },
    { _id: "685a01a311b17448249b767e", tag: "LVS1003", type: "LVS", location: "Warehouse", circuits: [], project: "68509c0f16540875c06c0c19", __v: 0 },
    { _id: "685c38709f7b47ed569a8fff", tag: "LVS1004", type: "LVS", location: "Warehouse", circuits: [], project: "68509c0f16540875c06c0c19", __v: 0 },
    { _id: "685c38839f7b47ed569a9005", tag: "LVS1005", type: "LVS", location: "Warehouse", circuits: [], project: "68509c0f16540875c06c0c19", __v: 0 },
    { _id: "685c38889f7b47ed569a900b", tag: "LVS1006", type: "LVS", location: "Warehouse", circuits: [], project: "68509c0f16540875c06c0c19", __v: 0 },
    { _id: "685c38fe9f7b47ed569a901e", tag: "XF01001", type: "XF", location: "Gen Block 01", circuits: [], project: "68509c0f16540875c06c0c19", __v: 0 },
    { _id: "685c3a339f7b47ed569a9036", tag: "XF02001", type: "XF", location: "Gen Block 02", circuits: [], project: "68509c0f16540875c06c0c19", __v: 0 },
    { _id: "685da833fe969550fcaf5261", tag: "XF01002", type: "XF", location: "Gen Block 01", circuits: [], project: "68509c0f16540875c06c0c19", __v: 0 },
    { _id: "68604035888145d32e106e23", tag: "LVS4568", type: "LVS", location: "Warehouse", circuits: [], project: "68509c0f16540875c06c0c19", __v: 0 },
    { _id: "6860404a888145d32e106e29", tag: "LVS4577", type: "LVS", location: "Warehouse", circuits: [], project: "68509c0f16540875c06c0c19", __v: 0 },
    { _id: "6865f5d255012599b57e992c", tag: "XF01003", type: "XF", location: "Gen Block 03", circuits: [], project: "68509c0f16540875c06c0c19", __v: 0 },
    { _id: "686f2f71ae734a7028656f39", tag: "XF789", type: "XF", location: "Yard A", circuits: [], project: "68509c0f16540875c06c0c19", __v: 0 },
    { _id: "68a8d38b72f30766f02dd4d7", tag: "9999", type: "MVS", location: "Field 9", circuits: [], project: "68509c0f16540875c06c0c19", __v: 0 },
    { _id: "68a8d39972f30766f02dd4dc", tag: "1111", type: "MVS", location: "Field 9", circuits: [], project: "68509c0f16540875c06c0c19", __v: 0 },
    { _id: "68a8d3a472f30766f02dd4e4", tag: "2222", type: "MVS", location: "Field 9", circuits: [], project: "68509c0f16540875c06c0c19", __v: 0 },
    { _id: "68a8d49672f30766f02dd518", tag: "4321", type: "VFD", location: "Building C", circuits: [], project: "68509c0f16540875c06c0c19", __v: 0  }
]

class Exporter {
  
  constructor(file_name = 'export.xlsx') {
    this.workbook = new ExcelJS.Workbook()
    this.file_name = file_name
  }

  addSheet(data, name = 'Sheet1', exclude = []) {
    if (!Array.isArray(data) || data.length === 0) return this
    const worksheet = this.workbook.addWorksheet(name)
    const keys = Object.keys(data[0]).filter(key => !exclude.includes(key))
    worksheet.columns = keys.map(key => ({
      header: key.charAt(0).toUpperCase() + key.slice(1),
      key
    }))
    data.forEach(row => {
      const filteredRow = {}
      keys.forEach(key => { filteredRow[key] = row[key] })
      worksheet.addRow(filteredRow)
    })

    const headerRow = worksheet.getRow(1)
    headerRow.eachCell(cell => {
      cell.font = { size: 14, bold: true}
      cell.alignment = { horizontal: 'center', vertical: 'middle' }
    })
    headerRow.commit()
    return this // for chaining
  }

  async save() {
    const buffer = await this.workbook.xlsx.writeBuffer()
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    })
    saveAs(blob, this.file_name)
  }
}

export default Exporter

// headerRow.eachCell(cell => {
//   cell.font = { name: 'Times New Roman', size: 14, bold: true, color: { argb: 'FFFF0000' } }
//   cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFADD8E6' } }
//   cell.alignment = { horizontal: 'center', vertical: 'middle' }
//   cell.border = {
//     top: { style: 'medium' },
//     bottom: { style: 'medium' },
//     left: { style: 'medium' },
//     right: { style: 'medium' }
//   }
// })

// let exporter = new Exporter('equipment.xlsx')
// exporter.addSheet(equipment, 'Equipment', ['_id', '__v'])
// await exporter.save()

// const exporter = async (data, file_name='export.xlsx', sheet='Sheet1') => {
//   const workbook = new ExcelJS.Workbook()
//   const worksheet = workbook.addWorksheet('Circuit Schedule')

//   worksheet.columns = [
//     { header: 'Circuit', key: 'circuit_number' },
//     { header: 'Designator', key: 'designator' },
//     { header: 'Equipment', key: 'equipment' },
//     { header: 'Tag', key: 'tag' },
//     { header: 'ID', key: 'circuit_id' },
//     { header: 'Drawing', key: 'drawing' },
//     { header: 'Length', key: 'length' },
//     { header: 'Conductors', key: 'conductors' },
//     { header: 'Size', key: 'size' },
//     { header: 'Type', key: 'type' },
//     { header: 'Sys. Volts', key: 'sys_volts' },
//     { header: 'Insulation', key: 'insulation' },
//     { header: 'From', key: 'from' },
//     { header: 'To', key: 'to' },
//     { header: 'Via', key: 'via' },
//     { header: 'Comments', key: 'comments' },
//     { header: 'Rev', key: 'rev' }
//   ]

//   data.forEach(circuit => worksheet.addRow(circuit) )
  
//   const buffer = await workbook.xlsx.writeBuffer()
//   const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
//   saveAs(blob, file_name)
// }

// export default exporter

// import ExcelJS from 'exceljs'
// import { saveAs } from 'file-saver'


// const exporter = async (data, filename = 'export.xlsx') => {
//   if (!Array.isArray(data) || data.length === 0) return
//   const workbook = new ExcelJS.Workbook()
//   const worksheet = workbook.addWorksheet('Sheet 1')

//   // Use keys from the first object as headers
//   const keys = Object.keys(data[0])
//   worksheet.columns = keys.map(key => ({ header: key.charAt(0).toUpperCase() + key.slice(1), key }))

//   data.forEach(row => worksheet.addRow(row))

//   const buffer = await workbook.xlsx.writeBuffer()
//   const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
//   saveAs(blob, filename)
// }

// export default exporter