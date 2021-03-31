const Product = require('../../models/product');

module.exports = {
  createProduct: async () => {},
  getProduct: async vendorCode => {},
  /**
   * get One product from DB by its vendor code
   * @param {string} vendorCode - product vendor code
   * @returns {Promise<Object>} - product object
   */
  getOneByVendorCode: async vendorCode => {
    return Product.findOne({ vendorCode });
  },
  /**
   * get Multiple products from DB by their vendor code
   * @param {string[]} vendorCodes - products vendor code
   * @returns {Promise<Object[]>} - product object array
   */
  getMultipleByVendorCodes: async vendorCodes => {
    return Product.find({ vendorCode: { $in: vendorCodes } });
  },
  /**
   * get All products from DB by category and other params
   * @param {{ category: string, order: number }} data - search conditions
   * @returns {Promise<Object[]>} - array of products
   */
  getAllByCategory: async ({ category, order }) => {
    // subCat = null means no filter by sub categories
    const queryObj = Object.assign({ category });

    return Product.find(queryObj, null, { sort: { order } }).lean();
  }
};
