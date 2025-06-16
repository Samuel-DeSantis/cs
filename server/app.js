import cors from 'cors'
import express from 'express'

import {
  usersRouter,
  projectsRouter,
  circuitsRouter,
  feedbackRouter
} from './routes/index.js'

const app = express();

app.use(cors())
app.use(express.json());

app.use('/api/auth', usersRouter)
app.use('/api/projects', projectsRouter)
app.use('/api/circuits', circuitsRouter)
app.use('/api/feedback', feedbackRouter)

export default app