/* global reqlib */
const GeneralSchema = reqlib('/src/models/general');
const logger = reqlib('/src/config/logger');

/**
 * set list of vendor codes for Home page gallery
 * @param {string[]} vendorCodes - products vendor code
 * @returns {Promise<Boolean>} - successful or failed query execution
 */
const setVendorCodesOfPopularForHomePage = async vendorCodes => {
  try {
    await GeneralSchema.updateOne({ feature: 'homePage' }, { $set: { 'data.popular': vendorCodes } }, { upsert: true });
  } catch (e) {
    logger.error(`set homePage.data.popular failed - ${e.message}`);
    return false;
  }
  return true;
};
/**
 * get list of vendor codes for Home page gallery
 * @returns {Promise<String[] | undefined>} - list of vendor codes
 */
const getVendorCodesOfPopularForHomePage = async () => {
  try {
    const res = await GeneralSchema.findOne({ feature: 'homePage' });
    return res ? (res.data ? res.data.popular : []) : [];
  } catch (e) {
    logger.error(`set homePage.data.popular failed - ${e.message}`);
    return undefined;
  }
};

module.exports = { setVendorCodesOfPopularForHomePage, getVendorCodesOfPopularForHomePage };
