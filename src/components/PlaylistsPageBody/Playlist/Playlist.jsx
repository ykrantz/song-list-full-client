import { Link } from "react-router-dom";
import "./Playlist.css";

import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import Tooltip from "@mui/material/Tooltip";

import { useContext, useState } from "react";

import { BASE_URL } from "../../../general/main_var";

import handlePlaylists from "../../../context/handlePlaylists";
import handlePlaylistMainState from "../../../context/handlePlaylistMainState";
import { IconButton } from "@mui/material";
import { useEffect } from "react";
import UserPlayLists from "../../generalComponents/UserPlayLists/UserPlayLists";
import handleMessage from "../../../context/handleMessage";
import getUserPlaylistsFromServer from "../../../controllers/getUserPlaylistsFromServer";
import VideoItem from "../../generalComponents/VideoItem/VideoItem";
import RemoveVideoButton from "../RemoveVideoButton/RemoveVideoButton";

const Playlist = ({ removeSong }) => {
  const style = {
    width: "100%",
    maxWidth: 500,
  };

  const { playlist, getPlaylistFromServer } = useContext(handlePlaylists);
  const { changeMessage } = useContext(handleMessage);
  const {
    currentPlaylist,
    setCurrentPlaylist,
    userPlaylists,
    setUserPlaylists,
    getFavoritePlaylistFromServer,
  } = useContext(handlePlaylistMainState);
  const [disableDeletePlaylist, setDisableDeletePlaylist] = useState(true);
  const RemoveVideoButtonComponent = ({ id }) => {
    return <RemoveVideoButton id={id} />;
  };

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
    <div className="PlayList-container">
      <List sx={style} component="nav" aria-label="mailbox folders">
        <div className="PlayList-container-header">
          <p className="PlayList-title">
            <b>Play list:</b>
          </p>
          <UserPlayLists />

          <Tooltip title={"delete playlist"}>
            <IconButton
              aria-label="delete"
              disabled={disableDeletePlaylist}
              onClick={() => deleteUserPlaylist(currentPlaylist)}
            >
              <DeleteSweepIcon
                className="PlayList-DeleteSweepIcon"
                fontSize="large"
                color={`${disableDeletePlaylist ? "disabled" : "primary"}`}
              />
            </IconButton>
          </Tooltip>
        </div>
        <Divider />
        <div className="PlayList-videoContainer">
          {JSON.parse(localStorage.currentUser) ? (
            playlist.map((video) => {
              return (
                <div className="PlayList-list">
                  <VideoItem
                    key={video._id}
                    video={video}
                    iconOne={<RemoveVideoButtonComponent id={video.id} />}
                    type="exist"
                    getPlaylistFromServer={getPlaylistFromServer}
                  />
                </div>
              );
            })
          ) : (
            <p>
              Please {<Link to="/login"> log in</Link>} /{" "}
              {<Link to="/register"> register</Link>}
              <br></br> to get your playlists
            </p>
          )}
        </div>
      </List>
      <Divider />

      <p> Press {<Link to="/search"> here</Link>} to add more videos</p>
    </div>
  );
};

export default Playlist;
