/*
This component does too much and is confusing. TODO: refactor
*/
import React, { Component } from 'react'
import { Query } from 'react-apollo'
import Queries from 'Utils/Queries'
import Mutations from 'Utils/Mutations'
import ContactItem from 'Components/ContactItem'
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
          let caseData = data;
          let caseid = id;

          let contactid = this.state.selectedId;

          const contacts = caseData.case.contacts;
          const defaultOption = options[0];

          return (
            <React.Fragment>
            <Query query={Queries.CONTACT_QUERY}>
              {({ cloading, cerror, data }) => {
                if (cloading) return <div>Fetching</div>
                if (cerror) return <div>Error</div>

                if (data && data.allContacts) {
                  options = [];
                  data.allContacts.forEach(function (contact) {
                    options.push(contact.id + ': ' + contact.firstname + ' ' + contact.lastname);
                  });
                }

                return (
                  <div>
                    <div>
                      <h3>Case: {caseData.case.title}</h3>
                      <h6>Description: {caseData.case.description}</h6>
                      <h6>Value: ${caseData.case.value}</h6>
                      <h6>Court Date: {new Date(caseData.case.courtdate).toDateString()}</h6>
                    </div>
                    <hr style={{ marginTop: '30px', marginBottom: '30px' }} />
                    <ul className="collection with-header" style={{ maxWidth: '400px' }}>
                      <li className="collection-header"><h5>Associated Contacts</h5></li>
                      {contacts.map(c => <ContactItem key={c.id} contact={c} onRemove={refetch} />)}
                    </ul>
                    <div>
                      <h6>Associate new Contact</h6>
                      <div style={{ float: 'left' }}><Dropdown options={options} onChange={this.onSelect} value={this.state.selectedValue} placeholder="Select an option" /></div>
                      <Mutation mutation={Mutations.ASSIGN_CONTACT} variables={{ contactid, caseid }}>
                        {postMutation => <a className="waves-effect waves-light btn" onClick={() => {
                          postMutation().then(() => { refetch() }, error => { console.log(error); alert('Duplicate Case Role'); });
                        }}>Associate</a>}
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
