import { body, param } from 'express-validator';

const isRequired = (field: string) => `${field} is required.`;
const shouldBeNumber = (field: string) => `${field} should be a number.`;
const shouldBeString = (field: string) => `${field} should be a string.`;

const commonValidations = [
  body('name')
    .isString()
    .withMessage(shouldBeString('name'))
    .notEmpty()
    .withMessage(isRequired('name')),
];

export const cityValidators = {
  createValidator: [...commonValidations],
  updateValidator: [
    param('id')
      .isInt()
      .withMessage(shouldBeNumber('id'))
      .notEmpty()
      .withMessage(isRequired('id')),
    ...commonValidations,
  ],
  deleteValidator: [
    param('id')
      .isInt()
      .withMessage(shouldBeNumber('id'))
      .notEmpty()
      .withMessage(isRequired('id')),
  ],
};
