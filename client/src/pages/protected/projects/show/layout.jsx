import { useParams } from "react-router-dom"

import { FormProvider } from '../../../../context/forms/FormProvider.jsx'

import Tabs from "../../../components/library/tabs/component"

const ProjectLayout = () => {
  const { id } = useParams()
  
  const tabs = [
    { label: 'Equipment', url: 'equipment' },
    { label: 'Circuits', url: 'circuits' },
    { label: 'Raceways', url: 'raceways' },
    { label: 'Materials', url: 'materials' }, 
    { label: 'Project', url: '' },
  ]

  return (
    <FormProvider>
      <Tabs path={`/project/${ id }`} tabs={ tabs }/>
    </FormProvider>
  )
}

export default ProjectLayout