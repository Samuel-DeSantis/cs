import express from 'express'

import {
  getAllEquipment,
  getEquipment,
  createEquipment,
  updateEquipment,
  deleteEquipment,
} from '../controllers/equipment.js'
import { authenticateToken } from '../middleware/authenticateToken.js'

const router = express.Router()

router.use(authenticateToken)

router.route('/')
  .get(getAllEquipment)
  .post(createEquipment)

router.route('/:id')
  .get(getEquipment)
  .put(updateEquipment)

router.route('/delete')
  .post(deleteEquipment)

export default router
