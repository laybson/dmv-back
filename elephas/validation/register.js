const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.passwordOk = !isEmpty(data.passwordOk) ? data.passwordOk : '';

  if (!Validator.isLength(data.name, { min: 2, max: 40})) {
    errors.name = "Name must be between 2 and 40 characters";
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name field is required';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }

  if (!Validator.isLength(data.password, { min: 6 })) {
    errors.password = 'Password must have at least 6 characters';
  }

  if (Validator.isEmpty(data.passwordOk)) {
    errors.passwordOk = 'Confirm password field is required';
  }

  if (!Validator.equals(data.password, data.passwordOk)) {
    errors.passwordOk = 'Confirm password must be equals Password';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
