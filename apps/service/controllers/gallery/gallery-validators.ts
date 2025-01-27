import { body, param } from 'express-validator';

const isRequired = (field: string) => `${field} is required.`;
const shouldBeNumber = (field: string) => `${field} should be a number.`;
const shouldBeString = (field: string) => `${field} should be a string.`;
const shouldBeBoolean = (field: string) => `${field} should be a boolean.`;

const commonValidations = [
  body('title')
    .isString()
    .withMessage(shouldBeString('Title'))
    .notEmpty()
    .withMessage(isRequired('Title')),
  body('subtitle').isString().withMessage(shouldBeString('Subtitle')),
  body('description')
    .isString()
    .withMessage(shouldBeString('Description'))
    .notEmpty()
    .withMessage(isRequired('Description')),
  body('is_main')
    .isBoolean()
    .withMessage(shouldBeBoolean('is_main'))
    .notEmpty()
    .withMessage(isRequired('is_main')),
  body('subcategory_id')
    .isInt()
    .withMessage(shouldBeNumber('Subcategory'))
    .notEmpty()
    .withMessage(isRequired('Subcategory')),
  body('media').custom((value, { req }) => {
    if (req.files && req.files['media']) {
      if (req.files['media'][0]) {
        return true;
      }
      throw new Error('Media should be a file');
    }
    if (value) {
      throw new Error('Media thumb should be a file');
    }
    return true;
  }),
  body('media_thumb').custom((value, { req }) => {
    if (req.files && req.files['media_thumb']) {
      if (req.files['media_thumb'][0]) {
        return true;
      }
      throw new Error('Media thumb should be a file');
    }
    if (value) {
      throw new Error('Media thumb should be a file');
    }
    return true;
  }),
];

export const galleryValidators = {
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
