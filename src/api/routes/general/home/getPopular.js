/* global reqlib */
const { getVendorCodesOfPopularForHomePage } = reqlib('/src/api/controller/general');
const logger = reqlib('/src/config/logger');

module.exports = async (req, res) => {
  try {
    const codes = await getVendorCodesOfPopularForHomePage();
    return res.status(200).json(codes || []);
  } catch (err) {
    logger.error(`get vendor codes for home page Failed  - ${err.message}`);
    return res.status(500).json({ status: 'error', message: 'Failed: Issue on getting ' });
  }
};
