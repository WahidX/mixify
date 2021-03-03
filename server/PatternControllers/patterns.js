const functions = require('./functions');

module.exports.patternExecute = (pattern, userTracks) => {
  const patterns = {
    popular: popularPattern,
    equal: equalPattern,
    smart: smartPattern,
  };
  let trackArr = patterns[pattern](userTracks);

  let trackList = [];
  trackArr.map((track) => {
    trackList.push(track.uri);
  });

  return trackList;
};

let popularPattern = (userTracks) => {
  // most popular, ..., less popular
  allTracks = functions.getAllTracks(userTracks)[0];
  console.log(allTracks);
  allTracks.sort((a, b) => b.popularity - a.popularity);
  console.log(allTracks);
  // taking first 100 tracks only
  popularTracks = allTracks.slice(0, 100);
  return popularTracks;
};

let equalPattern = (userTracks) => {
  let popularTracksPerUser = functions.sortTracksOnPopularity(userTracks);
  let trackMap = {}; // to avoid duplicates
  let trackArr = [];

  let index = {};
  for (let user in userTracks) {
    index[user] = -1;
  }

  let over = false;
  while (trackArr.length < 101 && !over) {
    for (let user in popularTracksPerUser) {
      let tracks = popularTracksPerUser[user];

      while (index[user] + 1 < tracks.length) {
        let track = tracks[++index[user]];
        if (!trackMap[track._id]) {
          trackMap[track._id] = true;
          trackArr.push(track);
          break;
        }
      }
      over = over || index[user] + 1 === tracks.length;
    }
  }

  console.log('Equal');

  return trackArr;
};

let smartPattern = (userTracks) => {
  console.log('smart');
  // consolidating all the tracks
  let [allTracks, freqMap] = functions.getAllTracks(userTracks);

  // inserting frequency in track object
  allTracks.map((track) => {
    track.frequency = freqMap[track._id];
  });

  // sort by frequency, popularity
  let orderedTracks = functions.sortTracksBy_Frequency_Popularity(allTracks);

  return orderedTracks;
};
