import React, { useContext, useEffect } from 'react';
import {
  Button,
  List,
  ListItem,
  ListItemIcon,
  Checkbox,
} from '@material-ui/core';
import './Playlist.css';
import PlaylistItem from './PlaylistItem';

import { AppDataContext } from '../../contexts/AppDataContext';
import { Redirect } from 'react-router-dom';
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
    <div id="playlist-page">
      <Button
        variant="contained"
        onClick={() => navigator.clipboard.writeText(linkid)}
      >
        Copy Link
      </Button>

      <Button
        id="refresh-btn"
        variant="outlined"
        disabled={loading}
        onClick={() => fetchPlaylists(appData.token, setAppData)}
      >
        {loading ? 'loading...' : 'Refresh List'}
      </Button>

      <List>
        {playlists.map((item) => (
          <ListItem key={item.id} dense button>
            <ListItemIcon>
              <Checkbox
                edge="start"
                // checked={checked.indexOf(value) !== -1}
                tabIndex={-1}
                disableRipple
              />
            </ListItemIcon>
            <PlaylistItem playlist={item} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default PlayListPage;
