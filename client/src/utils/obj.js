export const getKeys = (records, exclude = []) => {
  if (!Array.isArray(records)) return []
  const set = new Set(records.flatMap(record => Object.keys(record)))
  return Array.from(set).filter(item => !exclude.includes(item))
}