const env = require('./environment');

module.exports.urls = {
  getUser: () => `https://api.spotify.com/v1/me`,

  getPlaylistTracks: (playlist_id) =>
    `https://api.spotify.com/v1/playlists/${playlist_id}/tracks?fields=items(track(uri,explicit,popularity))&market=IN&limit=100&offset=0`,

  createPlaylist: (user_id) =>
    `https://api.spotify.com/v1/users/${user_id}/playlists`,

  addItemsToPlaylist: (playlist_id) =>
    `https://api.spotify.com/v1/playlists/${playlist_id}/tracks`,

  spotifyAuthUrl: (client_id, redirect_uri, scopes, linkid) =>
    'https://accounts.spotify.com/authorize' +
    `?client_id=${client_id}` +
    `&redirect_uri=${redirect_uri}` +
    `&scope=${encodeURIComponent(scopes)}` +
    '&response_type=token' +
    `&state=${linkid}`,

  frontedHome: () => {
    return env.name === 'production'
      ? 'http://prod-frontend-url.com'
      : 'http://localhost:3000/';
  },
};

module.exports.scopes =
  'user-read-email playlist-read-private playlist-read-collaborative playlist-modify-public playlist-modify-private';
