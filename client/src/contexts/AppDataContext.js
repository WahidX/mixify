import React, { createContext, useState } from "react";

export const AppDataContext = createContext();

export const AppDataProvider = (props) => {
	const [appData, setAppData] = useState({
		token: "",
		loading: false,
		linkid: "",
		error: null,
		joined: false,
		playlists: [],
		selected: [],
		userID: null,
		created: false,
		readyToCreate: false,
	});

	return <AppDataContext.Provider value={[appData, setAppData]}>{props.children}</AppDataContext.Provider>;
};
