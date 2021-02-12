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
