const development = {
  name: 'development',
};

const production = {
  name: process.env.SP_MXR,
};

// module.exports = development;

module.exports =
  eval(process.env.SP_MXR_ENVIRONMENT) == undefined
    ? development
    : eval(process.env.ACADEMIC_ENVIRONMENT);
