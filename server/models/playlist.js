const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema(
  {
    spotify_id: {
      type: String,
      required: true,
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

const Playlist = mongoose.model('Playlist', playlistSchema);

module.exports = Playlist;
