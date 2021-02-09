const axios = require('axios');
const qs = require('qs');
const utils = require('../configs/utils');

let fetchPlaylistTracks = (playlist_id, access_token) => {
  var config = {
    method: 'get',
    url: utils.urls.getPlaylistTracks(playlist_id),
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + access_token,
    },
  };

  return axios(config);
};

module.exports.getTracks = async (req, res) => {
  if (req.body.playlists && req.body.access_token) {
    // for now one pl list

    let playlists = req.body.playlists;

    fetchPlaylistTracks(playlists.split('|')[0], req.body.access_token)
      .then((response) => {
        console.log(response.data);
        res.status(200).json({
          message: 'Ok',
        });
      })
      .catch((err) => {
        console.log('Err: ', err);
        return res.status(401).json({
          message: 'Invalid/expired Access token',
        });
      });
  } else {
    return res.status(404).json({
      message: 'Invalid request',
    });
  }
};
