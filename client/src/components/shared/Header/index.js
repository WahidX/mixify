import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import './header.css';

import { AppDataContext } from '../../../contexts/AppDataContext';
import { Avatar } from '@material-ui/core';

export default function Header(props) {
  const [appData, setAppData] = useContext(AppDataContext);
  let creator = appData.creator;

  return (
    <div>
      <AppBar position="static">
        <Toolbar id="header-container">
          <Link to="/">
            <Typography variant="h5">
              MiXify <small>- Mix Spotify Playlists</small>
            </Typography>
          </Link>

          {creator && (
            <Button color="inherit">
              <Avatar src={creator.img} />
              &nbsp; {creator.name + "'s ROOM"}
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
