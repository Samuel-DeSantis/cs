import Equipment from '../models/equipment.js'

// GET /equipments/:id
export const getEquipment = async (req, res) => {
  try {
    const equipment = await Equipment.findById(req.params.id) // .populate('circuits')
    if (!equipment) return res.status(404).json({ error: 'Equipment not found' })
    res.json(equipment)
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve equipment' })
  }
}

// PUT /equipments/:id
export const updateEquipment = async (req, res) => {
  try {
    const updated = await Equipment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    if (!updated) return res.status(404).json({ error: 'Equipment not found' })
    res.json({ message: 'Equipment updated', equipment: updated })
  } catch (err) {
    res.status(500).json({ error: 'Failed to update equipment' })
  }
}

// DELETE /equipments/delete
export const deleteEquipment = async (req, res) => {
  try {
    const equipment_id = req.body.equipment_id
    const project_id = req.body.project_id

    const equipment = await Equipment.findById(equipment_id)
    if (!equipment) return res.status(404).json({ error: 'Equipment not found' })

    await Equipment.findByIdAndDelete(equipment_id)

    if (equipment.project) {
      await Project.findByIdAndUpdate(
        project_id, 
        { $pull: { equipment: equipment_id }},
        { new: true }
      )
    }
    
    logger.info({ deleted: equipment })
    res.json({ message: 'Equipment deleted' })
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete equipment' })
  }
}

// POST /equipments
export const createEquipment = async (req, res) => {
  try {
    const equipment = await Equipment.create(req.body)
    res.status(201).json({ message: 'Equipment created', equipment })
  } catch (err) {
    res.status(500).json({ error: 'Failed to create equipment' })
  }
}

// GET /equipments
export const getAllEquipment = async (req, res) => {
  try {
    const equipments = await Equipment.find({ users: req.user.id })
      .populate('users')
      .populate('circuits')
    res.json(equipments)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch equipments' })
  }
}
