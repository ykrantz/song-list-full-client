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
import FavoriteButton from "../../generalComponents/FavoriteButton/FavoriteButton";
import handlePlaylistMainState from "../../../context/handlePlaylistMainState";
import { Stack } from "@mui/material";

const PlaylistVideo = ({ song: { id, title, img } }) => {
  const { updateVideoResurce, getPlaylistFromServer } =
    useContext(handlePlaylists);

  return (
    <div className="PlaylistVideo-container">
      {/* <Stack spacing={2} direction="row" justifyContent="center"> */}
      <ListItem button>
        <PlayVideoButton id={id} updateVideoResurce={updateVideoResurce} />
        <ListItemText
          className="PlaylistVideo-title"
          primaryTypographyProps={{ fontSize: "2.3vh" }}
          sx={{ width: "15vw", marginLeft: "1vw", marginRight: "1vw" }}
          onClick={() => updateVideoResurce(id)}
          primary={`${title.substring(0, TITLE_LENGTH)}`}
        />
        <FavoriteButton
          id={id}
          type="exist"
          getPlaylistFromServer={getPlaylistFromServer}
          // addVideoToPlaylistServer={addVideoByIdToPlaylistServer}
        />
        <img
          src={img}
          alt="song_image"
          className="PlaylistVideo-img"
          onClick={() => updateVideoResurce(id)}
        ></img>
        <RemoveVideoButton id={id} />
      </ListItem>
      {/* </Stack> */}
      <Divider />
    </div>
  );
};

export default PlaylistVideo;
