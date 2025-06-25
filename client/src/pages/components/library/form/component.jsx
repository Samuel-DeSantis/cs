import { useState, useEffect, useContext } from "react"

import FormContext from '../../../../context/forms/FormContext.jsx'
import { capitalize } from "../../../../utils/strings.js"
import { getKeys, pick } from "../../../../utils/obj.js"

import Input from "../input/component"
import Button from "../button/component"
import styles from './styles.module.css'
import Alert from "../alert/component.jsx"

const Form = ({ exclude, onSubmit }) => {
  const {
    form, setForm,
    toEdit, setToEdit,
    toCopy, setToCopy,
    clearForm
  } = useContext(FormContext)
  const keys = getKeys([form], exclude)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    if (toEdit) {
      setForm(pick(toEdit, ['tag', 'type', 'location', 'project', 'circuits']))
    } else if (toCopy) {
      setForm(pick(toCopy, ['tag', 'type','location', 'project', 'circuits']))
    } else {
      setForm(clearForm(form))
    }
  }, [toEdit, toCopy])

  const handleClear = () => {
    setForm(clearForm(form))
    setToEdit(null)
    setToCopy(null)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage("")
    setError("")

    try {
      const response = await onSubmit()
      if (response.error) {
        setError(response.error)
      } else if (toEdit) {
        setMessage("Equipment updated successfully")
        handleClear()
      } else {
        setMessage("Circuit created successfully")
        handleClear()
      }
    } catch (err) {
      setError(err.message || "An error occurred while creating the circuit")
    }
  }

  if (!form) return <p>Loading...</p>
  
  return (
    <form onSubmit={ handleSubmit }>
      <h2>{ toEdit ? 'Edit Equipment' : 'Create Equipment' }</h2>
      <div className={ styles.group }>
        {keys.map(key => (
          <Input
            key={ key }
            name={ key }
            label={ capitalize(key) }
            value={ form[key] }
            onChange={ handleChange } />
        ))}
      </div>
      <div className={ styles.group }>
        <Button type="submit">{ toEdit ? 'Update' : 'Create' }</Button>
        <Button type="button" onClick={ handleClear }>Clear</Button>
      </div>
      {message && <p style={{ color: 'green' }}>{ message }</p>}
      {error && (          
        <div style={{ marginTop: '1rem' }}>
          <Alert variant='error' onClose={() => setError('')}>{error}</Alert>
        </div>
      )}
    </form>
  )
}

export default Form