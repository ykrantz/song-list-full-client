import { BASE_URL } from "../general/main_var";

const initConnectToServer = async () => {
  try {
    const ans = await fetch(`${BASE_URL}/users/initailconnection`, {
      method: "get",
      // headers: {
      //   "Content-Type": "application/json",
      //   authorization: `bearer ${JSON.parse(localStorage?.accessToken)}`,
      // },
    });
    const data = await ans.json();
    if (ans?.status === 200) {
      console.log(data);
      return { status: 200, message: ans?.message };
    } else {
      console.log(data);

      return { status: ans.status, message: ans?.message };
    }
  } catch (e) {
    console.log(e);
    return { status: 500, message: "internal server eror" };
  }
};

export default initConnectToServer;
