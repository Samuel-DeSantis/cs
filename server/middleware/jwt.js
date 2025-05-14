import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret'; // Use env in production

export const Token = {
  generate: (payload) => {return jwt.sign(payload, JWT_SECRET, { expiresIn: '2h' })},
  verify: (token) => {return jwt.verify(token, JWT_SECRET)}
}