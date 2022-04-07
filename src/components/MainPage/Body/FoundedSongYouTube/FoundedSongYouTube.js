import { useContext } from "react";
import "./FoundedSongYouTube.css";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import PlaySongButton from "../PlaySongButton/PlaySongButton";
import FavoriteFindButton from "../FavoriteFindButton/FavoriteFindButton";
import Tooltip from "@mui/material/Tooltip";

import handlePlaylist from "../../../../context/handlePlaylist";
import handleChangeMesage from "../../../../context/handleChangeMesage";
import handleMainStates from "../../../../context/handleMainStates";
import { BASE_URL } from "../../../../general/main_var";
import { TITLE_LENGTH } from "../../../../general/main_var";
const FoundedSongYouTube = ({ song: { id, title, thumbnails } }) => {
  const { updateSongResurce, getPlaylistFromServer } =
    useContext(handlePlaylist);
  const { changeMessage } = useContext(handleChangeMesage);
  const { currentPlayList, newPlayList, searchSongApiResults } =
    useContext(handleMainStates);

  const formolizeSongToServer = (songApiDitails) => {
    console.log(songApiDitails);
    return {
      title: songApiDitails.title,
      artist: songApiDitails?.author.name,
      src: songApiDitails.url,
      user: JSON.parse(localStorage.currentUser),
      provider: "youTube",
      img: songApiDitails.thumbnails[0].url,
      id: songApiDitails.id,
    };
  };

  const getSongApiDitails = (songId) => {
    return searchSongApiResults.find((song) => song.id === songId);
  };

  const addSongToPlaylistServer = async (songId) => {
    if (!currentPlayList) {
      changeMessage(
        "Please choose/create playlist before adding a video",
        true
      );
      return;
    }
    const songDitails = getSongApiDitails(songId);

    if (!newPlayList.find((song) => song.id === songId)) {
      const accessToken = JSON.parse(localStorage.accessToken);
      const ans = await fetch(`${BASE_URL}/playlist`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${accessToken}`,
        },
        body: JSON.stringify({
          playlistName: currentPlayList,
          song: formolizeSongToServer(songDitails),
        }),
      });
      const data = await ans.json();
      console.log(data);

      if (ans.status === 200) {
        console.log("video was updated in server");
        changeMessage(`video added succsesfully 
        (${songDitails.title.substring(0, 25)} )`);
        getPlaylistFromServer();
      } else {
        changeMessage(ans.messege, true);
      }
    } else {
      changeMessage(
        `The video already exist in playlist
        (${songDitails.title.substring(0, 25)})`,
        true
      );
    }
  };

  return (
    <div className="FoundedSongYouTube-container">
      <ListItem button>
        <PlaySongButton id={id} className="FoundedSongYouTube-button" />
        <ListItemText
          primary={`${title.substring(0, TITLE_LENGTH)}`}
          onClick={() => updateSongResurce(id)}
        />
        <FavoriteFindButton songId={id} />
        <img
          src={thumbnails[0].url}
          className="FoundedSongYouTube-img"
          onClick={() => updateSongResurce(id)}
        ></img>
        {localStorage.currentUser && (
          <Tooltip title={"add song to playlist"}>
            <AddCircleIcon
              fontSize="large"
              onClick={() => {
                addSongToPlaylistServer(id);
              }}
            />
          </Tooltip>
        )}
      </ListItem>
      <Divider />
    </div>
  );
};

export default FoundedSongYouTube;
