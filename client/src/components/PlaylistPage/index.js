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

function PlayListPage(props) {
  const [appData, setAppData] = useContext(AppDataContext);

  const linkid = appData.linkid;
  let playlists = appData.playlists;
  let loading = appData.loading;

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

  let submitted = false;

  let submitPlaylists = () => {
    console.log(selected);
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
      <Button
        variant="contained"
        onClick={() => navigator.clipboard.writeText(linkid)}
      >
        Copy Link
      </Button>

      <div id="util-btns">
        <Button
          id="refresh-btn"
          variant="outlined"
          disabled={loading}
          onClick={() => fetchPlaylists(appData.token, setAppData)}
        >
          {loading ? 'loading...' : 'Refresh List'}
        </Button>

        {!loading && selected.length > 0 && (
          <Link to="/create">
            <Button
              id="create-mix-btn"
              variant="outlined"
              color="secondary"
              disabled={loading && !(selected.length > 0)}
              onClick={submitPlaylists}
            >
              {loading ? 'loading...' : 'Create MiX'}
            </Button>
          </Link>
        )}

        <Button
          id="clear-btn"
          variant="outlined"
          disabled={loading}
          onClick={() => setSelected([])}
        >
          {loading ? 'loading...' : 'Clear Selections'}
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
