const { v4: uuidv4 } = require('uuid');

function setUserKey(user) {
  const username = user.Username;
  user.Userkey =
    username + '#' + (parseInt(uuidv4().replace('-', ''), 16) % 10000);
}

module.exports = {
  beforeValidate: [setUserKey],
};
