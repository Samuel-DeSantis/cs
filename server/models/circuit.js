import mongoose from 'mongoose'

const circuitSchema = new mongoose.Schema({
  circuit_number: String,
  designator: String,
  equipment: String,
  tag: String,
  circuit_id: String,
  drawing: String,
  length: Number,
  conductors: String,
  size: String,
  type: String,
  sys_volts: String,
  insulation: String,
  from: String,
  to: String,
  via: String,
  comments: String,
  rev: String,
  project: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project' 
  }, // optional back-reference
});

const Circuit = mongoose.model('Circuit', circuitSchema);
export default Circuit
