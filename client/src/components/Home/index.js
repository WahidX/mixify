import React, { useContext } from 'react';

import { Button } from '@material-ui/core';
import { TokenContext } from '../../contexts/TokenContext';
import { LoadingContext } from '../../contexts/LoadingContext';

import urls from '../../utils/urls';
import { checkAuth } from '../../utils';
import { Link } from 'react-router-dom';
import {
  createLinkHandler,
  joinLinkHandler,
} from '../../adapters/linkHandlers';

function Home(props) {
  const [token, setToken] = useContext(TokenContext);
  const [loading, setLoading] = useContext(LoadingContext);

  setToken(checkAuth(token));

  return (
    <div>
      <h1>Home</h1>

      {token ? (
        <React.Fragment>
          <Link to="/playlist" onClick={createLinkHandler}>
            <Button variant="outlined">Create Party</Button>
          </Link>
          <Link to="/playlist" onClick={joinLinkHandler}>
            <Button variant="outlined">Join Party</Button>
          </Link>
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
