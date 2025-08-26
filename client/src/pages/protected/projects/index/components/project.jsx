import { Link } from "react-router-dom"

// import Card from "../../../../components/library/card/component"
import { deleteProject } from '../../../../../services/projects'
import { formatDate } from '../../../../../utils/dates'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from '@/components/ui/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardAction
} from '@/components/ui/card'
import { Meatballs } from '../../../../components/library/icon/component'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"

const Project = ({ project, onDelete }) => {

  const handleDelete = async () => {
    deleteProject({project_id: project._id})
    if(onDelete) onDelete()
  }
  
  {/*className={ styles.link } Added '/equipment' to the url */}
  return (
    // <Link to={ `/project/${ project._id }/equipment`}> 
      <Card className='dark:bg-neutral-950'>
        <CardHeader className='flex justify-between'>
          <div>
            <CardTitle>{ project.name }</CardTitle>
            <CardDescription className='truncate'>{ project.description || '---'}</CardDescription>
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost"><Meatballs /></Button>
            </PopoverTrigger>
            <PopoverContent className="w-40 flex flex-col gap-2">
              <CardTitle className='text-center'>Options</CardTitle>
              <Separator className='my-2' />
              <Button disabled variant='secondary'>Share</Button> {/* TODO: Update to add users to projects */}
              <Button disabled variant='secondary'>Export</Button> {/* TODO: Update to export entire project content */}
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">Delete{/* TODO: Update to so only owner can delete, others can archive */}</Button> 
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete this project and remove your data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction className='bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60' asChild>
                        <Button onClick={() => handleDelete()}>Delete my project</Button>
                      </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </PopoverContent>
          </Popover>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="flex justify-between">
              <div>
                <div className="flex gap-6 items-center justify-between">
                  <CardTitle>Client :</CardTitle>
                  <CardDescription>{ project.client || '---'}</CardDescription>
                </div>
                <div className="flex gap-6 items-center justify-between">
                  <CardTitle>Location :</CardTitle>
                  <CardDescription>{ project.location || '---'}</CardDescription>
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <div>
                <div className="flex gap-6 items-center justify-between">
                  <CardTitle>Start :</CardTitle>
                  <CardDescription>{ project.startDate ? formatDate(project.startDate) : '---'}</CardDescription>
                </div>
                <div className="flex gap-6 items-center  justify-between">
                  <CardTitle>End :</CardTitle>
                  <CardDescription>{ project.endDate ? formatDate(project.endDate) : '---'}</CardDescription>
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <div className="grid gap-3">
                <CardTitle>Equipment</CardTitle>
                <CardDescription>{ project.equipment.length }</CardDescription>
              </div>
              <div className="grid gap-3">
                <CardTitle>Circuits</CardTitle>
                <CardDescription>{ project.circuits.length }</CardDescription>
              </div>
              <div className="grid gap-3">
                <CardTitle>Raceways</CardTitle>
                <CardDescription>{ project.raceways.length }</CardDescription>
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-4">

            <Link to={ `/project/${ project._id }/equipment`}> 
              <Button>Continue working</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
      
    );
  }
  
  export default Project
  {/* <div key={ project._id } className={ styles.project }>
    <div className={ styles.name }>{ project.name }</div>
    <div style={{ fontSize: '0.9rem', paddingTop: '10px'}}>{ project.description ? project.description : 'No  description' }</div>
    <div style={{ paddingTop:'20px' }}><strong>Client :</strong> { project.client }</div> */}
    {/* <div>Location: { project.location }</div> */}
    {/* <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop:'5px' }}>
      <div><strong>Equipment :</strong> { project.equipment.length }</div>
      <div><strong>Circuits :</strong> { project.circuits.length }</div> */}
      {/* <div>Equipment: { project.equipment.length }</div> */}
    {/* </div>
  </div> */}
// </Link>