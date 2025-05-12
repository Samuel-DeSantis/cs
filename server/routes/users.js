import express from 'express';

import User from '../models/user.js';
import { Auth } from '../middleware/index.js';

const router = express.Router();

router.post('/signup', async (req, res) => {
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

    res.status(201).json({
      message: 'User created successfully',
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

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const is_match = await Auth.comparePassword(password, user.password_hash);
    if (!is_match) return res.status(401).json({ error: 'Invalid credentials' });

    res.json({
      message: 'Login successful',
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

export default router;