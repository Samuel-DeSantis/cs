import mongoose from 'mongoose'

const defaultOptions = {
  type: String,
  trim: true
}

const circuitSchema = new mongoose.Schema({
  circuit_number: { ...defaultOptions },
  designator: { ...defaultOptions },
  tag: { ...defaultOptions },
  circuit_id: { ...defaultOptions },
  drawing: { ...defaultOptions },
  length: Number,
  cable: {
    count: Number,
    type: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Cable'
    }, // has one cable
  },
  from: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Equipment' 
  },
  to: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Equipment' 
  },
  comments: { ...defaultOptions },
  rev: { ...defaultOptions },
  via: [{ 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Raceway'
  }],
  project: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project' 
  }, // belongs to project
}, {
  timestamps: true
})

circuitSchema.index({ project: 1 })
circuitSchema.index({ from: 1 })
circuitSchema.index({ to: 1 })

const Circuit = mongoose.model('Circuit', circuitSchema)
export default Circuit
