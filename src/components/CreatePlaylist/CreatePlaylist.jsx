import React, { useContext, useState } from "react";
import handlePlaylist from "../../context/handlePlaylist";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { BASE_URL } from "../../general/main_var";
import handleMainStates from "../../context/handleMainStates";
import handleChangeMesage from "../../context/handleChangeMesage";
import getUserPlaylistsFromServer from "../../controllers/getUserPlaylistsFromServer";
import handleMessage from "../../context/handleMessage";
import handlePlaylistMainState from "../../context/handlePlaylistMainState";

const CreatePlaylist = () => {
  const [playlistInput, setPlaylistInput] = useState("");
  // const { getPlaylistsUserFromServer } = useContext(handlePlaylist);
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

            // getPlaylistsUserFromServer();
            // const  await getUserPlaylistsFromServer();
            const userPlaylistsFromServer = await getUserPlaylistsFromServer();
            console.log(userPlaylistsFromServer, 16);
            setUserPlaylists(userPlaylistsFromServer.data);

            setCurrentPlaylist(playlistInput);
            changeMessage(`new playlist was created: ${playlistInput}`);
          } else {
            changeMessage(data.message);
          }
        } else {
          changeMessage(
            `Playlist can be up to 15 letters. You entered : ${playlistInput.length} letters `
          );
        }
      } else {
        changeMessage("You didn't enter a playlist name");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="CreatePlaylist-container">
      <div className="CreatePlaylist-createPlaylist">
        <Stack
          spacing={4}
          direction="row"
          // justifyContent="end"
          marginLeft="10px"
        >
          <Stack
            spacing={2}
            direction="row"
            // justifyContent="end"
            marginLeft="60px"
          >
            <Button
              onClick={() => {
                setPlaylistInput("");
              }}
              variant="contained"
              style={{
                backgroundColor: "red",
              }}
              size="small"
              // centerRipple={true}
              // style={{="center"}}
            >
              X
            </Button>
            <TextField
              value={playlistInput}
              onChange={(e) => setPlaylistInput(e.target.value)}
              id="outlined-basic"
              placeholder="playlist name"
              label="enter playlist name"
              variant="outlined"
            />
          </Stack>

          <Button
            style={{
              backgroundColor: "#21b6ae",
            }}
            onClick={() => createPlayListInServer()}
            variant="contained"
          >
            create playlist
          </Button>
        </Stack>
      </div>
    </div>
  );
};

export default CreatePlaylist;
