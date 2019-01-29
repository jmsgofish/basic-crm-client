import React, { Component } from 'react'
import { Link } from 'react-router-dom';

class Home extends Component {
  render() {
    return (
      <div>
        <h3>Basic CRM</h3>
        <h5>Back end: ruby on rails with graphql</h5>
        <h5>Front end: react with apollo client</h5>
        <Link to='/case'><h6>Browse Cases</h6></Link>
        <Link to='/contact'><h6>Browse Contacts</h6></Link>

        <Link className="waves-effect waves-light btn" to='/contactcreate'>Create Contact</Link><br />
        <Link className="waves-effect waves-light btn" to='/casecreate'>Create Case</Link><br />
        <Link className="waves-effect waves-light btn" to='/casecreate/1'>Create Case with Contact</Link>
      </div>
    )
  }
}

export default Home
