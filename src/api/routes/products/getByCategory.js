/* global reqlib */
const productController = reqlib('/src/api/controller/product');

module.exports = async (req, res, next) => {
  const { category, order = -1, newFirst } = req.params;
  // const { sub: subCat = null } = req.query;
  const products = await productController.getAllByCategory({ category, order, newFirst: newFirst === 'n' });

  res.status(200).json(products);
};
