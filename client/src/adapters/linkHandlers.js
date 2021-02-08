import axios from 'axios';
import qs from 'qs';
import urls from '../utils/urls';

export const createLinkHandler = (token) => {
  console.log('have to tell backend to create');

  var config = {
    method: 'post',
    url: urls.createLink(),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: qs.stringify({
      access_token: token,
    }),
  };

  axios(config)
    .then((response) => {
      console.log(response.data);
    })
    .catch((err) => {
      console.log('Err: ', err);
    });
};

export const joinLinkHandler = (token, link) => {
  console.log('have to tell backend to join');

  console.log('link', link);

  var config = {
    method: 'post',
    url: urls.joinLink(link),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: qs.stringify({
      access_token: token,
    }),
  };

  axios(config)
    .then((response) => {
      console.log(response.data);
    })
    .catch((err) => {
      console.log('Err: ', err);
    });
};
