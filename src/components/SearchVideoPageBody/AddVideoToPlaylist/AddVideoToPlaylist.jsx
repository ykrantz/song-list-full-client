import "./AddVideoToPlaylist.css";

import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { IconButton, Tooltip } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import UserPlayLists from "../../generalComponents/UserPlayLists/UserPlayLists";
import BasicListPlaylist from "../../generalComponents/BasicListPlaylist/BasicListPlaylist";
import handleUser from "../../../context/handleUser";
import handlePlaylistMainState from "../../../context/handlePlaylistMainState";
import handleMessage from "../../../context/handleMessage";

const style = {
  position: "absolute",
  // position: "relative",
  // top: "50%",
  // left: "50%",
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

  const { userPlaylists } = React.useContext(handlePlaylistMainState);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () =>
    currentUser
      ? setOpen(true)
      : changeMessage(`Please log in to add video to playlist`, "error");
  const handleClose = () => setOpen(false);
  // console.log({ currentUser }, { userPlaylists }, 65);
  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Tooltip title={"add video to playlist"}>
        {/* <IconButton disabled={!currentUser}> */}
        {/* <IconButton onClick={handleOpen} disabled={!currentUser}> */}
        <IconButton onClick={handleOpen}>
          <AddCircleIcon
            fontSize="meduim"
            // color="primary"
            // sx={{ backgroundColor: "black" }}
            // disable="true"
            // onClick={() => {
            //   addVideoToPlaylistServer(id, currentPlaylist);
            // }}
            // onClick={handleOpen}
          />
        </IconButton>
      </Tooltip>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography> */}
          {/* <UserPlayLists /> */}
          <BasicListPlaylist
            id={id}
            addVideoToPlaylistServer={addVideoToPlaylistServer}
          />
        </Box>
      </Modal>
    </div>
  );
}

// const AddVideoToPlaylist = () => {
//   return (
//     <div>
//       {" "}
//       <Tooltip title={"add video to playlist"}>
//         <AddCircleIcon
//           fontSize="large"
//           onClick={() => {
//             addVideoToPlaylistServer(id, currentPlaylist);
//           }}
//         />
//       </Tooltip>
//     </div>
//   );
// };

// export default AddVideoToPlaylist;
