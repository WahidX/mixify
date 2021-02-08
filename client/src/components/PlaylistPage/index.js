import React, { useContext, useEffect } from 'react';
import { Button } from '@material-ui/core';
import './Playlist.css';
import PlaylistItem from './PlaylistItem';

import { AppDataContext } from '../../contexts/AppDataContext';
import { Redirect } from 'react-router-dom';
// import urls from '../../utils/urls';
import { fetchPlaylists } from '../../adapters/playlistHandlers';

function PlayListPage(props) {
  const [appData, setAppData] = useContext(AppDataContext);

  const linkid = appData.linkid;
  let playlists = appData.playlists;
  let loading = appData.loading;

  useEffect(() => {
    fetchPlaylists(appData.token, setAppData);
  }, []);

  if (!appData.joined) {
    return <Redirect to="/" />;
  }

  return (
    <React.Fragment>
      <div id="link-container">
        <Button
          variant="contained"
          onClick={() => navigator.clipboard.writeText(linkid)}
        >
          Copy Link
        </Button>
      </div>
      {loading && 'loading...'}
      <Button
        variant="outlined"
        disabled={loading}
        onClick={() => fetchPlaylists(appData.token, setAppData)}
      >
        Refresh List
      </Button>
      <div>
        {playlists.map((item) => (
          <PlaylistItem playlist={item} />
        ))}
      </div>
    </React.Fragment>
  );
}

export default PlayListPage;
