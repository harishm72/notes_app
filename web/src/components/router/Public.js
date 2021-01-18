import React from "react";
import { Redirect, Route } from "react-router-dom";

import Login from "../Login";

const Public = (props) => {
  return (
    <>
      <Route
        exact
        path="/register"
        component={() => <Register setAuth={props.setAuth} />}
      />
      <Route
        exact
        path="/login"
        component={() => <Login setAuth={props.setAuth} />}
      />
      <Redirect path="*" to="/login" />
    </>
  );
};

export default Public;

export const Register = () => {
  return <div>Register</div>;
};
