const standard = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric'
}

export const formatDate = (date, layout = standard) => {
  return new Date(date).toLocaleDateString(undefined, layout)
}