import React, { useContext, useEffect, useState } from 'react';
import {
  Button,
  List,
  ListItem,
  Typography,
  Badge,
  IconButton,
  Divider,
  TextField,
  Avatar,
  Checkbox,
  Radio,
  RadioGroup,
  FormControlLabel,
} from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import { AppDataContext } from '../../contexts/AppDataContext';

import { submitPlaylists } from '../../adapters/playlistHandlers';
import './playlistCreate.css';
import { refreshRoom } from '../../adapters/mixRoomAdapters';
import PersonIcon from '@material-ui/icons/Person';
import RefreshIcon from '@material-ui/icons/Refresh';

function PlaylistCreate(props) {
  const [appData, setAppData] = useContext(AppDataContext);
  const [pattern, setPattern] = useState('');

  const linkid = appData.linkid;
  let selected = appData.selected;
  let loading = appData.loading;
  let created = appData.created;

  let members = appData.members || [];
  useEffect(() => {
    console.log(linkid);
    refreshRoom(linkid, setAppData);
  }, []);

  if (!linkid) {
    return <Redirect to="/" />;
  }

  return (
    <div className="side-bar-page">
      <div id="left-container">
        <Button
          variant="contained"
          onClick={() => navigator.clipboard.writeText(linkid)}
        >
          Copy Link
        </Button>

        <div className="submit-box">
          <Typography variant="body1" align="center">
            {selected.length} playlist selected
          </Typography>

          <Button
            variant="outlined"
            onClick={() =>
              submitPlaylists(
                appData.selected,
                appData.token,
                appData.userID,
                setAppData
              )
            }
            disabled={loading}
          >
            Submit
          </Button>
        </div>

        {created && (
          <React.Fragment>
            <TextField variant="outlined" label="Playlist Name" />
            Sorting Pattern :
            <RadioGroup
              name="pattern"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              className="patterns"
            >
              <FormControlLabel
                value="smart"
                control={<Radio />}
                label="Smart"
              />
              <FormControlLabel
                value="equal"
                control={<Radio />}
                label="Equal"
              />
              <FormControlLabel
                value="random"
                control={<Radio />}
                label="Random"
              />
            </RadioGroup>
            <div className="form-items">
              <Checkbox /> Exclude explicit contents
            </div>
            <Button variant="outlined" color="secondary">
              Create Playlist
            </Button>
          </React.Fragment>
        )}

        <div className="room-container">
          <div className="header">
            <div className="total">
              <h1>Members &nbsp;</h1>
              <Badge badgeContent={members.length} color="primary">
                <PersonIcon />
              </Badge>
            </div>

            <IconButton
              disabled={loading}
              onClick={() => refreshRoom(linkid, setAppData)}
            >
              <RefreshIcon />
            </IconButton>
          </div>

          <List>
            <Divider />
            {members.map((user) => {
              return (
                <React.Fragment>
                  <ListItem key={user._id}>
                    <Avatar alt={user.name} src={user.img} />
                    &nbsp; {user.name} &nbsp;
                    {user.playlists.length > 0 && (
                      <Button disabled={true}>submitted</Button>
                    )}
                  </ListItem>
                  <Divider />
                </React.Fragment>
              );
            })}
          </List>
        </div>
      </div>
    </div>
  );
}

export default PlaylistCreate;
