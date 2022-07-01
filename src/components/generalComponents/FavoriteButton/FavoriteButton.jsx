import "./FavoriteButton.css";
import React, { useContext } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Tooltip from "@mui/material/Tooltip";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useNavigate } from "react-router";
import handlePlaylistMainState from "../../../context/handlePlaylistMainState";
import deleteVideoFromPlaylist from "../../../controllers/deleteVideoFromPlaylist";
import handleMessage from "../../../context/handleMessage";
import handleUser from "../../../context/handleUser";

const FavoriteButton = ({ id, addVideoToPlaylistServer }) => {
  const { getFavoritePlaylistFromServer, favoritePlaylist } = useContext(
    handlePlaylistMainState
  );
  const { currentUser } = React.useContext(handleUser);

  const { changeMessage } = useContext(handleMessage);

  const navigate = useNavigate();

  const checkIfVideoIsFavorite = (id) => {
    if (favoritePlaylist.find((favorite) => favorite.id === id)) {
      return true;
    } else {
      return false;
    }
  };
  const isFavorite = checkIfVideoIsFavorite(id);

  const handleAddToFavorite = async (id) => {
    await addVideoToPlaylistServer(id, "My Favorites");
    getFavoritePlaylistFromServer();
  };

  const handleDeleteFromFavorites = async (videoId) => {
    const ans = await deleteVideoFromPlaylist(videoId, "My Favorites");
    changeMessage(ans.message, "info");

    getFavoritePlaylistFromServer();
  };
  return (
    <div>
      <Tooltip title={"add to My Favorites"}>
        {isFavorite ? (
          <FavoriteIcon
            onClick={() => {
              handleDeleteFromFavorites(id);
            }}
          />
        ) : (
          <FavoriteBorderIcon
            onClick={() => {
              currentUser
                ? handleAddToFavorite(id)
                : changeMessage(
                    `Please log in to add video to playlist`,
                    "error"
                  );
            }}
          />
        )}
      </Tooltip>
    </div>
  );
};

export default FavoriteButton;
