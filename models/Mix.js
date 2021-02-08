const mongoose = require('mongoose');

const mixSchema = new mongoose.Schema(
  {
    creator: {
      type: String,
      required: true,
    },
    users: [
      {
        type: String,
        required: true,
      },
    ],
    explicit_filter: {
      type: Boolean,
      default: false,
    },
    songs: [
      {
        type: String,
        required: false,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Mix = mongoose.model('Mix', mixSchema);

module.exports = Mix;
