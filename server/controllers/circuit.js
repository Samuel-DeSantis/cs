import Circuit from '../models/circuit.js'
import Project from '../models/project.js'
import logger from '../utils/logger.js'

// GET /circuits/:id
export const getCircuit = async (req, res) => {
  try {
    const circuit = await Circuit.findById(req.params.id)
      .populate('project')
      .lean()
    logger.info(circuit)
    if (!circuit) return res.status(404).json({ error: 'Circuit not found' })
    res.json(circuit)
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve circuit' })
  }
}

// GET /circuits
export const getAllCircuits = async (req, res) => {
  try {
    const circuits = await Circuit.find()
      .populate('project')
      .lean()
    res.json(circuits)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch circuits' })
  }
}

// POST /circuits
export const createCircuit = async (req, res) => {
  const { project_id, circuit } = req.body

  console.log('createCircuit', { project_id, circuit })

  try {
    const new_circuit = await Circuit.create({ ...circuit })
    await Project.findByIdAndUpdate(
      project_id, 
      { $push: { circuits: new_circuit._id }},
      { new: true }
    )
    res.status(201).json({ message: 'Circuit created', circuit })
  } catch (err) {
    res.status(500).json({ error: 'Failed to create circuit' })
  }
}

// PUT /circuits/:id
export const updateCircuit = async (req, res) => {
  try {
    const updated = await Circuit.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    if (!updated) return res.status(404).json({ error: 'Circuit not found' })
    res.json({ message: 'Circuit updated', circuit: updated })
  } catch (err) {
    res.status(500).json({ error: 'Failed to update circuit' })
  }
}

// DELETE /circuits/delete
export const deleteCircuit = async (req, res) => {
  try {
    const circuit_id = req.body.circuit_id
    const project_id = req.body.project_id

    const circuit = await Circuit.findById(circuit_id)
    if (!circuit) return res.status(404).json({ error: 'Circuit not found' })

    await Circuit.findByIdAndDelete(req.body.circuit_id)

    if (circuit.project) {
      await Project.findByIdAndUpdate(
        project_id, 
        { $pull: { circuits: circuit_id }},
        { new: true }
      )
    }

    logger.info({ deleted: circuit })
    res.json({ message: 'Circuit deleted' })
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete circuit' })
  }
}
