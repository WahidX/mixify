import React, { useContext } from 'react';
import { Button } from '@material-ui/core';
import { AppDataContext } from '../../contexts/AppDataContext';

import { submitPlaylists } from '../../adapters/playlistHandlers';

function PlaylistCreate(props) {
  const [appData, setAppData] = useContext(AppDataContext);

  return (
    <div>
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
      >
        Submit
      </Button>
      <h1>Room name</h1>
      <h1>Who else joined</h1>
      <h1>if created? name it and confirm : ''</h1>
    </div>
  );
}

export default PlaylistCreate;
