import React from "react";
import { Redirect, Route } from "react-router-dom";
import Home from "../Home";
import Posts from "../Posts";

const Protected = (props) => {
  return (
    <>
      <Route exact path="/posts" component={Posts} />
      <Route exact path="/home" component={() => <Home logout={props.logout} />} />
      <Redirect path="*" to="/home" />
    </>
  );
};

export default Protected;
