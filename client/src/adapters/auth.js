import axios from "axios";
import urls from "../utils/urls";

export const loginHandler = () => {
	var config = {
		url: urls.loginSpotify(),
		method: "get",
		headers: {},
	};

	axios(config)
		.then((response) => {
			// console.log(response.data);
		})
		.catch((err) => {
			console.log("error", err);
		});
};
