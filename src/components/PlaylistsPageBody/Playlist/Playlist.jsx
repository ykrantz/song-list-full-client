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
import handleUser from "../../../context/handleUser";
import { useCallback } from "react";
import ChoosePlaylist from "../ChoosePlaylist/ChoosePlaylist";

const Playlist = () => {
  const style = {
    width: "100%",
    maxWidth: 500,
  };

  const { playlist, getPlaylistFromServer } = useContext(handlePlaylists);
  const { getFavoritePlaylistFromServer } = useContext(handlePlaylistMainState);
  const { currentUser } = useContext(handleUser);
  const [isVideosInPlaylist, setIsVideosInPlaylist] = useState(
    playlist.length !== 0
  );
  const getPlaylistFromServerFunc = useCallback(
    () => getPlaylistFromServer,
    []
  );

  const RemoveVideoButtonComponent = useCallback(({ id }) => {
    return <RemoveVideoButton id={id} />;
  }, []);

  useEffect(() => {
    getFavoritePlaylistFromServer();
  }, []);

  useEffect(async () => {
    await getFavoritePlaylistFromServer();
    console.log(playlist.length !== 0, 42, "playlist.length !== 0");
    setIsVideosInPlaylist(playlist.length !== 0);
    console.log(isVideosInPlaylist, 43, "isVideosInPlaylist");
  }, [playlist]);
  console.log(isVideosInPlaylist, 45, "isVideosInPlaylist");
  return (
    <div className="PlayList-container">
      <List sx={style} component="nav" aria-label="mailbox folders">
        <ChoosePlaylist />
        <Divider />
        <div className="PlayList-videoContainer">
          {currentUser ? (
            isVideosInPlaylist ? (
              playlist.map((video) => {
                return (
                  <div className="PlayList-list">
                    <VideoItem
                      key={video._id}
                      video={video}
                      iconOne={<RemoveVideoButtonComponent id={video.id} />}
                      type="exist"
                      getPlaylistFromServer={getPlaylistFromServerFunc}
                    />
                  </div>
                );
              })
            ) : (
              <div>
                <p>No videos in playlist.</p>
                <p>Want to add? Press {<Link to="/search"> here</Link>}</p>
              </div>
            )
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
      <span className="Playlist-link">
        Press {<Link to="/search"> here</Link>} to add more videos
      </span>
    </div>
  );
};

export default Playlist;
