const Product = require('../../models/product');

module.exports = {
  /**
   * get One product from DB by its vendor code
   * @param {string} vendorCode - product vendor code
   * @returns {Promise<Object>} - product object
   */
  getOneByVendorCode: async vendorCode => {
    return Product.findOne({ vendorCode }, { _id: 0 });
  },
  /**
   * get Multiple products from DB by their vendor code
   * @param {string[]} vendorCodes - products vendor code
   * @returns {Promise<Object[]>} - product object array
   */
  getMultipleByVendorCodes: async vendorCodes => {
    return Product.find({ vendorCode: { $in: vendorCodes } }, { _id: 0 });
  },
  /**
   * get All products from DB by category and other params
   * @param {{ category: string, order: number }} data - search conditions
   * @returns {Promise<Object[]>} - array of products
   */
  getAllByCategory: async ({ category, order }) => {
    // subCat = null means no filter by sub categories
    const queryObj = Object.assign({ category });

    return Product.find(queryObj, { _id: 0 }, { sort: { order } }).lean();
  },
  /**
   * update one product in DB by its vendor code
   * @param {{ [vendorCode]: Array | Object | String | Number | null }} data - product by vendorCode
   * @returns {Promise<Boolean>} - successful or failed query execution
   */
  updateSingleByVendorCode: async data => {
    const [vendorCode, val] = Object.entries(data)[0] || [];
    if (typeof vendorCode === 'undefined') {
      return false;
    }

    try {
      if (val === null) {
        await Product.deleteOne({ vendorCode });
      } else {
        await Product.updateOne({ vendorCode }, { $set: val }, { upsert: true });
      }
      return true;
    } catch (e) {
      return false;
    }
  },
  /**
   * update products in DB by their vendor code
   * @param {{ [vendorCode]: Array | Object | String | Number | null }} data - products by vendorCode
   * @returns {Promise<Boolean>} - successful or failed query execution
   */
  updateMultipleByVendorCodes: async data => {
    const bulkData = (Object.entries(data) || []).map(([vendorCode, val]) => {
      return val === null
        ? {
            deleteOne: {
              filter: { vendorCode }
            }
          }
        : {
            updateOne: {
              filter: { vendorCode },
              update: { $set: val },
              upsert: true
            }
          };
    });

    if (bulkData.length === 0) {
      return false;
    }

    try {
      await Product.bulkWrite(bulkData);
    } catch (e) {
      return false;
    }
    return true;
  }
};
