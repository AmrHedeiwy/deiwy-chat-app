/**
 * Contains hooks for Sequelize that are executed
  before and after calls to the database are executed.
 * @module hooks
*/
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

module.exports = (User) => {
  /**
   * Generates a unique user key based on the user's username
     and a 4-digit UUID.
   * @param {import('../models').User} user - The user model instance containing
     the Username property
   * @property {string} Userkey - The user's key.
   */
  User.beforeValidate((user) => {
    const username = user.Username;
    user.Userkey =
      username + '#' + (parseInt(uuidv4().replace('-', ''), 16) % 10000);
  });

  /**
   * Converts the user's email to lowercase
   to keep consistant format.
   * @param {import('../models/users').User} user - The user model instance
   containing the Email property.
   */
  User.beforeValidate((user) => {
    if (user.Email) {
      user.Email = user.Email.toLowerCase();
    }
  });

  /**
   * Hashes the users's plain text password using bcrypt.
   * @param {import('../models/users').User} user - The user model instance
     containing the Password property.
   * @property {string} Password - The user's plain text password.
   */
  User.beforeCreate(async (user) => {
    const password = user.Password;
    // Store and hash the plain text password using 12 salt rounds
    user.Password = await bcrypt.hash(password, 12);
  });

  /**
   * Send welcome message to the user's email.
   * @param {import('../models/users').User} user - The user model instance
     containing the Email property.
   */
  User.afterCreate((user) => {
    const email = user.Email;
    //  Implement email sending logic here
  });
};
