import mongoose from 'mongoose'

const racewaySchema = new mongoose.Schema({
  tag: {
    type: String,
    trim: true
  },
  length: {
    type: Number 
  },
  cables: [{
    _id: false,
    count: Number,
    type: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Cable'
    }
  }] // many-to-many link
}, {
  timestamps: true,
  discriminatorKey: 'kind',
  collection: 'raceways'
});

const Raceway = mongoose.model('Raceway', racewaySchema);

const Conduit = Raceway.discriminator('Conduit', new mongoose.Schema({
  type: String,
  material: String,
  size: Number,
  id: Number,
}));

const Tray = Raceway.discriminator('Tray', new mongoose.Schema({
  type: String,
  width: Number,
  height: Number
}));

export { Raceway, Conduit, Tray };