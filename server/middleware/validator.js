import { body } from 'express-validator'

export const Validator = {
  sign_in: [
    body('email')
      .notEmpty().withMessage('Email is required')
      .isEmail().withMessage('Must be a valid email address'),
    body('password')
      .notEmpty().withMessage('Password is required')
  ],
  sign_up: [
    body('username')
      .notEmpty().withMessage('Username is required'),
  ]
}