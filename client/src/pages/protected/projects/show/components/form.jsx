import { useEffect, useState } from "react";
import { createCircuit, updateCircuit } from "../../../../../services/circuits";

const emptyForm = {
  circuit_number: "",
  designator: "",
  equipment: "",
  tag: "",
  circuit_id: "",
  drawing: "",
  length: "",
  conductors: "",
  size: "",
  type: "",
  sys_volts: "",
  insulation: "",
  from: "",
  to: "",
  via: "",
  comments: "",
  rev: "",
}

const Form = ({ project_id, onCreate, circuitToEdit }) => {

  const [formData, setFormData] = useState(emptyForm);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (circuitToEdit) {
      setFormData(circuitToEdit);
    } else {
      setFormData(emptyForm);
    }
  }, [circuitToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "length" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      if (circuitToEdit?._id) {
        await updateCircuit(circuitToEdit._id, formData);
        setMessage("Circuit updated successfully!");
      } else {
        await createCircuit({ 
          circuit: formData,
          project_id: project_id 
        });
        setMessage("Circuit creation successful!");
      }
      setFormData(emptyForm);
      onCreate?.(); // refresh the project/circuits
    } catch (err) {
      console.error(err);
      setError("Server error. Please try again later.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{ circuitToEdit ? "Edit Circuit" : "Create New Circuit" }</h3>

      <div>
        <label htmlFor='circuit_number'>Circuit</label>
        <input
          id='circuit_number'
          name='circuit_number'
          type='text'
          value={formData.circuit_number}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor='designator'>Designator</label>
        <select
          id='designator'
          name='designator'
          value={formData.designator}
          onChange={handleChange}
        >
          <option value='D'>D - Digital</option>
          <option value='S'>S - 120V</option>
          <option value='P'>P - 3-PH</option>
          <option value='M'>M - +15kV</option>
          <option value='C'>C - Controls</option>
          <option value='F'>F - Fiber</option>
          <option value='T'>T - Telecom</option>
        </select>
      </div>

      <div>
        <label htmlFor='equipment'>Equipment</label>
        <input
          id='equipment'
          name='equipment'
          type='text'
          value={formData.equipment}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor='tag'>Tag</label>
        <input
          id='tag'
          name='tag'
          type='text'
          value={formData.tag}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor='circuit_id'>ID</label>
        <input
          id='circuit_id'
          name='circuit_id'
          type='text'
          value={formData.circuit_id}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor='drawing'>Drawing</label>
        <input
          id='drawing'
          name='drawing'
          type='text'
          value={formData.drawing}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor='length'>Length</label>
        <input
          id='length'
          name='length'
          type='number'
          value={formData.length}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor='conductors'>Conductors</label>
        <input
          id='conductors'
          name='conductors'
          type='text'
          value={formData.conductors}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor='size'>Size</label>
        <input
          id='size'
          name='size'
          type='text'
          value={formData.size}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor='type'>Type</label>
        <input
          id='type'
          name='type'
          type='text'
          value={formData.type}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor='sys_volts'>Sys. Volts</label>
        <input
          id='sys_volts'
          name='sys_volts'
          type='text'
          value={formData.sys_volts}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor='insulation'>Insulation</label>
        <input
          id='insulation'
          name='insulation'
          type='text'
          value={formData.insulation}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor='from'>From</label>
        <input
          id='from'
          name='from'
          type='text'
          value={formData.from}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor='to'>To</label>
        <input
          id='to'
          name='to'
          type='text'
          value={formData.to}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor='via'>Via</label>
        <input
          id='via'
          name='via'
          type='text'
          value={formData.via}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor='comments'>Comments</label>
        <input
          id='comments'
          name='comments'
          type='text'
          value={formData.comments}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor='rev'>Rev</label>
        <input
          id='rev'
          name='rev'
          type='text'
          value={formData.rev}
          onChange={handleChange}
        />
      </div>

      <button type="submit">{ circuitToEdit ? "Update" : "Create" }</button>

      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
};

export default Form;
