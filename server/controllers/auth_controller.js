const env = require('../configs/environment');
const utils = require('../configs/utils');

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
  var scopes = utils.scopes;
  const redirect_uri = utils.urls.frontedHome();
  const linkid = req.params.linkid || 0;

  res.redirect(
    utils.urls.spotifyAuthUrl(env.client_id, redirect_uri, scopes, linkid)
  );
};

// 'https://accounts.spotify.com/authorize' +
// '?client_id=' +
// env.client_id +
// '&redirect_uri=' +
// redirectUri +
// '&scope=' +
// encodeURIComponent(scopes) +
// '&response_type=token' +
// `&state=${linkid}`
