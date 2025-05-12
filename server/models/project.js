import mongoose from 'mongoose'

const projectSchema = new mongoose.Schema({
  name: { 
		type: String, 
		required: true
	},
  description: {
		type: String,
		trim: true,
	},
  client: {
		type: String,
		trim: true,
	},
  location: {
		type: String,
		trim: true,
	},
  status: { 
		type: String, 
		enum: ['planning', 'in-progress', 'complete'], 
		default: 'planning' 
	},
  startDate: Date,
  endDate: Date,
  users: [{ 
		type: mongoose.Schema.Types.ObjectId, 
		ref: 'User' 
	}], // many-to-many link
  circuits: [{ 
		type: mongoose.Schema.Types.ObjectId, 
		ref: 'Circuit' 
	}],
});

const Project = mongoose.model('Project', projectSchema);
export default Project