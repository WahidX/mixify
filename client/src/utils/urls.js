const base_url = 'http://localhost:8000/api/v1';

let urls = {
  loginSpotify: () => `${base_url}/login`,
  redirectUrl: () => `${base_url}/auth/redirect`,
};

export default urls;
