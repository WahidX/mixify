import React, { useContext, useEffect, useState } from "react";
import { Button, IconButton, TextField, Typography } from "@material-ui/core";
import "./home.css";
import { AppDataContext } from "../../contexts/AppDataContext";
import urls from "../../utils/urls";
import { Redirect } from "react-router-dom";
import { checkAuth } from "../../utils";
import spotifyLogo from "../../static/spotifyLogo.png";
import { createLinkHandler, joinLinkHandler } from "../../adapters/linkHandlers";
import DialogBox from "../shared/DialogBox";

function Home(props) {
	const [appData, setAppData] = useContext(AppDataContext);
	const [link, setLink] = useState("");

	let token = appData.token;
	let loading = appData.loading;
	let playlistUrl = appData.playlistUrl;
	console.log(appData);

	useEffect(() => {
		// getting token from redirect url
		if (window.location.hash && !token) {
			let [a_token, linkid] = checkAuth(token);
			setAppData((prev) => {
				return {
					...prev,
					token: a_token,
					linkid: linkid,
				};
			});
		}
	}, []);

	// for invited ones
	useEffect(() => {
		if (appData.linkid && appData.linkid !== "0") {
			console.log("ok", appData.linkid);
			joinLinkHandler(appData.token, appData.linkid, setAppData);
		}
	}, [appData.linkid]);

	if (appData.joined) {
		return <Redirect to="/playlist" />;
	}

	return (
		<div id="home-container">
			{loading && "loading"}
			{token ? (
				<div id="create-join-cont">
					<Button
						className="black-btn"
						variant="contained"
						size="large"
						color="primary"
						disabled={loading}
						onClick={() => createLinkHandler(token, setAppData)}
					>
						Create Party
					</Button>

					<div className="gap" />

					<div className="gap">Or</div>

					<Button
						className="black-btn"
						variant="contained"
						size="large"
						color="primary"
						disabled={loading}
						onClick={() => joinLinkHandler(token, link, setAppData)}
					>
						Join Party
					</Button>
					<TextField
						variant="filled"
						color="primary"
						label="Paste your link"
						disabled={loading}
						value={link}
						onChange={(e) => setLink(e.target.value)}
					/>
				</div>
			) : (
				<React.Fragment>
					<Typography variant="h2" align="center">
						Connect With Spotify
					</Typography>

					<div className="gap" />

					<IconButton className="connect-btn-container" disabled={loading}>
						<a href={urls.loginSpotify(0)}>
							<img src={spotifyLogo} className="connect-btn" alt="connect-spotify" />
						</a>
					</IconButton>
				</React.Fragment>
			)}
		</div>
	);
}

export default Home;
