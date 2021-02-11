import axios from 'axios';
import qs from 'qs';
import urls from '../utils/urls';

export const fetchPlaylists = (token, setAppData) => {
  var config = {
    method: 'get',
    url: urls.fetchPlaylists(),
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  };

  setAppData((prev) => {
    return {
      ...prev,
      loading: true,
    };
  });

  axios(config)
    .then((response) => {
      console.log('plist: ', response.data);
      setAppData((prev) => {
        return {
          ...prev,
          loading: false,
          playlists: response.data.items,
        };
      });
    })
    .catch((err) => {
      console.log('Err: ', err);
      setAppData((prev) => {
        return {
          ...prev,
          loading: false,
          error: err,
        };
      });
    });
};

export const submitPlaylists = (playlists, token, userID) => {
  // concatinating playlist uris
  let playlistsSTR = '';
  playlists.map((item) => {
    console.log(item);
    playlistsSTR += item + '|';
  });
  playlistsSTR = playlistsSTR.slice(0, playlistsSTR.length - 1);

  console.log('sending PLlist: ', userID);

  var config = {
    method: 'post',
    url: urls.submitPlaylist(),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: qs.stringify({
      access_token: token,
      playlists: playlistsSTR,
      userID: userID,
    }),
  };

  axios(config)
    .then((response) => {
      console.log('res: ', response.data);
    })
    .catch((err) => {
      console.log('Err: ', err);
    });
};
