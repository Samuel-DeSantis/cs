import mongoose from 'mongoose'

const circuitSchema = new mongoose.Schema({
  circuit_number: String,
  designator: String,
  equipment: String,
  tag: String,
  circuit_id: String,
  drawing: String,
  length: Number,
  cable: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cable'
  },
  conductors: String,
  size: String,
  type: String,
  sys_volts: String,
  insulation: String,
  from: String,
  to: String,
  via: [mongoose.Schema.Types.Mixed],
  comments: String,
  rev: String,
  project: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project' 
  }, // optional back-reference
});

const Circuit = mongoose.model('Circuit', circuitSchema);
export default Circuit
