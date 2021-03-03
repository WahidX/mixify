import React, { useState, useContext, useEffect } from 'react';
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
import { Link, Redirect } from 'react-router-dom';
import { fetchPlaylists } from '../../adapters/playlistHandlers';
import InviteDiv from '../shared/InviteDiv';
import DialogBox from '../shared/DialogBox';

function PlayListPage(props) {
  const [appData, setAppData] = useContext(AppDataContext);

  const linkid = appData.linkid;
  let playlists = appData.playlists;
  let loading = appData.loading;
  let playlistUrl = appData.playlistUrl;

  useEffect(() => {
    fetchPlaylists(appData.token, setAppData);
  }, []);

  const [selected, setSelected] = useState([]);

  let handleToggle = (id) => {
    const currentIndex = selected.indexOf(id);
    const newChecked = [...selected];

    if (currentIndex === -1) {
      newChecked.push(id);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setSelected(newChecked);
  };

  let submitPlaylists = () => {
    if (selected.length > 0)
      setAppData((prev) => {
        return {
          ...prev,
          selected,
        };
      });
  };

  if (!appData.joined) {
    return <Redirect to="/" />;
  }

  return (
    <div id="playlist-page">
      <InviteDiv linkid={linkid} />

      {playlistUrl && <DialogBox playlistUrl={playlistUrl} />}

      <div id="util-btns">
        <Button
          id="refresh-btn"
          color="primary"
          variant="contained"
          disabled={loading}
          onClick={() => fetchPlaylists(appData.token, setAppData)}
        >
          {loading ? 'loading...' : 'Refresh List'}
        </Button>

        {!loading && selected.length > 0 && (
          <Link to="/create">
            <Button
              id="create-mix-btn"
              variant="contained"
              color="secondary"
              disabled={loading || !(selected.length > 0)}
              onClick={submitPlaylists}
            >
              {loading ? 'loading...' : 'Create MiX'}
            </Button>
          </Link>
        )}

        <Button
          id="clear-btn"
          color="primary"
          variant="contained"
          disabled={loading || selected.length === 0}
          onClick={() => setSelected([])}
        >
          {loading ? 'loading...' : 'Clear All'}
        </Button>
      </div>

      <List>
        {playlists.map((item) => (
          <ListItem
            key={item.id}
            dense
            button
            onClick={() => handleToggle(item.id)}
          >
            <ListItemIcon>
              <Checkbox
                edge="start"
                color="primary"
                checked={selected.indexOf(item.id) !== -1}
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
