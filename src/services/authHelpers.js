// bcrypt for passwords
const bcrypt = require('bcrypt');
const saltRounds = 10;
const expireTimeMs = 86400000; // 1 day in ms

// crypto for client side tokens
const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

const buildStrToCrypt = (user, pass) => `${user}__${pass}`;

/**
 * decrypt accessToken or return undefined
 * @param {string} accessToken - accessToken
 * @returns {string | undefined} - access token
 */
const parseAccessToken = accessToken => {
  try {
    const [tokenIv, encryptedData] = accessToken.split('.');
    const iv = Buffer.from(tokenIv, 'hex');
    const encryptedText = Buffer.from(encryptedData, 'hex');
    const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
  } catch (e) {
    return undefined;
  }
};

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

/**
 * create accessToken which will be sent to the client
 * and will be attached to the header on each request
 * @param {string | undefined} username - user name
 * @returns {string | null} - access token
 */
const createAccessToken = username => {
  if (typeof username === 'undefined') return null;

  const cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
  const strToEncrypt = `${username}+${Date.now()}`;
  let encrypted = cipher.update(strToEncrypt);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return `${iv.toString('hex')}.${encrypted.toString('hex')}`;
};

/**
 * decrypt, validate accessToken and return new accessToken if valid
 * @param {string | undefined} accessToken - accessToken
 * @returns {{ accessToken: string | null, isValid: boolean }} - is valid
 */
const validateAccessToken = accessToken => {
  if (typeof accessToken === 'undefined') return { accessToken: null, isValid: false };

  const parsedToken = parseAccessToken(accessToken) || '';
  const [username, tsMsStr] = parsedToken.split('+');
  if (username && tsMsStr && !isNaN(Number(tsMsStr)) && Number(tsMsStr) + expireTimeMs > Date.now()) {
    return { accessToken: createAccessToken(username), isValid: true };
  }
  return { accessToken: null, isValid: false };
};

exports.encryptLoginData = encryptLoginData;
exports.isAuthenticated = isAuthenticated;
exports.createAccessToken = createAccessToken;
exports.validateAccessToken = validateAccessToken;
