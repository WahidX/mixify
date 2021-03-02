import React from 'react';
import { Button } from '@material-ui/core';
import urls from '../../../utils/urls';
import FileCopyIcon from '@material-ui/icons/FileCopy';

function InviteDiv(props) {
  let linkid = props.linkid;
  return (
    <div className="copy-div">
      <Button
        size="large"
        color="primary"
        variant="contained"
        onClick={() => navigator.clipboard.writeText(urls.roomUrl(linkid))}
        endIcon={<FileCopyIcon />}
      >
        Room URL
      </Button>
      <Button
        size="large"
        color="primary"
        variant="contained"
        onClick={() => navigator.clipboard.writeText(linkid)}
        endIcon={<FileCopyIcon />}
      >
        Room CODE
      </Button>
    </div>
  );
}

export default InviteDiv;
