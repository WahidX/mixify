const mongoose = require('mongoose');

const trackSchema = new mongoose.Schema(
  {
    uri: {
      type: String,
      required: true,
    },
    popularity: {
      type: Number,
    },
    explicit: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

const Track = mongoose.model('Track', trackSchema);

module.exports = Track;
