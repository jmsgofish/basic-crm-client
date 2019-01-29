import React, { Component } from 'react'
import { Query } from 'react-apollo'
import Queries from 'Utils/Queries'
import { Link } from 'react-router-dom';

class ContactDetails extends Component {
  render() {
    let id = this.props.match.params.id;

    return (
      <Query query={Queries.CONTACT_GET} variables={{ id }}>
        {({ loading, error, data }) => {
          if (loading) return null;
          if (error) return `Error!: ${error}`;

          let caseData = '';
          if (data.contact.case) {
            caseData = <Link to={'/case/' + data.contact.case.id}>{data.contact.case.title}</Link>;
          }

          return (
            <div>
              <div>
                <h4>{data.contact.firstname} {data.contact.lastname}</h4>
                <h6>Email: {data.contact.email}</h6>
                <h6>Case Role: {data.contact.caserole}</h6>
                <h6>Case: {caseData}</h6>
              </div>
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
