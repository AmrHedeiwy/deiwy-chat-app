/**
 * Returns middlware that validates the user's data.
 *
 * @param {Yup.schema} schema - The Yup schema to validate the request
 * object against.
 * @returns {Function} The next middleware in the chain.
 *
 * @middleware
 * @summary Validates the user's data from the request object against Yup schema.
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @param {Function} next - The nex6 middleware in the chain
 *
 * If the validation passes, the next() function is called.
 * If the validation fails, a 400 Bad Request is sent with
 * an approptiate error message.
 */
const validation = (schema) => async (req, res, next) => {
  const body = req.body;
  try {
    await schema.validate(body, { abortEarly: false });
    next();
  } catch (err) {
    res.status(400).json(err.message);
  }
};

module.exports = validation;
