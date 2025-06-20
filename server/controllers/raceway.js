import { Raceway } from '../models/raceway.js'

// GET /raceways/:id
export const getRaceway = async (req, res) => {
  try {
    const raceway = await Raceway.find({project: req.params.id}) // .populate('circuits')
    if (!raceway) return res.status(404).json({ error: 'Raceway not found' })
    res.json(raceway)
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve raceway' })
  }
}

// PUT /raceways/:id
export const updateRaceway = async (req, res) => {
  try {
    const updated = await Raceway.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    if (!updated) return res.status(404).json({ error: 'Raceway not found' })
    res.json({ message: 'Raceway updated', raceway: updated })
  } catch (err) {
    res.status(500).json({ error: 'Failed to update raceway' })
  }
}

// DELETE /raceways/delete
export const deleteRaceway = async (req, res) => {
  try {
    const raceway_id = req.body.raceway_id
    const project_id = req.body.project_id

    const raceway = await Raceway.findById(raceway_id)
    if (!raceway) return res.status(404).json({ error: 'Raceway not found' })

    await Raceway.findByIdAndDelete(raceway_id)

    if (raceway.project) {
      await Project.findByIdAndUpdate(
        project_id, 
        { $pull: { raceway: raceway_id }},
        { new: true }
      )
    }
    
    logger.info({ deleted: raceway })
    res.json({ message: 'Raceway deleted' })
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete raceway' })
  }
}

// POST /raceways
export const createRaceway = async (req, res) => {
  try {
    const raceway = await Raceway.create(req.body)
    res.status(201).json({ message: 'Raceway created', raceway })
  } catch (err) {
    res.status(500).json({ error: 'Failed to create raceway' })
  }
}

// GET /raceways
export const getAllRaceways = async (req, res) => {
  try {
    const raceways = await Raceway.find({ users: req.user.id })
      .populate('users')
      .populate('circuits')
    res.json(raceways)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch raceways' })
  }
}
