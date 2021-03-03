import React from 'react';
import {
  Button,
  Slide,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@material-ui/core';

import LinkIcon from '@material-ui/icons/Link';
import LocalCafeIcon from '@material-ui/icons/LocalCafe';
// import urls from '../../utils/urls';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function DialogBox(props) {
  let playlistUrl = props.playlistUrl;

  return (
    <Dialog open={playlistUrl} TransitionComponent={Transition} keepMounted>
      <DialogTitle>{'Playlist created !'}</DialogTitle>

      <DialogContent align="center">
        <Button
          variant="contained"
          color="secondary"
          endIcon={<LinkIcon />}
          onClick={() => {
            window.open(playlistUrl, '_blank');
          }}
        >
          Check out Playlist
        </Button>
      </DialogContent>

      <DialogActions>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            window.location.reload();
          }}
        >
          Start new Room
        </Button>

        <Button
          variant="contained"
          color="primary"
          endIcon={<LocalCafeIcon />}
          onClick={() => {
            window.open('', '_blank');
          }}
        >
          Buy me a coffee
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DialogBox;
