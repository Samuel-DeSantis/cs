const API_URL = 'http://localhost:8080/api/circuits'

// /pages/protected/projects/show/circuits/page.js
export const getCircuits = async (project_id) => {
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
  if (!response.ok) throw new Error(data.error || 'Failed to fetch circuits')

  return data
}

// /pages/protected/circuits/new/page.js
export const createCircuit = async (circuitData) => {
  const token = localStorage.getItem("token")
  if (!token) throw new Error('No token found')

  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      'Authorization': `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(circuitData),
  })

  const data = await res.json()
  if (!res.ok) throw new Error(data.error || "Failed to create circuit")

  return data
}

// /pages/protected/circuits/new/page.js


export const updateCircuit = async (circuit_id, circuitData) => {
  const token = localStorage.getItem("token")
  if (!token) throw new Error("No token found")

  const res = await fetch(`${API_URL}/${circuit_id}`, {
    method: "PUT",
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(circuitData)
  })

  const data = await res.json()
  if (!res.ok) throw new Error(data.error || "Failed to update circuit")
  return data
}

export const deleteCircuit = async (circuit_id) => {
  const token = localStorage.getItem("token")
  if (!token) throw new Error('No token found')

  const res = await fetch(API_URL + '/delete', {
    method: "POST",
    headers: {
      'Authorization': `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify( circuit_id ),
  })

  const data = await res.json()
  if (!res.ok) throw new Error(data.error || "Failed to create circuit")

  return data
}