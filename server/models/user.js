import mongoose from 'mongoose'
import validator from 'validator'

const defaultOptions = {
	type: String,
	trim: true
}

const userSchema = new mongoose.Schema({
	name: { ...defaultOptions },
	organization: { ...defaultOptions },
	location: { ...defaultOptions },
	password_hash: { 
		type: String,
		required: true,
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
	username: {
		required: true,
		unique: true,
		...defaultOptions
	},
	email: {
		lowercase: true,
		unique: true,
		required: true,
		validate: [validator.isEmail, 'Invalid email address'],
		...defaultOptions
	},
	phone: {
		validate: {
			validator: v => validator.isMobilePhone(v, 'any'),
			message: 'Invalid phone number'
		},
		...defaultOptions
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