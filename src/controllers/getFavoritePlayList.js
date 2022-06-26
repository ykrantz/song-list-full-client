import { BASE_URL } from "../general/main_var";

const getFavoritePlayList = async (playlistName) => {
  // const getPlaylistFromServer = async () => {
  try {
    console.log(27);
    if (!localStorage.currentUser) {
      console.log("no user");

      return [];
    } else if (!playlistName) {
      return [];
    }
    const ans = await fetch(`${BASE_URL}/playList/playlist/${playlistName}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.accessToken)}`,
      },
    });
    const myPlaylist = await ans.json();
    console.log({ myPlaylist }, 26);
    if (ans.status === 200) {
      console.log({ myPlayList: myPlaylist }, 24);
      return [...myPlaylist];
    } else {
      return [];
    }
  } catch (e) {
    console.log(e);
  }
};

export default getFavoritePlayList;
