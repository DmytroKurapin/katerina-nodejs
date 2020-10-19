const mongoose = require('mongoose');
const productSchema = mongoose.Schema({
  _id: mongoose.SchemaTypes.ObjectID,
  category: { type: String, required: true },
  vendorCode: { type: String, required: true, index: { unique: true } },
  description: { type: Object, required: true }, // { en: String, he: String }
  shortDescription: { type: Object, required: true }, // { en: String, he: String }
  title: { type: Object, required: true }, // { en: String, he: String }
  subCategories: { type: Object, required: true },
  thumbnail: { type: String, required: true },
  images: { type: Object, required: true },
  price: { type: String, required: true },
  order: { type: Number, required: true },
});
// subCategories is the last in the list of indexes, because there cases when any subCat is selected
productSchema.index({ category: 1, order: -1, subCategories: 1 });

/*
todo
 "specialOffer": {
  "price": null,
   "isNew": null
},
*/

module.exports = mongoose.model('Products', productSchema);
