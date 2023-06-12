const errorMessages = require('../../config/error-messages.json');

const errorMiddleware = (error, req, res, next) => {
  switch (error.name) {
    case 'SequelizeValidationError':
      validationError(error, req, res, next);
      break;

    case 'SequelizeUniqueConstraintError':
      constraintError(error, req, res, next);
      break;
    default:
      genericError(error, req, res, next);
      break;
  }
};

// For validtion errors
async function validationError(error, req, res, next) {
  const fieldName = error.errors[0].path;
  res.status(400).json(errorMessages.validations[fieldName]);
}

// For  constraint errors
async function constraintError(error, req, res, next) {
  const fieldName = error.errors[0].path;
  res.status(409).json(errorMessages.constraints[fieldName]);
}

// For unexpected errors
async function genericError(error, req, res, next) {
  console.error(error.stack);
  res.status(400).json(errorMessages.server);
}

module.exports = errorMiddleware;
