import mongoose from 'mongoose'

const defaultOptions = {
	type: String,
	trim: true
}

const projectSchema = new mongoose.Schema({
  name: {	...defaultOptions, required: true	},
  description: { ...defaultOptions },
  client: { ...defaultOptions },
  location: { ...defaultOptions },
	startDate: Date,
	endDate: Date,
  status: { 
		type: String, 
		enum: ['planning', 'in-progress', 'complete'], 
		default: 'planning' 
	},
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