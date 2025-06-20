const API_URL = 'http://localhost:8080/api/equipment'

// /pages/protected/projects/show/equipment/page.js
export const getEquipment = async (project_id) => {
  const token = localStorage.getItem('token');
  if (!token) { throw new Error('No token found') }

  const response = await fetch(API_URL + `/${project_id}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Failed to fetch equipment')

  return data;
}

// /pages/protected/equipments/new/page.js
export const createEquipment = async (equipmentData) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error('No token found')

  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      'Authorization': `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(equipmentData),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to create equipment")

  return data;
};

// /pages/protected/equipments/new/page.js

export const deleteEquipment = async (equipment_id) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error('No token found')

  const res = await fetch(API_URL + '/delete', {
    method: "POST",
    headers: {
      'Authorization': `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify( equipment_id ),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to create equipment")

  return data;
};

export const updateEquipment = async (equipment_id, equipmentData) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");

  const res = await fetch(`${API_URL}/${equipment_id}`, {
    method: "PUT",
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(equipmentData)
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to update equipment");
  return data;
};
