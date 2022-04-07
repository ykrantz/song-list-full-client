import { useContext } from "react";

import "./FoundedSongPlaylist.css";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import handlePlaylist from "../../../../context/handlePlaylist";
import PlaySongButton from "../PlaySongButton/PlaySongButton";
import RemoveSongButton from "../RemoveSongButton/RemoveSongButton";
import handleMainStates from "../../../../context/handleMainStates";
import { TITLE_LENGTH } from "../../../../general/main_var";

const FoundedSongPlaylist = ({ song: { id, _id, title, img } }) => {
  const { updateSongResurce } = useContext(handlePlaylist);
  const { searchPlaylistResults, setSearchPlaylistResults } =
    useContext(handleMainStates);

  const deleteVideoFromPlaylistResults = (_id) => {
    const newFoundedVideo = searchPlaylistResults.filter(
      (video) => video._id !== _id
    );
    setSearchPlaylistResults(newFoundedVideo);
  };

  return (
    <div className="FoundedSongPlaylist-container">
      <ListItem button>
        <PlaySongButton id={id} />

        <ListItemText
          className="FoundedSongPlaylist-text"
          primary={`${title.substring(0, TITLE_LENGTH)}`}
          onClick={() => updateSongResurce(id)}
        />

        <img
          src={img}
          alt="song_image"
          className="FoundedSongPlaylist-img"
          onClick={() => updateSongResurce(id)}
        ></img>
        <div onClick={() => deleteVideoFromPlaylistResults(_id)}>
          <RemoveSongButton _id={_id} />
        </div>
      </ListItem>
      <Divider />
    </div>
  );
};

export default FoundedSongPlaylist;
