import React, { Component } from 'react'
import { Query } from 'react-apollo'
import Queries from './../Utils/Queries'
import ContactItem from './ContactItem'
import Dropdown from 'react-dropdown'
import styled from 'styled-components';
import 'react-dropdown/style.css'
import { Mutation } from 'react-apollo'

class CaseDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedValue: '',
      selectedId: null
    }

    this.onSelect = this.onSelect.bind(this);
  }

  onSelect(value) {
    this.setState({selectedValue: value.value});
    this.setState({selectedId: value.value.substr(0, value.value.indexOf(":"))});
  }

  render() {
    let id = this.props.match.params.id;
    let me = this;

    let options = [];

    return (
      <Query query={Queries.CASE_GET} variables={{ id }}>
        {({ loading, error, data, refetch }) => {

          if (loading) return null;
          if (error) return 'Error!: ${error}';
          let contactData = data;
          let caseid = id;

          let contactid = this.state.selectedId;

          const contacts = contactData.case.contacts;
          const defaultOption = options[0];

          return (
            <React.Fragment>
            <Query query={Queries.CONTACT_QUERY}>
              {({ cloading, cerror, data }) => {
                if (cloading) return <div>Fetching</div>
                if (cerror) return <div>Error</div>

                if (data && data.allContacts) {
                  console.log(data.allContacts);

                  options = [];
                  data.allContacts.forEach(function (contact) {
                    options.push(contact.id + ': ' + contact.firstname + ' ' + contact.lastname);
                  });
                }

                return (
                  <div>
                    <div>{contactData.case.title} {contactData.case.description} {contactData.case.value} {contactData.case.courtdate}</div>
                    <div>{contacts.map(c => <ContactItem key={c.id} contact={c} showRemove={true} onRemove={refetch} />)}</div>
                    <div>
                      <Dropdown options={options} onChange={this.onSelect} value={this.state.selectedValue} placeholder="Select an option" />
                      <Mutation mutation={Queries.ASSIGN_CONTACT} variables={{ contactid, caseid }}>
                        {postMutation => <button onClick={() => {
                          postMutation().then(() => { refetch() }, error => { console.log(error); alert('Duplicate Case Role'); });
                        }}>Associate</button>}
                      </Mutation>
                    </div>
                  </div>
                );
              }}
            </Query>
            </React.Fragment>
          );
        }}
      </Query>
    )
  }
}

export default CaseDetails
