import { useState, useEffect, useContext } from "react"

import FormContext from '../../../../../../context/forms/FormContext.jsx'
import { capitalize } from '../../../../../../utils/strings.js'
import { getKeys, pick } from '../../../../../../utils/obj.js'

import Alert from '../../../../../components/library/alert/component.jsx'
import Button from '../../../../../components/library/button/component.jsx'
import Input from '../../../../../components/library/input/component.jsx'
import styles from './styles.module.css'

const Form = ({ heading, attributes, exclude, onSubmit }) => {
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
      setForm(pick(toEdit, attributes))
    } else if (toCopy) {
      setForm(pick(toCopy, attributes))
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
    console.log(form)

    // try {
    //   const response = await onSubmit()
    //   if (response.error) {
    //     setError(response.error)
    //   } else if (toEdit) {
    //     setMessage(`Equipment updated successfully`)
    //     handleClear()
    //   } else {
    //     setMessage(`Equipment created successfully`)
    //     handleClear()
    //   }
    // } catch (err) {
    //   setError(err.message || "An error occurred while creating the circuit")
    // }
  }

  if (!form) return <p>Loading...</p>
  
  return (
    <form onSubmit={ handleSubmit }>
      <h2>{ toEdit ? `Edit ${ heading }` : `Create ${ heading }` }</h2>
      <div className={ styles.group } style={{ gridTemplateColumns: `repeat(${Math.ceil(keys.length/2) }, 1fr)` }}>
      {console.log()}
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