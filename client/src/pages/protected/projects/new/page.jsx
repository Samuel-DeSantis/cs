import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProject } from '../../../../services/projects';

const NewProject = () => {
  const nameRef = useRef();
  const descriptionRef = useRef();
  const clientRef = useRef();
  const locationRef = useRef();
  const statusRef = useRef();
  const startDateRef = useRef();
  const endDateRef = useRef();

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    const user = JSON.parse(localStorage.getItem("user"));
    const user_id = user?.id

    if (!user_id) setError("User not found")

    const payload = {
      name: nameRef.current.value,
      description: descriptionRef.current.value,
      client: clientRef.current.value,
      location: locationRef.current.value,
      status: statusRef.current.value,
      startDate: startDateRef.current.value,
      endDate: endDateRef.current.value,
      users: [user_id],
    };

    try {
      const data = await createProject(payload);
      setMessage("Project created successfully!");
      navigate(`/project/${data.project._id}`);
    } catch (err) {
      console.error(err);
      setError("Failed to create project.", err);
    }
  };

  return (
    <form onSubmit={ handleSubmit }>
      <h2>Create New Project</h2>

      <div>
        <label htmlFor="name">Name</label>
        <input
          id='name'
          name='name'
          type="text" 
          ref={ nameRef } 
          required 
        />
      </div>

      <div>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          ref={ descriptionRef } />
      </div>
      
      <div>
        <label htmlFor="client">Client</label>
        <input
          id='client'
          name='client'
          type="text" 
          ref={ clientRef } 
        />
      </div>

      <div>
        <label htmlFor="location">Location</label>
        <input
          id='location'
          name='location'
          type="text" 
          ref={ locationRef } 
        />
      </div>

      <div>
        <label htmlFor="status">Status</label>
        <select ref={ statusRef } defaultValue="planning">
          <option value="planning">Planning</option>
          <option value="in-progress">In Progress</option>
          <option value="complete">Complete</option>
        </select>
      </div>

      <div>
        <label htmlFor='startDate'>Start Date</label>
        <input
          id="startDate"
          name="startDate"
          type="date" 
          ref={ startDateRef }
        />
      </div>

      <div>
        <label htmlFor='endDate'>End Date</label>
        <input
          id="endDate"
          name="endDate"
          type="date"
          ref={ endDateRef } 
        />
      </div>

      <button type="submit">Create Project</button>

      {message && <p style={{ color: "green" }}>{ message }</p>}
      {error && <p style={{ color: "red" }}>{ error }</p>}
    </form>
  )
}

export default NewProject
