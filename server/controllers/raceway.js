import { Raceway, Conduit, Tray } from '../models/raceway.js'
import Project from '../models/project.js'
import Cable from '../models/cable.js'
import Logger from '../models/logger.js'

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

// GET /raceways/:id
export const getRaceway = async (req, res) => {
  try {
    const raceways = await Raceway.find({project: req.params.id}) // .populate('circuits')

    if (!raceways) return res.status(404).json({ error: 'Raceway not found' })
    res.status(200).json(raceways)
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve raceway' })
  }
}

// POST /raceways
export const createRaceway = async (req, res) => {
  try {
    const {
      user: user_id,
      raceway: racewayData
    } = req.body
    let raceway

    switch (racewayData.kind) {
      case 'Conduit':
        delete racewayData.kind
        raceway = await Conduit.create(racewayData)
        break
      case 'Tray':
        delete racewayData.kind
        raceway = await Tray.create(racewayData)
        break
      default:
        delete racewayData.kind
        raceway = await Raceway.create(racewayData)
    }

    await Project.findByIdAndUpdate(
      raceway.project, 
      { $push: { raceways: raceway._id }},
      { new: true }
    )

    res.status(201).json({ message: 'Raceway created', raceway })
  } catch (err) {
    res.status(500).json({ error: 'Failed to create raceway' })
  }
}

// PUT /raceways/:id
export const updateRaceway = async (req, res) => {
  try {
    const {
      user: user_id,
      raceway: racewayData
    } = req.body
    const { id: raceway_id } = req.params
    let raceway

    console.log(racewayData)

    switch (racewayData.kind) {
      case 'Conduit':
        delete racewayData.kind
        raceway = await Conduit.findByIdAndUpdate(raceway_id, racewayData, {
          new: true,
          runValidators: true,
        })
        break
      case 'Tray':
        delete racewayData.kind
        raceway = await Tray.findByIdAndUpdate(raceway_id, racewayData, {
          new: true,
          runValidators: true,
        })
        break
      default:
        delete racewayData.kind
        raceway = await Raceway.findByIdAndUpdate(raceway_id, racewayData, {
          new: true,
          runValidators: true,
        })
    }

    // const raceway = await Raceway.findByIdAndUpdate(raceway_id, racewayData, {
    //   new: true,
    //   runValidators: true,
    // })

    console.log(raceway)

    if (!raceway) return res.status(404).json({ error: 'Raceway not found' })
    res.json({ message: 'Raceway updated', raceway: raceway })
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