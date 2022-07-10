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
import { CircularProgress, IconButton, Typography } from "@mui/material";
import { useEffect } from "react";
import VideoItem from "../../generalComponents/VideoItem/VideoItem";
import RemoveVideoButton from "../RemoveVideoButton/RemoveVideoButton";
import handleUser from "../../../context/handleUser";
import { useCallback } from "react";
import ChoosePlaylist from "../ChoosePlaylist/ChoosePlaylist";
import handleSearchResults from "../../../context/handleSearchResults";
import LogInRegisterLink from "./LogInRegisterLink";
import NoVideoComponent from "./NoVideoComponent";
import WaitingForServerAnsCircle from "../../generalComponents/WaitingForServerAnsCircle/WaitingForServerAnsCircle";

const Playlist = ({ waitingForServerAns }) => {
  const { playlist, getPlaylistFromServer } = useContext(handlePlaylists);
  const { getFavoritePlaylistFromServer } = useContext(handlePlaylistMainState);
  const { currentUser } = useContext(handleUser);
  const { searchPlaylistResults } = useContext(handleSearchResults);
  const [isVideosInPlaylist, setIsVideosInPlaylist] = useState(true);

  useEffect(async () => {
    await getFavoritePlaylistFromServer();
  }, []);

  useEffect(async () => {
    await getFavoritePlaylistFromServer();
    setIsVideosInPlaylist(playlist.length !== 0);
  }, [playlist]);

  const RemoveVideoButtonComponent = useCallback(({ id }) => {
    return <RemoveVideoButton id={id} />;
  }, []);

  const style = {
    width: "100%",
    maxWidth: 500,
  };
  // TODO: fix bug of twice rendering in first time that get into page or refresh
  return (
    <div className="PlayList-container">
      <List sx={style} component="nav" aria-label="mailbox folders">
        <ChoosePlaylist />
        <Divider />
        <div className="PlayList-videoContainer">
          {waitingForServerAns ? (
            <WaitingForServerAnsCircle />
          ) : currentUser ? (
            isVideosInPlaylist ? (
              searchPlaylistResults.map((video) => {
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
              <NoVideoComponent />

              // <div>
              //   <p>No videos in playlist.</p>
              //   <p>Want to add? Press {<Link to="/search"> here</Link>}</p>
              // </div>
            )
          ) : (
            <LogInRegisterLink />
          )}
        </div>
      </List>
      <Divider />
      <span className="Playlist-link">
        Press {<Link to="/search"> here</Link>} to add more videos
      </span>
    </div>
  );
};

export default Playlist;
