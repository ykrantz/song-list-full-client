import "./MainPage.css";
import { useState } from "react";
import { useEffect } from "react";
import Header from "./Header/Header";

import PlayList from "./PlayList/PlayList";
import PlayListsUser from "./PlayListsUser/PlayListsUser";

import SearchSongs from "./SearchSongs/SearchSongs";
import FoundedSongsYouTube from "./FoundedSongsYouTube/FoundedSongsYouTube";
import FoundedSongsPlaylist from "./FoundedSongsPlaylist/FoundedSongsPlaylist";
import handlePlaylist from "../../context/handlePlaylist";
import handleSearchSongApi from "../../context/handleSearchSongApi";
import handleSerachSongPlayList from "../../context/handleSerachSongPlayList";
import BASE_URL from "../../general/main_var";
const MainPage = () => {
  const [searchSongApiResults, setSearchSongApiResults] = useState([]);
  const [searchPlaylistResults, setSearchPlaylistResults] = useState([]);
  const [newPlayList, setNewPlayList] = useState([]);
  const [userPlayLists, setUserPlayLists] = useState([]);
  const [currentPlayList, setCurrentPlayList] = useState("");
  const [videoSrc, setVideoSrc] = useState(
    localStorage.youtubeId ? JSON.parse(localStorage.youtubeId) : ""
  );
  const [masseage, setMasseage] = useState("");
  // feture fot futere: autoplay
  // const [autoplayFlag, setAutoplayFlag] = useState(true);

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

  useEffect(() => {
    getPlaylistsUserFromServer();
  }, []);

  useEffect(() => {
    getPlaylistFromServer();
  }, [currentPlayList]);

  useEffect(() => {
    console.log("setuser play");
    if (!currentPlayList && userPlayLists.length > 0) {
      setCurrentPlayList(userPlayLists[0].playlistName);
    }
  }, [userPlayLists]);

  const getSongApiDitails = (songId) => {
    return searchSongApiResults.find((song) => song.id === songId);
  };

  const findSongsInPlayList = (songInput) => {
    const songsFounded = newPlayList.filter((song) =>
      song.title.toLowerCase().includes(songInput.toLowerCase())
    );

    setSearchPlaylistResults(songsFounded);
    if (songsFounded.length === 0) {
      changeMessage("No Song was founded");
    } else {
      changeMessage("Great. we founded songs for you");
    }
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

  const addSongToPlaylistServer = async (songId) => {
    if (!currentPlayList) {
      changeMessage("Please choose/create playlist before adding a song");
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
        console.log("song was updated in server");
        changeMessage(`Song added succsesfully 
      (song name:${songDitails.title} )`);
        getPlaylistFromServer();
      } else {
        changeMessage(ans.messege);
      }
    } else {
      changeMessage(
        `The song already exist in playlist
      (song name: ${songDitails.title})`
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
      changeMessage("song was deleted from server");
      await getPlaylistFromServer();
    }
  };

  const changeMessage = (str) => {
    setMasseage(str);
    setTimeout(() => {
      setMasseage("");
    }, 3000);
  };

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

  const searchSongsFromServer = async (searchValue) => {
    if (searchValue === "") {
      changeMessage("You didn't enter search value");
      return;
    } else if (searchValue.length > 20) {
      changeMessage(
        `Too long serach of ${searchValue.length} letters. please try less than 20 letters `
      );
      return;
    }
    const ans = await fetch(`${BASE_URL}/api/search/${searchValue}`);
    const data = await ans.json();
    if (ans.status === 200) {
      setSearchSongApiResults(data);
      console.log({ data });
    } else {
      changeMessage(data.message);
    }
  };

  return (
    <div className="MainPage">
      <div className="MainPage-container">
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
              <Header
                className="MainPage-header"
                videoSrc={videoSrc}
                setNewPlayList={setNewPlayList}
              />
              <div className="MainPage-inputsAndButtonsContainer">
                {localStorage.currentUser && (
                  <PlayListsUser className="MainPage-CreatePlaylist" />
                )}
                <SearchSongs
                  className="MainPage-SearchApi"
                  findSongsInPlayList={findSongsInPlayList}
                />
              </div>
              <div>
                <p>
                  <b className="MainPage-message">Message:</b> {masseage}
                </p>
              </div>
              <div className="MainPage-contex">
                {localStorage.currentUser && (
                  <PlayList
                    className="MainPage-PlayList"
                    newPlayList={newPlayList}
                  />
                )}
                <FoundedSongsYouTube
                  className="MainPage-FoundedSongsYouTube"
                  searchSongResults={searchSongApiResults}
                />
                {localStorage.currentUser && (
                  <FoundedSongsPlaylist
                    className="MainPage-FoundedSongsPlaylist"
                    searchSongResults={searchPlaylistResults}
                  />
                )}
              </div>
            </handleSerachSongPlayList.Provider>
          </handlePlaylist.Provider>
        </handleSearchSongApi.Provider>
        <div className="MainPage-footer"></div>
      </div>
    </div>
  );
};

export default MainPage;
