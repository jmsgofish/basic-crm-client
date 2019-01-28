import React, { Component } from 'react'
import { Query } from 'react-apollo'
import Queries from './../Utils/Queries'

class ContactDetails extends Component {
  render() {
    let id = this.props.match.params.id;

    return (
      <Query query={Queries.CONTACT_GET} variables={{ id }}>
        {({ loading, error, data }) => {
          if (loading) return null;
          if (error) return `Error!: ${error}`;

          return (
            <div>
              <div>{data.contact.firstname} {data.contact.lastname} {data.contact.email} {data.contact.caserole}</div>
            </div>
          );
        }}
      </Query>
    )
  }
}

export default ContactDetails


// <Mutation mutation={Queries.ASSIGN_CONTACT} variables={{ contactid, caseid }}>
//   {postMutation => <button onClick={postMutation}>Remove Contact</button>}
// </Mutation>
