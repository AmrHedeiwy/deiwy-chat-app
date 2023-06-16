/**
 * Returns middlware that validates the user's data.
 *
 * @param {Joi.schema} schema - The Joi schema to validate the request
 * object against.
 * @returns {Function} The next middleware in the chain.
 *
 * @middleware
 * @summary Validates the user's data from the request object against Joi schema.
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @param {Function} next - The next middleware in the chain
 *
 * If the validation passes, the next() function is called.
 * If the validation fails, the next() function is called passing
 * the error object.
 */
const validation = (schema) => async (req, res, next) => {
  const body = req.body;
  try {
    const { error, value } = schema.validate(body);
    if (error) throw error;
    next();
  } catch (err) {
    // Extracting the field name from the error object
    const fieldName = err.details[0].path[0];
    next({ type: 'ValidationError', field: fieldName });
  }
};

export default validation;
