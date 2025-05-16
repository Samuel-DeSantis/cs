import express from 'express';

import {
  getAllCircuits,
  getCircuit,
  createCircuit,
  updateCircuit,
  deleteCircuit,
} from '../controllers/circuit.js';

const router = express.Router();

router.route('/')
  .get(getAllCircuits)
  .post(createCircuit);

router.route('/:id')
  .get(getCircuit)
  .put(updateCircuit)

router.route('/delete')
  .post(deleteCircuit);

export default router