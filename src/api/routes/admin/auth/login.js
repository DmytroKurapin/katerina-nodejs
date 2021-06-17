/* global reqlib */
const { login } = require('../../../../api/controller/auth');
// const { login } = reqlib('/src/api/controller/auth');

module.exports = async (req, res) => {
  try {
    const { user, pass } = req.body;
    const { ip } = req;

    const isSucceed = await login({ user, pass, ip });

    return isSucceed
      ? res.status(200).json({ status: 'success', meta: {} })
      : res.status(500).json({ status: 'error', message: 'Failed: Issue on login' });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};
