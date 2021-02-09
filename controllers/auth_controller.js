const env = require('../configs/environment');

module.exports.getDetails = (req, res) => {
  console.log();
  return res.status(200).json({
    message: 'ok',
    auth_details: {
      client_id: env.client_id,
      client_secret: env.client_secret,
    },
  });
};

module.exports.login = (req, res) => {
  var scopes =
    'user-read-email playlist-read-private playlist-read-collaborative playlist-modify-public playlist-modify-private';

  const redirectUri = 'http://localhost:3000/';

  res.redirect(
    'https://accounts.spotify.com/authorize' +
      '?client_id=' +
      env.client_id +
      '&redirect_uri=' +
      redirectUri +
      '&scope=' +
      encodeURIComponent(scopes) +
      '&response_type=token' +
      '&state=123'
  );
};
