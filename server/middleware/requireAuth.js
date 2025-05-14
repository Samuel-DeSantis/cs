import { Token } from "./jwt.js";

export const requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader) { return res.status(401).json({ error: 'Authorization header is missing' }) }

  const token = authHeader.split(' ')[1]

  try {
    req.user = Token.verify(token)
    next()
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' })
  }
}