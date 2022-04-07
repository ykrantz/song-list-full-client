import FoundedSongYouTube from "../FoundedSongYouTube/FoundedSongYouTube";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import "./FoundedSongsYouTube.css";

const FoundedSongsYouTube = ({ searchSongResults }) => {
  const style = {
    width: "100%",
    maxWidth: 600,
    bgcolor: " rgb(122, 240, 122)",
  };
  return (
    <div className="FoundedSongsYouTube-container">
      <List sx={style} component="nav" aria-label="mailbox folders">
        <h3>Videos from YouTube:</h3>
        <Divider />

        {searchSongResults.map((song) => (
          <FoundedSongYouTube key={song.id} song={song} />
        ))}
      </List>
    </div>
  );
};

export default FoundedSongsYouTube;
