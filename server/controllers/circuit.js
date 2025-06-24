import Circuit from '../models/circuit.js'
import Project from '../models/project.js'
import Equipment from '../models/equipment.js'
import Logger from '../models/logger.js'

import logger from '../utils/logger.js'

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

// GET /circuits/:id
export const getCircuit = async (req, res) => {
  try {
    const { id: project_id } = req.params
    const circuit = await Circuit.find({ project: project_id })
      .populate('to')
      .populate('from')
      .populate('cable.type')
      .populate('via')
      .lean()

    if (!circuit) return res.status(404).json({ error: 'Circuit not found' })
    res.status(200).json(circuit)
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve circuit' })
  }
}

// POST /circuits
export const createCircuit = async (req, res) => {
  const { project_id, circuit } = req.body

  console.log('createCircuit', { project_id, circuit })

  try {
    const {
      user: user,
      circuit: circuitData
    } = req.body
    const circuit = await Circuit.create(circuitData)

    await Equipment.findByIdAndUpdate(
      project_id, 
      { $push: { circuits: circuit._id }},
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
