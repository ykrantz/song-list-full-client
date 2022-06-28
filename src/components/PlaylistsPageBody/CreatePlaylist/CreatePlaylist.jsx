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
const CreatePlaylist = () => {
  const [playlistInput, setPlaylistInput] = useState("");
  const { changeMessage } = useContext(handleMessage);
  const { setCurrentPlaylist, setUserPlaylists } = useContext(
    handlePlaylistMainState
  );

  const createPlayListInServer = async () => {
    try {
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
        <Stack spacing={4} direction="row" marginLeft="10px">
          <Stack spacing={2} direction="row" marginLeft="60px">
            <Button
              style={{
                backgroundColor: "#21b6ae",
                fontSize: "1.7vh",
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
            />
          </Stack>
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
            <CancelIcon />
          </IconButton>
        </Stack>
      </div>
    </div>
  );
};

export default CreatePlaylist;
