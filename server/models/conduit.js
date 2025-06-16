import mongoose from 'mongoose'

const conduitSchema = new mongoose.Schema({
  tag: {   
    type: String,
    trim: true 
  },
  type: {   
    type: String,
    trim: true 
  },
  size: {
    type: Number 
  },
  length: {
    type: Number 
  },
  cables: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cable'
  }] // many-to-many link
});

const Conduit = mongoose.model('Conduit', conduitSchema);
export default Conduit