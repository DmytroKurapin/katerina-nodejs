const { updateSingleByVendorCode, updateMultipleByVendorCodes } = require('../../../controller/product');

module.exports = async (req, res) => {
  try {
    const { body } = req;
    let isSucceed = false;
    if (!body || typeof body !== 'object' || Object.keys(body).length === 0) {
      res.status(500).json({ status: 'error', message: 'Failed: Incorrect submit data' });
    } else if (Object.keys(body).length === 1) {
      isSucceed = await updateSingleByVendorCode(body);
    } else {
      isSucceed = await updateMultipleByVendorCodes(body);
    }

    return isSucceed
      ? res.status(200).json({ status: 'success', meta: {} })
      : res.status(500).json({ status: 'error', message: 'Failed: Issue on updating' });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err });
  }
};
