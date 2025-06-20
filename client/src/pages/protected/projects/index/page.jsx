import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import { getProjects } from '../../../../services/projects'
import Project from "./components/project"

import Button from '../../../components/library/button/component'
import styles from "./styles.module.css"

const Projects = () => {
  const [projects, setProjects] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await getProjects()
        setProjects(data)
      } catch (err) {
        console.error(err)
        setError(err.message || 'Error loading projects')
      } finally {
        setLoading(false)
      }
    }

    loadProjects()
  }, [])

  if (loading) return <p>Loading projects...</p>
  if (error) return <p style={{ color: 'red' }}>{error}</p>

  return (
    <main className={ styles.container }>
      <h1>Your Projects</h1>
      {projects.length === 0 ? (
        <p>No projects found.</p>
      ) : (
        <div className={ styles.projects }>
          {projects.map(project => (
            <Project key={project._id} project={project} />
          ))}
        </div>
      )}
      <div>
        <Link to="/project/new" tabIndex="-1">
          <Button>Create new project</Button>
        </Link>
      </div>
    </main>
  )
}

export default Projects
