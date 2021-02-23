import urls from '../utils/urls';

// To redirect to spotify with state
function InviteRoom(props) {
  let linkid = window.location.pathname.split('/')[2];

  window.location.assign(urls.loginSpotify(linkid));

  return null;
}

export default InviteRoom;
