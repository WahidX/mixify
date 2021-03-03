const mongoose = require('mongoose');

const mixSchema = new mongoose.Schema(
  {
    creator: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
    status: {
      type: String,
      enum: ['active', 'complete'],
      required: true,
    },
    playlist_link: {
      type: String,
      required: false,
      default: '',
    },
    users: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
    ],
    explicit_filter: {
      type: Boolean,
      default: false,
    },
    tracks: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Track',
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Mix = mongoose.model('Mix', mixSchema);

module.exports = Mix;
