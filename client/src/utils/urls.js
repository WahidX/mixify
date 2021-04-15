const base_url = "https://mixify-x.herokuapp.com/api/v1";
const base_frontend = "https://mixify-xd.web.app";

// const base_url = "http://localhost:8000/api/v1";
// const base_frontend = "http://localhost:3000";

let urls = {
	loginSpotify: (linkid) => `${base_url}/login/${linkid}`,
	redirectUrl: () => `${base_url}/auth/redirect`,
	createLink: () => `${base_url}/create`,
	joinLink: (link) => `${base_url}/join/${link}`,
	fetchPlaylists: () => `https://api.spotify.com/v1/me/playlists`,
	submitPlaylist: () => `${base_url}/playlist/submit`,
	refreshRoom: (id) => `${base_url}/mix/refresh/${id}`,
	roomUrl: (linkid) => `${base_frontend}/room/${linkid}`,
	createMix: () => `${base_url}/mix/create`,
};

export default urls;
