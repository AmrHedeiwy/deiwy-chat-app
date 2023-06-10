/**
 * Contains hooks for Sequelize that are executed 
  before and after calls to the database are executed.
 * @module hooks
*/

const { v4: uuidv4 } = require('uuid');

/**
 * Generates a unique user key based on the user's username 
   and a 4-digit UUID.
 * @param {import('../models').User} user - The user model instance containing 
   the username property
 * @property {number} UserID - The user's ID (integer).
 * @property {string} Userkey - The user's key.
*/
function generateUserKey(user) {
  const username = user.Username;
  user.Userkey =
    username + '#' + (parseInt(uuidv4().replace('-', ''), 16) % 10000);
}

module.exports = {
  beforeValidate: [generateUserKey],
};
