const { createUser } = require('../../services/user.service');
const validation = require('../../middlewares/validation.middleware');
const userSchema = require('../../validations/user.validation');

/**
 * @function register
 * @description Adds a new user.
 * @access Public
 * 
 * @middleware validation(userSchema) - Validates user input.
 * @param {Object} req - The HTTP request object.
 * @param {string} req.body - The request body containing user data.
 * @param {string} req.body.Firstname - The user's first name.
 * @param {string} req.body.Lastname - The user's last name.
 * @param {string} req.body.Username - The user's username.
 * @param {string} req.body.Email - The user's email address.
 * @param {string} req.body.Password - The user's password.
 * @param {Object} res - The HTTP response object.
 * @param {Function} next - The next middleware in the chain.
 * @returns {Object} An object containing information about the result
 * of the operation.
 * 
 * The object contains the following: 
 * @property {number} status - The status depending on the
    result of the opperation.
 * @property {string} message - A user-friendly message to
    be sent to the client.
 * @property {Error} error - The error object, if any. Can contain
    information about the error, such as validation errors, constraint
    errors, or server errors.
 */
exports.register = [
  //   validation(userSchema),
  async (req, res, next) => {
    const body = req.body;

    const { status, message, error } = await createUser(body);
    if (error) return next(error);

    res.status(status).json(message);
  }
];
