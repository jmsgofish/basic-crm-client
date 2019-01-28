import React, { Component } from 'react'
import Dropdown from 'react-dropdown'
import styled from 'styled-components';
import 'react-dropdown/style.css'
import Queries from './../Utils/Queries'
import { Query } from 'react-apollo'

class ContactForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedValue: '',
      selectedId: null
    }

    this.onSelect = this.onSelect.bind(this);
  }

  onSelect(value) {
    let selectedId = value.value.substr(0, value.value.indexOf(":"));
    this.setState({selectedValue: value.value});
    this.setState({selectedId: selectedId});
    this.props.updateValue({ caseId: selectedId });
  }

  render() {
    return (
      <Query query={Queries.CASE_QUERY}>
        {({ loading, error, data }) => {
          if (loading) return <div>Fetching</div>
          if (error) return <div>Error</div>

          console.log(data);
          let options = [];
          data.allCases.forEach(function (c) {
            options.push(c.id + ': ' + c.title);
          });

          let casefield = '';
          if (this.props.includeCase) {
            casefield = <Dropdown options={options} onChange={this.onSelect} value={this.state.selectedValue} placeholder="Select an case" />
          }

          return (
            <div>
                <input value={this.props.firstname} onChange={e => this.props.updateValue({ firstname: e.target.value })} type="text" placeholder="A first name for the contact" />
                <input value={this.props.lastname}  onChange={e => this.props.updateValue({ lastname: e.target.value })}  type="text" placeholder="A last name for the contact" />
                <input value={this.props.email}     onChange={e => this.props.updateValue({ email: e.target.value })}     type="text" placeholder="The email for the contact" />
                <input value={this.props.caserole}  onChange={e => this.props.updateValue({ caserole: e.target.value })}  type="text" placeholder="The case role for the contact" />
                {casefield}
            </div>
          );
        }}
      </Query>
    )
  }
}

export default ContactForm
