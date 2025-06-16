const API_URL = 'http://localhost:8080/api/auth';

const headers = {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
}

export const signInUser = async (email, password) => {
    const response = await fetch(API_URL + '/sign_in', {
    ...headers, body: JSON.stringify({ email, password }),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Failed to sign in');
  
  return data;
}

export const signUpUser = async (userData) => {
  const response = await fetch(API_URL + '/sign_up',{
    ...headers, body: JSON.stringify(userData),
  });
  
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Failed to sign up')

  return data
}

export const getUser = async () => {
  const token = localStorage.getItem('token');
  if (!token) { throw new Error('No token found') }
  console.log(token)

  const response = await fetch(API_URL + '/user', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Failed to fetch user');

  return data;
}