const functions = require('./functions');

module.exports.patternExecute = (pattern, userTracks) => {
  const patterns = {
    popular: popularPattern,
    equal: equalPattern,
    random: randomPattern,
    smart: smartPattern,
  };

  let trackArr = patterns[pattern](userTracks);

  let trackList = [];
  trackArr.map((track) => {
    trackList.push(track.uri);
  });

  // console.log(trackList);

  return trackList;
};

let popularPattern = (userTracks) => {
  // most popular, ..., less popular
  allTracks = functions.getAllTracks(userTracks);
  allTracks.sort((a, b) => b.popularity - a.popularity);

  // taking first 100 tracks only
  popularTracks = allTracks.slice(0, 100);
  return popularTracks;
};

let equalPattern = (userTracks) => {
  functions.sortTracksOnPopularity(userTracks);
  console.log('Equal: ', userTracks);
  return userTracks;
};

// Absolute Random
let randomPattern = (userTracks) => {
  allTracks = functions.getAllTracks(userTracks);

  allTracks.sort(() => Math.random() - 0.5);
  return allTracks;
};

let smartPattern = (userTracks) => {
  console.log('smart');
  // sort by frequency, popularity
  return userTracks;
};
