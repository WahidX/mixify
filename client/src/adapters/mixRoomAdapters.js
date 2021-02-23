import axios from 'axios';
import qs from 'qs';
import urls from '../utils/urls';

export const refreshRoom = (id, setAppData) => {
  var config = {
    method: 'get',
    url: urls.refreshRoom(id),
  };

  setAppData((prev) => {
    return {
      ...prev,
      loading: true,
    };
  });

  axios(config)
    .then((response) => {
      setAppData((prev) => {
        return {
          ...prev,
          loading: false,
          members: response.data.users,
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
      return [];
    });
};
