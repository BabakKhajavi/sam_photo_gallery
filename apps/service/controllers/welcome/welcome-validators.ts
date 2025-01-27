import { body, param } from 'express-validator';

const isRequired = (field: string) => `${field} is required.`;
const shouldBeNumber = (field: string) => `${field} should be a number.`;
const shouldBeString = (field: string) => `${field} should be a string.`;

const commonValidations = [
  body('title')
    .isString()
    .withMessage(shouldBeString('title'))
    .notEmpty()
    .withMessage(isRequired('title')),
  body('subtitle')
    .isString()
    .withMessage(shouldBeString('subtitle'))
    .notEmpty()
    .withMessage(isRequired('subtitle')),
  body('description')
    .isString()
    .withMessage(shouldBeString('description'))
    .notEmpty()
    .withMessage(isRequired('description')),
  body('description')
    .isString()
    .withMessage(shouldBeString('description'))
    .notEmpty()
    .withMessage(isRequired('description')),
  body('media')
    .custom((value, { req }) => {
      if (typeof value === 'string' || req.file) {
        return true;
      }
      throw new Error('Media should be a string or a file');
    })
    .withMessage('Media should be a string or a file'),
];

export const welcomeValidators = {
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
