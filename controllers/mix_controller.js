const axios = require('axios');
const qs = require('qs');
const utils = require('../configs/utils');
const User = require('../models/user');
const Track = require('../models/track');
const Playlist = require('../models/playlist');
const Mix = require('../models/Mix');
const patterns = require('../utils/patterns');

module.exports.getUsers = async (req, res) => {
  try {
    let mix = await Mix.findById(req.params.id).populate({
      path: 'users',
      populate: 'User',
      select: '_id name img playlists',
    });

    return res.status(200).json({
      message: 'ok',
      users: mix.users,
    });
  } catch (err) {
    console.log('Err: ', err);
    return res.status(404).json({
      message: 'Room not found',
    });
  }
};

module.exports.createMix = async (req, res) => {
  // req.body {
  //   access_token,
  //   userID,
  //   linkid,
  //   playlistName,
  //   pattern,
  //   excludeExplicit
  // }

  try {
    let mixRoom = await Mix.findById(req.body.linkid)
      .populate({
        path: 'users',
        populate: {
          path: 'playlists',
          populate: {
            path: 'tracks',
          },
        },
      })
      .populate({
        path: 'creator',
      });

    if (!mixRoom) {
      return res.status(404).json({
        message: 'No room found',
      });
    }

    if (mixRoom.creator.spotify_id !== req.body.userID) {
      return res.status(401).json({
        message: 'Only Creator can create the playlist',
      });
    }

    let userTracks = createUserTracksObj(mixRoom.users);

    let newPlaylistTracks = patterns.patternExecute(
      req.body.pattern,
      userTracks
    );

    // create playlist
    // add tracks to it

    return res.status(200).json({
      message: 'ok',
    });
  } catch (err) {
    console.log('Err: ', err);
    return res.status(501).json({
      message: err,
    });
  }
};

let createUserTracksObj = (users) => {
  let userTracks = {};
  for (let i = 0; i < users.length; i++) {
    let trackArr = [];
    users[i].playlists.map((playlist) => {
      playlist.tracks.map((track) => {
        trackArr.push(track);
      });
    });
    userTracks[users[i].spotify_id] = trackArr;
  }

  // console.log('userTracks: ', userTracks);
  return userTracks;
};
