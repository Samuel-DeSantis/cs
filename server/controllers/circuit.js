import Circuit from '../models/circuit.js'
import Project from '../models/project.js'
import Equipment from '../models/equipment.js'
import Cable from '../models/cable.js'
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

    const cables = await Cable.find().lean()
    const equipment = await Equipment.find({ project: project_id}).lean()

    if (!circuit) return res.status(404).json({ error: 'Circuit not found' })
    res.status(200).json({
      circuits: circuit, 
      cables: cables,
      equipment: equipment
    })
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
      circuit.project, 
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
    const {
      user_id: user,
      circuit : circuitData
    } = req.body

    const circuit = await Circuit.findById(circuitData._id)
    if (!circuit) return res.status(404).json({ error: 'Circuit not found' })

    await Circuit.findByIdAndDelete(circuit._id)

    if (circuit.project) {
      await Project.findByIdAndUpdate(
        project_id, 
        { $pull: { circuits: circuit._id }},
        { new: true }
      )
    }

    logger.info({ deleted: circuit })
    res.status(200).json({ message: 'Circuit deleted' })
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete circuit' })
  }
}
