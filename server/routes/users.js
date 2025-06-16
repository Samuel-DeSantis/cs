import express from 'express';

import User from '../models/user.js';
import { Auth, Token } from '../middleware/index.js';
import logger from '../utils/logger.js';
import { authenticateToken } from '../middleware/authenticateToken.js';

const router = express.Router();

router.post('/sign_up', async (req, res) => {

  logger.info({
    route: 'POST /api/auth/signup', 
    content: req.body
  });
  try {
    const { 
      name,
      username,
      email,
      password,
      role,
      phone,
      location,
      organization,
    } = req.body;

    const existing_user = await User.findOne({ email });
    if (existing_user) return res.status(400).json({ error: 'Email already in use' });

    const password_hash = await Auth.hashPassword(password);

    const user = await User.create({ 
      name,
      username,
      email,
      password_hash,
      role,
      phone,
      location,
      organization,
    });

    const token = Token.generate({ id: user._id });

    res.status(201).json({
      message: 'User created successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        role: user.role,
        phone: user.phone,
        location: user.location,
        organization: user.organization,
      }
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/sign_in', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const is_match = await Auth.comparePassword(password, user.password_hash);
    if (!is_match) return res.status(401).json({ error: 'Invalid credentials' });

    const token = Token.generate({ id: user._id });

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/user', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
    if (!user) return res.status(404).json({ error: 'User not found' })

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
})

export default router;