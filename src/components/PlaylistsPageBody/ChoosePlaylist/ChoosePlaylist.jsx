import "./ChoosePlaylist.css";

import React, { useContext, useEffect, useState } from "react";
import UserPlayLists from "../../generalComponents/UserPlayLists/UserPlayLists";
import { IconButton, Tooltip } from "@mui/material";
import handleMessage from "../../../context/handleMessage";
import handlePlaylists from "../../../context/handlePlaylists";
import handleUser from "../../../context/handleUser";
import handlePlaylistMainState from "../../../context/handlePlaylistMainState";
import RemoveVideoButton from "../RemoveVideoButton/RemoveVideoButton";
import { BASE_URL } from "../../../utils/main_var";
import getUserPlaylistsFromServer from "../../../actions/getData/getUserPlaylistsFromServer";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";

const ChoosePlaylist = () => {
  const { playlist, getPlaylistFromServer } = useContext(handlePlaylists);
  const { changeMessage } = useContext(handleMessage);
  const {
    currentPlaylist,
    setCurrentPlaylist,
    userPlaylists,
    setUserPlaylists,
    getFavoritePlaylistFromServer,
  } = useContext(handlePlaylistMainState);
  const { currentUser } = useContext(handleUser);

  const [disableDeletePlaylist, setDisableDeletePlaylist] = useState(true);

  useEffect(() => {
    setDisableDeletePlaylist(
      userPlaylists.length <= 1 || currentPlaylist === "My Favorites"
        ? true
        : false
    );
  }, []);
  useEffect(() => {
    setDisableDeletePlaylist(
      userPlaylists.length <= 1 || currentPlaylist === "My Favorites"
        ? true
        : false
    );
  }, [currentPlaylist]);

  useEffect(() => {
    getFavoritePlaylistFromServer();
  }, []);
  useEffect(() => {
    getFavoritePlaylistFromServer();
  }, [playlist]);

  const deleteUserPlaylist = async (playlistName) => {
    try {
      const accessToken = JSON.parse(localStorage?.accessToken);
      // const user = currentUser;
      const ans = await fetch(
        `${BASE_URL}/playlist/deleteplaylist/${playlistName}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            authorization: `bearer ${accessToken}`,
          },
        }
      );
      const data = await ans.json();
      // console.log(data);
      if (ans.status === 200) {
        const userPlaylistsFromServer = await getUserPlaylistsFromServer();
        setUserPlaylists(userPlaylistsFromServer.data);
        if (userPlaylistsFromServer?.data.length > 0) {
          setCurrentPlaylist(userPlaylistsFromServer.data[0].playlistName);
        } else {
          console.log("user playlist didn't change");
        }
        console.log(
          "the play list was deleted from server. playlist was update"
        );
        changeMessage("play list  wad deleted", "info");
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div>
      <div className="ChoosePlaylist-container-header">
        <div className="ChoosePlaylist-title">
          <sapn>
            <b>Play list:</b>
          </sapn>
        </div>
        <UserPlayLists />

        <Tooltip title={"delete playlist"}>
          <span>
            <IconButton
              aria-label="delete"
              disabled={disableDeletePlaylist}
              onClick={() => deleteUserPlaylist(currentPlaylist)}
              sx={{ marginLeft: 1 }}
            >
              <DeleteSweepIcon
                className="ChoosePlaylist-DeleteSweepIcon"
                fontSize="large"
                color={`${disableDeletePlaylist ? "disabled" : "primary"}`}
              />
            </IconButton>
          </span>
        </Tooltip>
      </div>
    </div>
  );
};

export default ChoosePlaylist;
