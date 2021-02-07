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
  var scopes = 'user-read-private user-read-email';
  res.redirect(
    'https://accounts.spotify.com/authorize' +
      '?response_type=code' +
      '&client_id=' +
      env.client_id +
      (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
      '&redirect_uri=' +
      encodeURIComponent('http://localhost:8000/api/v1/auth/redirect')
  );
};

module.exports.redirectCode = (req, res) => {
  console.log(req.query.code);
  return res.status(200).json({
    access_code: req.query.code,
  });
};

// http://localhost:8000/api/v1/?
// code=AQA_Fmj6XA2SBpcEoVwo13vI4fHJVOLK0JovzecCmt9e009yKsLB9pu_e__IGHMGiS_xOY20qH2_ntsYZcaHSL39OJyKHh4bG0poh7zljZerHYvtHEcnUXow4j6yvIveQFUxBF6CSSEpD47SJRxJk_xfyiOSPbitLQcZ7Zrp3vYxKNG75Jn_jUHbobhcJ331SDVCXUVyy7tmTh6VXid1cOAMGew0
