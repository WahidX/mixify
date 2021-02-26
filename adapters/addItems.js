const axios = require('axios');
const utils = require('../configs/utils');

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
