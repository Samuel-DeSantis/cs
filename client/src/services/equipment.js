const API_URL = 'http://localhost:8080/api/equipment'

export const getEquipment = async (project_id) => {
  const token = localStorage.getItem('token')
  if (!token) { throw new Error('No token found') }

  const response = await fetch(API_URL + `/${project_id}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })

  const data = await response.json()
  if (!response.ok) throw new Error(data.error || 'Failed to fetch equipment')

  return data
}

export const createEquipment = async (payload) => {
  const token = localStorage.getItem("token")
  if (!token) throw new Error('No token found')

  console.log('Creating payload:', payload)

  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      'Authorization': `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })

  const data = await res.json()
  if (!res.ok) throw new Error(data.error || "Failed to create equipment")

  return data
}

export const updateEquipment = async (payload) => {
  const token = localStorage.getItem("token")
  if (!token) throw new Error("No token found")

  console.log('Updating equipment:', payload)

  const res = await fetch(`${API_URL}/${payload.equipment._id}`, {
    method: "PUT",
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })

  const data = await res.json()
  if (!res.ok) throw new Error(data.error || "Failed to update equipment")
  return data
}

export const deleteEquipment = async (payLoad) => {
  const token = localStorage.getItem("token")
  if (!token) throw new Error('No token found')

  console.log('Deleting equipment:', payLoad)

  const res = await fetch(API_URL + '/delete', {
    method: "POST",
    headers: {
      'Authorization': `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payLoad),
  })

  console.log('Response from deleteEquipment:', res.status)
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || "Failed to delete equipment")

  return data
}
