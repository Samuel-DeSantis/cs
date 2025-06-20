import { useParams } from "react-router-dom"

import Tabs from "../../../components/library/tabs/component"

const ProjectLayout = () => {
  const { id } = useParams()
  
  const tabs = [
    { label: 'Equipment', url: 'equipment'},
    { label: 'Circuits', url: 'circuits'},
    { label: 'Raceways', url: 'raceways'},
    { label: 'Project', url: ''},
    // { label: 'Materials', url: 'materials'}, // Procurement
  ]

  return <Tabs path={ `/project/${ id }`} tabs={ tabs }/>
}

export default ProjectLayout