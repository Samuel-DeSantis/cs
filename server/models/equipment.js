import mongoose from 'mongoose'

const defaultOptions = {
  type: String,
  trim: true
}

const equipmentSchema = new mongoose.Schema({
  tag: { 
    required: true,
    ...defaultOptions 
  },
  type: {
    required: true,
    ...defaultOptions
  },
  location: { ...defaultOptions },
  circuits: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Circuit'
  }], // many-to-many link
  project: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project' 
  }, // optional back-reference
});

const Equipment = mongoose.model('Equipment', equipmentSchema);
export default Equipment