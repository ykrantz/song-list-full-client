import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import "./FoundedVideosYouTube.css";
import FoundedVideoYouTube from "../FoundedVideoYouTube/FoundedVideoYouTube";
import handlePlaylistMainState from "../../../context/handlePlaylistMainState";
import { useContext, useEffect } from "react";
import getPlaylistVideoFromServer from "../../../controllers/getPlaylistVideo";

const FoundedVideosYouTube = ({ searchVideoResults }) => {
  const {
    favoritePlaylist,
    setFavoritePlaylist,
    getFavoritePlaylistFromServer,
  } = useContext(handlePlaylistMainState);

  useEffect(() => {
    getFavoritePlaylistFromServer();
  }, []);
  useEffect(() => {
    getFavoritePlaylistFromServer();
  }, [searchVideoResults]);

  const style = {
    width: "100%",
    fontSize: "2vh",
    maxWidth: 600,
    bgcolor: " rgb(122, 240, 122)",
  };
  return (
    <div className="FoundedVideosYouTube-container">
      <List sx={style} component="nav" aria-label="mailbox folders">
        <h3>Videos from YouTube:</h3>
        <Divider />
        <div className="FoundedVideosYouTube-searchVideoResults">
          {searchVideoResults.map((video) => (
            <FoundedVideoYouTube key={video.id} video={video} />
          ))}
        </div>
      </List>
    </div>
  );
};

export default FoundedVideosYouTube;
