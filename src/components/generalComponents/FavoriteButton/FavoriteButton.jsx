import "./FavoriteButton.css";
import React, { useContext } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Tooltip from "@mui/material/Tooltip";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useNavigate } from "react-router";
import handlePlaylistMainState from "../../../context/handlePlaylistMainState";
import deleteVideoFromPlaylist from "../../../controllers/deleteVideoFromPlaylist";
import handleMessage from "../../../context/handleMessage";

const FavoriteButton = ({ id, addVideoToPlaylistServer }) => {
  const { getFavoritePlaylistFromServer, favoritePlaylist } = useContext(
    handlePlaylistMainState
  );
  const { changeMessage } = useContext(handleMessage);

  const navigate = useNavigate();
  // console.log({ videoId }, isFavorite, 39);

  const checkIfVideoIsFavorite = (id) => {
    // console.log(id);
    if (favoritePlaylist.find((favorite) => favorite.id === id)) {
      // console.log("in fav");
      return true;
    } else {
      // console.log("no fav");
      return false;
    }
  };
  const isFavorite = checkIfVideoIsFavorite(id);

  const handleAddToFavorite = async (id) => {
    await addVideoToPlaylistServer(id, "My Favorites");
    getFavoritePlaylistFromServer();
  };

  const handleDeleteFromFavorites = async (videoId) => {
    console.log(videoId, 50);
    const ans = await deleteVideoFromPlaylist(videoId, "My Favorites");
    console.log(ans, 42);
    changeMessage(ans.message);

    getFavoritePlaylistFromServer();
  };
  return (
    <div>
      <Tooltip title={"see who liked this song"}>
        {isFavorite ? (
          <FavoriteIcon
            onClick={() => {
              console.log("dellet", 41);
              handleDeleteFromFavorites(id);
            }}
          />
        ) : (
          <FavoriteBorderIcon
            onClick={() => {
              console.log("add", 40);
              handleAddToFavorite(id);
            }}
          />
        )}
      </Tooltip>
    </div>
  );
};

export default FavoriteButton;
