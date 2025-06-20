import mongoose from "mongoose"

const loggerSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  category: {
    type: String,
    required: true, 
    enum: ['user', 'project', 'equipment', 'circuit']
  },
  action: {
    type: String,
    required: true,
    enum: ['create', 'update', 'delete', 'sign_in', 'sign_up']
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed,
  }
}, {
  timestamps: {
    createdAt: true, 
    updatedAt: false 
  }
})

loggerSchema.index({ user: 1 })

const Logger = mongoose.model('Logger', loggerSchema)
export default Logger