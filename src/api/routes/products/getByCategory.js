/* global reqlib */
const productController = reqlib('/src/api/controller/product');

module.exports = async (req, res, next) => {
  const { category, order = -1, sorting } = req.params;
  const products = await productController.getAllByCategory({ category, order, sorting });

  res.status(200).json(products);
};
