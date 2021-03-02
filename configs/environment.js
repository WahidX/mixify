const development = {
  name: 'development',
  client_id: process.env.SP_MXR_CLIENT_ID,
  client_secret: process.env.SP_MXR_CLIENT_SECRET,
  db: 'spotify-mixer-dev',
};

const production = {
  name: 'production',
  db: 'mixify-prod',
  client_id: process.env.MXFY_CLIENT_ID,
  client_secret: process.env.MXFY_CLIENT_SECRET,
};

module.exports =
  eval(process.env.MXFY) == undefined ? development : eval(process.env.MXFY);
