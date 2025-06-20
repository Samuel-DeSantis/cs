import Project from '../models/project.js'

// GET /projects
export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find({ users: req.user.id })
      .populate('users')
      .lean()
    res.json(projects)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch projects' })
  }
}

// POST /projects
export const createProject = async (req, res) => {
  try {
    const project = await Project.create(req.body)
    res.status(201).json({ message: 'Project created', project })
  } catch (err) {
    res.status(500).json({ error: 'Failed to create project' })
  }
}

// GET /projects/:id
export const getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate('users')
      // .populate('circuits')
      .lean()
    if (!project) return res.status(404).json({ error: 'Project not found' })
    res.json(project)
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve project' })
  }
}

// PUT /projects/:id
export const updateProject = async (req, res) => {
  try {
    const updated = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    if (!updated) return res.status(404).json({ error: 'Project not found' })
    res.json({ message: 'Project updated', project: updated })
  } catch (err) {
    res.status(500).json({ error: 'Failed to update project' })
  }
}

// DELETE /projects/:id
export const deleteProject = async (req, res) => {
  try {
    const deleted = await Project.findByIdAndDelete(req.params.id)
    if (!deleted) return res.status(404).json({ error: 'Project not found' })
    res.json({ message: 'Project deleted' })
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete project' })
  }
}