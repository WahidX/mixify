export const getHashParams = () => {
	let params = {};
	// console.log('hash: ', window.location.hash);
	let hashString = window.location.hash
		.replace("#", "")
		.split("&")
		.map((item) => {
			let keyVal = item.split("=");
			params[keyVal[0]] = keyVal[1];
		});

	return params;
};

export const checkAuth = (token) => {
	if (token) return token;
	let hashParams = getHashParams();
	return [hashParams["access_token"], hashParams["state"]];
};
