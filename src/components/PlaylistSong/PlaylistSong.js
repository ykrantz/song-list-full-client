import { useContext } from "react";
import PlaySongButton from "../PlaySongButton/PlaySongButton";
import RemoveSongButton from "../RemoveSongButton/RemoveSongButton";
import "./PlaylistSong.css";

import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import FavoriteFindButton from "../FavoriteFindButton/FavoriteFindButton";
import handlePlaylist from "../../context/handlePlaylist";

const PlaylistSong = ({ song: { _id, id, title, img } }) => {
  // console.log(song);
  // console.log(img);
  const { updateSongResurce } = useContext(handlePlaylist);
  return (
    <div className="PlaylistSong-container">
      <ListItem button>
        <PlaySongButton id={id} />
        <ListItemText
          onClick={() => updateSongResurce(id)}
          primary={`${title}`}
        />
        <FavoriteFindButton songId={id} />
        <img
          src={img}
          className="PlaylistSong-img"
          onClick={() => updateSongResurce(id)}
        ></img>
        <RemoveSongButton _id={_id} />
      </ListItem>
      <Divider />
    </div>
  );
};

export default PlaylistSong;
