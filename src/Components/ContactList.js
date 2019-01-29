import React, { Component } from 'react'
import ContactItem from 'Components/ContactItem'
import { Query } from 'react-apollo'
import Queries from 'Utils/Queries'
import { Link } from 'react-router-dom';

class ContactList extends Component {
  render() {
    return (
      <div>
        <div>
          <Link className="waves-effect waves-light btn" to='/contactcreate'>Create Contact</Link>
        </div>
        <div>
          <Query query={Queries.CONTACT_QUERY} fetchPolicy={'network-only'}>
            {({ loading, error, data }) => {
              if (loading) return <div>Fetching</div>
              if (error) return <div>Error</div>

              const contactsToRender = data.allContacts;

              return (
                <ul className="collection with-header">
                  <li className="collection-header"><h4>Contacts</h4></li>
                  {contactsToRender.map(contact => <ContactItem key={contact.id} contact={contact} />)}
                </ul>
              )
            }}
          </Query>
        </div>
      </div>
    )
  }
}

export default ContactList
