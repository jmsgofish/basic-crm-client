import React, { Component } from 'react'
import ContactItem from './ContactItem'
import { Query } from 'react-apollo'
import Queries from './../Utils/Queries'
import { Link } from 'react-router-dom';

class ContactList extends Component {
  render() {
    return (
      <div>
        <div>
          <Query query={Queries.CONTACT_QUERY} fetchPolicy={'network-only'}>
            {({ loading, error, data }) => {
              if (loading) return <div>Fetching</div>
              if (error) return <div>Error</div>

              const contactsToRender = data.allContacts;

              return (
                <div>
                  {contactsToRender.map(contact => <ContactItem key={contact.id} contact={contact} />)}
                </div>
              )
            }}
          </Query>
        </div>
        <div>
          <Link to='/contactcreate'>Create Contact</Link>
        </div>
      </div>
    )
  }
}

export default ContactList
