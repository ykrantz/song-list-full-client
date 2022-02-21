const checkUserDetailsInput = (userName, password) => {
  if (userName === "" || password === "") {
    return `You didnt enter user name/password`;
  } else if (userName.length > 10 || password.length > 30) {
    return "Too long. user name can bee up to 10 letters. and pasword up to 30 letters";
  }
};

module.exports = checkUserDetailsInput;
