import React, { useContext, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { BASE_URL } from "../../../general/main_var";
import getUserPlaylistsFromServer from "../../../controllers/getUserPlaylistsFromServer";
import handleMessage from "../../../context/handleMessage";
import handlePlaylistMainState from "../../../context/handlePlaylistMainState";
import CancelIcon from "@mui/icons-material/Cancel";
import IconButton from "@mui/material/IconButton";
import handleUser from "../../../context/handleUser";

const CreatePlaylist = () => {
  const [playlistInput, setPlaylistInput] = useState("");
  const { changeMessage } = useContext(handleMessage);
  const { setCurrentPlaylist, setUserPlaylists } = useContext(
    handlePlaylistMainState
  );
  const { currentUser } = React.useContext(handleUser);

  const createPlayListInServer = async () => {
    try {
      if (!currentUser) {
        changeMessage(`Please log in to create playlist`, "error");
        return;
      }

      if (playlistInput) {
        if (playlistInput.length < 20) {
          const accessToken = JSON.parse(localStorage.accessToken);
          const ans = await fetch(`${BASE_URL}/playlist`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              authorization: `bearer ${accessToken}`,
            },
            body: JSON.stringify({
              playlistName: playlistInput,
            }),
          });
          const data = await ans.json();
          console.log(data);
          if (ans.status === 200) {
            console.log({ data }, ans.status);
            console.log("plallist was updated in server");

            const userPlaylistsFromServer = await getUserPlaylistsFromServer();
            console.log(userPlaylistsFromServer, 16);
            setUserPlaylists(userPlaylistsFromServer.data);

            setCurrentPlaylist(playlistInput);
            changeMessage(`new playlist was created: ${playlistInput}`);
          } else {
            changeMessage(data.message, "warning");
          }
        } else {
          changeMessage(
            `Playlist can be up to 15 letters. You entered : ${playlistInput.length} letters `,
            "warning"
          );
        }
      } else {
        changeMessage("You didn't enter a playlist name", "warning");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="CreatePlaylist-container">
      <div className="CreatePlaylist-createPlaylist">
        <Stack
          spacing={2}
          direction="row"
          marginLeft="10%"
          marginRight="5%"
          justifyContent="center"
          alignContent="center"
          alignItems={"center"}
        >
          <Button
            style={{
              backgroundColor: "#21b6ae",
              fontSize: "1.4vh",
              // width: "100px ",
            }}
            onClick={() => createPlayListInServer()}
            variant="contained"
          >
            create playlist
          </Button>

          {/* <Button
              onClick={() => {
                setPlaylistInput("");
              }}
              variant="contained"
              style={{
                backgroundColor: "red",
              }}
              size="small"
            >
              <CancelIcon />
            </Button> */}
          <TextField
            value={playlistInput}
            onChange={(e) => setPlaylistInput(e.target.value)}
            id="outlined-basic"
            placeholder="playlist name"
            label="enter playlist name"
            variant="outlined"
            // style={{
            //   // backgroundColor: "#21b6ae",
            //   fontSize: "1vh",
            //   // width: "100px ",
            // }}
            // sx={{ fontSize: "large" }}
          />

          <IconButton
            onClick={() => {
              setPlaylistInput("");
            }}
            color="error"
            // variant="contained"
            // style={{
            //   backgroundColor: "red",
            // }}
            // size="small"
          >
            <CancelIcon fontSize="large" />
          </IconButton>
        </Stack>
      </div>
    </div>
  );
};

export default CreatePlaylist;
