// export const signup = async (payload) => {

// try {
//     const res = await fetch("http://localhost:8080/api/auth/signup", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(payload),
//     });

//     const data = await res.json();

//     if (!res.ok) {
//       setError(data.error || "Signup failed");
//       return;
//     }

//     // Save token and user (optional)
//     localStorage.setItem("token", data.token);
//     localStorage.setItem("user", JSON.stringify(data.user));

//     setMessage("Signup successful!");
//   } catch (err) {
//     setError("Server error. Please try again later.", err);
//   }
//   }