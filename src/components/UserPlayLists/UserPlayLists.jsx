import "./UserPlayLists.css";
// import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import React, { useContext, useEffect, useState } from "react";
import getUserPlaylistsFromServer from "../../controllers/getUserPlaylistsFromServer";
import handleSearchVideoApi from "../../context/handleSearchVideoApi";
const UserPlayLists = ({ type }) => {
  // const [age, setAge] = React.useState("");

  // const handleChange = (event) => {
  //   setAge(event.target.value);
  // };
  const { currentPlayList, setCurrentPlayList } =
    useContext(handleSearchVideoApi);
  const [userPlayLists, setUserPlayLists] = useState([]);
  console.log(15);
  useEffect(async () => {
    console.log(14);
    const userPlaylists = await getUserPlaylistsFromServer();
    console.log(userPlaylists, 16);
    setUserPlayLists(userPlaylists.data);
  }, []);
  // const updateCurrentPlaylist = (choosenPlaylist) => {
  //   setCurrentPlayList(choosenPlaylist);
  // };
  const playlistLabel = `${type === "add" ? "add to " : ""} Playlist`;

  // const { userPlayLists, currentPlayList, setCurrentPlayList } =
  //   useContext(handleMainStates);

  // console.log({ userPlayLists });

  return (
    <div>
      {/* <p>tets</p> */}
      {/* <select
        value={currentPlayList}
        onChange={(e) => updateCurrentPlaylist(e.target.value)}
      >
        {userPlayLists.map((playlist) => (
          <option key={playlist._id}>{playlist.playlistName}</option>
        ))}
      </select> */}

      <Box sx={{ maxWidth: 200 }} className="UserPlayListselect">
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">
            {/* {`${type === "add" ? "add to " : ""}`}Playlist */}
            {playlistLabel}
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            // value={age}
            value={currentPlayList}
            label={playlistLabel}
            // onChange={handleChange}
            onChange={(e) => setCurrentPlayList(e.target.value)}
          >
            {userPlayLists.map((playlist) => (
              <MenuItem key={playlist._id} value={playlist.playlistName}>
                {playlist.playlistName}
              </MenuItem>
            ))}
            {/* // <MenuItem value={20}>Twenty</MenuItem>
            // <MenuItem value={30}>Thirty</MenuItem> */}
          </Select>
        </FormControl>
      </Box>
    </div>
  );
};

export default UserPlayLists;
