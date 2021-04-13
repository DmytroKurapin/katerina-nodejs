const User = require('../../models/user');
const { encryptLoginData, isAuthenticated } = require('../../services/authHelpers');

/**
 * authenticate user on login
 * @param {{ user: string, pass: string, ip: string }} userData - user login data
 * @returns {Promise<boolean>} - product object
 */
const login = async userData => {
  const { user, pass, ip } = userData;

  try {
    const foundUser = await User.findOne({ user });
    // eslint-disable-next-line
    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~');
    // eslint-disable-next-line
    console.log(foundUser);
    // eslint-disable-next-line
    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~');
    if (!foundUser) {
      console.error('login failed. User not found', 'ip', ip, 'user', user);
      return false;
    } else if (!(await isAuthenticated(user, pass, foundUser.pass))) {
      console.error('login failed. User pass iis not matched', 'ip', ip, 'user', user);
      return false;
    }

    foundUser.lastIp = ip;
    foundUser.lastLogin = Date.now();

    await foundUser.save();
    return true;
  } catch (e) {
    console.error('login failed', e.message, 'ip', ip, 'user', user);
    return false;
  }
};
/**
 * add new user to DB if username is available
 * @param {{ user: string, pass: string, ip: string }} userData - user signup data
 * @returns {Promise<boolean>} - product object array
 */
const signup = async userData => {
  const { user, pass, ip } = userData;

  try {
    const encryptedPass = await encryptLoginData(user, pass);
    const newUser = await User.create({ user, pass: encryptedPass, lastIp: ip });
    return !!newUser;
  } catch (e) {
    console.error('signup failed', e.message, 'ip', ip, 'user', user);
    return false;
  }
};

module.exports = {
  login,
  signup
};
