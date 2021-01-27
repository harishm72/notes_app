import React from "react";
import { Redirect, Route } from "react-router-dom";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  HttpLink,
} from "@apollo/client";

import Home from "../Home";
import Posts from "../Posts";

const createApolloClient = (id) => {
  return new ApolloClient({
    link: new HttpLink({
      uri: "http://localhost:8080/v1/graphql",
      credentials: "include",
    }),
    cache: new InMemoryCache(),
  });
};

const client = createApolloClient();

const Protected = (props) => {
  return (
    <ApolloProvider client={client}>
      <header>{props.currentUser.fullName}</header>
      <Route exact path="/posts" component={Posts} />
      <Route exact path="/home" component={(routeProps) => <Home {...props} {...routeProps} />} />
      <Redirect path="*" to="/home" />
    </ApolloProvider>
  );
};

export default Protected;
