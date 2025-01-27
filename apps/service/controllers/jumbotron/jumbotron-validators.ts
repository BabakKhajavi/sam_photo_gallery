import { body, param } from 'express-validator';

const isRequired = (field: string) => `${field} is required.`;
const shouldBeNumber = (field: string) => `${field} should be a number.`;
const shouldBeString = (field: string) => `${field} should be a string.`;
const shouldBeBoolean = (field: string) => `${field} should be a boolean.`;

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
  body('is_main_jumbotron')
    .isBoolean()
    .withMessage(shouldBeBoolean('is_main_jumbotron'))
    .notEmpty()
    .withMessage(isRequired('is_main_jumbotron')),
  body('subcategory_id')
    .isInt()
    .withMessage(shouldBeNumber('subcategory_id'))
    .notEmpty()
    .withMessage(isRequired('subcategory_id')),
  body('media')
    .custom((value, { req }) => {
      if (typeof value === 'string' || req.file) {
        return true;
      }
      throw new Error('Media should be a string or a file');
    })
    .withMessage('Media should be a string or a file'),
];

export const jumbotronValidators = {
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
