const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateActionInput(data) {
  let errors = {};

  data.text = !isEmpty(data.text) ? data.text : '';
  // data.cRating = !isEmpty(data.cRating) ? data.cRating : 0;
  // data.gRating = !isEmpty(data.gRating) ? data.gRating : 0;
  

  // if (Validator.isEmpty(data.cRating)) {
  //   errors.cRating = 'Concordance Rating field is required';
  // }
  //
  // if (Validator.isEmpty(data.gRating)) {
  //   errors.gRating = 'Goodness Rating field is required';
  // }

  if (!Validator.isLength(data.text, { min: 1, max: 400 })) {
    errors.text = "Password mustn't be more than 400 characters'";
  }

  if (Validator.isEmpty(data.text)) {
    errors.text = 'Text field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
