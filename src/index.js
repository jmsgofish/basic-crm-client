import React, { Component } from 'react';
import { render } from 'react-dom';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Link, Switch } from 'react-router-dom';
// import ApolloClient from 'apollo-boost';
import gql from "graphql-tag";
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import Header from './Common/Header';

import ContactList from './Components/ContactList'
import CaseList from './Components/CaseList'

import ContactDetails from './Components/ContactDetails'
import CaseDetails from './Components/CaseDetails'

import CreateContact from './Components/CreateContact'
import CreateCase from './Components/CreateCase'

import App from './App';
import 'babel-polyfill';

const httpLink = createHttpLink({
  uri: 'http://localhost:3000/graphql'
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <HashRouter hashType='noslash'>
      <div>
      <Header />
        <main>
          <Switch>
             <Route path="/" exact component={CaseList} />

             <Route path="/contact/:id" exact component={ContactDetails} />
             <Route path="/contactcreate" exact component={CreateContact} />
             <Route path="/contact" exact component={ContactList} />

             <Route path="/case/:id" exact component={CaseDetails} />
             <Route path="/casecreate" exact component={CreateCase} />
             <Route path="/casecreate/:contact" exact component={CreateCase} />
             <Route path="/case" exact component={CaseList} />
           </Switch>
         </main>
      </div>
    </HashRouter>
  </ApolloProvider>,
  document.getElementById('root')
)
// registerServiceWorker()

// ReactDOM.render((
//     <HashRouter hashType='noslash'>
//         <div>
//            <Route path="/" component={Home} />
//         </div>
//     </HashRouter>
// ), document.getElementById('root'));

// WEBPACK FOOTER //
// ./src/index.js
