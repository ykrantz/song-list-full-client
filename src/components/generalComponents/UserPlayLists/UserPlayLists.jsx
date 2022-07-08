import "./UserPlayLists.css";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import React, { useContext, useEffect } from "react";
import getUserPlaylistsFromServer from "../../../controllers/getUserPlaylistsFromServer";
import handlePlaylistMainState from "../../../context/handlePlaylistMainState";
const UserPlayLists = ({ type }) => {
  const {
    currentPlaylist,
    handleSetCurrentPlaylist,
    userPlaylists,
    setUserPlaylists,
  } = useContext(handlePlaylistMainState);
  useEffect(async () => {
    try {
      const userPlaylistsFromServer = await getUserPlaylistsFromServer();
      setUserPlaylists(userPlaylistsFromServer.data);

      if (userPlaylistsFromServer?.data.length > 0) {
        if (
          userPlaylistsFromServer.data.find(
            (value) => value.playlistName === currentPlaylist
          )
        ) {
          handleSetCurrentPlaylist(currentPlaylist);
        } else {
          handleSetCurrentPlaylist(
            userPlaylistsFromServer.data[0].playlistName
          );
        }
      } else {
        console.log("user playlist didn't change");
      }
    } catch (e) {
      console.log(e);
    }
  }, []);

  // const playlistLabel = `${type === "add" ? "add to my " : ""} Playlist`;

  return (
    <div>
      <Box
        sx={{ width: 150, maxWidth: 300, height: "50px" }}
        className="UserPlayListselect"
      >
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">
            {/* {playlistLabel} */}
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={currentPlaylist ? currentPlaylist : ""}
            sx={{
              height: "50px",
              alignItems: "center",
              justifyContent: "center",
            }}
            // label={playlistLabel}
            onChange={(e) => {
              console.log(e.target.value, 27);
              handleSetCurrentPlaylist(e.target.value);
            }}
          >
            {userPlaylists.map((playlist) => (
              <MenuItem key={playlist._id} value={playlist.playlistName}>
                {playlist.playlistName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </div>
  );
};

export default UserPlayLists;
