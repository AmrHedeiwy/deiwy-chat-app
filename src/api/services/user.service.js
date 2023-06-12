const { User } = require('../models/index');
const successMessages = require('../../config/success-messages.json');

/**
 * Creates a new user using the user's register credentials.
 * @param {Object} data - Contains the user's data.
 * The object shuld have the following properties:
    - Firstname
    - Lastname
    - Username
    - Email
    - Password
 * @returns {Object} An object containing the status code
    and message.
 * @property {number} status - The status depending on the
    result of the opperation.
 * @property {string} message - A user-friendly message to
    be sent to the client.
 * @property {Error} error - The error object, if any. Can contain
    information about the error, such as validation errors, constraint
    errors, or server errors.
 */
const createUser = async (data) => {
  try {
    await User.create(data);
    return {
      status: 201,
      message: successMessages.create_user
    };
  } catch (err) {
    return { error: err };
  }
};

module.exports = {
  createUser
};
