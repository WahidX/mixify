export const getHashParams = () => {
  let params = {};
  let token = window.location.hash
    .replace('#', '')
    .split('&')
    .map((item) => {
      let keyVal = item.split('=');
      params[keyVal[0]] = keyVal[1];
    });

  return params;
};

export const checkAuth = (token) => {
  if (token) return token;
  let a_token = getHashParams()['access_token'];
  return a_token;
};
