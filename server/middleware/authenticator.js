import bcrypt from 'bcrypt'

const SALT_ROUNDS = 10

export const Auth = {
	hashPassword: async (password) => {
		const salt = await bcrypt.genSalt(SALT_ROUNDS)
		return await bcrypt.hash(password, salt)
	},
	comparePassword: async (password, hash) => {
		return await bcrypt.compare(password, hash)
	},
}