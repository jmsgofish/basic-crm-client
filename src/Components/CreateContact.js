import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import Mutations from 'Utils/Mutations'
import { withRouter } from 'react-router-dom'
import ContactForm from 'Components/ContactForm'

class CreateContact extends Component {
  constructor(props) {
    super(props);

    this.updateValue = this.updateValue.bind(this);
  }

  state = {
    firstname: '',
    lastname: '',
    email: '',
    caserole: '',
    caseId: ''
  }

  updateValue(param) {
    this.setState(param);
  }

  render() {
    const { firstname, lastname, email, caserole, caseId } = this.state

    let isEnabled = firstname.length > 0 && lastname.length > 0 && email.length > 0 && caserole.length > 0 && caseId.length > 0;

    return (
      <div>
        <div>
          <ContactForm
            updateValue = {this.updateValue}
            includeCase = {true}
            firstname =   {firstname}
            lastname =    {lastname}
            email =       {email}
            caserole =    {caserole}
            caseId =      {caseId} />
        </div>
        <Mutation mutation={Mutations.CREATE_CONTACT} variables={{ firstname, lastname, email, caserole, caseId }}>
          {postMutation => <button disabled={!isEnabled} onClick={() => {
            postMutation().then(() => { this.props.history.push("/contact"); }, error => { console.log(error); alert('Duplicate Case Role'); });
          }}>Submit</button>}
        </Mutation>
      </div>
    )
  }
}

export default CreateContact
