import { useState } from "react"

import FormContext from "./FormContext"

export const FormProvider = ({ children }) => {
  const [form, setForm] = useState({})
  const [toEdit, setToEdit] = useState(null)
  const [toCopy, setToCopy] = useState(null)
  const [toDelete, setToDelete] = useState(null)
  const [reload, setReload] = useState(0)

  const triggerReload = () => setReload(prev => prev + 1)

  const clearForm = (template = {}) => {
    const cleared = Object.keys(template).reduce((acc, key) => {
      acc[key] = ''
      return acc
    }, {})
    setForm(cleared)
    return cleared
  }

  return (
    <FormContext.Provider value={{
      form, setForm,
      toEdit, setToEdit,
      toCopy, setToCopy,
      toDelete, setToDelete,
      reload, triggerReload,
      clearForm
    }}>
      {children}
    </FormContext.Provider>
  )
}