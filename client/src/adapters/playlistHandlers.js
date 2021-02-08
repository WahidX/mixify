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
