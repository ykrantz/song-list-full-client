import "./AddVideoToPlaylist.css";

import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { IconButton, Tooltip } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import BasicListPlaylist from "../../generalComponents/BasicListPlaylist/BasicListPlaylist";
import handleUser from "../../../context/handleUser";
import handlePlaylistMainState from "../../../context/handlePlaylistMainState";
import handleMessage from "../../../context/handleMessage";

const style = {
  // position: "absolute",
  position: "relative",

  top: "20%",
  left: "10%",
  transform: "tran slate(-50%, -50%)",
  width: "60%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: 1,
};

export default function AddVideoToPlaylist({ id, addVideoToPlaylistServer }) {
  const { currentUser } = React.useContext(handleUser);
  const { changeMessage } = React.useContext(handleMessage);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () =>
    currentUser
      ? setOpen(true)
      : changeMessage(`Please log in to add video to playlist`, "error");
  const handleClose = () => setOpen(false);
  return (
    <div>
      <Tooltip title={"add video to playlist"}>
        <IconButton onClick={handleOpen}>
          <AddCircleIcon fontSize="meduim" />
        </IconButton>
      </Tooltip>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="AddVideoToPlaylist-boxModal">
          <Box sx={style}>
            <BasicListPlaylist
              id={id}
              addVideoToPlaylistServer={addVideoToPlaylistServer}
              handleClose={handleClose}
            />
          </Box>
        </div>
      </Modal>
    </div>
  );
}
