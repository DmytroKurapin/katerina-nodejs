const Product = require('../../models/product');

module.exports = {
  createProduct: async () => {

  },
  getProduct: async vendorCode => {

  },
  getProductsByVendorCodes: async () => {

  },
  /**
   * get All products from DB by category and other params
   * @param {{ category: string }} data - search conditions
   * @returns {Promise<Object[]>} - array of products
   */
  getAllProductsByCategory: async ({ category }) => {
    // subCat = null means no filter by sub categories
    const queryObj = Object.assign({ category });

    return Product.find(queryObj, null, { sort: { order: -1 } }).lean();
  },
}
