const productController = require('../../controller/product');

module.exports = async (req, res, next) => {
  const { category } = req.params;
  // const { sub: subCat = null } = req.query;
  
  const products = await productController.getAllByCategory({ category });

  res.status(200).json(products);
};
