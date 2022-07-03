import { useContext } from "react";
// import PlaySongButton from "../PlaySongButton/PlaySongButton";
// import RemoveSongButton from "../RemoveVideoButton/RemoveVideoButton";
import "./VideoItem.css";

import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
// import FavoriteFindButton from "../../FavoriteFindButton/FavoriteFindButton";
// import handlePlaylist from "../../../../context/handlePlaylist";
import { TITLE_LENGTH } from "../../../general/main_var";
import PlayVideoButton from "../../generalComponents/PlayVideoButton/PlayVideoButton";
// import handlePlaylists from "../../../context/handlePlaylists";
// import RemoveVideoButton from "../RemoveVideoButton/RemoveVideoButton";
import FavoriteButton from "../../generalComponents/FavoriteButton/FavoriteButton";
import handlePlaylistMainState from "../../../context/handlePlaylistMainState";
import { Stack } from "@mui/material";
import handlePlaylists from "../../../context/handlePlaylists";
import handleVideoSrc from "../../../context/handleVideoSrc";

const VideoItem = ({
  video: { id, title, img },
  iconOne,
  type,
  getPlaylistFromServer,
  searchVideoApiResults,
}) => {
  // TODO:  fix getPlaylistFromServer to generic
  // const { getPlaylistFromServer } = useContext(handlePlaylists);
  const { updateVideoSource } = useContext(handleVideoSrc);

  // console.log({ id, title, img }, 21);
  return (
    <div className="VideoItem-container">
      {/* <Stack spacing={2} direction="row" justifyContent="center"> */}
      <ListItem button>
        <PlayVideoButton id={id} updateVideoSource={updateVideoSource} />
        <ListItemText
          className="VideoItem-title"
          primaryTypographyProps={{ fontSize: "2.3vh" }}
          sx={{ width: "15vw", marginLeft: "1vw", marginRight: "1vw" }}
          onClick={() => updateVideoSource(id)}
          primary={`${title.substring(0, TITLE_LENGTH)}`}
        />
        <FavoriteButton
          id={id}
          type={type}
          getPlaylistFromServer={getPlaylistFromServer}
          searchVideoApiResults={searchVideoApiResults}
          // addVideoToPlaylistServer={addVideoByIdToPlaylistServer}
        />
        <img
          src={img}
          alt="song_image"
          className="VideoItem-img"
          onClick={() => updateVideoSource(id)}
        ></img>
        {iconOne}
        {/* <IconTwo /> */}
        {/* <RemoveVideoButton id={id} /> */}
      </ListItem>
      {/* </Stack> */}
      <Divider />
    </div>
  );
};

export default VideoItem;
