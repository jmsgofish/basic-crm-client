import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Mutation } from 'react-apollo'
import Queries from './../Utils/Queries'

class ContactItem extends Component {
  render() {

    let remove = '';
    let contactid = this.props.contact.id;

    if (this.props.showRemove) {
      remove = <Mutation mutation={Queries.ASSIGN_CONTACT} variables={{ contactid }}>
                {postMutation => <button onClick={() => {
                  postMutation().then(() => { this.props.onRemove() }, error => { console.log(error); });
                }}>Remove</button>}
              </Mutation>
    }

    return (
      <div>
        <div>
          {this.props.contact.firstname} {this.props.contact.lastname} {this.props.contact.email} {this.props.contact.caserole} <Link to={'/contact/' + contactid}>details</Link> {remove}
        </div>
      </div>
    )
  }
}

export default ContactItem
