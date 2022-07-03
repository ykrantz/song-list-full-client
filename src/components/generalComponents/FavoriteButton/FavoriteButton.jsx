import "./FavoriteButton.css";
import React, { useContext, useEffect, useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Tooltip from "@mui/material/Tooltip";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useNavigate } from "react-router";
import handlePlaylistMainState from "../../../context/handlePlaylistMainState";
import deleteVideoFromPlaylist from "../../../controllers/deleteVideoFromPlaylist";
import handleMessage from "../../../context/handleMessage";
import handleUser from "../../../context/handleUser";
import { BASE_URL } from "../../../general/main_var";
import formolizeVideoToServer from "../../../controllers/formolizeVideoToServer";
import getPlaylistVideoFromServer from "../../../controllers/getPlaylistVideo";

const FavoriteButton = ({
  id,
  type,
  searchVideoApiResults,
  getPlaylistFromServer,
}) => {
  const {
    getFavoritePlaylistFromServer,
    favoritePlaylist,
    setCurrentPlaylist,
    currentPlaylist,
  } = useContext(handlePlaylistMainState);
  const { currentUser } = React.useContext(handleUser);

  const { changeMessage } = useContext(handleMessage);

  const checkIfVideoIsFavorite = (id) => {
    // console.log(30, { favoritePlaylist });

    if (favoritePlaylist.find((favorite) => favorite?.id === id)) {
      return true;
    } else {
      return false;
    }
  };
  // console.log({ type }, 29);
  // const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(checkIfVideoIsFavorite(id));

  // const isFavorite = checkIfVideoIsFavorite(id);
  useEffect(() => {
    setIsFavorite(checkIfVideoIsFavorite(id));
  }, [favoritePlaylist]);

  const getVideoApiDitails = (videoId) => {
    return searchVideoApiResults.find((video) => video?.id === videoId);
  };
  // TODO: fix
  const addVideoToPlaylistInServer = async (videoId, playlistName, type) => {
    try {
      if (!playlistName) {
        changeMessage(
          "Please choose/create playlist before adding a video",
          "warning"
        );
        return;
      }

      let videoDitails = {};
      if (type === "new") {
        const videoFullDitails = getVideoApiDitails(videoId);
        const formolizeVideoFullDitails =
          formolizeVideoToServer(videoFullDitails);
        videoDitails = formolizeVideoFullDitails;
        console.log("add vidoe from serach results");
      } else {
        videoDitails = { id: videoId };
        console.log("add vidoe from existing playlist");
      }

      const accessToken = JSON.parse(localStorage.accessToken);
      const ans = await fetch(`${BASE_URL}/playlist`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${accessToken}`,
        },
        body: JSON.stringify({
          playlistName: playlistName,
          song: videoDitails,
        }),
      });

      const data = await ans.json();
      // console.log(data);

      if (ans.status === 200) {
        console.log("video was updated in server");
        if (type === "new") {
          // set the current playlist aonly when in serch page
          setCurrentPlaylist(playlistName);
        }
        changeMessage(`Added to playlist:  
        ${playlistName.substring(0, 25)}`);
      } else {
        // console.log(data);

        changeMessage(data?.message, "warning");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleAddToFavorite = async (id, type) => {
    await addVideoToPlaylistInServer(id, "My Favorites", type);
    getFavoritePlaylistFromServer();
  };

  const handleDeleteFromFavorites = async (videoId) => {
    const ans = await deleteVideoFromPlaylist(videoId, "My Favorites");
    changeMessage(ans.message, "info");

    await getFavoritePlaylistFromServer();

    if (currentPlaylist === "My Favorites" && type !== "new") {
      //when in playlist page , need to get update playlist when delete from favorites
      // const updatedFavoritePlaylist = await getPlaylistVideoFromServer(
      //   currentPlaylist
      // );
      // TODO: set it so wont need to use .

      getPlaylistFromServer();
    }
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
                ? handleAddToFavorite(id, type)
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
