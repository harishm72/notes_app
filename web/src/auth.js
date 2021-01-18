import Axios from "axios";

const auth = {
  fetchUser() {
    return Axios("/home", {
      withCredentials: true,
    });
  },

  login(loginData) {
    return Axios.post("/login", loginData);
  },

  logout() {
    return Axios.post("/logout", null, {
      withCredentials: true,
    });
  },
};

export default auth;
