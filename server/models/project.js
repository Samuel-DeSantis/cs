import mongoose from 'mongoose'

const projectSchema = new mongoose.Schema({
  name: {
		type: String,
		required: true,
		trim: true
	},
  description: {
		type: String,
		trim: true
	},
  client: {
		type: String,
		trim: true
	},
  location: {
		type: String,
		trim: true
	},
	startDate: {
		type: Date
	},
	endDate: { 
    type: Date,
    // validate: {
    //   validator: (value) => {
    //     // Only validate if startDate exists
    //     if (this.startDate && value) {
    //       return value >= this.startDate
    //     }
    //     return true
    //   },
    //   message: props => 
    //     `End date (${props.value.toDateString()}) cannot be before start date (${props.instance.startDate.toDateString()})`
    // }
  },
  status: { 
		type: String, 
		enum: ['planning', 'in-progress', 'complete'], 
		default: 'planning' 
	},
  users: [{ 
		type: mongoose.Schema.Types.ObjectId, 
		ref: 'User' 
	}], // many-to-many link
	/*
	users: [{
		user: {
			type: mongoose.Schema.Types.ObjectId, 
			ref: 'User'
		},
		role: {
			type: String,
			enum: [
				'owner', // full access (add/remove users, delete project)
				'editor', // add/modify equipment, circuits, raceways
				'viewer' // read-only, can export data but not modify
			],
			default: 'viewer'
		}
	}]
	*/
  equipment: [{ 
		type: mongoose.Schema.Types.ObjectId, 
		ref: 'Equipment' 
	}], // many-to-many link
	circuits: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Circuit'
	}], // many-to-many link
	raceways: [{ 
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Raceway'
	}], // many-to-many link
}, {
  timestamps: true
})

const Project = mongoose.model('Project', projectSchema)
export default Project