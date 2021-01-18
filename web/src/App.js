import { useEffect, useState, useCallback } from "react";
import Axios from "axios";
import { useHistory, Switch } from "react-router-dom";
import { io } from "socket.io-client";

import Protected from "./components/router/Protected";
import Public from "./components/router/Public";
import auth from "./auth";

import "./App.css"

// const socket = io("http://localhost:3000");

// socket.on("hello", (arg) => {
//   console.log(arg); // world
// });

// console.log(socket);

const App = () => {
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isAuthenticated, setAuthentication] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  const setAuth = useCallback((value) => {
    setAuthentication(value);
  }, []);

  useEffect(() => {
    setLoading(true);

    auth
      .fetchUser()
      .then((res) => {
        console.log(res.data);
        setAuthentication(true);
        setCurrentUser(res.data);
      })
      .catch((err) => {
        if (err.response?.data?.message === "You are not logged In") {
          setAuthentication(false);
          return;
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const logout = () => {
    auth.logout().then(res => {
      setAuthentication(false)
    }).catch(err => {
      console.log(err)
    })
  }

  if (loading) return <h1>Loading</h1>;

  if (error) return <h1>Something went wrong</h1>;

  return (
    <Switch>
      {isAuthenticated ? (
        <Protected currentUser={currentUser} logout={logout} />
      ) : (
        <Public setAuth={setAuth} />
      )}
    </Switch>
  );
};

export default App;
