const Mix = require('../models/Mix');
const patterns = require('../PatternControllers/patterns');
const playlistAdapters = require('../adapters/playlistAdapters');

module.exports.getUsers = async (req, res) => {
  try {
    let mix = await Mix.findById(req.params.id).populate({
      path: 'users',
      populate: 'User',
      select: '_id name img playlists tracks',
    });

    return res.status(200).json({
      message: 'ok',
      users: mix.users,
      playlistUrl: mix.playlist_link,
    });
  } catch (err) {
    console.log('Err: ', err);
    return res.status(404).json({
      message: 'Room not found',
    });
  }
};

module.exports.createMix = async (req, res) => {
  // req.body {
  //   access_token,
  //   userID,
  //   linkid,
  //   playlistName,
  //   pattern,
  //   excludeExplicit
  // }

  try {
    // accessing mixRoom
    let mixRoom = await Mix.findById(req.body.linkid)
      .populate({
        path: 'users',
        // populate: {
        //   path: 'playlists',
        //   populate: {
        //     path: 'tracks',
        //   },
        // },
      })
      .populate({
        path: 'creator',
      });

    if (!mixRoom) {
      return res.status(404).json({
        message: 'No room found',
      });
    }

    // Checking mix admin
    if (mixRoom.creator.spotify_id !== req.body.userID) {
      return res.status(401).json({
        message: 'Only Creator can create the playlist',
      });
    }

    // generating the track list
    let userTracks = createUserTracksObj(mixRoom.users);
    let trackList = patterns.patternExecute(req.body.pattern, userTracks);
    if (trackList.length === 0) throw 'No song selected';

    // create playlist
    let playlistData = await playlistAdapters.createPlaylist(
      req.body.userID,
      req.body.access_token,
      req.body.playlistName || '',
      req.body.playlistDescription || ''
    );

    if (!playlistData) {
      console.log('Err in creation');
      throw 'Err in playlist creation';
    }

    console.log(':::::::::: Playlist Created ::::::::::', playlistData.id);

    // Add tracks to it
    let addStatus = await playlistAdapters.addItemsToPlaylist(
      req.body.access_token,
      playlistData.id,
      trackList
    );
    // successful response: snapshot_id: 'MiwwYTc5N2E1Zjk5ZTUwZDE3YTlkMWU4ZjFiMzI1ZGY2MzE0Zjg3MGY2'
    if (!addStatus) throw 'Internal Server Error';

    console.log(`:::::::::: ${trackList.length} Items Added ::::::::::`);

    mixRoom.status = 'complete';
    mixRoom.playlist_link = playlistData.external_urls.spotify;
    mixRoom.save();

    return res.status(200).json({
      message: 'Playlist Created',
      playlistlink: playlistData.external_urls.spotify,
    });
  } catch (err) {
    console.log('Err: ', err);
    return res.status(501).json({
      message: err,
    });
  }
};

// let createUserTracksObj = (users) => {
//   let userTracks = {};
//   for (let i = 0; i < users.length; i++) {
//     let trackArr = [];
//     users[i].playlists.map((playlist) => {
//       playlist.tracks.map((track) => {
//         trackArr.push(track);
//       });
//     });
//     userTracks[users[i].spotify_id] = trackArr;
//   }

//   return userTracks;
// };

let createUserTracksObj = (users) => {
  let userTracks = {};
  users.forEach((user) => {
    userTracks[user.spotify_id] = JSON.parse(user.tracks);
  });
  return userTracks;
};
