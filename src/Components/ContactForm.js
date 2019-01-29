import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Dropdown from 'react-dropdown'
import styled from 'styled-components'
import 'react-dropdown/style.css'
import Queries from 'Utils/Queries'
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

          let options = [];
          data.allCases.forEach(function (c) {
            options.push(c.id + ': ' + c.title);
          });

          let casefield = '';
          if (this.props.includeCase) {
            casefield = <div><span>Case: </span><Dropdown options={options} onChange={this.onSelect} value={this.state.selectedValue} placeholder="Select an case" /></div>
          }

          return (
            <div>
                <span>First Name: </span><input value={this.props.firstname} onChange={e => this.props.updateValue({ firstname: e.target.value })} type="text" placeholder="A first name for the contact" />
                <span>Last Name: </span><input value={this.props.lastname}  onChange={e => this.props.updateValue({ lastname: e.target.value })}  type="text" placeholder="A last name for the contact" />
                <span>Email: </span><input value={this.props.email}     onChange={e => this.props.updateValue({ email: e.target.value })}     type="text" placeholder="The email for the contact" />
                <span>Case Role: </span><input value={this.props.caserole}  onChange={e => this.props.updateValue({ caserole: e.target.value })}  type="text" placeholder="The case role for the contact" />
                {casefield}
            </div>
          );
        }}
      </Query>
    )
  }
}

ContactForm.propTypes = {
  firstname     : PropTypes.string.isRequired,
  lastname      : PropTypes.string.isRequired,
  email         : PropTypes.string.isRequired,
  caserole      : PropTypes.string.isRequired,
  includeCase   : PropTypes.bool,
  updateValue   : PropTypes.func.isRequired
}

export default ContactForm
