import mongoose from 'mongoose'
import validator from 'validator'

const userSchema = new mongoose.Schema({
	name: { 
		type: String,
		trim: true
 	},
	username: {
		type: String,
		trim: true,
		unique: true,
		required: true,
	},
	email: {
		type: String,
		trim: true,
		unique: true,
		required: true,
		lowercase: true,
		validate: [validator.isEmail, 'Invalid email address'],
	},
	password_hash: { 
		type: String,
		required: true,
	},
	organization: { 
		type: String,
		trim: true
 	},
	location: { 
		type: String,
		trim: true
 	},
	role: {
		type: String,
		enum: ['admin', 'engineer', 'technician'],
		default: 'engineer'
	},
	active: {
		type: Boolean,
		default: true
	},
	settings: {
		theme: {
			type: String,
			enum: ['light', 'dark'],
			default: 'light'
		}
	},
	phone: {
		type: String,
		trim: true,
		validate: {
			validator: v => validator.isMobilePhone(v, 'any'),
			message: 'Invalid phone number'
		}
	},
	projects: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Project'
	}], // many-to-many link
},{ 
	timestamps: true,
	toJSON: {
		transform: (doc, ret) => {
			delete ret.password_hash
			return ret
		}
	}
})

const User = mongoose.model('User', userSchema);
export default User