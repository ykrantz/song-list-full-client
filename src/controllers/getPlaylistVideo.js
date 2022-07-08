import { BASE_URL } from "../general/main_var";

const getPlaylistVideoFromServer = async (playlistName) => {
  try {
    if (!localStorage?.currentUser || !JSON.parse(localStorage?.currentUser)) {
      console.log("no user");

      return [];
    } else if (!playlistName) {
      return [];
    }

    const ans = await fetch(`${BASE_URL}/playList/playlist/${playlistName}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage?.accessToken)}`,
      },
    });
    // console.log({ ans }, 38);
    const myPlaylist = await ans.json();
    if (ans?.status === 200) {
      return [...myPlaylist];
    } else {
      return [];
    }
  } catch (e) {
    console.log(e);
    console.log({ playlistName }, 37);
  }
};

export default getPlaylistVideoFromServer;
