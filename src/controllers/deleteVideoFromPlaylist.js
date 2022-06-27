import { BASE_URL } from "../general/main_var";

const deleteVideoFromPlaylist = async (videoId, playlistName) => {
  try {
    console.log(playlistName, 17);
    if (!playlistName) {
      return {
        status: 401,
        message: "Please choose/create playlist before adding a video",
      };
    }
    console.log("wil delete", 45);
    const accessToken = JSON.parse(localStorage.accessToken);
    const ans = await fetch(`${BASE_URL}/playlist/deletesong`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${accessToken}`,
      },
      // TODO: to chack why cilnnt add song to servert
      body: JSON.stringify({
        playlistName: playlistName,
        id: videoId,
      }),
    });

    const data = await ans.json();
    console.log(data);

    if (ans.status === 200) {
      console.log("video was deleted in server");
      return {
        status: ans.status,
        message: `video was delete succsesfully`,
      };
      //   changeMessage(`video added succsesfully
      //         (${videoDitails.title.substring(0, 25)} )`);
      // getPlaylistFromServer();
    } else {
      console.log(data);
      return {
        status: ans.status,
        message: data?.message,
      };
    }
    // }
    //  else {
    //   changeMessage(
    //     `The video already exist in playlist
    //     (${videoDitails.title.substring(0, 25)})`,
    //     true
    //   );
    // }
  } catch (e) {
    console.log(e);
  }
};

export default deleteVideoFromPlaylist;
