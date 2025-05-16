import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getProjects } from '../../../../services/projects'

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (err) {
        console.error(err);
        setError(err.message || 'Error loading projects');
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  if (loading) return <p>Loading projects...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h2>Your Projects</h2>
      {projects.length === 0 ? (
        <p>No projects found.</p>
      ) : (
        <ul>
          {projects.map(project => (
            <li key={project._id}>
              <Link to={`/project/${project._id}`}>
                <strong>{project.name}</strong><br />
                <span>{project.description}</span>
              </Link>
            </li>
          ))}
          <li>
            <Link to="/project/new">
              <strong>Create New Project</strong>
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Projects;
