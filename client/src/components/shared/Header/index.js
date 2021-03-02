import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import './header.css';

import { AppDataContext } from '../../../contexts/AppDataContext';

export default function Header(props) {
  return (
    <div>
      <AppBar position="static">
        <Toolbar id="header-container">
          <Link to="/">
            <Typography variant="h5">
              MiXify <small>- Mix Spotify Playlists</small>
            </Typography>
          </Link>
          <Button color="inherit">Room Name</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
