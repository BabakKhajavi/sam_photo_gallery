import { body, param } from 'express-validator';

const shouldBeString = (field: string) => `${field} should be a string`;
const isRequired = (field: string) => `${field} is required`;
const shouldBeBoolean = (field: string) => `${field} should be a boolean`;

const commonValidations = [
  body('datetime')
    .isString()
    .withMessage(shouldBeString('datetime'))
    .notEmpty()
    .withMessage(isRequired('datetime')),
  body('customer_name')
    .isString()
    .withMessage(shouldBeString('customer_name'))
    .notEmpty()
    .withMessage(isRequired('customer_name')),
  body('email')
    .isEmail()
    .withMessage('Invalid email address')
    .notEmpty()
    .withMessage(isRequired('email')),
  body('phone')
    .isMobilePhone('any')
    .withMessage('Invalid phone number')
    .notEmpty()
    .withMessage(isRequired('phone')),
  body('phone_alt')
    .optional()
    .isMobilePhone('any')
    .withMessage('Invalid phone number'),
  body('schedule')
    .optional()
    .isString()
    .withMessage(shouldBeString('schedule')),
  body('note').optional().isString().withMessage(shouldBeString('note')),
  body('city_id')
    .isNumeric()
    .withMessage('Invalid city id')
    .notEmpty()
    .withMessage(isRequired('city_id')),
  body('seen')
    .isBoolean()
    .withMessage(shouldBeBoolean('seen'))
    .notEmpty()
    .withMessage(isRequired('seen')),
  body('is_online')
    .isBoolean()
    .withMessage(shouldBeBoolean('is_online'))
    .notEmpty()
    .withMessage(isRequired('is_online')),
  body('subcategories')
    .isArray()
    .withMessage('Subcategories should be an array')
    .notEmpty()
    .withMessage(isRequired('subcategories'))
    .custom((subcategories) => {
      if (!Array.isArray(subcategories)) {
        throw new Error('Subcategories should be an array');
      }
      subcategories.forEach((subcategory) => {
        if (typeof subcategory !== 'string') {
          throw new Error('Each subcategory should be a string');
        }
      });
      return true;
    }),
  body('media1')
    .optional()
    .custom((value, { req }) => {
      if (req.files && req.files['media1']) {
        if (req.files['media1'][0]) {
          return true;
        }
        throw new Error('Media should be a file');
      }
      if (value) {
        throw new Error('Media thumb should be a file');
      }
      return true;
    }),
  body('media2')
    .optional()
    .custom((value, { req }) => {
      if (req.files && req.files['media2']) {
        if (req.files['media2'][0]) {
          return true;
        }
        throw new Error('Media should be a file');
      }
      if (value) {
        throw new Error('Media thumb should be a file');
      }
      return true;
    }),
  body('media3')
    .optional()
    .custom((value, { req }) => {
      if (req.files && req.files['media3']) {
        if (req.files['media3'][0]) {
          return true;
        }
        throw new Error('Media should be a file');
      }
      if (value) {
        throw new Error('Media thumb should be a file');
      }
      return true;
    }),
];

export const requestValidators = {
  createValidator: [...commonValidations],
  updateValidator: [
    param('id')
      .isInt()
      .withMessage('Id should be a number')
      .notEmpty()
      .withMessage('Id is required'),
    ...commonValidations,
  ],
  deleteValidator: [
    param('id')
      .isInt()
      .withMessage('Id should be a number')
      .notEmpty()
      .withMessage('Id is required'),
  ],
};
