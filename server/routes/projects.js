import express from 'express';

import {
  getAllProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
} from '../controllers/project.js';
import { authenticateToken } from '../middleware/authenticateToken.js';

const router = express.Router();

router.use(authenticateToken)

router.route('/')
  .get(getAllProjects)
  .post(createProject);

router.route('/:id')
  .get(getProject)
  .put(updateProject)
  .delete(deleteProject);

export default router
