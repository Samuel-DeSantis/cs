import mongoose from 'mongoose'

const defaultOptions = {
	type: String,
	trim: true
}

const userSchema = new mongoose.Schema({
	name: { ...defaultOptions },
	password_hash: { 
		type: String,
		required: true,
		trim: true
 	},
	organization: { ...defaultOptions },
	role: {
		type: String,
		enum: ['admin', 'engineer', 'technician'],
		default: 'engineer'
	},
	phone: { ...defaultOptions },
	location: { ...defaultOptions },
	active: {
		type: Boolean,
		default: true
	},
	username: {
		unique: true,
		...defaultOptions 
	},
	email: {
		unique: true,
		lowercase: true,
		...defaultOptions 
	},
	projects: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Project'
	}],
});

const User = mongoose.model('User', userSchema);
export default User