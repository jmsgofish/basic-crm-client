import React, {Component} from 'react';
import { HashRouter, Route, Link, Switch } from 'react-router-dom';
import Header from 'Common/Header';
import ContactList from 'Components/ContactList'
import CaseList from 'Components/CaseList'
import ContactDetails from 'Components/ContactDetails'
import CaseDetails from 'Components/CaseDetails'
import CreateContact from 'Components/CreateContact'
import CreateCase from 'Components/CreateCase'
import Home from 'Components/Home'

class App extends Component {
  render() {
    return (
      <HashRouter hashType='noslash'>
        <div>
        <Header />
          <main>
            <Switch>
               <Route path="/" exact component={Home} />

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
    );
  }
}

export default App;



// WEBPACK FOOTER //
// ./src/Components/DigitalLSAT.js
