const axios = require('axios');
const utils = require('../configs/utils');

module.exports.fetchUser = async (access_token) => {
  var config = {
    method: 'get',
    url: utils.urls.getUser(),
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
    return false;
  }
};
