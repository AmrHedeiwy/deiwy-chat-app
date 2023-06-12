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
 * @param {Object} req.body - The request body containing user data.
 * @param {Object} req.body.Firstname - The user's first name.
 * @param {Object} req.body.Lastname - The user's last name.
 * @param {Object} req.body.Username - The user's username.
 * @param {Object} req.body.Email - The user's email address.
 * @param {Object} req.body.Password - The user's password.
 * 
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
  validation(userSchema),
  async (req, res, next) => {
    const body = req.body;

    const { status, message, error } = await createUser(body);
    if (error) next(error);

    res.status(status).json(message);
  }
];
