import React, { useContext, useEffect, useState } from 'react';
import { Button, TextField } from '@material-ui/core';

import { AppDataContext } from '../../contexts/AppDataContext';
import urls from '../../utils/urls';
import { Link } from 'react-router-dom';
import { checkAuth } from '../../utils';
import {
  createLinkHandler,
  joinLinkHandler,
} from '../../adapters/linkHandlers';

function Home(props) {
  const [appData, setAppData] = useContext(AppDataContext);
  let token = appData.token;

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

  const [link, setLink] = useState('');

  return (
    <div>
      <h1>Home</h1>

      {token ? (
        <React.Fragment>
          <Link to="/playlist" onClick={() => createLinkHandler(token)}>
            <Button variant="outlined">Create Party</Button>
          </Link>
          <form>
            <Link to="/playlist" onClick={() => joinLinkHandler(token, link)}>
              <Button variant="outlined">Join Party</Button>
            </Link>
            <TextField
              variant="filled"
              label="Paste your link"
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
