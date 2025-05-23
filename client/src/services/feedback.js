const API_URL = 'http://localhost:8080/api/feedback'

// /pages/protected/projects/new/page.js
export const createFeedback = async (feedbackData) => {
  const token = localStorage.getItem("token");
  if (!token) { throw new Error('No token found') }

  // console.log(feedbackData)

  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      'Authorization': `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(feedbackData),
  });

  const data = await res.json();
  console.log('here', data)
  if (!res.ok) throw new Error(data.error || "Failed to create project")

  return data;
};