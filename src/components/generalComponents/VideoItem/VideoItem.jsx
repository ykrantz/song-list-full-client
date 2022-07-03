import { useContext } from "react";

import "./VideoItem.css";

import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";

import { TITLE_LENGTH } from "../../../general/main_var";
import PlayVideoButton from "../../generalComponents/PlayVideoButton/PlayVideoButton";

import FavoriteButton from "../../generalComponents/FavoriteButton/FavoriteButton";
import handleVideoSrc from "../../../context/handleVideoSrc";

const VideoItem = ({
  video: { id, title, img },
  iconOne,
  type,
  getPlaylistFromServer,
  searchVideoApiResults,
}) => {
  const { updateVideoSource } = useContext(handleVideoSrc);

  return (
    <div className="VideoItem-container">
      <ListItem button style={{ padding: 2 }}>
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
        />
        <img
          src={img}
          alt="song_image"
          className="VideoItem-img"
          onClick={() => updateVideoSource(id)}
        ></img>
        {iconOne}
      </ListItem>
      <Divider />
    </div>
  );
};

export default VideoItem;
