module.exports.getAllTracks = (userTracks) => {
  allTracks = [];
  trackMap = {};

  for (let user in userTracks) {
    userTracks[user].map((track) => {
      if (!trackMap[track._id]) {
        allTracks.push(track);
        trackMap[track._id] = 1;
      } else trackMap[track._id]++;
    });
  }
  return [allTracks, trackMap];
};

module.exports.sortTracksOnPopularity = (userTracks) => {
  for (let user in userTracks) {
    let trackList = userTracks[user].sort(
      (a, b) => b.popularity - a.popularity
    );
    userTracks[user] = trackList;
  }
};

// module.exports.sortTracksBy_Frequency_Popularity = (tracks) => {
//   (a, b) {
//     if (a.city === b.city) {
//        // Price is only important when cities are the same
//        return b.price - a.price;
//     }
//     return a.city > b.city ? 1 : -1;
//  });

// }
