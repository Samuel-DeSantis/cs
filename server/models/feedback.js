import mongoose from 'mongoose'

const feedbackSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  },
  description: {
    type: String,
    trim: true,
  },
}, {
  timestamps: { createdAt: 'created_at' }
});

feedbackSchema.index({ user: 1 })

const Feedback = mongoose.model('Feedback', feedbackSchema);
export default Feedback