import { body, param } from 'express-validator';
import sanitizeHtml from 'sanitize-html';
import { parse, stringify } from 'css';

const isRequired = (field: string) => `${field} is required.`;
const shouldBeNumber = (field: string) => `${field} should be a number.`;
const shouldBeString = (field: string) => `${field} should be a string.`;

const sanitizeHtmlContent = (value: string) => {
  return sanitizeHtml(value, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
    allowedAttributes: {
      '*': ['style', 'class'],
      a: ['href', 'name', 'target'],
      img: ['src'],
    },
  });
};

const sanitizeCssStyles = (value: string) => {
  if (!value) {
    throw new Error('CSS value is undefined or empty');
  }
  const styleTagContent = value.match(/<style[^>]*>([^<]*)<\/style>/);
  const cssContent = styleTagContent ? styleTagContent[1] : value;

  try {
    const parsedCss = parse(cssContent);
    return stringify(parsedCss);
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

const commonValidations = [
  body('type')
    .isString()
    .withMessage(shouldBeString('type'))
    .notEmpty()
    .withMessage(isRequired('type')),
  body('htmlContent')
    .isString()
    .withMessage(shouldBeString('Html content'))
    .notEmpty()
    .withMessage(isRequired('Html content'))
    .customSanitizer(sanitizeHtmlContent),
  body('styles')
    .isString()
    .withMessage(shouldBeString('Styles'))
    .notEmpty()
    .withMessage(isRequired('Styles'))
    .customSanitizer(sanitizeCssStyles),
];

export const advertisementValidators = {
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
