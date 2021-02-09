const base_url = 'http://localhost:8000/api/v1';

let urls = {
  loginSpotify: () => `${base_url}/login`,
  redirectUrl: () => `${base_url}/auth/redirect`,
  createLink: () => `${base_url}/create`,
  joinLink: (link) => `${base_url}/join/${link}`,
  fetchPlaylists: () => `https://api.spotify.com/v1/me/playlists`,
  submitPlaylist: () => `${base_url}/playlist/submit`,
};

export default urls;
