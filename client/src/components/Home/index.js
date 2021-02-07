import { Button } from '@material-ui/core';
import React from 'react';
import axios from 'axios';

function Home(props) {
  let handleAuth = () => {
    console.log('clicked');
    var config = {
      url: 'http://localhost:8000/api/v1',
      method: 'get',
    };

    axios(config)
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log('error', err);
      });

    console.log('done');
  };

  return (
    <div>
      <h1>Home</h1>
      <Button variant="outlined" onClick={handleAuth}>
        Get auth
      </Button>
    </div>
  );
}

export default Home;
