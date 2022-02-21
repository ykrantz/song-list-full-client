import "./FoundedSongsPlaylist.css";
import FoundedSongPlaylist from "../FoundedSongPlaylist/FoundedSongPlaylist";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";

const FoundedSongsPlaylist = ({ searchSongResults }) => {
  const style = {
    width: "100%",
    maxWidth: 500,
    bgcolor: "rgb(24, 206, 197)",
  };
  return (
    <div className="FoundedSongsPlaylist-container">
      <List sx={style} component="nav" aria-label="mailbox folders">
        <h3>Songs that was found in Playlist:</h3>
        <Divider />
        {searchSongResults.map((song) => (
          <FoundedSongPlaylist key={song._id} song={song} />
        ))}
      </List>
    </div>
  );
};

export default FoundedSongsPlaylist;
