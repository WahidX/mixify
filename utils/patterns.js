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

  console.log(trackArr);

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
  functions.sortTracksOnPopularity(userTracks);
  console.log('Equal: ', userTracks);
  return userTracks;
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
