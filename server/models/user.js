const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    spotify_id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
    },
    img: {
      type: String,
    },
    explicit_content: {
      type: Boolean,
    },
    playlists: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Playlist',
      },
    ],
    tracks: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
