const User = require('../models/user');
const Track = require('../models/track');
const Playlist = require('../models/playlist');
const playlistAdapters = require('../adapters/playlistAdapters');

const storePlaylist = async (playlistID) => {
  try {
    let playlist = await Playlist.findOne({
      spotify_id: playlistID,
    });

    if (!playlist) {
      playlist = await Playlist.create({
        spotify_id: playlistID,
        tracks: [],
      });
    }
    return playlist;
  } catch (err) {
    console.log('Err: ', err);
    return null;
  }
};

const storeTrack = async (trackItems) => {
  try {
    // "items":[{"track":{"explicit":true,"popularity":57,"uri":"spotify:track:1dzwFgBlZNxt28aQOinNGn"}}]
    let trackArr = trackItems.items;
    let tracks = [];
    for (let i = 0; i < trackArr.length; i++) {
      let track = await Track.findOne({
        uri: trackArr[i].track.uri,
      });

      if (!track) {
        track = await Track.create({
          uri: trackArr[i].track.uri,
          popularity: trackArr[i].track.popularity,
          explicit: trackArr[i].track.explicit,
        });
      }

      tracks.push(track._id);
    }
    return tracks;
  } catch (err) {
    console.log('Err: ', err);
    return false;
  }
};

module.exports.submitPlaylist = async (req, res) => {
  try {
    if (!(req.body.playlists && req.body.access_token && req.body.userID))
      throw 'Invalid Request';

    let playlists = req.body.playlists.split('|');
    let user = await User.findOne({
      spotify_id: req.body.userID,
    });

    if (!user) throw 'Internal Server Error';

    user.playlists = [];
    let tracks = [];

    for (let i = 0; i < playlists.length; i++) {
      let playlistData = await playlistAdapters.fetchPlaylistTracks(
        playlists[i],
        req.body.access_token
      );

      if (playlistData) {
        // Instead of storing the tracks separately we will store them for the user only

        // "items":[{"track":{"explicit":true,"popularity":57,"uri":"spotify:track:1dzwFgBlZNxt28aQOinNGn"}}]
        playlistData['items'].forEach((trackObj) => {
          tracks.push(trackObj['track']);
        });
        // Storing every element
        // let tracks = await storeTrack(playlistData);
        // let playlist = await storePlaylist(playlists[i]);

        // playlist.tracks = tracks;
        // playlist.save();
        // user.playlists.push(playlist._id);
      }
    }

    user.tracks = JSON.stringify(tracks);

    user.save(); // saving the playlists

    return res.status(200).json({
      message: 'ok',
    });
  } catch (err) {
    console.log('Err: ', err);
    return res.status(501).json({
      message: 'Internal Server Error',
    });
  }
};
