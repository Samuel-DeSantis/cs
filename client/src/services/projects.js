const API_URL = 'http://localhost:8080/api/projects'

// /pages/protected/projects/index/page.js
export const getProjects = async () => {
  const token = localStorage.getItem('token');
  if (!token) { throw new Error('No token found') }

  const response = await fetch(API_URL, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Failed to fetch projects')

  return data;
}

// /pages/protected/projects/show/page.js
export const getProject = async (id) => {
  const token = localStorage.getItem('token');
  if (!token) { throw new Error('No token found') }

  const res = await fetch(API_URL + `/${id}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to fetch project');

  return data;
};

// /pages/protected/projects/new/page.js
export const createProject = async (projectData) => {
  const token = localStorage.getItem("token");
  if (!token) { throw new Error('No token found') }

  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      'Authorization': `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(projectData),
  });

  const data = await res.json();
  console.log(data)
  if (!res.ok) throw new Error(data.error || "Failed to create project")

  return data;
};
