import db from '../models/index.js';
import successMessages from '../../config/success.json' assert { type: 'json' };

const User = db.User;
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
      status: successMessages.create_user.code,
      message: successMessages.create_user.message
    };
  } catch (err) {
    /**
     * Some Sequelize errors include the words "Sequelize" and "Unique" in the error name.
     * This line of code removes those words to make the error name consistent
     * throught the whole program.
     *
     * For example:
     * - SequelizeValidationError --> ValidationError
     * - SequelizeUniqueConstraintError --> ConstraintError
     */
    err.name = err.name.replace('Sequelize', '').replace('Unique', '');
    return { error: { type: err.name, field: err.errors[0].path, info: err } };
  }
};

export { createUser };
