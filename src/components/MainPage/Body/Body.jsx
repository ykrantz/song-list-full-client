import "./Body.css";
import { useContext, useState } from "react";
import { useEffect } from "react";

import PlayList from "../PlayList/PlayList";
import PlayListsUser from "../PlayListsUser/PlayListsUser";

import SearchSongs from "../SearchSongs/SearchSongs";
import FoundedSongsYouTube from "../FoundedSongsYouTube/FoundedSongsYouTube";
import FoundedSongsPlaylist from "../FoundedSongsPlaylist/FoundedSongsPlaylist";
import handlePlaylist from "../../../context/handlePlaylist";
import handleSearchSongApi from "../../../context/handleSearchSongApi";
import handleSerachSongPlayList from "../../../context/handleSerachSongPlayList";
import BASE_URL from "../../../general/main_var";
import MessageNote from "../../generalComponents/MessageNote/MessageNote";
import handleMainStates from "../../../context/handleMainStates";
const Body = () => {
  const {
    searchSongApiResults,
    setSearchSongApiResults,
    searchPlaylistResults,
    setSearchPlaylistResults,
    newPlayList,
    setNewPlayList,
    userPlayLists,
    setUserPlayLists,
    currentPlayList,
    setCurrentPlayList,
    setVideoSrc,
  } = useContext(handleMainStates);

  const [message, setMessage] = useState("");
  // feture fot futere: autoplay
  // const [autoplayFlag, setAutoplayFlag] = useState(true);
  useEffect(() => {
    getPlaylistsUserFromServer();
  }, []);

  useEffect(() => {
    getPlaylistFromServer();
  }, [currentPlayList]);

  useEffect(() => {
    console.log("set user play");
    if (!currentPlayList && userPlayLists.length > 0) {
      setCurrentPlayList(userPlayLists[0].playlistName);
    }
  }, [userPlayLists]);

  // messages functions:

  const changeMessage = (str, isEror = false) => {
    setMessage({ message: str, isEror: isEror });

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  const waitingMessage = () => {
    changeMessage("Waiting for results from server");
  };

  //  fetch to server functions:

  const getPlaylistsUserFromServer = async () => {
    if (!localStorage.currentUser) {
      setUserPlayLists([]);
      return;
    }
    const ans = await fetch(`${BASE_URL}/playList/userplaylists`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.accessToken)}`,
      },
    });
    const myPlayLists = await ans.json();
    if (ans.status === 200) {
      setUserPlayLists([...myPlayLists]);

      console.log("got play lists from server");
    } else {
      setUserPlayLists([]);
    }
  };

  const getPlaylistFromServer = async () => {
    if (!localStorage.currentUser) {
      console.log("no user");
      setNewPlayList([]);
      return;
    } else if (!currentPlayList) {
      return;
    }
    const ans = await fetch(
      `${BASE_URL}/playList/playlist/${currentPlayList}`,
      {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${JSON.parse(localStorage.accessToken)}`,
        },
      }
    );
    const myPlayList = await ans.json();
    if (ans.status === 200) {
      setNewPlayList([...myPlayList]);
    } else {
      setNewPlayList([]);
    }
  };

  const addSongToPlaylistServer = async (songId) => {
    if (!currentPlayList) {
      changeMessage(
        "Please choose/create playlist before adding a video",
        true
      );
      return;
    }
    const songDitails = getSongApiDitails(songId);

    if (!newPlayList.find((song) => song.id === songId)) {
      const accessToken = JSON.parse(localStorage.accessToken);
      const ans = await fetch(`${BASE_URL}/playlist`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${accessToken}`,
        },
        body: JSON.stringify({
          playlistName: currentPlayList,
          song: formolizeSongToServer(songDitails),
        }),
      });
      const data = await ans.json();
      console.log(data);

      if (ans.status === 200) {
        console.log("video was updated in server");
        changeMessage(`video added succsesfully 
      (${songDitails.title.substring(0, 25)} )`);
        getPlaylistFromServer();
      } else {
        changeMessage(ans.messege, true);
      }
    } else {
      changeMessage(
        `The video already exist in playlist
      (${songDitails.title.substring(0, 25)})`,
        true
      );
    }
  };

  const deleteSongFromServer = async (songId) => {
    const accessToken = JSON.parse(localStorage.accessToken);
    const ans = await fetch(`${BASE_URL}/playlist/deletesong`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${accessToken}`,
      },
      body: JSON.stringify({
        playlistName: currentPlayList,
        songId: songId,
      }),
    });
    const data = await ans.json();
    console.log(data);
    if (ans.status === 200) {
      changeMessage("video was deleted from server");
      await getPlaylistFromServer();
    }
  };

  const searchSongsFromServer = async (searchValue) => {
    if (searchValue === "") {
      changeMessage("You didn't enter search value");
      return;
    } else if (searchValue.length > 20) {
      changeMessage(
        `Too long serach of ${searchValue.length} letters. please try less than 20 letters `,
        true
      );
      return;
    }

    waitingMessage();
    const ans = await fetch(`${BASE_URL}/api/search/${searchValue}`);
    const data = await ans.json();
    if (ans.status === 200) {
      setSearchSongApiResults(data);
      console.log({ data });
      changeMessage("Great. we founded videos for you from YouTube");
    } else {
      changeMessage(data.message, true);
    }
  };

  // general functions in page:

  const updateSongResurce = (songId) => {
    // setAutoplayFlag(true);
    const youtubeId = songId;

    setVideoSrc({
      type: "video",
      sources: [
        {
          src: youtubeId,
          provider: "youtube",
        },
      ],
    });
    localStorage.youtubeId = JSON.stringify(songId);
  };

  const formolizeSongToServer = (songApiDitails) => {
    console.log(songApiDitails);
    return {
      title: songApiDitails.title,
      artist: songApiDitails?.author.name,
      src: songApiDitails.url,
      user: JSON.parse(localStorage.currentUser),
      provider: "youTube",
      img: songApiDitails.thumbnails[0].url,
      id: songApiDitails.id,
    };
  };

  const getSongApiDitails = (songId) => {
    return searchSongApiResults.find((song) => song.id === songId);
  };

  const findSongsInPlayList = (songInput) => {
    const songsFounded = newPlayList.filter((song) =>
      song.title.toLowerCase().includes(songInput.toLowerCase())
    );
    setSearchPlaylistResults(songsFounded);
    if (songsFounded.length === 0) {
      changeMessage("No videos was founded in current playlist", true);
    } else {
      changeMessage("Great. we founded videos for you in current playlist");
    }
  };

  return (
    <div className="Body">
      <div className="Body-container">
        {/* <BackToHome /> */}
        <br></br>

        <handleSearchSongApi.Provider
          value={{
            changeMessage: changeMessage,
            setSearchSongApiResults: setSearchSongApiResults,
            searchSongsFromServer: searchSongsFromServer,
          }}
        >
          <handlePlaylist.Provider
            value={{
              addSongToPlaylistServer,
              deleteSongFromServer,
              newPlayList,
              changeMessage,
              updateSongResurce,
              getPlaylistFromServer,
              setNewPlayList,
              setUserPlayLists,
              userPlayLists,
              getPlaylistsUserFromServer,
              currentPlayList,
              setCurrentPlayList,
              // autoplayFlag,
              // setAutoplayFlag,
            }}
          >
            <handleSerachSongPlayList.Provider
              value={{
                changeMessage,
                setSearchPlaylistResults,
              }}
            >
              {/* <Header
                className="Body-header"
                videoSrc={videoSrc}
                setNewPlayList={setNewPlayList}
              /> */}
              <div className="Body-inputsAndButtonsContainer">
                {localStorage.currentUser && (
                  <PlayListsUser className="Body-CreatePlaylist" />
                )}
                <SearchSongs
                  className="Body-SearchApi"
                  findSongsInPlayList={findSongsInPlayList}
                />
              </div>
              <div>
                <p className="Body-message">
                  <b>Message: </b>
                  <MessageNote
                    message={message?.message}
                    isEror={message?.isEror}
                  />

                  {/* <span className="Body-messageDetails"> {masseage}</span> */}
                </p>
              </div>
              <div className="Body-contex">
                {localStorage.currentUser && (
                  <PlayList
                    className="Body-PlayList"
                    newPlayList={newPlayList}
                  />
                )}
                <FoundedSongsYouTube
                  className="Body-FoundedSongsYouTube"
                  searchSongResults={searchSongApiResults}
                />
                {localStorage.currentUser && (
                  <FoundedSongsPlaylist
                    className="Body-FoundedSongsPlaylist"
                    searchSongResults={searchPlaylistResults}
                  />
                )}
              </div>
            </handleSerachSongPlayList.Provider>
          </handlePlaylist.Provider>
        </handleSearchSongApi.Provider>
        <div className="Body-footer"></div>
      </div>
    </div>
  );
};

export default Body;
