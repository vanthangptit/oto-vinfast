import { checkSchema } from 'express-validator';

/**
 * Validation create the post based on header
 */
export const contactValidation = () => checkSchema({
  customer: {
    in: ['body'],
    optional: {
      options: {
        checkFalsy: true
      }
    },
    isString: {
      errorMessage: 'The customer must be a string.',
    }
  },
  phone: {
    in: ['body'],
    notEmpty: {
      errorMessage: 'The phone field is required',
    },
    matches: {
      // Refer: https://fozg.net/blog/validate-vietnamese-phone-number
      options: /(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/,
      errorMessage: 'Phone number is invalid'
    }
  },
  car_type: {
    in: ['body'],
    optional: {
      options: {
        checkFalsy: true
      }
    },
    isString: {
      errorMessage: 'The car_type must be a string.',
    }
  },
});
