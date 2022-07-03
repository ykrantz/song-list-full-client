import { BASE_URL } from "../general/main_var";

const deleteVideoFromPlaylist = async (videoId, playlistName) => {
  try {
    if (!playlistName) {
      return {
        status: 401,
        message: "Please choose/create playlist before adding a video",
      };
    }
    const accessToken = JSON.parse(localStorage.accessToken);
    const ans = await fetch(`${BASE_URL}/playlist/deletesong`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${accessToken}`,
      },
      body: JSON.stringify({
        playlistName: playlistName,
        id: videoId,
      }),
    });

    const data = await ans.json();
    // console.log(data);

    if (ans.status === 200) {
      console.log("video was deleted in server");
      return {
        status: ans.status,
        message: `video was delete succsesfully`,
      };
    } else {
      console.log(data);
      return {
        status: ans.status,
        message: data?.message,
      };
    }
  } catch (e) {
    console.log(e);
  }
};

export default deleteVideoFromPlaylist;
