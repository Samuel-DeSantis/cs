import mongoose from 'mongoose'

const defaultOptions = {
  type: String,
  trim: true
}

const cableSchema = new mongoose.Schema({
  conductors: { ...defaultOptions },
  ground: { type: Boolean, default: false },
  size: { ...defaultOptions },
  type: { ...defaultOptions },
  sys_volts: { ...defaultOptions },
  insulation: { ...defaultOptions },
  od: { type: Number }
});

const Cable = mongoose.model('Cable', cableSchema);
export default Cable