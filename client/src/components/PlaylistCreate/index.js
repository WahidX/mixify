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
        onClick={() => submitPlaylists(appData.selected, appData.token)}
      >
        Submit
      </Button>
    </div>
  );
}

export default PlaylistCreate;
