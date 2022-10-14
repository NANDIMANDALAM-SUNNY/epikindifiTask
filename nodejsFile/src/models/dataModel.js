const mongoose = require('mongoose');

const dataSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    fieldName: {
      type: String,
      required: true,
      maxLength: 300,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('epikindifi', dataSchema);
