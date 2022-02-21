import FoundedSong from "../../FoundedSong/FoundedSong";
import "./FoundedSongs.css";
import List from "@mui/material/List";

const FoundedSongs = ({ foundedSongs, searchSongResults }) => {
  const style = {
    width: "100%",
    maxWidth: 500,
    // bgcolor: "background.paper",
    bgcolor: "cornsilk",
  };
  return (
    <div className="FoundedSongs-container">
      <h3>Founded songs -old-all together:</h3>
      <List sx={style} component="nav" aria-label="mailbox folders">
        {searchSongResults.map((song) => (
          <FoundedSong key={song.id} song={song} />
        ))}
      </List>
    </div>
  );
};

export default FoundedSongs;
