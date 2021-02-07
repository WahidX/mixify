const development = {
  name: 'development',
  client_id: process.env.SP_MXR_CLIENT_ID,
  client_secret: process.env.SP_MXR_CLIENT_SECRET,
};

const production = {
  name: process.env.SP_MXR,
};

// module.exports = development;

module.exports =
  eval(process.env.SP_MXR_ENVIRONMENT) == undefined
    ? development
    : eval(process.env.ACADEMIC_ENVIRONMENT);
