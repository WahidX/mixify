module.exports.getAllTracks = (userTracks) => {
  allTracks = [];
  for (let user in userTracks) {
    allTracks.push(...userTracks[user]);
  }
  return allTracks;
};

module.exports.sortTracksOnPopularity = (userTracks) => {
  for (let user in userTracks) {
    let trackList = userTracks[user].sort(
      (a, b) => b.popularity - a.popularity
    );
    userTracks[user] = trackList;
  }
};
