module.exports.patternExecute = (pattern, userTracks) => {
  const patterns = {
    popular: popularPattern,
    equal: equalPattern,
    random: randomPattern,
  };

  // sortTracksOnPopularity(userTracks);
  // console.log('userTracks', userTracks);

  let trackList = patterns[pattern](userTracks);
  console.log(trackList);
  return 'ok';
};

let popularPattern = (userTracks) => {
  // most popular, ..., less popular
  allTracks = getAllTracks(userTracks);
  allTracks.sort((a, b) => b.popularity - a.popularity);

  // taking first 100 tracks only
  popularTracks = allTracks.slice(0, 100);
  return popularTracks;
};

let equalPattern = (userTracks) => {
  console.log('Equal');
};

let randomPattern = (userTracks) => {
  allTracks = getAllTracks(userTracks);

  allTracks.sort(() => Math.random() - 0.5);
  return allTracks;
};

let getAllTracks = (userTracks) => {
  allTracks = [];
  for (let user in userTracks) {
    allTracks.push(...userTracks[user]);
  }
  return allTracks;
};

let sortTracksOnPopularity = (userTracks) => {
  for (let user in userTracks) {
    let trackList = userTracks[user].sort(
      (a, b) => b.popularity - a.popularity
    );
    userTracks[user] = trackList;
  }
};
