import mongoose from 'mongoose'

import app from './app.js'
import logger from './utils/logger.js'

const PORT = process.env.PORT || 8080;
const options = {}

mongoose.connect(process.env.MONGO_URI, options)
	.then(() => {	app.listen(PORT, logger.info(`MongoDB Connected - http://localhost:8080/`))	})
	.catch((err) => console.error('MongoDB connection error:', err))