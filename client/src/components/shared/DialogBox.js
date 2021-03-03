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
            window.open(
              'upi://pay?pa=7602306212@axl&pn=X&mc=0000&mode=02&purpose=00',
              '_blank'
            );
          }}
        >
          Buy me a Coffee!
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DialogBox;
