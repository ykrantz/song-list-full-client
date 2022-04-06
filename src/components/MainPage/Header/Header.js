import "./Header.css";
import Plyr from "plyr-react";
import "plyr-react/dist/plyr.css";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import handlePlaylist from "../../../context/handlePlaylist";
import handleSearchSongApi from "../../../context/handleSearchSongApi";
import handleSerachSongPlayList from "../../../context/handleSerachSongPlayList";
import handleMainStates from "../../../context/handleMainStates";

const Header = () => {
  const navigate = useNavigate();

  const {
    setNewPlayList,
    setCurrentPlayList,
    // autoplayFlag,
    // currentPlayList,
    setUserPlayLists,
    setSearchSongApiResults,
    setSearchPlaylistResults,
    videoSrc,
  } = useContext(handleMainStates);

  const logOut = () => {
    localStorage.currentUser = "";
    localStorage.accessToken = "";
    setNewPlayList([]);
    setUserPlayLists([]);
    setCurrentPlayList([]);
    setSearchSongApiResults([]);
    setSearchPlaylistResults([]);
    navigate("/");
  };
  // console.log({ autoplayFlag });
  return (
    <div className="Header-container">
      <div className="Header-Plyr">
        <Plyr
          source={videoSrc}
          // options={{ autoplay: true }}
          // options={{ autoplay: autoplayFlag }}
        />
      </div>
      <div className="Header-headContainer">
        <div className="Header-headContex">
          <h1 className="Header-headMiddle">Video play list</h1>

          <div className="Header-buttons">
            <Stack spacing={2} direction="column">
              {!localStorage.currentUser && (
                <>
                  <Button
                    onClick={() => navigate("/register")}
                    variant="contained"
                  >
                    register
                  </Button>
                  <Button
                    onClick={() => navigate("/login")}
                    variant="contained"
                  >
                    Log in
                  </Button>
                </>
              )}
              {localStorage.currentUser && (
                <Button onClick={() => logOut()} variant="contained">
                  Log out
                </Button>
              )}
            </Stack>
          </div>

          <div className="Header-title">
            {/* <h4>Watch vidoes without any advertisements</h4> */}
            {localStorage.currentUser && (
              <>
                <p className="Header-welcome">welcome : </p>
                <p className="Header-user">
                  {JSON.parse(localStorage.currentUser)}{" "}
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
