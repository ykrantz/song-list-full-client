import { useContext } from "react";
import "./FoundedVideoYouTube.css";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import FavoriteFindButton from "../MainPage/Body/FavoriteFindButton/FavoriteFindButton";
import Tooltip from "@mui/material/Tooltip";

import { BASE_URL } from "../../general/main_var";
import { TITLE_LENGTH } from "../../general/main_var";
import handleSearchVideoApi from "../../context/handleSearchVideoApi";
import PlayVideoButton from "../PlayVideoButton/PlayVideoButton";
import handleUser from "../../context/handleUser";

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
  const {
    changeMessage,
    searchVideoApiResults,
    updateVideoResurce,
    currentPlayList,
  } = useContext(handleSearchVideoApi);
  const { currentUser } = useContext(handleUser);

  const formolizeVideoToServer = (videoApiDitails) => {
    console.log(
      videoApiDitails,
      JSON.parse(localStorage.currentUser),
      currentUser,
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

  const addVideoToPlaylistServer = async (videoId) => {
    console.log(currentPlayList, 17);
    if (!currentPlayList) {
      changeMessage(
        "Please choose/create playlist before adding a video",
        true
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
        playlistName: currentPlayList,
        song: formolizeVideoToServer(videoDitails),
      }),
    });
    console.log(
      JSON.stringify({
        playlistName: currentPlayList,
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
      changeMessage(ans.messege, true);
    }
    // }
    //  else {
    //   changeMessage(
    //     `The video already exist in playlist
    //     (${videoDitails.title.substring(0, 25)})`,
    //     true
    //   );
    // }
  };

  return (
    <div className="FoundedVideoYouTube-container">
      <ListItem button>
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
          />
        </div>
        <FavoriteFindButton videoId={id} />
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
                addVideoToPlaylistServer(id);
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
