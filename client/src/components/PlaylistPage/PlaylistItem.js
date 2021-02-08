import React from 'react';

function PlaylistItem(props) {
  let playlist = props.playlist;

  console.log(playlist);

  return (
    <div>
      <img src={playlist.images[0].url} alt={playlist.name} width="100"></img>
      <h1>{playlist.name}</h1>
      <h1>{playlist.owner.display_name}</h1>
    </div>
  );
}

export default PlaylistItem;
