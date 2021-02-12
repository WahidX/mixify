import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import './header.css';

import { AppDataContext } from '../../../contexts/AppDataContext';

export default function Header(props) {
  return (
    <div>
      <AppBar position="static">
        <Toolbar id="header-container">
          <Link to="/">
            <Typography variant="h6">Spotify-M1XER</Typography>
          </Link>
          <Button color="inherit">Room Name</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
