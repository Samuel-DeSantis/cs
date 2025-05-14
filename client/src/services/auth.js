// /pages/signin/page.jsx
export const signInUser = async (email, password) => {
    const response = await fetch('http://localhost:8080/api/auth/sign_in', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Failed to sign in');
  }
  return data;
}

// /pages/signup/page.jsx
export const signUpUser = async (userData) => {
  const response = await fetch("http://localhost:8080/api/auth/sign_up", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Failed to sign up');
  }

  return data
}