import { useContext } from "react";
import "./FoundedSongYouTube.css";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import PlaySongButton from "../PlaySongButton/PlaySongButton";
import FavoriteFindButton from "../FavoriteFindButton/FavoriteFindButton";
import Tooltip from "@mui/material/Tooltip";

import handlePlaylist from "../../../context/handlePlaylist";
const FoundedSongYouTube = ({ song: { id, title, thumbnails } }) => {
  const { addSongToPlaylistServer, updateSongResurce } =
    useContext(handlePlaylist);

  return (
    <div className="FoundedSongYouTube-container">
      <ListItem button>
        <PlaySongButton id={id} className="FoundedSongYouTube-button" />
        <ListItemText
          primary={`${title}`}
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
