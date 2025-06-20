const API_URL = 'http://localhost:8080/api/raceways'

// /pages/protected/projects/show/raceways/page.js
export const getRaceways = async (project_id) => {
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
  if (!response.ok) throw new Error(data.error || 'Failed to fetch raceways')

  return data;
}

// /pages/protected/racewayss/new/page.js
export const createRaceway = async (racewaysData) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error('No token found')

  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      'Authorization': `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(racewaysData),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to create raceways")

  return data;
};

// /pages/protected/racewayss/new/page.js

export const deleteRaceway = async (raceways_id) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error('No token found')

  const res = await fetch(API_URL + '/delete', {
    method: "POST",
    headers: {
      'Authorization': `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify( raceways_id ),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to create raceways")

  return data;
};

export const updateRaceway = async (raceways_id, racewaysData) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");

  const res = await fetch(`${API_URL}/${raceways_id}`, {
    method: "PUT",
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(racewaysData)
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to update raceways");
  return data;
};
