/* global reqlib */
const { signup } = reqlib('/src/api/controller/auth');

module.exports = async (req, res) => {
  try {
    const { user, pass } = req.body;
    const { ip } = req;

    const isSucceed = await signup({ user, pass, ip });

    return isSucceed
      ? res.status(200).json({ status: 'success', meta: {} })
      : res.status(500).json({ status: 'error', message: 'Failed: Issue on signup' });
  } catch (err) {
    return res.status(500).json({ status: 'error', message: err.message });
  }
};
