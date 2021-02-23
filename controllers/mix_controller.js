const axios = require('axios');
const qs = require('qs');
const utils = require('../configs/utils');
const User = require('../models/user');
const Track = require('../models/track');
const Playlist = require('../models/playlist');
const Mix = require('../models/Mix');

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

  console.log(mixRoom.users);
  patternExecute(req.body.pattern);

  return res.status(200).json({
    message: 'ok',
  });
};

let patternExecute = (pattern) => {
  const patterns = {
    smart: smartPattern,
    equal: equalPattern,
    random: randomPattern,
  };
  patterns[pattern]();
};

let smartPattern = () => {
  console.log('Smart');
};

let equalPattern = () => {
  console.log('Equal');
};

let randomPattern = () => {
  console.log('Random');
};
