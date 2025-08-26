import { useParams } from "react-router-dom"

import { FormProvider } from '../../../../context/forms/FormProvider.jsx'

import Project from "./page.jsx"
import Equipment from "./equipment/page.jsx"
import Circuits from "./circuits/page.jsx"
import Raceways from "./raceways/page.jsx"
import Materials from "./materials/page.jsx"

// import Tabs from "../../../components/library/tabs/component"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger 
} from "@/components/ui/tabs"

const ProjectLayout = () => {
  const { id } = useParams()
  
  const tabs = [
    { label: 'Project', value: 'project', component: <Project/> },
    { label: 'Equipment', value: 'equipment', component: <Equipment/> },
    { label: 'Circuits', value: 'circuits', component: <Circuits/> },
    { label: 'Raceways', value: 'raceways', component: <Raceways/> },
    { label: 'Materials', value: 'materials', component: <Materials/> }, 
  ]

  return (
    <FormProvider>
      <Tabs defaultValue='project' className='w-full dark:bg-neutral-950'>
        <TabsList className='dark:bg-neutral-950'>
          <TabsTrigger value='project'>Project</TabsTrigger>
          <TabsTrigger value='equipment'>Equipment</TabsTrigger>
          <TabsTrigger value='circuits'>Circuits</TabsTrigger>
          <TabsTrigger value='raceways'>Raceways</TabsTrigger>
          <TabsTrigger disabled value='materials'>Materials</TabsTrigger>
        </TabsList>
        <TabsContent value='project'>
          <Project />
        </TabsContent>
        <TabsContent value='equipment'>
          <Equipment />
        </TabsContent>
        <TabsContent value='circuits'>
          <Circuits />
        </TabsContent>
        <TabsContent value='raceways'>
          <Raceways />
        </TabsContent>
        <TabsContent value='materials'>
          <Materials />
        </TabsContent>
      </Tabs>
    </FormProvider>
  )
}

export default ProjectLayout