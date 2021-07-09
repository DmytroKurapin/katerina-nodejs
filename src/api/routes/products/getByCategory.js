/* global reqlib */
const productController = reqlib('/src/api/controller/product');
const KNOWN_SORTING = ['new', 'pricelow', 'pricehigh'];

module.exports = async (req, res, next) => {
  const { category, order = -1, sorting } = req.params;
  // const { sub: subCat = null } = req.query;
  const data = { category, order };

  if (sorting && KNOWN_SORTING.includes(sorting)) {
    Object.assign(data, { sorting });
  }
  // , newFirst: newFirst === 'new'
  const products = await productController.getAllByCategory(data);

  res.status(200).json(products);
};
