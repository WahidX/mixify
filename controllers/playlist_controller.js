const axios = require('axios');
const qs = require('qs');
const utils = require('../configs/utils');
const User = require('../models/user');
const Track = require('../models/track');
const Playlist = require('../models/playlist');

let fetchPlaylistTracks = async (playlist_id, access_token) => {
  var config = {
    method: 'get',
    url: utils.urls.getPlaylistTracks(playlist_id),
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + access_token,
    },
  };

  try {
    let response = await axios(config);

    return response.data;
  } catch (err) {
    return null;
  }
};

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
  // "items":[{"track":{"explicit":true,"popularity":57,"uri":"spotify:track:1dzwFgBlZNxt28aQOinNGn"}}
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
};

module.exports.getTracks = async (req, res) => {
  try {
    if (req.body.playlists && req.body.access_token && req.body.userID) {
      let playlists = req.body.playlists.split('|');

      let user = await User.findOne({
        spotify_id: req.body.userID,
      });

      if (user) {
        for (let i = 0; i < playlists.length; i++) {
          let playlistData = await fetchPlaylistTracks(
            playlists[i],
            req.body.access_token
          );
          if (playlistData) {
            let tracks = await storeTrack(playlistData);
            let playlist = await storePlaylist(playlists[i]);

            playlist.tracks = tracks;
            playlist.save();
          }
        }

        return res.status(200).json({
          message: 'ok',
        });
      }
    }

    return res.status(404).json({
      message: 'Invalid User',
    });
  } catch (err) {
    console.log('Err: ', err);
    return res.status(501).json({
      message: 'Internal Server Error',
    });
  }
};
