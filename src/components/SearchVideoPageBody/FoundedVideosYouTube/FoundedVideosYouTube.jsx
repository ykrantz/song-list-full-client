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
    // indicateFavoriteInSearchVideoResults();
  }, []);

  // const indicateFavoriteInSearchVideoResults = () => {
  //   const updatedSearchVideoResults = searchVideoResults.map((video) => {
  //     const { newVideoDetails } = { ...video };
  //     if (favoritePlaylist.find((favorite) => favorite.id === video.id)) {
  //       newVideoDetails.favorite = true;
  //     } else {
  //       newVideoDetails.favorite = false;
  //     }
  //     return newVideoDetails;
  //   });
  //   console.log(updatedSearchVideoResults, 38);
  // };

  // getFavoritePlaylistFromServer();
  // TODO: add a ideititiy to favoriteas
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
