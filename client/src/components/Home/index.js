import React, { useContext, useEffect, useState } from 'react';
import { Button, TextField } from '@material-ui/core';

import { AppDataContext } from '../../contexts/AppDataContext';
import urls from '../../utils/urls';
import { Redirect } from 'react-router-dom';
import { checkAuth } from '../../utils';
import {
  createLinkHandler,
  joinLinkHandler,
} from '../../adapters/linkHandlers';

function Home(props) {
  const [appData, setAppData] = useContext(AppDataContext);
  const [link, setLink] = useState('');

  let token = appData.token;
  let loading = appData.loading;

  console.log(appData);

  useEffect(() => {
    // getting token from redirect url
    if (window.location.hash && !token) {
      setAppData((prev) => {
        return {
          ...prev,
          token: checkAuth(token),
        };
      });
    }
  }, []);

  if (appData.joined) {
    return <Redirect to="/playlist" />;
  }

  return (
    <div>
      <h1>Home</h1>
      {loading && 'loading'}
      {token ? (
        <React.Fragment>
          <Button
            variant="outlined"
            disabled={loading}
            onClick={() => createLinkHandler(token, setAppData)}
          >
            Create Party
          </Button>

          <form>
            <Button
              variant="outlined"
              disabled={loading}
              onClick={() => joinLinkHandler(token, link, setAppData)}
            >
              Join Party
            </Button>
            <TextField
              variant="filled"
              label="Paste your link"
              disabled={loading}
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </form>
        </React.Fragment>
      ) : (
        <a href={urls.loginSpotify()}>
          <Button variant="outlined">connect your spotify</Button>
        </a>
      )}
    </div>
  );
}

export default Home;
