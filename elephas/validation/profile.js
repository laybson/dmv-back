const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.handle = !isEmpty(data.handle) ? data.handle : '';

  if (Validator.isEmpty(data.handle)) {
    errors.handle = 'Handle field is required';
  }

  if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = 'Handle must be between 2 and 40 characters';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
