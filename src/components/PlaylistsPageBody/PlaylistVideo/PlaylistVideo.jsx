import { useContext } from "react";
// import PlaySongButton from "../PlaySongButton/PlaySongButton";
// import RemoveSongButton from "../RemoveVideoButton/RemoveVideoButton";
import "./PlaylistVideo.css";

import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
// import FavoriteFindButton from "../../FavoriteFindButton/FavoriteFindButton";
// import handlePlaylist from "../../../../context/handlePlaylist";
import { TITLE_LENGTH } from "../../../general/main_var";
import PlayVideoButton from "../../generalComponents/PlayVideoButton/PlayVideoButton";
import handlePlaylists from "../../../context/handlePlaylists";
import RemoveVideoButton from "../RemoveVideoButton/RemoveVideoButton";
import FavoriteFindButton from "../../MainPage/Body/FavoriteFindButton/FavoriteFindButton";
import FavoriteButton from "../../generalComponents/FavoriteButton/FavoriteButton";
import handlePlaylistMainState from "../../../context/handlePlaylistMainState";

const PlaylistVideo = ({ song: { id, title, img } }) => {
  // console.log(song);
  // console.log(img);
  const { updateVideoResurce } = useContext(handlePlaylists);

  const addVideoByIdToPlaylistServer = () => {
    // TODO: write code /also in server
  };
  return (
    <div className="PlaylistVideo-container">
      <ListItem button>
        <PlayVideoButton id={id} updateVideoResurce={updateVideoResurce} />
        <ListItemText
          onClick={() => updateVideoResurce(id)}
          primary={`${title.substring(0, TITLE_LENGTH)}`}
        />
        <FavoriteButton
          videoId={id}
          addVideoToPlaylistServer={addVideoByIdToPlaylistServer}
        />
        <img
          src={img}
          alt="song_image"
          className="PlaylistVideo-img"
          onClick={() => updateVideoResurce(id)}
        ></img>
        <RemoveVideoButton id={id} />
      </ListItem>
      <Divider />
    </div>
  );
};

export default PlaylistVideo;
