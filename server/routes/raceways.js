import express from 'express'

import {
  getAllRaceways,
  getRaceway,
  createRaceway,
  updateRaceway,
  deleteRaceway,
} from '../controllers/raceway.js'
import { authenticateToken } from '../middleware/authenticateToken.js'

const router = express.Router()

router.use(authenticateToken)

router.route('/')
  .get(getAllRaceways)
  .post(createRaceway)

router.route('/:id')
  .get(getRaceway)
  .put(updateRaceway)

router.route('/delete')
  .post(deleteRaceway)

export default router
