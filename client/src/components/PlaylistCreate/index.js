import React, { useContext, useEffect, useState } from "react";
import {
	Button,
	List,
	ListItem,
	Typography,
	Badge,
	IconButton,
	Divider,
	TextField,
	Avatar,
	Checkbox,
	CircularProgress,
	Radio,
	RadioGroup,
	FormControlLabel,
} from "@material-ui/core";
import { Redirect } from "react-router-dom";
import { AppDataContext } from "../../contexts/AppDataContext";

import { createMix, submitPlaylists } from "../../adapters/playlistHandlers";
import "./playlistCreate.css";
import { refreshRoom } from "../../adapters/mixRoomAdapters";
import PersonIcon from "@material-ui/icons/Person";
import RefreshIcon from "@material-ui/icons/Refresh";
import InviteDiv from "../shared/InviteDiv";
import { makeStyles } from "@material-ui/core/styles";
import DialogBox from "../shared/DialogBox";

const useStyles = makeStyles({
	textField: {
		"& .MuiOutlinedInput-input": {
			color: "white",
		},
	},

	radioGroup: {
		flexDirection: "row",
		justifyContent: "space-evenly",
	},
});

function PlaylistCreate(props) {
	const classes = useStyles();

	const [appData, setAppData] = useContext(AppDataContext);
	const [pattern, setPattern] = useState("");
	const [playlistName, setPlaylistName] = useState("");
	const [excludeExplicit, setExcludeExplicit] = useState(false);

	const linkid = appData.linkid;
	let selected = appData.selected;
	let loading = appData.loading;
	let readyToCreate = appData.readyToCreate;
	let created = appData.creator && appData.creator.spotify_id === appData.userID;
	let playlistUrl = appData.playlistUrl;

	let members = appData.members || [];
	useEffect(() => {
		submitPlaylists(appData.selected, appData.token, appData.userID, setAppData);
		refreshRoom(linkid, setAppData);
	}, []);

	console.log(appData);

	if (!linkid) {
		return <Redirect to="/" />;
	}

	return (
		<div id="page-container">
			<InviteDiv linkid={linkid} />

			{playlistUrl && <DialogBox playlistUrl={playlistUrl} />}

			<div className="submit-box">
				<Typography variant="body1" align="center">
					{selected.length} playlist selected
				</Typography>

				{/* <Button
          variant="contained"
          color="primary"
          onClick={() =>
            submitPlaylists(
              appData.selected,
              appData.token,
              appData.userID,
              setAppData
            )
          }
          disabled={loading}
        >
          Submit
        </Button> */}
			</div>

			{created && (
				<React.Fragment>
					<TextField
						error
						className={classes.textField}
						variant="outlined"
						label="Playlist Name"
						value={playlistName}
						onChange={(e) => setPlaylistName(e.target.value)}
					/>
					Sorting Pattern :
					<RadioGroup className={classes.radioGroup} name="pattern" value={pattern} onChange={(e) => setPattern(e.target.value)}>
						<FormControlLabel value="popular" control={<Radio />} label="Popular" />
						<FormControlLabel value="smart" control={<Radio />} label="Smart" />
						<FormControlLabel value="equal" control={<Radio />} label="Equal" />
					</RadioGroup>
					{/* <div className="form-items">
            <Checkbox
              value={excludeExplicit}
              onChange={() => setExcludeExplicit(!excludeExplicit)}
            />{' '}
            Exclude explicit contents
          </div> */}
					<Button
						variant="contained"
						color="primary"
						disabled={playlistName.trim() === "" || pattern === "" || !readyToCreate}
						onClick={() =>
							readyToCreate && createMix(linkid, playlistName.trim(), pattern, excludeExplicit, appData.token, appData.userID, setAppData)
						}
					>
						{readyToCreate ? "Create Playlist" : <CircularProgress color="primary">{" Wait while submitting Playlist"} </CircularProgress>}
					</Button>
				</React.Fragment>
			)}

			<div className="room-container">
				<div className="header">
					<div className="total">
						<Typography variant="h4">Members &nbsp;</Typography>
						<Badge badgeContent={members.length} color="primary">
							<PersonIcon />
						</Badge>
					</div>

					<Button disabled={loading} onClick={() => refreshRoom(linkid, setAppData)}>
						<RefreshIcon color="primary" /> {"Refresh"}
					</Button>
				</div>

				<List>
					<Divider />
					{members.map((user) => {
						return (
							<React.Fragment>
								<ListItem key={user._id}>
									<Avatar alt={user.name} src={user.img} />
									&nbsp; {user.name} &nbsp;
									{user.tracks.length > 0 && <Button disabled={true}>submitted</Button>}
								</ListItem>
								<Divider />
							</React.Fragment>
						);
					})}
				</List>
			</div>
		</div>
	);
}

export default PlaylistCreate;
