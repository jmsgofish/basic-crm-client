import React, { Component } from 'react';
import { render } from 'react-dom';
import ReactDOM from 'react-dom';
import gql from "graphql-tag";
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import App from 'App';
import 'babel-polyfill';

const httpLink = createHttpLink({
  uri: 'http://ec2-13-57-27-190.us-west-1.compute.amazonaws.com:3000/graphql'
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)
