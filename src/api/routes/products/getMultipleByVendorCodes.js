const productController = require('../../controller/product');

module.exports = async (req, res, next) => {
  const { vc: vendorCodes = [] } = req.query;

  const products = await productController.getMultipleByVendorCodes(vendorCodes);

  res.status(200).json(products);
};
