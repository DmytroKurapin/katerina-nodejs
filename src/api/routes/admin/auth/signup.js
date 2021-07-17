/* global reqlib */
const { signup } = reqlib('/src/api/controller/auth');

module.exports = async (req, res) => {
  try {
    const { accessToken, ip } = req;
    const { user, pass } = req.body;
    const { 'x-forwarded-for': forwardedFor } = req.headers;
    const reqIp = forwardedFor || ip;

    const isSucceed = await signup({ user, pass, ip: reqIp });

    return isSucceed
      ? res.status(200).json({ status: 'success', meta: { accessToken } })
      : res.status(500).json({ status: 'error', message: 'Failed: Issue on signup' });
  } catch (err) {
    return res.status(500).json({ status: 'error', message: err.message });
  }
};
