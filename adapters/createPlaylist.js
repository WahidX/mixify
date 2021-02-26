const axios = require('axios');
const utils = require('../configs/utils');

module.exports.createPlaylist = async (
  userID,
  token,
  playlistName,
  playlistDescription
) => {
  var data = {
    name: playlistName,
    description: playlistDescription + '\n\n -Made with spotifyMixer',
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
