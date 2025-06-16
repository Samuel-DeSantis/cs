import { useEffect, useState } from "react";
import { createCircuit, updateCircuit } from "../../../../../services/circuits";

import Input from '../../../../components/library/input/component'
import Button from '../../../../components/library/button/component'
import styles from './styles.module.css';

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

const Form = ({ project_id, onCreate, circuitToEdit, setCircuitToEdit, circuitToCopy, setCircuitToCopy }) => {

  const [formData, setFormData] = useState(emptyForm);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (circuitToEdit) {
      setFormData(circuitToEdit);
    } else if (circuitToCopy) {
      setFormData(circuitToCopy)
    } else {
      setFormData(emptyForm);
    }
  }, [circuitToEdit, circuitToCopy]);

  const handleClear = () => {
    setFormData(emptyForm)
    setCircuitToEdit(null)
    setCircuitToCopy?.(null)
  }

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
        if (circuitToCopy) {
          // Delete the _id and __v fields from copying
          delete formData._id
          delete formData.__v
        }
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
    <div className={ styles.form_container }> 
      <div>
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "left", alignItems: "center" }}>
          <h3 style={{padding: '10px'}}>{ circuitToEdit ? "Edit Circuit" : "Create New Circuit" }</h3>
          <Button
            onClick={ handleClear }>Clear</Button>
        </div>
        <form onSubmit={handleSubmit}>
          <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
            <Input
              style={{ width: "75px" }}
              label='Circuit'
              id='circuit_number'
              name='circuit_number'
              type='text'
              value={ formData.circuit_number }
              onChange={ handleChange }
            />
            <Input
              style={{ width: "75px" }}
              label='Designator'
              id='designator'
              name='designator'
              type='text'
              value={ formData.designator }
              onChange={ handleChange }
            />
            <Input
              style={{ width: "75px" }}
              label='Equipment'
              id='equipment'
              name='equipment'
              type='text'
              value={ formData.equipment }
              onChange={ handleChange }
            />
        
            <Input
              style={{ width: "75px" }}
              label='Tag'
              id='tag'
              name='tag'
              type='text'
              value={ formData.tag }
              onChange={ handleChange }
            />
        
            <Input
              style={{ width: "75px" }}
              label='ID'
              id='circuit_id'
              name='circuit_id'
              type='text'
              value={ formData.circuit_id }
              onChange={ handleChange }
            />
            <Input
              style={{ width: "75px" }}
              label='Drawing'
              id='drawing'
              name='drawing'
              type='text'
              value={ formData.drawing }
              onChange={ handleChange }
            />
            <Input
              style={{ width: "75px" }}
              label='Length'
              id='length'
              name='length'
              type='text'
              value={ formData.length }
              onChange={ handleChange }
            />
            <Input
              style={{ width: "75px" }}
              label='Conductors'
              id='conductors'
              name='conductors'
              type='text'
              value={ formData.conductors }
              onChange={ handleChange }
            />
            <Input
              style={{ width: "75px" }}
              label='Size'
              id='size'
              name='size'
              type='text'
              value={ formData.size }
              onChange={ handleChange }
            />
              </div>
            <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
            <Input
              style={{ width: "75px" }}
              label='Type'
              id='type'
              name='type'
              type='text'
              value={ formData.type }
              onChange={ handleChange }
              />
            <Input
              style={{ width: "75px" }}
              label='Sys. Volts.'
              id='sys_volts'
              name='sys_volts'
              type='text'
              value={ formData.sys_volts }
              onChange={ handleChange }
            />
            <Input
              style={{ width: "75px" }}
              label='Insulation'
              id='insulation'
              name='insulation'
              type='text'
              value={ formData.insulation }
              onChange={ handleChange }
            />
        
            <Input
              style={{ width: "75px" }}
              label='From'
              id='from'
              name='from'
              type='text'
              value={ formData.from }
              onChange={ handleChange }
            />
        
            <Input
              style={{ width: "75px" }}
              label='To'
              id='to'
              name='to'
              type='text'
              value={ formData.to }
              onChange={ handleChange }
            />
            <Input
              style={{ width: "75px" }}
              label='Via'
              id='via'
              name='via'
              type='text'
              value={ formData.via }
              onChange={ handleChange }
            />
            <Input
              style={{ width: "75px" }}
              label='Comments'
              id='comments'
              name='comments'
              type='text'
              value={ formData.comments }
              onChange={ handleChange }
            />
            <Input
              style={{ width: "75px" }}
              label='Rev'
              id='rev'
              name='rev'
              type='text'
              value={ formData.rev }
              onChange={ handleChange }
            />
              </div>
            <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
          </div>
          <Button type='submit'>{ circuitToEdit ? "Update" : "Create" }</Button>
          {message && <p style={{ color: "green" }}>{ message }</p>}
          {error && <p style={{ color: "red" }}>{ error }</p>}
        </form>
      </div>
    </div>
  );
};

export default Form;