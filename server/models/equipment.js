import mongoose from 'mongoose'

const equipmentSchema = new mongoose.Schema({
  tag: { 
    type: String,
    trim: true,
    required: true,
  },
  type: {
    type: String,
    trim: true,
    required: true,
  },
  location: {
    type: String,
    trim: true
  },
  circuits: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Circuit'
  }], // many-to-many link
  project: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project' 
  }, // optional back-reference
})

const Equipment = mongoose.model('Equipment', equipmentSchema)
export default Equipment