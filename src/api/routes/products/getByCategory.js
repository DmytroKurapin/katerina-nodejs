/* global reqlib */
const productController = reqlib('/src/api/controller/product');

module.exports = async (req, res, next) => {
  const { category, order = -1 } = req.params;
  // const { sub: subCat = null } = req.query;
  const products = await productController.getAllByCategory({ category, order });

  res.status(200).json(products);
};
