module.exports.urls = {
  getUser: () => `https://api.spotify.com/v1/me`,
  getPlaylistTracks: (playlist_id) =>
    `https://api.spotify.com/v1/playlists/${playlist_id}/tracks?fields=items(track(uri,explicit,popularity))&market=IN&limit=100&offset=0`,
};
