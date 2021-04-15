const axios = require('axios');
const utils = require('../configs/utils');

module.exports.fetchPlaylistTracks = async (playlist_id, access_token) => {
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
    console.log('Err: ', err);
    return null;
  }
};

module.exports.createPlaylist = async (
  userID,
  token,
  playlistName,
  playlistDescription
) => {
  var data = {
    name: playlistName || 'Mixify-Playlist',
    description: playlistDescription + '  -Made with Mixify',
    collaborative: true,
    public: false,
  };

  var config = {
    url: utils.urls.createPlaylist(userID),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
    data,
  };

  try {
    let response = await axios(config);
    return response.data;
  } catch (err) {
    console.error('Err: ', err);
    return false;
  }
};

module.exports.addItemsToPlaylist = async (token, playlistId, uris) => {
  var data = {
    uris: uris,
  };

  var config = {
    url: utils.urls.addItemsToPlaylist(playlistId),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
    data,
  };

  try {
    let response = await axios(config);
    return response.data;
  } catch (err) {
    console.error('Err: ', err);
    return false;
  }
};
