import axios from "axios";
import qs from "qs";
import urls from "../utils/urls";

export const createLinkHandler = (token, setAppData) => {
	var config = {
		method: "post",
		url: urls.createLink(),
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		data: qs.stringify({
			access_token: token,
		}),
	};

	setAppData((prev) => {
		return {
			...prev,
			loading: true,
		};
	});

	axios(config)
		.then((response) => {
			setAppData((prev) => {
				return {
					...prev,
					linkid: response.data.linkid,
					loading: false,
					created: true,
					joined: true,
					userID: response.data.userID,
				};
			});
		})
		.catch((err) => {
			console.log("Err: ", err);
			setAppData((prev) => {
				return {
					...prev,
					loading: false,
					error: err,
				};
			});
		});
};

export const joinLinkHandler = (token, link, setAppData) => {
	var config = {
		method: "post",
		url: urls.joinLink(link),
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		data: qs.stringify({
			access_token: token,
		}),
	};

	setAppData((prev) => {
		return {
			...prev,
			loading: true,
		};
	});

	axios(config)
		.then((response) => {
			// console.log('response: ', response.data);
			if (response.data.message === "Room ended") {
				setAppData((prev) => {
					return {
						...prev,
						linkid: link,
						playlistUrl: response.data.playlist_link,
					};
				});
			}

			setAppData((prev) => {
				return {
					...prev,
					linkid: link,
					loading: false,
					joined: true,
					userID: response.data.userID,
					creator: response.data.creator,
				};
			});
		})
		.catch((err) => {
			console.log("Err: ", err);
			setAppData((prev) => {
				return {
					...prev,
					loading: false,
					error: err,
				};
			});
		});
};
