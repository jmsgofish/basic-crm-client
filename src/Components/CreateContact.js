import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import Queries from './../Utils/Queries'
import { withRouter } from 'react-router-dom'
import ContactForm from './ContactForm'

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
        <Mutation mutation={Queries.CREATE_CONTACT} variables={{ firstname, lastname, email, caserole, caseId }}>
          {postMutation => <button onClick={() => {
            postMutation().then(() => { this.props.history.push("/contact"); }, error => { console.log(error); alert('Duplicate Case Role'); });
          }}>Submit</button>}
        </Mutation>
      </div>
    )
  }
}

export default CreateContact
