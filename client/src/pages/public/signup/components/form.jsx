import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"

const Form = () => {

  const nameRef = useRef()
  const usernameRef = useRef()
  const passwordRef = useRef()
  const organizationRef = useRef()
  const emailRef = useRef()
  const roleRef = useRef()
  const phoneRef = useRef()
  const locationRef = useRef()

  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    const payload = {
      name: nameRef.current.value,
      username: usernameRef.current.value,
      password: passwordRef.current.value,
      email: emailRef.current.value,
      organization: organizationRef.current.value,
      role: roleRef.current.value,
      phone: phoneRef.current.value,
      location: locationRef.current.value,
    };

    try {
      const res = await fetch("http://localhost:8080/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Signup failed");
        return;
      }

      // Save token and user (optional)
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setMessage("Signup successful!");
      navigate('/projects')
    } catch (err) {
      setError("Server error. Please try again later.", err);
    }
  };

  return (
    <form onSubmit={ handleSubmit }>
      <div>
        <label htmlFor="">Name</label>
        <input
          id='name'
          name='name'
          type="text"
          ref={ nameRef }
        />
      </div>
      <div>
        <label htmlFor="">Username</label>
        <input
          id='username'
          name='username'
          type="text"
          ref={ usernameRef }
        />
      </div>
      <div>
        <label htmlFor="">Password</label>
        <input
          id='password'
          name='password'
          type="password"
          ref={ passwordRef }
        />
      </div>
      <div>
        <label htmlFor="">Email</label>
        <input
          id='email'
          name='email'
          type="email"
          ref={ emailRef }
        />
      </div>
      <div>
        <label htmlFor="">Organization</label>
        <input
          id='organization'
          name='organization'
          type="organization"
          ref={ organizationRef }
        />
      </div>
      <div>
        <label htmlFor="">Role</label>
        <select
          id='role'
          name='role'
          ref={ roleRef }
        >
          <option value="engineer">Engineer</option>
          <option value="admin">Admin</option>
          <option value="technician">Technician</option>
        </select>
      </div>
      <div>
        <label htmlFor="">Phone</label>
        <input
          id='phone'
          name='phone'
          type="tel"
          ref={ phoneRef }
        />
      </div>
      <div>
        <label htmlFor="">Location</label>
        <input
          id='location'
          name='location'
          type="text"
          ref={ locationRef }
        />
      </div>
      <button type="submit">Sign Up</button>

      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  )
}

export default Form