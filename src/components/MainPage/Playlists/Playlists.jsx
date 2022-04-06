import "./Playlists.css";
// import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import React, { useContext } from "react";
import handleMainStates from "../../../context/handleMainStates";
const Playlists = () => {
  // const [age, setAge] = React.useState("");

  // const handleChange = (event) => {
  //   setAge(event.target.value);
  // };

  const updateCurrentPlaylist = (choosenPlaylist) => {
    setCurrentPlayList(choosenPlaylist);
  };
  const { userPlayLists, currentPlayList, setCurrentPlayList } =
    useContext(handleMainStates);

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

      <Box sx={{ maxWidth: 200 }} className="Playlists-select">
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Playlist</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            // value={age}
            value={currentPlayList}
            label="Playlist"
            // onChange={handleChange}
            onChange={(e) => updateCurrentPlaylist(e.target.value)}
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

export default Playlists;
