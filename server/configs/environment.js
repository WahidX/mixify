const development = {
  name: 'development',
  client_id: process.env.SP_MXR_CLIENT_ID,
  client_secret: process.env.SP_MXR_CLIENT_SECRET,
  db: 'spotify-mixer-dev',
  MXFY_DP_PASS: process.env.MXFY_DP_PASS,
};

const production = {
  name: 'production',
  db: 'mixify-prod',
  client_id: process.env.MXFY_CLIENT_ID,
  client_secret: process.env.MXFY_CLIENT_SECRET,
  redirect_uri: process.env.MXFY_REDIRECT,
  MXFY_DP_PASS: process.env.MXFY_DP_PASS,
};

module.exports =
  eval(process.env.MXFY) == undefined ? development : eval(process.env.MXFY);
