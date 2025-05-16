import { useParams } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';

import { getProject } from '../../../../services/projects'; // Adjust the import path as necessary
import Form from './components/form';
import CircuitList from './components/CircuitList';

const ProjectPage = () => {
  const { id } = useParams()
  const [project, setProject] = useState(null)
  const [error, setError] = useState('')
  const [circuitToEdit, setCircuitToEdit] = useState(null)

  const loadProject = useCallback(async () => {
    try {
      const data = await getProject(id); // pass the id here
      setProject(data)
      setCircuitToEdit(null)
    } catch (err) {
      setError(err.message)
    }
  }, [id]);

  useEffect(() => {
    loadProject()
  }, [loadProject])

  if (error) return <p>Error: {error}</p>
  if (!project) return <p>Loading...</p>

  return (
    <div>
      <h2>{ project.name }</h2>
      <p>{ project.description }</p>
      <CircuitList 
        circuits={ project.circuits }
        project_id={ id }
        onDeleteCircuit={ loadProject }
        onEditCircuit={ setCircuitToEdit }
      />
      <Form
        project_id={ id }
        onCreate={ loadProject }
        circuitToEdit={ circuitToEdit }
      />
    </div>
  );
};

export default ProjectPage
