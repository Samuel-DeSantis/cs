import Equipment from '../models/equipment.js'
import Project from '../models/project.js'
import Logger from '../models/logger.js'

import logger from '../utils/logger.js'

// GET /equipments
export const getAllEquipment = async (req, res) => {
  try {
    const equipment = await Equipment.find({ users: req.user.id })
      .populate('circuits')
    res.status(200).json(equipment)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch equipment' })
  }
}

// GET /equipments/:id
export const getEquipment = async (req, res) => {
  try {
    const { id: project_id } = req.params
    const equipment = await Equipment.find({ project: project_id})
    
    if (!equipment) return res.status(404).json({ error: 'Equipment not found' })
    res.status(200).json(equipment)
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve equipment' })
  }
}

// POST /equipments
export const createEquipment = async (req, res) => {
  try {
    const {
      user: user,
      equipment: equipmentData
    } = req.body
    const equipment = await Equipment.create(equipmentData)

    await Project.findByIdAndUpdate(
      equipment.project, 
      { $push: { equipment: equipment._id }},
      { new: true }
    )

    await Logger.create({
      user: user,
      category: 'equipment',
      action: 'create',
      metadata: {
        equipment_id: equipment._id,
        project_id: equipment.project
      }
    })

    res.status(201).json({ message: 'Equipment created', equipment })
  } catch (err) {
    res.status(500).json({ error: 'Failed to create equipment' })
  }
}

// PUT /equipments/:id
export const updateEquipment = async (req, res) => {
  try {
    const { id: project_id } = req.params
    const {
      user: user,
      equipment: equipmentData
    } = req.body
    
    const equipment = await Equipment.findByIdAndUpdate(project_id, equipmentData, {
      new: true,
      runValidators: true,
    })

    await Logger.create({
      user: user,
      category: 'equipment',
      action: 'update',
      metadata: {
        equipment: equipment,
        project_id: equipment.project
      }
    })

    if (!equipment) return res.status(404).json({ error: 'Equipment not found' })
    res.status(200).json({ message: 'Equipment updated', equipment: equipment })
  } catch (err) {
    res.status(500).json({ error: 'Failed to update equipment' })
  }
}

// DELETE /equipments/delete
export const deleteEquipment = async (req, res) => {
  try {
    // const {
    //   user: user_id,
    //   equipment: project_id
    // } = req.body
    
    // console.log('deleteEquipment', { equipment_id, project_id })

    const equipment = await Equipment.findById(req.body.equipment._id)
    console.log('Found equipment:', equipment)
    if (!equipment) return res.status(404).json({ error: 'Equipment not found' })

    await Equipment.findByIdAndDelete(req.body.equipment._id)

    if (equipment.project) {
      await Project.findByIdAndUpdate(
        equipment.project, 
        { $pull: { equipment: req.body.equipment._id }},
        { new: true }
      )
    }

    await Logger.create({
      user: req.body.user,
      category: 'equipment',
      action: 'delete',
      metadata: {
        equipment: equipment,
        project_id: equipment.project
      }
    })
    
    res.status(200).json({ success: true, message: 'Equipment deleted' })
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: 'Failed to delete equipment' })
  }
}