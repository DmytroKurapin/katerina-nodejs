/* global reqlib */
// const productController = reqlib('/src/api/controller/product');
const productController = require('../../../api/controller/product');

module.exports = async (req, res, next) => {
  const { vendorCode } = req.params;

  const product = await productController.getOneByVendorCode(vendorCode);

  res.status(200).json(product);
};
