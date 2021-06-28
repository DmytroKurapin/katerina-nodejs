const mongoose = require('mongoose');
const generalSchema = new mongoose.Schema(
  {
    feature: { type: String, required: true }, // e.g. 'homePage'
    data: { type: Object, required: true } // { popular: String[] }
  },
  { _id: false }
);

module.exports = mongoose.model('General', generalSchema);
