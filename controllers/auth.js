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
    'user-read-private user-read-email playlist-read-private playlist-read-collaborative playlist-modify-public playlist-modify-private';

  const redirectUri = 'http://localhost:8000/api/v1/auth/redirect';

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

module.exports.redirectCode = (req, res) => {
  console.log(req.query.access_token);
  return res.status(200).json({
    access_code: req.query.access_token,
  });
};
