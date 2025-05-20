import mongoose from 'mongoose'

const defaultOptions = {
	type: String,
	required: true,
	trim: true
}

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		trim: true
	 },
	password_hash: { ...defaultOptions },
	organization: String,
	role: {
		type: String,
		enum: ['admin', 'engineer', 'technician'],
		default: 'engineer'
	},
	phone: {
		type: String,
		trim: true
	},
	location: {
		type: String,
		trim: true
	},
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