import "./UserPlayLists.css";
// import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import React, { useContext, useEffect, useState } from "react";
import getUserPlaylistsFromServer from "../../../controllers/getUserPlaylistsFromServer";
// import handleSearchVideoApi from "../../../context/handleSearchVideoApi";
import handlePlaylistMainState from "../../../context/handlePlaylistMainState";
const UserPlayLists = ({ type }) => {
  // const [age, setAge] = React.useState("");

  // const handleChange = (event) y=> {
  //   setAge(event.target.value);
  // };
  const {
    currentPlaylist,
    setCurrentPlaylist,
    userPlaylists,
    setUserPlaylists,
  } = useContext(handlePlaylistMainState);

  console.log(15);
  useEffect(async () => {
    try {
      console.log(14);
      const userPlaylistsFromServer = await getUserPlaylistsFromServer();
      console.log(userPlaylistsFromServer, 16);
      setUserPlaylists(userPlaylistsFromServer.data);
      // Make sure that there is at leat one playlist. and that there is no current play list determineded.
      // if ther is current play list ,we don't want to change it
      // TODO: fix when get from search page , need to peek the same playlist
      if (
        userPlaylistsFromServer?.data.length > 0
        //  &&        !(
        //   userPlaylists.find((val) => val.playlistName === currentPlaylist) ==
        //   -1
        // )
      ) {
        if (
          userPlaylistsFromServer.data.find(
            (value) => value.playlistName === currentPlaylist
          )
        ) {
          setCurrentPlaylist(currentPlaylist);
        } else {
          setCurrentPlaylist(userPlaylistsFromServer.data[0].playlistName);
        }
      } else {
        console.log("user playlist didn't change");
      }
      // setCurrentPlaylist(userPlaylistsFromServer.data[0]?.playlistName);
    } catch (e) {
      console.log(e);
    }
  }, []);
  // const updateCurrentPlaylist = (choosenPlaylist) => {
  //   setCurrentPlayList(choosenPlaylist);
  // };
  const playlistLabel = `${type === "add" ? "add to my " : ""} Playlist`;

  // const { userPlayLists, currentPlayList, setCurrentPlayList } =
  //   useContext(handleMainStates);

  console.log({ currentPlaylist }, 28);

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
            value={currentPlaylist}
            label={playlistLabel}
            // onChange={handleChange}
            onChange={(e) => {
              console.log(e.target.value, 27);
              setCurrentPlaylist(e.target.value);
            }}
          >
            {userPlaylists.map((playlist) => (
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
