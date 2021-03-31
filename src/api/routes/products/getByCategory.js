const productController = require('../../controller/product');

module.exports = async (req, res, next) => {
  const { category, order = -1 } = req.params;
  // const { sub: subCat = null } = req.query;
  const sortOrder = isNaN(Number(order)) ? -1 : Number(order);
  const products = await productController.getAllByCategory({ category, order: sortOrder });

  res.status(200).json(products);
};
