import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import Mutations from 'Utils/Mutations'
import ContactForm from 'Components/ContactForm'
import DatePicker from 'react-date-picker';

class CreateCase extends Component {
  constructor(props) {
    super(props);

    this.updateValue = this.updateValue.bind(this);
    this.onChange = this.onChange.bind(this);
    this.isNumeric = this.isNumeric.bind(this);
  }

  state = {
    title: '',
    description: '',
    value: '',
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

  isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  render() {
    let includeContact = this.props.match.params.contact;

    const { title, description, value, courtdate, firstname, lastname, email, caserole } = this.state

    let isEnabled = title.length > 0 && description.length > 0 && this.isNumeric(value);

    let contact = '';
    let variables = { title, description, value : parseFloat(value), courtdate };

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

      variables = { title, description, value : parseFloat(value), courtdate, contactFirstname, contactLastname, contactEmail, contactCaserole };

      isEnabled = isEnabled && contactFirstname.length > 0 && contactLastname.length > 0 && contactEmail.length > 0 && contactCaserole.length > 0;
    }

    return (
      <div>
        <div>
          <span>Title: </span><input value={title}       onChange={e => this.setState({ title: e.target.value })}             type="text" placeholder="A title for the case" />
          <span>Description: </span><input value={description} onChange={e => this.setState({ description: e.target.value })}       type="text" placeholder="A description for the case" />
          <span>Value: </span><input value={value}       onChange={e => this.setState({ value: e.target.value })} type="text" placeholder="The value for the case" />
          <span>Court Date: </span><DatePicker onChange={this.onChange} value={this.state.courtdate} />
        </div>
        {contact}
        <Mutation mutation={Mutations.CREATE_CASE} variables={variables}>
          {postMutation => <button disabled={!isEnabled} onClick={() => {
            postMutation();
            this.props.history.push("/case");
          }}>Submit</button>}
        </Mutation>

      </div>
    )
  }
}

export default CreateCase
