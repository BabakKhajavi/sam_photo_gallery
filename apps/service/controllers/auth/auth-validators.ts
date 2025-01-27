import { body } from 'express-validator';

const passPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)[a-zA-Z0-9\S]{8,}$/;

export const authValidators = {
  loginValidator: [
    body('username')
      .isEmail()
      .withMessage('Not a valid email address.')
      .trim()
      .toLowerCase()
      .notEmpty()
      .withMessage('Email is required.'),
    body('password')
      .isString()
      .withMessage(
        'Password must be at least 8 characters and contain at least 1 lowercase, 1 uppercase, 1 number and 1 special character.'
      ),
  ],
  registerValidator: [
    body('first_name').notEmpty().withMessage('First name is required.'),
    body('last_name').notEmpty().withMessage('Last name is required.'),
    body('username')
      .isEmail()
      .withMessage('Not a valid email address.')
      .trim()
      .toLowerCase()
      .notEmpty()
      .withMessage('Email is required.'),
    body('password')
      .matches(passPattern)
      .withMessage(
        'Password must be at least 8 characters and contain at least 1 lowercase, 1 uppercase, 1 number and 1 special character.'
      ),
    body('role').notEmpty().withMessage('Role is required.'),
  ],
};
