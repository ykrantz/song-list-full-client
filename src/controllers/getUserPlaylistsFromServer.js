import { BASE_URL } from "../general/main_var";

const getUserPlaylistsFromServer = async () => {
  try {
    if (!localStorage.currentUser) {
      return { status: 400, data: [] };
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
      console.log("got play lists from server");
      return { status: 200, data: myPlayLists };
    } else {
      return { status: ans.status, data: [] };
    }
  } catch (e) {
    console.log(e);
  }
};

export default getUserPlaylistsFromServer;
