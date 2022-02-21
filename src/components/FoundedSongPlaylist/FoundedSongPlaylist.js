import PlaySongButton from "../PlaySongButton/PlaySongButton";
import { useContext } from "react";

import RemoveSongButton from "../RemoveSongButton/RemoveSongButton";
import "./FoundedSongPlaylist.css";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import handlePlaylist from "../../context/handlePlaylist";

const FoundedSongPlaylist = ({ song: { id, title, img } }) => {
  const { updateSongResurce } = useContext(handlePlaylist);
  return (
    <div className="FoundedSongPlaylist-container">
      <ListItem button>
        <PlaySongButton id={id} />

        <ListItemText
          className="FoundedSongPlaylist-text"
          primary={`${title}`}
          onClick={() => updateSongResurce(id)}
        />
        {/* TODO: */}
        {/* featue in futere . to check if other users liked also the sond */}
        {/* <FavoriteFindButton songId={id} /> */}
        <img
          src={img}
          className="FoundedSongPlaylist-img"
          onClick={() => updateSongResurce(id)}
        ></img>
        <RemoveSongButton id={id} />
      </ListItem>
      <Divider />
    </div>
  );
};

export default FoundedSongPlaylist;
