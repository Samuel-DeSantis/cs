import express from 'express';

import {
  getAllProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
} from '../controllers/project.js';

const router = express.Router();

router.route('/')
  .get(getAllProjects)
  .post(createProject);

router.route('/:id')
  .get(getProject)
  .put(updateProject)
  .delete(deleteProject);

export default router
