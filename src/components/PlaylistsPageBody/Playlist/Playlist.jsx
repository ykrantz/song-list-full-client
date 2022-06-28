import { Link } from "react-router-dom";
import PlaylistSong from "../../MainPage/Body/PlaylistSong/PlaylistSong";
import "./Playlist.css";

import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import Tooltip from "@mui/material/Tooltip";

import { useContext, useState } from "react";
// import handlePlaylist from "../../context/handlePlaylist";
// import Playlists from "../MainPage/Body/Playlists/Playlists";
import { BASE_URL } from "../../../general/main_var";
// import handleMainStates from "../../context/handleMainStates";
// import handleChangeMesage from "../../context/handleChangeMesage";
import handlePlaylists from "../../../context/handlePlaylists";
import PlaylistVideo from "../PlaylistVideo/PlaylistVideo";
import handlePlaylistMainState from "../../../context/handlePlaylistMainState";
import { IconButton } from "@mui/material";
import { useEffect } from "react";
import UserPlayLists from "../../generalComponents/UserPlayLists/UserPlayLists";
// import handleMainStates from "../../../context/handleMainStates";
import handleMessage from "../../../context/handleMessage";
import getUserPlaylistsFromServer from "../../../controllers/getUserPlaylistsFromServer";

const Playlist = ({ removeSong }) => {
  const style = {
    width: "100%",
    maxWidth: 500,
    bgcolor: "cornsilk",
  };

  // const { getPlaylistsUserFromServer } = useContext(handlePlaylist);
  // const { changeMessage } = useContext(handleChangeMesage);

  const {
    playlist,

    getPlaylistsUserFromServer,
  } = useContext(handlePlaylists);
  const { changeMessage } = useContext(handleMessage);
  const {
    currentPlaylist,
    setCurrentPlaylist,
    userPlaylists,
    setUserPlaylists,
    getFavoritePlaylistFromServer,
  } = useContext(handlePlaylistMainState);
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
    // indicateFavoriteInSearchVideoResults();
  }, []);
  useEffect(() => {
    getFavoritePlaylistFromServer();
    // indicateFavoriteInSearchVideoResults();
  }, [playlist]);

  console.log({ userPlaylists }, { disableDeletePlaylist }, 31);

  const deleteUserPlaylist = async (playlistName) => {
    try {
      console.log("DDD");
      const accessToken = JSON.parse(localStorage.accessToken);
      const user = JSON.parse(localStorage.currentUser);
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
      console.log(data);
      if (ans.status === 200) {
        // setCurrentPlaylist("");
        // await getPlaylistsUserFromServer();
        // TODO:

        const userPlaylistsFromServer = await getUserPlaylistsFromServer();
        console.log(userPlaylistsFromServer, 16);
        setUserPlaylists(userPlaylistsFromServer.data);
        if (userPlaylistsFromServer?.data.length > 0) {
          setCurrentPlaylist(userPlaylistsFromServer.data[0].playlistName);
        } else {
          console.log("user playlist didn't change");
        }
        console.log({ currentPlaylist }, 33);
        console.log(
          "the play list was deleted from server. playlist was update"
        );
        changeMessage("play list  wad deleted", "info");
      }
    } catch (e) {
      console.log(e);
    }
  };
  console.log({ playlist }, 23);
  return (
    <div className="PlayList-container">
      <List sx={style} component="nav" aria-label="mailbox folders">
        <div className="PlayList-container-header">
          <p className="PlayList-title">Play list: </p>
          {/* <Playlists /> */}
          <UserPlayLists />
          {/* <p className="PlayList-currentPlaylistName">{currentPlaylist}</p> */}
          {/* {{ currentPlaylist } && <span>asda</span> && ( */}
          <Tooltip title={"delete playlist"}>
            <IconButton
              aria-label="delete"
              disabled={disableDeletePlaylist}
              onClick={() => deleteUserPlaylist(currentPlaylist)}
            >
              <DeleteSweepIcon
                className="PlayList-DeleteSweepIcon"
                fontSize="large"
                // color="disabled"
                color={`${disableDeletePlaylist ? "disabled" : "primary"}`}
              />
            </IconButton>
          </Tooltip>
          {/* )} */}
        </div>
        <Divider />
        <div className="PlayList-videoContainer">
          {playlist.map((song) => {
            return (
              <div className="PlayList-list">
                <PlaylistVideo
                  key={song._id}
                  song={song}
                  removeSong={removeSong}
                />
              </div>
            );
          })}
          <Divider />
          Press {<Link to="/search"> here</Link>} to add more videos
        </div>
      </List>
    </div>
  );
};

export default Playlist;
