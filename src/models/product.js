const mongoose = require('mongoose');
const productSchema = new mongoose.Schema(
  {
    _id: mongoose.SchemaTypes.ObjectID,
    category: { type: String, required: true },
    vendorCode: { type: String, required: true, index: { unique: true } },
    description: { type: Object, required: true }, // { en: String, he: String }
    shortDescription: { type: Object, required: true }, // { en: String, he: String }
    title: { type: Object, required: true }, // { en: String, he: String }
    subCategories: { type: Object, required: true },
    thumbnail: { type: String, required: true },
    images: { type: Object, required: true },
    sizes: { type: Object, required: true },
    price: { type: String, required: true },
    priceHint: { type: Object, required: true }, // { en: String, he: String }
    order: { type: Number, required: true },
    video: { type: String, default: null },
    related: { type: Object, required: true }, // array of vendor codes
    similar: { type: Object, required: true }, // array of vendor codes
    newlyAdded: { type: Boolean, default: false },
    hidden: { type: Boolean, default: false }
  },
  { _id: false }
);
// subCategories is the last in the list of indexes, because there cases when any subCat is selected
productSchema.index({ category: 1, order: -1, subCategories: 1 });

module.exports = mongoose.model('Products', productSchema);
