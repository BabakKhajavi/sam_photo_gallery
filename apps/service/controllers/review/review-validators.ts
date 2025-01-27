import { body, param } from 'express-validator';

const isRequired = (field: string) => `${field} is required.`;
const shouldBeNumber = (field: string) => `${field} should be a number.`;
const shouldBeString = (field: string) => `${field} should be a string.`;

const commonValidations = [
  body('stars')
    .isFloat()
    .withMessage(shouldBeNumber('stars'))
    .notEmpty()
    .withMessage(isRequired('stars')),
  body('source')
    .isString()
    .withMessage(shouldBeString('source'))
    .notEmpty()
    .withMessage(isRequired('source')),
  body('description')
    .isString()
    .withMessage(shouldBeString('Description'))
    .notEmpty()
    .withMessage(isRequired('Description')),
  body('link')
    .isString()
    .withMessage(shouldBeString('link'))
    .notEmpty()
    .withMessage(isRequired('link')),
  body('owner')
    .isString()
    .withMessage(shouldBeString('owner'))
    .notEmpty()
    .withMessage(isRequired('owner')),
  body('is_approved')
    .isFloat()
    .withMessage(shouldBeNumber('is_approved'))
    .notEmpty()
    .withMessage(isRequired('is_approved')),
];

export const reviewValidators = {
  createValidator: [...commonValidations],
  updateValidator: [
    param('id')
      .isInt()
      .withMessage(shouldBeNumber('Id'))
      .notEmpty()
      .withMessage(isRequired('Id')),
    ...commonValidations,
  ],
  deleteValidator: [
    param('id')
      .isInt()
      .withMessage(shouldBeNumber('Id'))
      .notEmpty()
      .withMessage(isRequired('Id')),
  ],
};
