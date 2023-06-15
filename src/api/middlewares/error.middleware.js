// Loading the validation, contraint, and server errors from errors.json file
const errorsJSON = require('../../config/errors.json');
const validationErrors = errorsJSON.validations;
const constraintErrors = errorsJSON.constraints;
const serverErrors = errorsJSON.server;

/**
 * Decides which middleware validation to run
 * based on the error instance returned by sequelize.
 *
 * @param {Object} error - The object containg error information.
 * @param {string} error.name - The sequelize error instance.
 * Could be a validation, constraint, or server error.
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @param {Function} next - The next middleware in the chain.
 */
const errorMiddleware = (error, req, res, next) => {
  switch (error.type) {
    case 'ValidationError':
      validationError(error, req, res, next);
      break;

    case 'ConstraintError':
      constraintError(error, req, res, next);
      break;
    default:
      serverError(error, req, res, next);
      break;
  }
};

/**
 * For validation errors.
 *
 * @param {Object} error - The object containg error information.
 * @param {string} error.errors[0].path - The field name that contains
 * the error.
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @param {Function} next - The next middleware in the chain.
 */
async function validationError(error, req, res, next) {
  const fieldName = error.field;
  const errorMessage = validationErrors.messages[fieldName];
  res.status(400).json({ field: fieldName, message: errorMessage });
}

/**
 * For constraint errors.
 *
 * @param {Object} error - The object containg error information.
 * @param {string} error.errors[0].path - The field name that contains
 * the error.
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @param {Function} next - The next middleware in the chain.
 */
async function constraintError(error, req, res, next) {
  const fieldName = error.field;
  const errorMessage = constraintErrors.messages[fieldName];
  res.status(409).json({ field: fieldName, message: errorMessage });
}

/**
 * For unexpected/server errors.
 *
 * @param {Object} error - The object containg error information.
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @param {Function} next - The next middleware in the chain.
 */
async function serverError(error, req, res, next) {
  // Logging the error to the server stack
  console.error(error.info.stack);
  const errorMessage = serverErrors.message;
  res.status(500).json({ message: errorMessage });
}

module.exports = errorMiddleware;
