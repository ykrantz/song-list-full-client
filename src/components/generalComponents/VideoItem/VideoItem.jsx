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
      <ListItem
        button
        style={{
          padding: 3,
          marginLeft: "0.5vw",
          marginRight: "0.5vw",
        }}
      >
        <PlayVideoButton id={id} updateVideoSource={updateVideoSource} />
        <ListItemText
          className="VideoItem-title"
          primaryTypographyProps={{ fontSize: "2.3vh" }}
          sx={{
            width: "15vw",
            marginLeft: "0.5vw",
            marginRight: "0.5vw",
          }}
          onClick={() => updateVideoSource(id)}
          primary={`${title.substring(0, TITLE_LENGTH)}`}
        />
        <FavoriteButton
          id={id}
          type={type}
          getPlaylistFromServer={getPlaylistFromServer}
          searchVideoApiResults={searchVideoApiResults}
        />
        <div className="VideoItem-divImg">
          <img
            src={img}
            alt="song_image"
            className="VideoItem-img"
            onClick={() => updateVideoSource(id)}
          ></img>
        </div>
        {iconOne}
      </ListItem>
      <Divider />
    </div>
  );
};

export default VideoItem;
