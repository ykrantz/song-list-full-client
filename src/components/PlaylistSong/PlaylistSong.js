import { useContext } from "react/cjs/react.development";
import handleChangeSongToPlaylist from "../../context/handlePlaylist";
import PlaySongButton from "../PlaySongButton/PlaySongButton";
import RemoveSongButton from "../RemoveSongButton/RemoveSongButton";
import "./PlaylistSong.css";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import QuizIcon from "@mui/icons-material/Quiz";
import FavoriteFindButton from "../FavoriteFindButton/FavoriteFindButton";
import handlePlaylist from "../../context/handlePlaylist";

const PlaylistSong = ({ song, song: { _id, id, title, img }, removeSong }) => {
  // console.log(song);
  // console.log(img);
  const { updateSongResurce } = useContext(handlePlaylist);
  return (
    <div className="">
      {/* <div className="PlaylistSong-container"> */}
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

      {/* <PlaySongButton id={id} />
      <p className="PlaylistSong-song">
        title: {title}</p> */}
      {/* <img src={img} className="PlaylistSong-img"></img>
      <RemoveSongButton id={id} /> */}
    </div>
  );
};

export default PlaylistSong;
