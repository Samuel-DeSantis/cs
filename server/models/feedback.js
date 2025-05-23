import mongoose from 'mongoose'

const feedbackSchema = new mongoose.Schema({
  description: {
    type: String,
    trim: true,
  },
  date: Date,
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  },
});

const Feedback = mongoose.model('Feedback', feedbackSchema);
export default Feedback