import { Typography } from '@material-ui/core';
import React from 'react';

function PlaylistItem(props) {
  let playlist = props.playlist;

  //   console.log(playlist);

  let imgUrl = '';
  if (playlist.images.length > 0) imgUrl = playlist.images[0].url;

  return (
    <React.Fragment>
      <div class="playlist-item-container">
        <img src={imgUrl} alt={playlist.name}></img>

        <div className="items-mid">
          <Typography>{playlist.name}</Typography>
          <Typography variant="caption">
            {playlist.owner.display_name}
          </Typography>
        </div>
      </div>

      <div className="item-right">
        <Typography variant="caption">
          No of songs: {playlist.tracks.total}
        </Typography>
      </div>
    </React.Fragment>
  );
}

export default PlaylistItem;
