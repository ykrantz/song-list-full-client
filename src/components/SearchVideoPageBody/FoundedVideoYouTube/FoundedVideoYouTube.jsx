import { useContext } from "react";
import "./FoundedVideoYouTube.css";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import FavoriteButton from "../../generalComponents/FavoriteButton/FavoriteButton";
import Tooltip from "@mui/material/Tooltip";

import { BASE_URL } from "../../../general/main_var";
import { TITLE_LENGTH } from "../../../general/main_var";
import handleSearchVideoApi from "../../../context/handleSearchVideoApi";
import PlayVideoButton from "../../generalComponents/PlayVideoButton/PlayVideoButton";
import handleUser from "../../../context/handleUser";
import handlePlaylistMainState from "../../../context/handlePlaylistMainState";
import handleMessage from "../../../context/handleMessage";

const FoundedVideoYouTube = ({ video: { id, title, thumbnails } }) => {
  // const { updateVideoResurce, getPlaylistFromServer } =
  //   useContext(handlePlaylist);
  // const { currentPlayList, newPlayList, searchVideoApiResults } =
  //   useContext(handleMainStates);

  // TODO: to set data in local storge for currentPlayList
  // const currentPlayList = JSON.parse(localStorage?.currentPlayList)
  //   ? JSON.parse(localStorage?.currentPlayList)
  //   : "";
  // TODO: define currentPlayList
  // const currentPlayList = "";
  console.log(id, 51);
  const { searchVideoApiResults, updateVideoResurce } =
    useContext(handleSearchVideoApi);
  const { favoritePlaylist } = useContext(handlePlaylistMainState);
  const { changeMessage } = useContext(handleMessage);

  const { currentPlaylist } = useContext(handlePlaylistMainState);
  const { currentUser } = useContext(handleUser);

  // const checkIfVideoIsFavorite = (id) => {
  //   // console.log(id);
  //   if (favoritePlaylist.find((favorite) => favorite.id === id)) {
  //     // console.log("in fav");
  //     return true;
  //   } else {
  //     // console.log("no fav");
  //     return false;
  //   }
  // };
  // const isFavorite = checkIfVideoIsFavorite(id);

  const formolizeVideoToServer = (videoApiDitails) => {
    // console.log(41, videoApiDitails);
    console.log(
      videoApiDitails,
      // JSON.parse(localStorage.currentUser),
      // currentUser,
      19
    );
    return {
      title: videoApiDitails.title,
      artist: videoApiDitails?.author.name,
      src: videoApiDitails.url,
      user: JSON.parse(localStorage.currentUser),
      // user: currentUser,
      provider: "youTube",
      img: videoApiDitails.thumbnails[0].url,
      id: videoApiDitails.id,
    };
  };

  const getVideoApiDitails = (videoId) => {
    return searchVideoApiResults.find((video) => video.id === videoId);
  };

  const addVideoToPlaylistServer = async (videoId, playlistName) => {
    try {
      console.log(playlistName, videoId, 17);
      if (!playlistName) {
        changeMessage(
          "Please choose/create playlist before adding a video",
          "warning"
        );
        return;
      }
      const videoDitails = getVideoApiDitails(videoId);
      // TODO: think if need to check if song already exist in playlist in client side;
      console.log(formolizeVideoToServer(videoDitails), 18);
      // if (!newPlayList.find((video) => video.id === videoId)) {
      const accessToken = JSON.parse(localStorage.accessToken);
      const ans = await fetch(`${BASE_URL}/playlist`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${accessToken}`,
        },
        // TODO: to chack why cilnnt add song to servert
        body: JSON.stringify({
          playlistName: playlistName,
          song: formolizeVideoToServer(videoDitails),
        }),
      });
      console.log(
        JSON.stringify({
          playlistName: playlistName,
          video: formolizeVideoToServer(videoDitails),
        }),
        20
      );
      const data = await ans.json();
      console.log(data);

      if (ans.status === 200) {
        console.log("video was updated in server");
        changeMessage(`video added succsesfully 
        (${videoDitails.title.substring(0, 25)} )`);
        // getPlaylistFromServer();
      } else {
        console.log(data);

        changeMessage(data?.message, "warning");
      }
      // }
      //  else {
      //   changeMessage(
      //     `The video already exist in playlist
      //     (${videoDitails.title.substring(0, 25)})`,
      //     true
      //   );
      // }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="FoundedVideoYouTube-container">
      <ListItem
        button
        //  style={{ paddingLeft: "8px" }}
      >
        <PlayVideoButton
          id={id}
          // TODO: to set use callBack for updateVideoResurce
          updateVideoResurce={updateVideoResurce}
          className="FoundedVideoYouTube-button"
        />
        <div className="FoundedVideoYouTube-text">
          <ListItemText
            // primaryTypographyProps={{ fontSize: "10px" }}
            primary={`${title.substring(0, TITLE_LENGTH)}`}
            onClick={() => updateVideoResurce(id)}
            style={{
              fontSize: "0.5px",
            }}
          />
        </div>
        <FavoriteButton
          id={id}
          // isFavorite={isFavorite}
          addVideoToPlaylistServer={addVideoToPlaylistServer}
        />
        <img
          src={thumbnails[0].url}
          alt="video_image"
          className="FoundedVideoYouTube-img"
          onClick={() => updateVideoResurce(id)}
        ></img>
        {localStorage.currentUser && (
          <Tooltip title={"add video to playlist"}>
            <AddCircleIcon
              fontSize="large"
              onClick={() => {
                addVideoToPlaylistServer(id, currentPlaylist);
              }}
            />
          </Tooltip>
        )}
      </ListItem>
      <Divider />
    </div>
  );
};

export default FoundedVideoYouTube;
