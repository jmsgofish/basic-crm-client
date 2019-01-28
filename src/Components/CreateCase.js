import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import Queries from './../Utils/Queries'
import ContactForm from './ContactForm'
import DatePicker from 'react-date-picker';

class CreateCase extends Component {
  constructor(props) {
    super(props);

    this.updateValue = this.updateValue.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  state = {
    title: '',
    description: '',
    value: 0.0,
    courtdate: new Date(),
    firstname: '',
    lastname: '',
    email: '',
    caserole: ''
  }

  updateValue(param) {
    this.setState(param);
  }

  onChange(date) {
    this.setState({ courtdate: date });
  }

  render() {
    let includeContact = this.props.match.params.contact;

    const { title, description, value, courtdate, firstname, lastname, email, caserole } = this.state

    let contact = '';
    let variables = { title, description, value, courtdate };

    if (includeContact) {
      contact = <ContactForm
        updateValue = {this.updateValue}
        includeCase = {false}
        firstname =   {firstname}
        lastname =    {lastname}
        email =       {email}
        caserole =    {caserole} />;

      let contactFirstname = firstname;
      let contactLastname = lastname;
      let contactEmail = email;
      let contactCaserole = caserole;

      variables = { title, description, value, courtdate, contactFirstname, contactLastname, contactEmail, contactCaserole };
    }

    return (
      <div>
        <div>
          <input value={title}       onChange={e => this.setState({ title: e.target.value })}             type="text" placeholder="A title for the case" />
          <input value={description} onChange={e => this.setState({ description: e.target.value })}       type="text" placeholder="A description for the case" />
          <input value={value}       onChange={e => this.setState({ value: parseFloat(e.target.value) })} type="text" placeholder="The value for the case" />
          <DatePicker onChange={this.onChange} value={this.state.courtdate} />
        </div>
        {contact}
        <Mutation mutation={Queries.CREATE_CASE} variables={variables}>
          {postMutation => <button onClick={() => {
            postMutation();
            this.props.history.push("/case");
          }}>Submit</button>}
        </Mutation>

      </div>
    )
  }
}

export default CreateCase
