/* global reqlib */
const { setVendorCodesOfPopularForHomePage } = reqlib('/src/api/controller/general');
const logger = reqlib('/src/config/logger');

module.exports = async (req, res) => {
  try {
    const { codes } = req.body;

    if (!codes || !Array.isArray(codes)) {
      logger.warn(`tried to save vendor codes for home page without codes or is not array  - ${codes}`);
      return res.status(500).json({ status: 'error', message: 'Save failed' });
    }

    const isSucceed = await setVendorCodesOfPopularForHomePage(codes);

    return isSucceed
      ? res.status(200).json({ status: 'success', meta: {} })
      : res.status(500).json({ status: 'error', message: 'Failed: Issue on saving' });
  } catch (err) {
    logger.error(`save vendor codes for home page Failed  - ${err.message}`);
    return res.status(500).json({ status: 'error', message: 'Failed: Issue on saving' });
  }
};
