import { useEffect, useState, useCallback } from 'react'
import { useParams } from 'react-router-dom'

import { getProject } from '../../../../services/projects'

import styles from './styles.module.css'
import { formatDate } from '../../../../utils/dates'

const Project = () => {
  const { id } = useParams()

  const [project, setProject] = useState(null)
  const [error, setError] = useState('')

  const loadProject = useCallback(async () => {
    try {
      const data = await getProject(id)
      setProject(data)
    } catch (err) {
      setError(err.message)
    }
  }, [id]);

  useEffect(() => {
    loadProject()
  }, [loadProject])

  if (!project) {
    return <div>Loading project...</div>
  }
  
  return (
    <div className={ styles.container }>
      <div className={ styles.card }>
        <h2 className={ styles.title }>{ project.name }</h2>
      
        <div className={ styles.meta }>
          <span><strong>Client:</strong> { project.client }</span>
          <span><strong>Location:</strong> { project.location }</span>
        </div>
        <p className={ styles.description }>{ project.description }</p>
        <div className={ styles.dates }>
          <span><strong>Start:</strong> { formatDate(project.startDate) }</span>
          <span><strong>End:</strong> { formatDate(project.endDate) }</span>
        </div>
        <div className={ styles.users }>
          <strong>Users:</strong>
          <ul>
            {project.users.map((user, index) => (
              <li key={ index }>{ user.name } <span className={ styles.email }>({ user.email })</span></li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Project

// import { useParams } from 'react-router-dom';
// import { useEffect, useState, useCallback } from 'react';

// import { getProject } from '../../../../services/projects'; // Adjust the import path as necessary
// import Form from './components/form';
// import Circuits from './components/circuits';

// const ProjectPage = () => {
//   const { id } = useParams()
//   const [project, setProject] = useState(null)
//   const [error, setError] = useState('')
//   const [circuitToEdit, setCircuitToEdit] = useState(null)
//   const [circuitToCopy, setCircuitToCopy] = useState(null)

//   const loadProject = useCallback(async () => {
//     try {
//       const data = await getProject(id); // pass the id here
//       setProject(data)
//       console.log('Project data:', data)
//       setCircuitToEdit(null)
//       setCircuitToEdit(null)
//     } catch (err) {
//       setError(err.message)
//     }
//   }, [id]);

//   useEffect(() => {
//     loadProject()
//   }, [loadProject])

//   if (error) return <p>Error: {error}</p>
//   if (!project) return <p>Loading...</p>

//   return (
//     <div style={{ paddingBottom: '150px' }}>
//       <div>
//         <h2>{ project.name }</h2>
//         {/* <p>Client: { project.client }</p>
//         <p>Location: { project.location }</p>
//         <p>{ project.description }</p>
//         <p>Start: { project.startDate }</p>
//         <p>End: { project.endDate }</p>
//         <div>Users:
//           {project.users.map((user) => (
//             <div key={user.id}>{user.name} ({user.email})</div>
//           ))}
//         </div> */}
//       </div>
//       <Form
//         project_id={ id }
//         onCreate={ loadProject }
//         circuitToEdit={ circuitToEdit }
//         circuitToCopy={ circuitToCopy }
//         setCircuitToEdit={ setCircuitToEdit }
//         setCircuitToCopy={ setCircuitToCopy}
//       />
//       <Circuits
//         circuits={ project.circuits }
//         project_id={ id }
//         onDeleteCircuit={ loadProject }
//         onEditCircuit={ setCircuitToEdit }
//         onCopyCircuit={ setCircuitToCopy }
//       />
//     </div>
//   );
// };

// export default ProjectPage
