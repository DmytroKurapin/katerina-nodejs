const { insertClonedProducts } = require('../../../controller/product');

module.exports = async (req, res) => {
  try {
    const { vendorPrefix, startNum, products } = req.body;

    const isSucceed = await insertClonedProducts(vendorPrefix, startNum, products);
    return isSucceed
      ? res.status(200).json({ status: 'success', meta: {} })
      : res.status(500).json({ status: 'error', message: 'Failed: Issue on duplicating' });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err });
  }
  return res.status(200).json({ status: 'success', meta: {} });
};
