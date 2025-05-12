import bcrypt from 'bcrypt'
// import jwt from 'jsonwebtoken'

const SALT_ROUNDS = 10

export const Auth = {
	hashPassword: async (password) => {
		const salt = await bcrypt.genSalt(SALT_ROUNDS)
		return await bcrypt.hash(password, salt)
	},
	comparePassword: async (password, hash) => {
		return await bcrypt.compare(password, hash)
	},
	// generateToken: (user) => {
	// 	jwt.sign(
	// 		{ 
	// 			id: user._id, 
	// 			email: user.email
	// 		},
	// 		process.env.JWT_SECRET,
	// 		{ expiresIn: '1h' }
	// 	)
	// }
}

// export default Auth