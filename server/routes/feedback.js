import express from 'express';

import Feedback from '../models/feedback.js'
import logger from '../utils/logger.js'
import { authenticateToken } from '../middleware/authenticateToken.js';

const router = express.Router();

router.post('/', authenticateToken, async (req, res) => {
  try {
    const { description, user, date } = req.body;
    if (!{ description, user, date }) return res.status(400).json({ error: 'Feedback is required' })

    await Feedback.create({ description, user, date })

    res.status(201).json({ message: 'Feedback received successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to submit feedback' });
  }
})

export default router