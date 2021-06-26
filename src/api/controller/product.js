/* global reqlib */
const Product = reqlib('/src/models/product');
const { generateVendorCode } = reqlib('/src/services/helpers');
const logger = reqlib('/src/config/logger');

/**
 * get One product from DB by its vendor code
 * @param {string} vendorCode - product vendor code
 * @returns {Promise<Object>} - product object
 */
const getOneByVendorCode = async vendorCode => {
  return Product.findOne({ vendorCode }, { _id: 0 });
};
/**
 * get Multiple products from DB by their vendor code
 * @param {string[]} vendorCodes - products vendor code
 * @returns {Promise<Object[]>} - product object array
 */
const getMultipleByVendorCodes = async vendorCodes => {
  return Product.find({ vendorCode: { $in: vendorCodes } }, { _id: 0 });
};
/**
 * get All products from DB by category and other params
 * @param {{ category: string, order, showHidden?: boolean, newFirst?: boolean }} data - search conditions
 * @returns {Promise<Object[]>} - array of products
 */
const getAllByCategory = async ({ category, order: sortOrder, showHidden = false, newFirst = false }) => {
  // subCat = null means no filter by sub categories
  const queryObj = Object.assign({ category }, showHidden ? {} : { hidden: false });
  const order = isNaN(Number(sortOrder)) ? -1 : Number(sortOrder);
  const sortObj = newFirst ? { forceNew: -1, addedDate: -1, order } : { order };

  return Product.find(queryObj, { _id: 0 }, { sort: sortObj })
    .collation({ locale: 'en_US', numericOrdering: true })
    .lean();
};
/**
 * update one product in DB by its vendor code
 * @param {{ [vendorCode]: Array | Object | String | Number | null }} data - product by vendorCode
 * @returns {Promise<Boolean>} - successful or failed query execution
 */
const updateSingleByVendorCode = async data => {
  const [vendorCode, val] = Object.entries(data)[0] || [];
  if (typeof vendorCode === 'undefined') {
    return false;
  }

  try {
    if (val === null) {
      await Product.deleteOne({ vendorCode });
    } else {
      await Product.updateOne({ vendorCode }, { $set: val }, { upsert: true });
    }
    return true;
  } catch (e) {
    return false;
  }
};
/**
 * update products in DB by their vendor code
 * @param {{ [vendorCode]: Array | Object | String | Number | null }} data - products by vendorCode
 * @returns {Promise<Boolean>} - successful or failed query execution
 */
const updateMultipleByVendorCodes = async data => {
  try {
    const bulkData = (Object.entries(data) || []).map(([vendorCode, val]) => {
      return val === null
        ? {
            deleteOne: {
              filter: { vendorCode }
            }
          }
        : {
            updateOne: {
              filter: { vendorCode },
              update: { $set: val },
              upsert: true
            }
          };
    });

    if (bulkData.length === 0) {
      return false;
    }

    await Product.bulkWrite(bulkData);
  } catch (e) {
    return false;
  }
  return true;
};
/**
 * get highest vendor code in current category
 * @param {string} categoryPrefix - vendorCode prefix of category
 * @returns {Promise<Boolean>} - successful or failed query execution
 */
const getLatestVendorCode = async categoryPrefix =>
  Product.findOne(
    { vendorCode: { $regex: `^${categoryPrefix}` } },
    { _id: 0, vendorCode: 1 },
    { sort: { vendorCode: -1 } }
  )
    .collation({ locale: 'en_US', numericOrdering: true })
    .limit(1);
/**
 * get highest order number in current category
 * @param {string} categoryPrefix - vendorCode prefix of category
 * @returns {Promise<Boolean>} - successful or failed query execution
 */
const getLatestOrder = async categoryPrefix =>
  Product.findOne(
    { vendorCode: { $regex: `^${categoryPrefix}` } },
    { _id: 0, order: 1 },
    { sort: { order: -1 } }
  ).limit(1);
/**
 * insert cloned products from one category to another category
 * @param {string} vendorPrefix - vendorCode prefix of category
 * @param {number} startNum - number in vendorCode of last previous item
 * @param {{ [vendorCode]: Array | Object | String | Number | null }} products - products by vendorCode
 * @returns {Promise<Boolean>} - successful or failed query execution
 */
const insertClonedProducts = async (vendorPrefix, startNum, products) => {
  try {
    const [vendorCodeRes, orderRes] = await Promise.all([
      getLatestVendorCode(vendorPrefix),
      getLatestOrder(vendorPrefix)
    ]);

    let lastVendorCode = vendorCodeRes && vendorCodeRes.vendorCode;
    let nextOrder = orderRes === null ? 0 : orderRes.order + 1;
    const bulkData = Object.values(products).map(prodData => {
      const newVendorCode = generateVendorCode(vendorPrefix, lastVendorCode, startNum);
      const document = Object.assign({}, prodData, { vendorCode: newVendorCode, order: nextOrder });

      lastVendorCode = newVendorCode;
      nextOrder++;
      return {
        insertOne: {
          document
        }
      };
    });

    await Product.bulkWrite(bulkData);
  } catch (e) {
    logger.error(`insertClonedProducts error: ${e.message}`);
    return false;
  }
  return true;
};

module.exports = {
  updateSingleByVendorCode,
  updateMultipleByVendorCodes,
  generateVendorCode,
  getAllByCategory,
  getLatestOrder,
  getMultipleByVendorCodes,
  getOneByVendorCode,
  insertClonedProducts,
  getLatestVendorCode
};
