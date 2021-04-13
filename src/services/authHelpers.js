const bcrypt = require('bcrypt');
const saltRounds = 10;

const buildStrToCrypt = (user, pass) => `${user}__${pass}`;

/**
 * encrypt login data string
 * @param {string} username - user name
 * @param {string} password - user password
 * @returns {Promise<string>} - hashed string
 */
const encryptLoginData = async (username, password) => {
  const strToCrypt = buildStrToCrypt(username, password);
  return await bcrypt.hash(strToCrypt, saltRounds);
};

/**
 * check if user data matches hashed password in DB
 * @param {string} username - user name
 * @param {string} password - user password
 * @param {string} hash - user name
 * @returns {Promise<boolean>} - is matched
 */
const isAuthenticated = async (username, password, hash) => {
  const strToCrypt = buildStrToCrypt(username, password);

  return await bcrypt.compare(strToCrypt, hash);
};

exports.encryptLoginData = encryptLoginData;
exports.isAuthenticated = isAuthenticated;
